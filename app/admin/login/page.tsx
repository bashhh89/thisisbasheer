"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 mb-10">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="h-px w-10 bg-ink-700" />
          <span>Cockpit</span>
        </div>
        <h1 className="font-serif text-4xl text-ink-50 tracking-tight mb-12">
          basheer.app
        </h1>
        <form action={formAction} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block font-mono text-[10px] uppercase tracking-eyebrow text-ink-500 mb-3"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              required
              className="w-full bg-transparent border border-ink-800 px-4 py-3 text-ink-100 focus:border-accent focus:outline-none transition-colors duration-300"
            />
          </div>
          {state?.error && (
            <p className="font-mono text-xs text-red-400">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="w-full border border-accent/60 text-accent font-mono text-[11px] uppercase tracking-eyebrow py-3 hover:bg-accent hover:text-ink-950 transition-colors duration-300 disabled:opacity-50"
          >
            {pending ? "Verifying…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
