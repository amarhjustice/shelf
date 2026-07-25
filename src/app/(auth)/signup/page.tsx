import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export const metadata = { title: "Sign Up — Shelf" };

export default function SignUpPage() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Your reading life, gathered</p>
      <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-ink">Join the library.</h1>
      <p className="mt-2 text-sm leading-6 text-ink-soft">Create a free account to save books, track progress, and build your Shelf.</p>

      <form className="mt-6 space-y-4">
        <GoogleAuthButton label="Sign up with Google" />

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink-faint">Full name</span>
          <span className="relative block">
            <UserRound size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
            <input type="text" name="name" autoComplete="name" required placeholder="Jane Doe" className="w-full rounded-lg border border-line bg-paper py-3 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-forest focus:outline-none" />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink-faint">Email</span>
          <span className="relative block">
            <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
            <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" className="w-full rounded-lg border border-line bg-paper py-3 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-forest focus:outline-none" />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink-faint">Password</span>
          <span className="relative block">
            <LockKeyhole size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
            <input type="password" name="password" autoComplete="new-password" minLength={8} required placeholder="At least 8 characters" className="w-full rounded-lg border border-line bg-paper py-3 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-forest focus:outline-none" />
          </span>
        </label>

        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-forest py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft">
          Create Account <ArrowRight size={16} aria-hidden="true" />
        </button>
      </form>

      <p className="mt-4 text-center text-xs leading-5 text-ink-faint">By creating an account, you agree to Shelf&apos;s terms and privacy policy.</p>
      <p className="mt-5 text-center text-sm text-ink-soft">
        Already have an account? <Link href="/login" className="font-medium text-forest hover:underline">Log in</Link>
      </p>
    </div>
  );
}
