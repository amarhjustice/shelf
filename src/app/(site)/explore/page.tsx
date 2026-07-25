"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { books } from "@/lib/mock-data";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";
import { cn } from "@/lib/utils";

const sortOptions = ["Popularity", "Title A–Z", "Newest", "Reading Time"] as const;

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All Genres";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Popularity");

  const categoryOptions = useMemo(
    () => ["All Genres", ...Array.from(new Set(books.map((b) => b.category)))],
    []
  );

  const results = useMemo(() => {
    let list = books.filter((b) => {
      const matchesQuery =
        !query ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All Genres" || b.category === category;
      return matchesQuery && matchesCategory;
    });

    list = [...list].sort((a, b) => {
      if (sort === "Title A–Z") return a.title.localeCompare(b.title);
      if (sort === "Newest") return b.publicationYear - a.publicationYear;
      if (sort === "Reading Time") return a.readingTimeMinutes - b.readingTimeMinutes;
      return b.rating - a.rating; // Popularity
    });

    return list;
  }, [query, category, sort]);

  return (
    <div>
      <section className="border-b border-line bg-forest-tint px-4 py-14 text-center sm:px-6 lg:px-8">
        <h1 className="mx-auto max-w-2xl text-balance font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Discover your next intellectual adventure.
        </h1>
        <div className="mx-auto mt-8 max-w-2xl">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search books, authors, or topics..."
            size="lg"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <FilterField label="Category">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-sm font-medium text-ink focus:outline-none"
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label="Language">
              <span className="text-sm font-medium text-ink">English</span>
            </FilterField>
            <FilterField label="Author">
              <span className="text-sm font-medium text-ink">All Authors</span>
            </FilterField>
          </div>
          <FilterField label="Sort" align="right">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sortOptions)[number])}
              className="bg-transparent text-sm font-medium text-ink focus:outline-none"
            >
              {sortOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FilterField>
        </div>

        {/* Category pills (mobile-friendly quick filter) */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categoryOptions.slice(0, 8).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                category === c
                  ? "border-forest bg-forest text-paper"
                  : "border-line bg-card text-ink-soft hover:text-ink"
              )}
            >
              {c === "All Genres" ? "All" : c}
            </button>
          ))}
        </div>

        {/* Results */}
        <p className="mt-6 text-sm text-ink-faint">
          {results.length} {results.length === 1 ? "book" : "books"} found
        </p>

        {results.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-2 text-center">
            <p className="font-serif text-xl font-semibold text-ink">No books found</p>
            <p className="text-sm text-ink-soft">
              Try a different search term or clear your filters.
            </p>
          </div>
        )}
      </section>

      {/* Sanctuary section */}
      <section className="bg-paper-soft py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-[#e7dfc9] to-[#cdbf9c]" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              The Collection
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
              A Sanctuary for Seekers
            </h2>
            <p className="mt-4 max-w-lg text-ink-soft leading-relaxed">
              Shelf isn&apos;t just a digital library; it&apos;s a curated archive of human
              thought. From the haunting corridors of gothic literature to the profound
              depths of modern philosophy, every title is optimized for an undisturbed
              reading experience.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button className="rounded-md bg-forest px-5 py-2.5 text-sm font-medium text-paper hover:bg-forest-soft">
                Join the Community →
              </button>
              <button className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-card">
                Learn our Curation Logic
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterField({
  label,
  children,
  align = "left",
}: {
  label: string;
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div className={cn("flex flex-col gap-1", align === "right" && "items-end")}>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
        {label}
      </span>
      {children}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExploreContent />
    </Suspense>
  );
}
