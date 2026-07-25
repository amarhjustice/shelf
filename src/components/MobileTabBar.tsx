"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, LibraryBig } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/my-shelf", label: "My Shelf", icon: LibraryBig },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur px-4 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 lg:hidden"
    >
      <ul className="mx-auto flex max-w-md items-center justify-around">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className="flex flex-col items-center gap-1 px-3 py-1 text-[11px]"
              >
                <span
                  className={cn(
                    "flex h-8 w-14 items-center justify-center rounded-full transition-colors",
                    active ? "bg-forest text-paper" : "text-ink-soft"
                  )}
                >
                  <Icon size={18} strokeWidth={2.1} />
                </span>
                <span className={cn(active ? "font-medium text-ink" : "text-ink-soft")}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
