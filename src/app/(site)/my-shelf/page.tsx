"use client";

import Link from "next/link";
import { MoreVertical } from "lucide-react";
import {
  currentUser,
  myShelfBooks,
  recentlyFinished,
  savedForLater,
} from "@/lib/mock-data";
import ContinueReadingCard from "@/components/ContinueReadingCard";
import ReadingProgress from "@/components/ReadingProgress";
import BookCover from "@/components/BookCover";
import { useShelf } from "@/lib/shelf-store";

export default function MyShelfPage() {
  const { shelfIds } = useShelf();
  const current = myShelfBooks[0];
  const restOfShelf = myShelfBooks.slice(1);
  const extraShelfCount = shelfIds.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
            Your Reading Sanctuary
          </h1>
          <p className="mt-2 text-ink-soft">A curated collection of your intellectual journeys.</p>
        </div>
        <div className="flex gap-8 sm:gap-10">
          <StatBlock value={currentUser.booksRead} label="Books Read" />
          <StatBlock value={currentUser.currentlyReading} label="Reading" />
          <StatBlock value={currentUser.readingStreak} label="Day Streak" />
        </div>
      </div>

      {/* Continue reading hero */}
      <div className="mt-8">
        <ContinueReadingCard book={current} variant="full" />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-serif text-2xl font-bold text-ink">My Books</h2>
            <Link href="/explore" className="text-sm font-medium text-ink-soft hover:text-ink">
              View All
            </Link>
          </div>

          {restOfShelf.length === 0 && extraShelfCount === 0 ? (
            <p className="rounded-xl border border-dashed border-line px-6 py-10 text-center text-sm text-ink-soft">
              Books you add to your shelf will show up here.{" "}
              <Link href="/explore" className="font-medium text-forest underline">
                Browse the library
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-4">
              {restOfShelf.map((book) => (
                <li key={book.id} className="flex items-center gap-4">
                  <div className="w-16 shrink-0">
                    <BookCover title={book.title} author={book.author} palette={book.palette} size="sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/book/${book.slug}`} className="font-serif text-base font-semibold text-ink hover:underline">
                      {book.title}
                    </Link>
                    <p className="text-sm text-ink-soft">{book.author}</p>
                    <ReadingProgress value={book.progress ?? 0} className="mt-2 max-w-[220px]" />
                  </div>
                  <button aria-label="More options" className="shrink-0 p-2 text-ink-faint hover:text-ink">
                    <MoreVertical size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="rounded-2xl border border-line bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-ink">Saved for Later</h2>
          </div>
          <ul className="space-y-4">
            {savedForLater.map((book) => (
              <li key={book.id}>
                <Link href={`/book/${book.slug}`} className="flex items-center gap-3">
                  <div className="w-11 shrink-0">
                    <BookCover title={book.title} author={book.author} palette={book.palette} size="sm" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{book.title}</p>
                    <p className="truncate text-xs text-ink-soft">{book.author}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/explore"
            className="mt-5 block rounded-md border border-line py-2.5 text-center text-sm font-medium text-ink hover:bg-paper-soft"
          >
            Explore Recommendations
          </Link>
        </aside>
      </div>

      {/* Recently finished */}
      <div className="mt-14">
        <h2 className="mb-4 font-serif text-2xl font-bold text-ink">Recently Finished</h2>
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {recentlyFinished.map((book) => (
            <Link key={book.id} href={`/book/${book.slug}`} className="group">
              <BookCover title={book.title} author={book.author} palette={book.palette} size="sm" />
              <p className="mt-2 truncate text-sm font-medium text-ink group-hover:underline">
                {book.title}
              </p>
              <p className="truncate text-xs text-ink-soft">{book.author}</p>
              <p className="text-xs text-gold">Finished {book.finishedOn}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <p className="font-serif text-2xl font-bold text-ink sm:text-3xl">{value}</p>
      <p className="text-xs uppercase tracking-wide text-ink-faint">{label}</p>
    </div>
  );
}
