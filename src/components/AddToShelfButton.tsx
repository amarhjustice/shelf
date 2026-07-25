"use client";

import { BookmarkPlus, Check } from "lucide-react";
import { useShelf } from "@/lib/shelf-store";
import { cn } from "@/lib/utils";

export default function AddToShelfButton({ bookId }: { bookId: string }) {
  const { isOnShelf, toggleShelf } = useShelf();
  const onShelf = isOnShelf(bookId);

  return (
    <button
      type="button"
      onClick={() => toggleShelf(bookId)}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-semibold transition-colors",
        onShelf
          ? "border-forest bg-forest-tint text-forest"
          : "border-line text-ink hover:bg-paper-soft"
      )}
    >
      {onShelf ? <Check size={16} /> : <BookmarkPlus size={16} />}
      {onShelf ? "On My Shelf" : "Add to My Shelf"}
    </button>
  );
}
