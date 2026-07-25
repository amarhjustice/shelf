import Link from "next/link";

export const metadata = { title: "Reset Password — Shelf" };

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">Reset your password</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Enter your email and we&apos;ll send you a link to get back into your library.
      </p>

      <form className="mt-6 space-y-4">
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

        <button
          type="submit"
          className="w-full rounded-md bg-forest py-2.5 text-sm font-semibold text-paper hover:bg-forest-soft"
        >
          Send Reset Link
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Remembered it after all?{" "}
        <Link href="/login" className="font-medium text-forest">
          Back to log in
        </Link>
      </p>
    </div>
  );
}
