import Link from "next/link";
import { Book } from "@/lib/types";
import BookCover from "./BookCover";
import ReadingProgress from "./ReadingProgress";

export default function ContinueReadingCard({
  book,
  variant = "compact",
}: {
  book: Book & { progress?: number };
  variant?: "compact" | "full";
}) {
  const progress = book.progress ?? 0;

  if (variant === "full") {
    return (
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-card shadow-sm md:grid-cols-[280px_1fr]">
        <div className="p-6 md:p-0">
          <BookCover
            title={book.title}
            author={book.author}
            palette={book.palette}
            className="h-full rounded-none md:rounded-none"
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-10">
          <span className="mb-3 inline-flex w-fit items-center rounded-full bg-gold-soft px-3 py-1 text-xs font-medium text-[#6b4a17]">
            Continue Reading
          </span>
          <h3 className="font-serif text-3xl font-bold text-ink">{book.title}</h3>
          <p className="mt-1 text-ink-soft">by {book.author}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft line-clamp-2">
            {book.description}
          </p>
          <div className="mt-6">
            <ReadingProgress
              value={progress}
              label={`Chapter ${book.chapters[Math.max(0, Math.floor((book.chapters.length * progress) / 100))]?.title ?? book.chapters[0].title}`}
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/read/${book.slug}`}
              className="rounded-md bg-forest px-5 py-2.5 text-sm font-medium text-paper hover:bg-forest-soft"
            >
              Resume Reading
            </Link>
            <Link
              href={`/book/${book.slug}`}
              className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper-soft"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-card p-4 shadow-sm">
      <div className="w-16 shrink-0">
        <BookCover title={book.title} author={book.author} palette={book.palette} size="sm" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-serif text-base font-semibold text-ink">{book.title}</h3>
        <p className="truncate text-sm italic text-ink-soft">{book.author}</p>
        <p className="mt-1 text-xs font-medium text-gold">{progress}% completed</p>
      </div>
      <Link
        href={`/read/${book.slug}`}
        className="shrink-0 rounded-md bg-forest px-4 py-2 text-xs font-medium text-paper hover:bg-forest-soft"
      >
        Resume
      </Link>
    </div>
  );
}
