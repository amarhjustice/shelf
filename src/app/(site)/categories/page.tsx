import { categories } from "@/lib/mock-data";
import CategoryCard from "@/components/CategoryCard";

export const metadata = { title: "Categories — Shelf" };

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Browse</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-ink">
          Every shelf, every subject.
        </h1>
        <p className="mt-4 text-ink-soft leading-relaxed">
          From gothic novels to Stoic philosophy, find your way into the collection through
          the subjects that matter to you.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <div key={c.id} className="flex flex-col gap-2">
            <CategoryCard category={c} />
            <p className="px-1 text-center text-xs text-ink-faint">
              {c.count} titles · {c.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
