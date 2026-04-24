"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

type SignupStatus = {
  kind: "error" | "success";
  message: string;
} | null;

const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function SignUpPage() {
  const [status, setStatus] = useState<SignupStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const verifyPassword = String(formData.get("verifyPassword") ?? "");
    const name = String(formData.get("name") ?? "").trim();

    if (!name) {
      setStatus({ kind: "error", message: "Please enter your display name." });
      return;
    }

    if (!emailPattern.test(email)) {
      setStatus({ kind: "error", message: "Please enter a valid email address." });
      return;
    }

    if (password.length < 8) {
      setStatus({ kind: "error", message: "Password must be at least 8 characters long." });
      return;
    }

    if (password !== verifyPassword) {
      setStatus({ kind: "error", message: "Passwords do not match." });
      return;
    }

    setIsSubmitting(true);

    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          callbackURL: "/signin",
        },
        {
          onSuccess() {
            form.reset();
            setStatus({
              kind: "success",
              message: "Account created successfully. You can sign in now.",
            });
          },
          onError(error) {
            setStatus({
              kind: "error",
              message: error.error.message || "Signup failed. Please try again.",
            });
          },
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
      </div>

      <div className="relative grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-cyan-200 backdrop-blur">
            SmartHome Access
          </div>

          <div className="space-y-4">
            <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Create a clean account for your SmartHome dashboard.
            </h1>
            <p className="max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
              Set up your profile once, then jump straight into device control, room views,
              and live home monitoring.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <p className="text-sm font-medium text-white">Fast setup</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">Create your account in under a minute.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <p className="text-sm font-medium text-white">Secure sign up</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">Email and password validation is built in.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <p className="text-sm font-medium text-white">Personalized</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">Add a display name for your profile.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-transparent to-emerald-500/20 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white/10 bg-zinc-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
            <div className="mb-8 space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
                Start here
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-white">Sign up</h2>
              <p className="text-sm leading-6 text-zinc-400">
                Fill in your details below and create your SmartHome account.
              </p>
            </div>

            <form className="space-y-5" onSubmit={signup}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-200">
                  Display name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Jensen"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-200">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-zinc-200">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    minLength={8}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="verifyPassword" className="text-sm font-medium text-zinc-200">
                    Verify password
                  </label>
                  <input
                    id="verifyPassword"
                    name="verifyPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    minLength={8}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                  />
                </div>
              </div>

              {status ? (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    status.kind === "error"
                      ? "border-rose-500/30 bg-rose-500/10 text-rose-200"
                      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                  }`}
                >
                  {status.message}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3.5 font-semibold text-zinc-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link href="/signin" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}