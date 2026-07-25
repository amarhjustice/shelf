import Link from "next/link";
import { BookMarked } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-forest-tint px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <BookMarked size={22} className="text-forest" strokeWidth={2.25} />
        <span className="font-serif text-2xl font-bold text-ink">Shelf</span>
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-line bg-card p-8 shadow-sm">
        {children}
      </div>
    </div>
  );
}
