import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Globe, ShieldCheck, Star, BookOpen } from "lucide-react";
import { books, getBookBySlug, relatedBooks } from "@/lib/mock-data";
import BookCover from "@/components/BookCover";
import BookCard from "@/components/BookCard";
import BookmarkButton from "@/components/BookmarkButton";
import AddToShelfButton from "@/components/AddToShelfButton";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const related = relatedBooks(book);
  const readingHours = Math.floor(book.readingTimeMinutes / 60);
  const readingMins = book.readingTimeMinutes % 60;

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr]">
          <div className="mx-auto w-56 lg:mx-0 lg:w-full">
            <BookCover title={book.title} author={book.author} palette={book.palette} size="lg" />
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1 text-xs font-medium text-[#6b4a17]">
              {book.category} · {book.publicationYear > 0 ? book.publicationYear : `${Math.abs(book.publicationYear)} BC`}
            </span>
            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {book.title}
            </h1>
            <p className="mt-1 font-serif text-lg italic text-ink-soft">by {book.author}</p>

            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 border-y border-line py-5 sm:grid-cols-4">
              <Stat icon={Clock} label="Reading Time" value={`${readingHours}h ${readingMins}m`} />
              <Stat icon={BookOpen} label="Pages" value={String(book.pages)} />
              <Stat icon={Globe} label="Language" value={book.language} />
              <Stat
                icon={ShieldCheck}
                label="License"
                value={book.isPublicDomain ? "Public Domain" : "Standard"}
              />
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/read/${book.slug}`}
                className="inline-flex items-center gap-2 rounded-md bg-forest px-6 py-3 text-sm font-semibold text-paper hover:bg-forest-soft"
              >
                <BookOpen size={16} /> Read Now
              </Link>
              <AddToShelfButton bookId={book.id} />
              <BookmarkButton bookId={book.id} variant="solid" size={17} />
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(book.rating) ? "currentColor" : "none"}
                />
              ))}
              <span className="ml-1 text-sm text-ink-soft">{book.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">Synopsis</h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-ink-soft">
              {book.description}
            </p>

            <div className="mt-10 rounded-2xl border border-line bg-card p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-forest-tint">
                  <div className="flex h-full w-full items-center justify-center font-serif text-2xl font-semibold text-forest">
                    {book.author
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink">
                    About {book.author}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{book.authorBio}</p>
                  <Link
                    href="/explore"
                    className="mt-3 inline-block text-sm font-medium text-forest underline underline-offset-4"
                  >
                    View all works by {book.author.split(" ").slice(-1)[0]}
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
                {book.topics.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-paper-soft px-3 py-1 text-xs text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {book.quote && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
                  Quotation
                </h3>
                <blockquote className="mt-3 border-l-2 border-gold pl-4 font-serif text-lg italic leading-snug text-ink">
                  &ldquo;{book.quote}&rdquo;
                </blockquote>
              </div>
            )}
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-ink">You may also like</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Discover more titles in {book.category.toLowerCase()} and related subjects.
              </p>
            </div>
            <Link
              href="/explore"
              className="hidden text-sm font-medium text-ink-soft hover:text-ink sm:inline-block"
            >
              Explore all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {related.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </section>
      )}
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
      <p className="mt-1 font-serif text-base font-semibold text-ink">{value}</p>
    </div>
  );
}
