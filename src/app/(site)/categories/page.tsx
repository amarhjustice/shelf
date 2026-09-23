import { prisma } from "@/lib/prisma";
import CategoryCard from "@/components/CategoryCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Categories — Shelf",
};

const genreIcons: Record<string, string> = {
  "Classic Literature": "book-open",
  Fiction: "book-marked",
  Poetry: "feather",
  Philosophy: "brain",
  History: "landmark",
  "Children's Books": "smile",
  Science: "flask-conical",
  Education: "graduation-cap",
};

const genreDescriptions: Record<string, string> = {
  "Classic Literature": "Enduring works that shaped the canon",
  Fiction: "Novels and short stories",
  Poetry: "Verse across centuries and cultures",
  Philosophy: "Ideas that ask the bigger questions",
  History: "Accounts of how we got here",
  "Children's Books": "Stories for younger readers",
  Science: "Discovery, explained clearly",
  Education: "Foundational texts and references",
};

export default async function CategoriesPage() {
  const genres = await prisma.genres.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          resources: true,
        },
      },
    },
  });

  const categories = genres.map((genre) => ({
    id: genre.genre_id.toString(),
    name: genre.name,
    icon: genreIcons[genre.name] ?? "book-open",
    description:
      genreDescriptions[genre.name] ??
      "Explore books and resources in this category.",
    count: genre._count.resources,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          Browse
        </p>

        <h1 className="mt-2 font-serif text-4xl font-bold text-ink">
          Every shelf, every subject.
        </h1>

        <p className="mt-4 text-ink-soft leading-relaxed">
          From gothic novels to Stoic philosophy, find your way into the
          collection through the subjects that matter to you.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col gap-2">
            <CategoryCard category={category} />

            <p className="px-1 text-center text-xs text-ink-faint">
              {category.count}{" "}
              {category.count === 1 ? "title" : "titles"} ·{" "}
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}