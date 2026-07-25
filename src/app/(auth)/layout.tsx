import Link from "next/link";
import { BookMarked, Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-forest-tint px-4 py-10 sm:py-14">
      <div className="absolute inset-x-0 top-0 h-56 bg-forest" aria-hidden="true" />
      <div className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mx-auto mb-7 flex w-fit items-center gap-2 text-paper transition-opacity hover:opacity-85">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10">
            <BookMarked size={20} strokeWidth={2.25} />
          </span>
          <span className="font-serif text-2xl font-bold">Shelf</span>
        </Link>
        <div className="rounded-2xl border border-line bg-card p-6 shadow-xl shadow-forest/10 sm:p-8">
          {children}
        </div>
        <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-ink-soft">
          <Sparkles size={13} className="text-gold" aria-hidden="true" />
          Your next great read is waiting.
        </p>
      </div>
    </div>
  );
}
