import Link from "next/link";
import { BookMarked, Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white pb-24 pt-14 lg:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <BookMarked size={20} className="text-forest" strokeWidth={2.25} />
              <span className="font-serif text-xl font-bold text-ink">Shelf</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              The quiet library. A digital sanctuary for the modern reader to explore the
              world&apos;s most enduring texts.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <button
                aria-label="Share Shelf"
                className="rounded-full border border-line p-2 text-ink-soft transition-colors hover:text-ink"
              >
                <Share2 size={15} />
              </button>
              <button
                aria-label="Change language"
                className="rounded-full border border-line p-2 text-ink-soft transition-colors hover:text-ink"
              >
                <Globe size={15} />
              </button>
            </div>
          </div>

          <FooterColumn
            title="Library"
            links={[
              { label: "Explore", href: "/explore" },
              { label: "Categories", href: "/categories" },
              { label: "Recently Added", href: "/explore" },
              { label: "Popular", href: "/explore" },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Support", href: "/support" },
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              { label: "Terms of Service", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
            ]}
          />
        </div>

        <div className="mt-12 border-t border-line pt-6 text-xs text-ink-faint">
          © 2026 Shelf Digital Library. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-ink-soft hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
