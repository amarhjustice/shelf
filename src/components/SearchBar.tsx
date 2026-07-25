"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search books, authors, or topics...",
  size = "md",
  className,
}: {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-full border border-line bg-card shadow-sm",
        size === "lg" ? "px-6 py-4" : "px-4 py-2.5",
        className
      )}
    >
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label="Search books"
        className={cn(
          "w-full bg-transparent text-ink placeholder:text-ink-faint focus:outline-none",
          size === "lg" ? "text-base" : "text-sm"
        )}
      />
      <Search size={size === "lg" ? 20 : 17} className="shrink-0 text-ink" />
    </div>
  );
}
