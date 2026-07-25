import { CoverPalette } from "@/lib/types";
import { cn } from "@/lib/utils";

type BookCoverProps = {
  title: string;
  author: string;
  palette: CoverPalette;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeStyles: Record<NonNullable<BookCoverProps["size"]>, string> = {
  sm: "text-[10px] p-3",
  md: "text-xs p-4",
  lg: "text-sm p-5",
  xl: "text-base p-7",
};

export default function BookCover({
  title,
  author,
  palette,
  size = "md",
  className,
}: BookCoverProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-[2/3] w-full flex-col justify-between overflow-hidden rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.15),0_8px_20px_-8px_rgba(0,0,0,0.35)]",
        sizeStyles[size],
        className
      )}
      style={{
        backgroundImage: `linear-gradient(155deg, ${palette.from}, ${palette.to})`,
        color: palette.ink,
      }}
      aria-hidden="true"
    >
      {/* spine highlight */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[6%]"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.35), transparent)" }}
      />
      {/* frame */}
      <div
        className="pointer-events-none absolute inset-2 rounded-[2px] border"
        style={{ borderColor: `${palette.ink}33` }}
      />
      <div className="relative flex justify-between">
        <span
          className="font-serif uppercase tracking-[0.2em] opacity-80"
          style={{ fontSize: "0.65em" }}
        >
          Shelf
        </span>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center text-center gap-2">
        <p className="font-serif font-semibold leading-tight text-balance" style={{ fontSize: "1.5em" }}>
          {title}
        </p>
        <div className="h-px w-8 opacity-50" style={{ background: palette.ink }} />
        <p className="uppercase tracking-[0.15em] opacity-75" style={{ fontSize: "0.7em" }}>
          {author}
        </p>
      </div>
      <div className="relative text-center opacity-60" style={{ fontSize: "0.6em" }}>
        <span className="tracking-[0.15em] uppercase">Public Domain Edition</span>
      </div>
    </div>
  );
}
