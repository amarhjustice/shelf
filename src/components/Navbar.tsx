"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BookMarked, Menu, Search, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/categories", label: "Categories" },
  { href: "/my-shelf", label: "My Shelf" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            className="-ml-2 rounded p-2 text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}  
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <BookMarked size={20} className="text-forest" strokeWidth={2.25} />
            <span className="font-serif text-xl font-bold tracking-tight text-ink">Shelf</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-[15px] transition-colors hover:text-ink",
                  active ? "text-ink font-medium" : "text-ink-soft"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-forest" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/explore"
            aria-label="Search"
            className="hidden rounded-full p-2.5 text-ink-soft transition-colors hover:bg-paper-soft hover:text-ink sm:inline-flex"
          >
            <Search size={19} />
          </Link>
          <Link
            href="/profile"
            aria-label="Your profile"
            className="inline-flex items-center justify-center rounded-full p-1 text-ink-soft transition-colors hover:bg-paper-soft hover:text-ink"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-tint text-forest">
              <User size={17} />
            </span>
          </Link>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-line bg-paper-soft px-4 pb-4 pt-2 lg:hidden"
        >
          <div className="mb-3 flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2.5">
            <Search size={16} className="text-ink-faint" />
            <input
              type="search"
              placeholder="Search by title, author, or ISBN..."
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
          </div>
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-[15px]",
                    pathname === link.href
                      ? "bg-forest-tint font-medium text-forest"
                      : "text-ink-soft"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
