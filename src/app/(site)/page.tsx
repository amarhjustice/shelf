import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookMarked, Gauge, NotebookPen } from "lucide-react";
import { categories, findByIds, popularBookIds, recentlyAddedIds } from "@/lib/mock-data";
import CategoryCard from "@/components/CategoryCard";
import BookCard from "@/components/BookCard";

export default function HomePage() {
  const popular = findByIds(popularBookIds);
  const recent = findByIds(recentlyAddedIds);

  return (
    <div>
      {/* Hero */}
      {/* Hero */}
{/* Hero */}
<section className="relative min-h-[720px] overflow-hidden bg-paper">
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/images/new2.png"
      alt="A collection of books in a peaceful reading space"
      fill
      priority
      className="object-cover object-center"
    />

    {/* Subtle overlay to keep text readable */}
    <div className="absolute" />
  </div>

  {/* Hero Content */}
  <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
    <div className="w-full max-w-2xl">

      {/* Eyebrow */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Your Digital Library
        </span>

        <span className="h-px w-16 bg-gold/50" />
      </div>

      {/* Main Heading */}
      <h1 className="font-serif text-5xl font-bold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
        Read more.
        <br />
        Discover more.
        <br />
        <span className="text-forest">
          Become more.
        </span>
      </h1>

      {/* Description */}
      <p className="mt-7 max-w-lg text-base leading-7 text-ink-soft sm:text-lg">
        A world of books, right on your Shelf. Discover timeless classics,
        contemporary fiction, and educational resources—all in one beautifully
        curated digital library.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 rounded-md bg-forest px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-forest-soft"
        >
          Explore the Library
          <ArrowRight size={16} />
        </Link>

        <Link
          href="/my-shelf"
          className="rounded-md border border-forest/25 bg-white/80 px-6 py-3.5 text-sm font-semibold text-forest backdrop-blur-sm transition hover:bg-white"
        >
          Continue Reading
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-10 flex flex-wrap gap-6 border-t border-line pt-6 sm:gap-10">

        <div>
          <p className="font-serif text-2xl font-bold text-ink">
            10K+
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            Books
          </p>
        </div>

        <div className="h-10 w-px bg-line" />

        <div>
          <p className="font-serif text-2xl font-bold text-ink">
            50+
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            Categories
          </p>
        </div>

        <div className="h-10 w-px bg-line" />

        <div>
          <p className="font-serif text-2xl font-bold text-ink">
            Free
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            To Explore
          </p>
        </div>

      </div>
    </div>
  </div>

  {/* Continue Reading Card */}
  <div className="absolute bottom-6 right-6 z-20 hidden w-80 rounded-2xl border border-line bg-white/95 p-5 shadow-xl backdrop-blur-md lg:block">

    <div className="flex items-center gap-4">

      {/* Book Thumbnail */}
      <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-md">
        <Image
          src="/images/bookcover.png"
          alt="Book cover"
          fill
          className="object-cover"
        />
      </div>

      {/* Book Info */}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
          Continue Reading
        </p>

        <h3 className="mt-1 truncate font-serif text-lg font-semibold text-ink">
          The Journey Within
        </h3>

        <p className="mt-1 text-sm text-ink-soft">
          Eliot Harmon
        </p>

        {/* Progress */}
        <div className="mt-3 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-deep">
            <div className="h-full w-[68%] rounded-full bg-forest" />
          </div>

          <span className="text-xs font-medium text-ink-soft">
            68%
          </span>
        </div>
      </div>

    </div>

    <div className="mt-4 flex items-center justify-between text-xs text-ink-soft">
      <span>3h 24m left in book</span>

      <Link
        href="/read/walden"
        className="font-semibold text-forest hover:text-forest-soft"
      >
        Continue →
      </Link>
    </div>
  </div>
</section>  

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Curated Collections
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">
              Explore the Library
            </h2>
          </div>
          <Link
            href="/categories"
            className="hidden items-center gap-1 text-sm font-medium text-ink-soft hover:text-ink sm:inline-flex"
          >
            View All Categories <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Popular on Shelf</h2>
          <Link href="/explore" className="text-sm font-medium text-ink-soft hover:text-ink">
            See More
          </Link>
        </div>
        <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {popular.map((book) => (
            <div key={book.id} className="w-40 shrink-0 sm:w-auto">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </section>

      {/* Recently added */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Recently Added</h2>
          <Link href="/explore" className="text-sm font-medium text-ink-soft hover:text-ink">
            See More
          </Link>
        </div>
        <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {recent.map((book) => (
            <div key={book.id} className="w-40 shrink-0 sm:w-auto">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </section>

      {/* Reading space promo */}
      <section className="bg-paper-soft py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-2xl border border-line bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex items-center justify-between text-sm text-ink-soft">
              <span className="font-medium text-ink">Walden — Henry David Thoreau</span>
            </div>
            <blockquote className="font-serif text-lg italic leading-relaxed text-ink sm:text-xl">
              &ldquo;I went to the woods because I wished to live deliberately, to front only
              the essential facts of life...&rdquo;
            </blockquote>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              ...and see if I could not learn what it had to teach, and not, when I came to
              die, discover that I had not lived. I did not wish to live what was not life,
              living is so dear; nor did I wish to practise resignation, unless it was quite
              necessary.
            </p>
            <div className="mt-6 h-px w-full bg-paper-deep">
              <div className="h-px w-1/4 bg-forest" />
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Your sanctuary for reading.
            </h2>
            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-tint text-forest">
                  <BookMarked size={17} />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink">Maximum Comfort</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    Customizable typography, margins, and night modes designed to make
                    reading on screen as natural as paper.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-tint text-forest">
                  <Gauge size={17} />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink">Progress Tracking</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    Keep track of every book you&apos;ve started, how far you&apos;ve come,
                    and set goals for your intellectual journey.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-tint text-forest">
                  <NotebookPen size={17} />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink">Deep Note-Taking</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    Highlight passages and save your thoughts directly on the page. Export
                    your wisdom whenever you need it.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-balance font-serif text-3xl font-bold text-ink sm:text-4xl">
            Ready to expand your horizon?
          </h2>
          <p className="mt-4 text-ink-soft">
            Join thousands of readers who have made Shelf their digital home for discovery
            and growth.
          </p>
          <Link
            href="/explore"
            className="mt-8 inline-block rounded-md bg-forest px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-paper hover:bg-forest-soft"
          >
            Find Your Next Book
          </Link>
        </div>
      </section>
    </div>
  );
}