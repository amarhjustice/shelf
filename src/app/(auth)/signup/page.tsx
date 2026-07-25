import Link from "next/link";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export const metadata = { title: "Sign Up — Shelf" };

export default function SignUpPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">Join the library</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Create a free account — no payment required, ever, for public-domain titles.
      </p>

      <form className="mt-6 space-y-4">
        <GoogleAuthButton label="Sign up with Google" />

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink-faint">
            Full Name
          </span>
          <input
            type="text"
            required
            placeholder="Jane Doe"
            className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          />
        </label>

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
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink-faint">
            Password
          </span>
          <input
            type="password"
            required
            placeholder="Create a password"
            className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-md bg-forest py-2.5 text-sm font-semibold text-paper hover:bg-forest-soft"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-forest">
          Log in
        </Link>
      </p>
    </div>
  );
}
