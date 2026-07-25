"use client";

import { Bookmark } from "lucide-react";
import { useShelf } from "@/lib/shelf-store";
import { cn } from "@/lib/utils";

export default function BookmarkButton({
  bookId,
  size = 16,
  variant = "ghost",
  className,
}: {
  bookId: string;
  size?: number;
  variant?: "ghost" | "solid";
  className?: string;
}) {
  const { isBookmarked, toggleBookmark } = useShelf();
  const active = isBookmarked(bookId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(bookId);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove bookmark" : "Bookmark this book"}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-colors",
        variant === "ghost"
          ? "p-1.5 text-ink-soft hover:text-forest"
          : "border border-line bg-card p-2 text-ink-soft shadow-sm hover:text-forest",
        className
      )}
    >
      <Bookmark size={size} fill={active ? "currentColor" : "none"} className={active ? "text-gold" : undefined} />
    </button>
  );
}
