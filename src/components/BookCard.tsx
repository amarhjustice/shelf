import Link from "next/link";
import { Book } from "@/lib/types";
import BookCover from "./BookCover";
import BookmarkButton from "./BookmarkButton";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="group relative flex flex-col">
      <Link href={`/book/${book.slug}`} className="block">
        <div className="relative">
          <BookCover title={book.title} author={book.author} palette={book.palette} />
          {book.isPublicDomain && (
            <span className="absolute right-2 top-2 rounded-sm bg-gold-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#6b4a17]">
              Free
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3 flex items-start justify-between gap-2">
        <Link href={`/book/${book.slug}`} className="min-w-0">
          <h3 className="truncate font-serif text-[15px] font-semibold leading-snug text-ink group-hover:underline">
            {book.title}
          </h3>
          <p className="mt-0.5 truncate text-sm text-ink-soft">{book.author}</p>
          <span className="mt-1 block h-px w-8 bg-gold" />
        </Link>
        <BookmarkButton bookId={book.id} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Link
          href={`/read/${book.slug}`}
          className="w-full rounded-md bg-forest px-3 py-2 text-center text-xs font-medium text-paper transition-colors hover:bg-forest-soft"
        >
          Read Now
        </Link>
      </div>
    </div>
  );
}
