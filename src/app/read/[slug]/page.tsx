"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  Highlighter,
  List,
  Minus,
  NotebookPen,
  Plus,
  Search,
  Share2,
  X,
} from "lucide-react";
import { getBookBySlug } from "@/lib/mock-data";
import { chapterParagraphs } from "@/lib/reading-content";
import { useShelf } from "@/lib/shelf-store";
import { cn } from "@/lib/utils";

type Theme = "light" | "sepia" | "dark";
type Width = "narrow" | "medium" | "wide";
type Panel = "contents" | "bookmarks" | "notes" | "highlights" | "appearance" | null;

const themeStyles: Record<Theme, { bg: string; text: string; sub: string }> = {
  light: { bg: "#ffffff", text: "#221f19", sub: "#6b6558" },
  sepia: { bg: "#f1e6cd", text: "#2c2211", sub: "#7a6a48" },
  dark: { bg: "#181815", text: "#e8e4d8", sub: "#8f8a78" },
};

const widthClass: Record<Width, string> = {
  narrow: "max-w-xl",
  medium: "max-w-2xl",
  wide: "max-w-4xl",
};

const fontSizes = [17, 19, 22];

export default function ReadingSpacePage() {
  const params = useParams<{ slug: string }>();
  const book = getBookBySlug(params.slug);

  const { isBookmarked, toggleBookmark } = useShelf();

  const [chapterIndex, setChapterIndex] = useState(3); // start mid-book to echo the Figma "Chapter 4" state
  const [theme, setTheme] = useState<Theme>("sepia");
  const [width, setWidth] = useState<Width>("medium");
  const [fontSizeIdx, setFontSizeIdx] = useState(1);
  const [panel, setPanel] = useState<Panel>(null);
  const [highlighted, setHighlighted] = useState<string[]>([]);
  const [notes, setNotes] = useState<{ id: string; text: string; chapter: string }[]>([]);
  const [noteDraft, setNoteDraft] = useState("");

  const paragraphs = useMemo(() => chapterParagraphs(chapterIndex), [chapterIndex]);

  if (!book) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-paper text-center">
        <p className="font-serif text-2xl font-semibold text-ink">Book not found</p>
        <Link href="/explore" className="text-sm font-medium text-forest underline">
          Back to Explore
        </Link>
      </div>
    );
  }

  const chapter = book.chapters[chapterIndex];
  const percent = Math.round(((chapterIndex + 1) / book.chapters.length) * 100);
  const t = themeStyles[theme];
  const bookmarked = isBookmarked(book.id);

  function goToChapter(i: number) {
    setChapterIndex(Math.max(0, Math.min(book!.chapters.length - 1, i)));
  }

  function togglePanel(p: Exclude<Panel, null>) {
    setPanel((prev) => (prev === p ? null : p));
  }

  function toggleHighlight(text: string) {
    setHighlighted((prev) =>
      prev.includes(text) ? prev.filter((h) => h !== text) : [...prev, text]
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: t.bg, color: t.text }}>
      {/* Progress hairline */}
      <div className="h-[3px] w-full bg-black/10">
        <div className="h-full bg-gold transition-[width]" style={{ width: `${percent}%` }} />
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b px-4 py-3 backdrop-blur sm:px-6"
        style={{ borderColor: `${t.text}1a`, backgroundColor: `${t.bg}f2` }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href={`/book/${book.slug}`}
            className="flex shrink-0 items-center gap-1.5 text-sm opacity-80 hover:opacity-100"
          >
            <ArrowLeft size={17} />
            <span className="hidden sm:inline">Library</span>
          </Link>
          <div className="hidden h-5 w-px shrink-0 sm:block" style={{ background: `${t.text}22` }} />
          <div className="min-w-0">
            <p className="truncate font-serif text-sm font-semibold sm:text-base">{book.title}</p>
            <p className="truncate text-xs opacity-60">{book.author}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <span className="mr-1 hidden text-xs opacity-70 sm:inline">
            Chapter {chapterIndex + 1} · {percent}%
          </span>
          <HeaderIcon
            active={panel === "contents"}
            onClick={() => togglePanel("contents")}
            label="Table of contents"
            icon={List}
            themeText={t.text}
          />
          <HeaderIcon
            active={panel === "appearance"}
            onClick={() => togglePanel("appearance")}
            label="Text appearance"
            icon={() => <span className="text-[13px] font-bold leading-none">Aa</span>}
            themeText={t.text}
          />
          <HeaderIcon
            active={bookmarked}
            onClick={() => toggleBookmark(book.id)}
            label="Bookmark this page"
            icon={Bookmark}
            filled={bookmarked}
            themeText={t.text}
          />
          <HeaderIcon
            active={panel === "notes"}
            onClick={() => togglePanel("notes")}
            label="Notes"
            icon={NotebookPen}
            themeText={t.text}
          />
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        {/* Reading column */}
        <div className="min-w-0 flex-1 px-4 pb-28 pt-8 sm:px-8 lg:px-16">
          <article className={cn("mx-auto", widthClass[width])}>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] opacity-60">
              Chapter {chapterIndex + 1}
            </p>
            <h1 className="mt-2 text-balance text-center font-serif text-3xl font-bold leading-tight sm:text-4xl">
              {chapter.title}
            </h1>
            <div className="mx-auto mt-6 h-px w-16" style={{ background: `${t.text}33` }} />

            <div className="mt-10 space-y-6" style={{ fontSize: fontSizes[fontSizeIdx] }}>
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  onDoubleClick={() => toggleHighlight(p)}
                  className={cn(
                    "cursor-text rounded leading-[1.8] transition-colors",
                    highlighted.includes(p) && "bg-gold/25"
                  )}
                  style={i === 0 ? { fontStyle: "italic" } : undefined}
                  title="Double-click to highlight"
                >
                  {i === 0 && (
                    <span
                      className="float-left mr-2 mt-1 font-serif text-6xl leading-[0.8]"
                      aria-hidden="true"
                    >
                      {p[0]}
                    </span>
                  )}
                  {i === 0 ? p.slice(1) : p}
                </p>
              ))}
            </div>

            <div className="mt-14 flex items-center justify-between border-t pt-6 text-sm" style={{ borderColor: `${t.text}22` }}>
              <button
                disabled={chapterIndex === 0}
                onClick={() => goToChapter(chapterIndex - 1)}
                className="flex items-center gap-1 opacity-80 hover:opacity-100 disabled:opacity-30"
              >
                <ArrowLeft size={15} /> Previous
              </button>
              <span className="opacity-60">
                Page {(chapterIndex + 1) * 12} of {book.pages}
              </span>
              <button
                disabled={chapterIndex === book.chapters.length - 1}
                onClick={() => goToChapter(chapterIndex + 1)}
                className="flex items-center gap-1 opacity-80 hover:opacity-100 disabled:opacity-30"
              >
                Next <ArrowLeft size={15} className="rotate-180" />
              </button>
            </div>
          </article>
        </div>

        {/* Side panel */}
        {panel && (
          <aside
            className="fixed inset-y-0 right-0 z-40 w-[85%] max-w-xs overflow-y-auto border-l shadow-xl sm:sticky sm:top-[57px] sm:h-[calc(100vh-57px)] sm:w-80"
            style={{ backgroundColor: t.bg, borderColor: `${t.text}1a` }}
          >
            <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: `${t.text}1a` }}>
              <h2 className="font-serif text-lg font-semibold capitalize">
                {panel === "appearance" ? "Appearance" : panel}
              </h2>
              <button onClick={() => setPanel(null)} aria-label="Close panel" className="opacity-60 hover:opacity-100">
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              {panel === "contents" && (
                <ul className="space-y-1">
                  {book.chapters.map((c, i) => (
                    <li key={c.id}>
                      <button
                        onClick={() => {
                          goToChapter(i);
                          setPanel(null);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                          i === chapterIndex ? "bg-gold/20 font-medium" : "hover:bg-black/5"
                        )}
                      >
                        <span className="truncate">
                          {i + 1}. {c.title}
                        </span>
                        <span className="ml-2 shrink-0 text-xs opacity-50">p.{c.page}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {panel === "bookmarks" && (
                <EmptyOrList
                  empty={!bookmarked}
                  emptyText="No bookmarks yet. Tap the bookmark icon in the header to save your place."
                >
                  <div className="rounded-lg border px-3 py-2.5 text-sm" style={{ borderColor: `${t.text}22` }}>
                    Chapter {chapterIndex + 1}: {chapter.title}
                  </div>
                </EmptyOrList>
              )}

              {panel === "highlights" && (
                <EmptyOrList
                  empty={highlighted.length === 0}
                  emptyText="Double-click any paragraph while reading to highlight it."
                >
                  <ul className="space-y-3">
                    {highlighted.map((h, i) => (
                      <li
                        key={i}
                        className="rounded-lg border-l-2 border-gold bg-gold/10 px-3 py-2 text-sm leading-relaxed"
                      >
                        {h.slice(0, 140)}
                        {h.length > 140 ? "…" : ""}
                      </li>
                    ))}
                  </ul>
                </EmptyOrList>
              )}

              {panel === "notes" && (
                <div>
                  <textarea
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    placeholder={`Add a note for "${chapter.title}"...`}
                    rows={3}
                    className="w-full resize-none rounded-lg border bg-transparent px-3 py-2 text-sm focus:outline-none"
                    style={{ borderColor: `${t.text}33` }}
                  />
                  <button
                    onClick={() => {
                      if (!noteDraft.trim()) return;
                      setNotes((prev) => [
                        { id: crypto.randomUUID(), text: noteDraft.trim(), chapter: chapter.title },
                        ...prev,
                      ]);
                      setNoteDraft("");
                    }}
                    className="mt-2 rounded-md bg-forest px-4 py-2 text-xs font-medium text-paper"
                  >
                    Save Note
                  </button>

                  <EmptyOrList empty={notes.length === 0} emptyText="Your notes will appear here.">
                    <ul className="mt-5 space-y-3">
                      {notes.map((n) => (
                        <li key={n.id} className="rounded-lg border px-3 py-2.5 text-sm" style={{ borderColor: `${t.text}22` }}>
                          <p className="text-[11px] font-medium uppercase tracking-wide opacity-50">
                            {n.chapter}
                          </p>
                          <p className="mt-1 leading-relaxed">{n.text}</p>
                        </li>
                      ))}
                    </ul>
                  </EmptyOrList>
                </div>
              )}

              {panel === "appearance" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest opacity-50">
                      Text Size
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        disabled={fontSizeIdx === 0}
                        onClick={() => setFontSizeIdx((i) => Math.max(0, i - 1))}
                        className="flex h-9 w-9 items-center justify-center rounded-md border disabled:opacity-30"
                        style={{ borderColor: `${t.text}33` }}
                        aria-label="Decrease text size"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="w-10 text-center text-sm">{fontSizeIdx + 1}/3</span>
                      <button
                        disabled={fontSizeIdx === fontSizes.length - 1}
                        onClick={() => setFontSizeIdx((i) => Math.min(fontSizes.length - 1, i + 1))}
                        className="flex h-9 w-9 items-center justify-center rounded-md border disabled:opacity-30"
                        style={{ borderColor: `${t.text}33` }}
                        aria-label="Increase text size"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest opacity-50">
                      Reading Width
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {(["narrow", "medium", "wide"] as Width[]).map((w) => (
                        <button
                          key={w}
                          onClick={() => setWidth(w)}
                          className={cn(
                            "rounded-md border py-2 text-xs capitalize transition-colors",
                            width === w ? "border-forest bg-forest text-paper" : ""
                          )}
                          style={width !== w ? { borderColor: `${t.text}33` } : undefined}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest opacity-50">
                      Color Theme
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {(["light", "sepia", "dark"] as Theme[]).map((th) => (
                        <button
                          key={th}
                          onClick={() => setTheme(th)}
                          aria-label={`${th} theme`}
                          aria-pressed={theme === th}
                          className={cn(
                            "flex h-10 items-center justify-center rounded-md border-2",
                            theme === th ? "border-forest" : "border-transparent"
                          )}
                        >
                          <span
                            className="h-6 w-6 rounded-full border"
                            style={{
                              backgroundColor: themeStyles[th].bg,
                              borderColor: `${themeStyles[th].text}33`,
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Bottom quick bar (mobile) */}
      <div
        className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between border-t px-5 py-3 text-xs sm:hidden"
        style={{ backgroundColor: `${t.bg}f2`, borderColor: `${t.text}1a` }}
      >
        <span className="opacity-60">
          Page {(chapterIndex + 1) * 12} of {book.pages}
        </span>
        <div className="flex items-center gap-4">
          <button aria-label="Search in book" className="opacity-70">
            <Search size={17} />
          </button>
          <button
            aria-label="Highlight"
            className="opacity-70"
            onClick={() => togglePanel("highlights")}
          >
            <Highlighter size={17} />
          </button>
          <button aria-label="Share" className="opacity-70">
            <Share2 size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

function HeaderIcon({
  icon: Icon,
  onClick,
  label,
  active,
  filled,
  themeText,
}: {
  icon: React.ComponentType<{ size?: number; fill?: string; className?: string }>;
  onClick: () => void;
  label: string;
  active?: boolean;
  filled?: boolean;
  themeText: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
        active ? "bg-gold/25" : "hover:bg-black/5"
      )}
      style={{ color: themeText }}
    >
      <Icon size={17} fill={filled ? "currentColor" : "none"} />
    </button>
  );
}

function EmptyOrList({
  empty,
  emptyText,
  children,
}: {
  empty: boolean;
  emptyText: string;
  children: React.ReactNode;
}) {
  if (empty) {
    return <p className="text-sm leading-relaxed opacity-60">{emptyText}</p>;
  }
  return <>{children}</>;
}
