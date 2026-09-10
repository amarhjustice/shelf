import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata = { title: "Log In — Shelf" };

export default function LoginPage() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        Welcome back
      </p>

      <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-ink">
        Pick up where you left off.
      </h1>

      <p className="mt-2 text-sm leading-6 text-ink-soft">
        Log in to continue your reading journey.
      </p>

      <LoginForm />

      <p className="mt-6 text-center text-sm text-ink-soft">
        New to Shelf?{" "}
        <Link
          href="/signup"
          className="font-medium text-forest hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}