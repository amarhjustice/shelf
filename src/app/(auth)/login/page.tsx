import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export const metadata = { title: "Log In — Shelf" };

export default function LoginPage() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Welcome back</p>
      <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-ink">Pick up where you left off.</h1>
      <p className="mt-2 text-sm leading-6 text-ink-soft">Log in to continue your reading journey.</p>

      <form className="mt-6 space-y-4">
        <GoogleAuthButton label="Continue with Google" />

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink-faint">Email</span>
          <span className="relative block">
            <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
            <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" className="w-full rounded-lg border border-line bg-paper py-3 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-forest focus:outline-none" />
          </span>
        </label>

        <label className="block">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-ink-faint">Password</span>
            <Link href="/forgot-password" className="text-xs font-medium text-forest hover:underline">Forgot?</Link>
          </div>
          <span className="relative block">
            <LockKeyhole size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
            <input type="password" name="password" autoComplete="current-password" required placeholder="Enter your password" className="w-full rounded-lg border border-line bg-paper py-3 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-forest focus:outline-none" />
          </span>
        </label>

        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-forest py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft">
          Log In <ArrowRight size={16} aria-hidden="true" />
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        New to Shelf? <Link href="/signup" className="font-medium text-forest hover:underline">Create an account</Link>
      </p>
    </div>
  );
}
