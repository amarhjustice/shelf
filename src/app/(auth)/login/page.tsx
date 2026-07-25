import Link from "next/link";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export const metadata = { title: "Log In — Shelf" };

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">Welcome back</h1>
      <p className="mt-1 text-sm text-ink-soft">Log in to continue your reading journey.</p>

      <form className="mt-6 space-y-4">
        <GoogleAuthButton label="Continue with Google" />

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink-faint">
            Email
          </span>
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          />
        </label>

        <label className="block">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
              Password
            </span>
            <Link href="/forgot-password" className="text-xs font-medium text-forest">
              Forgot?
            </Link>
          </div>
          <input
            type="password"
            required
            placeholder="••••••••"
            className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-md bg-forest py-2.5 text-sm font-semibold text-paper hover:bg-forest-soft"
        >
          Log In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        New to Shelf?{" "}
        <Link href="/signup" className="font-medium text-forest">
          Create an account
        </Link>
      </p>
    </div>
  );
}
