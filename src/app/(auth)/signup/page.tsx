import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata = { title: "Sign Up — Shelf" };

export default function SignUpPage() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        Your reading life, gathered
      </p>

      <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-ink">
        Join the library.
      </h1>

      <p className="mt-2 text-sm leading-6 text-ink-soft">
        Create a free account to save books, track progress, and build your
        Shelf.
      </p>

      <SignUpForm />

      <p className="mt-4 text-center text-xs leading-5 text-ink-faint">
        By creating an account, you agree to Shelf&apos;s terms and privacy
        policy.
      </p>

      <p className="mt-5 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-forest hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}