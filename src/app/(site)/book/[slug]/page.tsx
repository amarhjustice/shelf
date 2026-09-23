import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Globe, ShieldCheck, BookOpen } from "lucide-react";
import BookCover from "@/components/BookCover";
import BookCard from "@/components/BookCard";
import BookmarkButton from "@/components/BookmarkButton";
import AddToShelfButton from "@/components/AddToShelfButton";
import { prisma } from "@/lib/prisma";

type CoverPalette = {
  from: string;
  to: string;
  ink: string;
};

function getCoverPalette(value: unknown): CoverPalette {
  if (
    typeof value === "object" &&
    value !== null &&
    "from" in value &&
    "to" in value &&
    "ink" in value &&
    typeof value.from === "string" &&
    typeof value.to === "string" &&
    typeof value.ink === "string"
  ) {
    return {
      from: value.from,
      to: value.to,
      ink: value.ink,
    };
  }

  return {
    from: "#20281c",
    to: "#37452b",
    ink: "#eef2e6",
  };
}

export async function generateStaticParams() {
  const resources = await prisma.resources.findMany({
    select: {
      slug: true,
    },
  });

  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const resource = await prisma.resources.findUnique({
    where: {
      slug,
    },
    include: {
      genres: true,
      languages: true,
      books: true,
      resource_authors: {
        include: {
          authors: true,
        },
        orderBy: {
          role: "asc",
        },
      },
      resource_topics: {
        include: {
          topics: true,
        },
      },
    },
  });

  if (!resource || !resource.books) {
    notFound();
  }

  const primaryAuthor =
    resource.resource_authors.find((item) => item.role === "AUTHOR") ??
    resource.resource_authors[0];

  if (!primaryAuthor) {
    notFound();
  }

  const author = primaryAuthor.authors;

  const readingTimeMinutes = resource.reading_time_minutes ?? 0;
  const readingHours = Math.floor(readingTimeMinutes / 60);
  const readingMins = readingTimeMinutes % 60;

  const isPublicDomain =
    resource.license_type.toUpperCase() === "PUBLIC_DOMAIN";

  const topics = resource.resource_topics.map(
    (resourceTopic) => resourceTopic.topics.name
  );

  const palette = getCoverPalette(resource.cover_palette);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr]">
          <div className="mx-auto w-56 lg:mx-0 lg:w-full">
            <BookCover
              title={resource.title}
              author={author.name}
              palette={palette}
              size="lg"
            />
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1 text-xs font-medium text-[#6b4a17]">
              {resource.genres.name} ·{" "}
              {resource.publication_year
                ? resource.publication_year > 0
                  ? resource.publication_year
                  : `${Math.abs(resource.publication_year)} BC`
                : "Publication year unknown"}
            </span>

            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {resource.title}
            </h1>

            <p className="mt-1 font-serif text-lg italic text-ink-soft">
              by {author.name}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 border-y border-line py-5 sm:grid-cols-4">
              <Stat
                icon={Clock}
                label="Reading Time"
                value={`${readingHours}h ${readingMins}m`}
              />

              <Stat
                icon={BookOpen}
                label="Pages"
                value={String(resource.books.number_of_pages)}
              />

              <Stat
                icon={Globe}
                label="Language"
                value={resource.languages.name}
              />

              <Stat
                icon={ShieldCheck}
                label="License"
                value={isPublicDomain ? "Public Domain" : "Standard"}
              />
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/read/${resource.slug}`}
                className="inline-flex items-center gap-2 rounded-md bg-forest px-6 py-3 text-sm font-semibold text-paper hover:bg-forest-soft"
              >
                <BookOpen size={16} /> Read Now
              </Link>

              <AddToShelfButton bookId={resource.resource_id.toString()} />

              <BookmarkButton
                bookId={resource.resource_id.toString()}
                variant="solid"
                size={17}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">
              Synopsis
            </h2>

            <p className="mt-4 whitespace-pre-line leading-relaxed text-ink-soft">
              {resource.synopsis}
            </p>

            <div className="mt-10 rounded-2xl border border-line bg-card p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-forest-tint">
                  <div className="flex h-full w-full items-center justify-center font-serif text-2xl font-semibold text-forest">
                    {author.name
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-ink">
                    About {author.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {author.bio}
                  </p>

                  <Link
                    href="/explore"
                    className="mt-3 inline-block text-sm font-medium text-forest underline underline-offset-4"
                  >
                    View all works by{" "}
                    {author.name.split(" ").slice(-1)[0]}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
                Topics
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-line bg-paper-soft px-3 py-1 text-xs text-ink-soft"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {resource.books.featured_quote && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
                  Quotation
                </h3>

                <blockquote className="mt-3 border-l-2 border-gold pl-4 font-serif text-lg italic leading-snug text-ink">
                  &ldquo;{resource.books.featured_quote}&rdquo;
                </blockquote>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/*
        Related books will be connected once the library contains
        multiple real resources. We are intentionally not using
        mock-data here.
      */}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
        <Icon size={13} />
        {label}
      </div>

      <p className="mt-1 font-serif text-base font-semibold text-ink">
        {value}
      </p>
    </div>
  );
}