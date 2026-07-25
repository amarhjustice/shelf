import { cn } from "@/lib/utils";

export default function ReadingProgress({
  value,
  label,
  className,
}: {
  value: number;
  label?: string;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-ink-soft">
          <span>{label}</span>
          <span className="font-medium text-gold">{clamped}% Complete</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-full overflow-hidden rounded-full bg-paper-deep"
      >
        <div
          className="h-full rounded-full bg-forest transition-[width]"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
