"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    setIsLoading(true);
    setMessage("");
    setError("");

    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to log in.");
        return;
      }

      setMessage(data.message);

      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <GoogleAuthButton label="Continue with Google" />

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink-faint">
          Email
        </span>

        <span className="relative block">
          <Mail
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
            aria-hidden="true"
          />

          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-line bg-paper py-3 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-forest focus:outline-none"
          />
        </span>
      </label>

      <label className="block">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
            Password
          </span>

          <Link
            href="/forgot-password"
            className="text-xs font-medium text-forest hover:underline"
          >
            Forgot?
          </Link>
        </div>

        <span className="relative block">
          <LockKeyhole
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
            aria-hidden="true"
          />

          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            className="w-full rounded-lg border border-line bg-paper py-3 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-forest focus:outline-none"
          />
        </span>
      </label>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {message && (
        <p className="text-sm text-forest" role="status">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-forest py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Logging in..." : "Log In"}
        {!isLoading && <ArrowRight size={16} aria-hidden="true" />}
      </button>
    </form>
  );
}
