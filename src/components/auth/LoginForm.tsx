"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full rounded-full border border-border/60 bg-transparent px-5 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-foreground transition-all duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
      disabled={pending}
    >
      {pending ? "Accesso in corso..." : "Accedi"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(authenticate, { error: "" });

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-xs uppercase tracking-[0.4em] text-foreground/70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-2xl border border-border/60 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 shadow-[0_18px_36px_rgba(0,0,0,0.45)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 md:text-base"
          placeholder="admin@fratellibruno.it"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-xs uppercase tracking-[0.4em] text-foreground/70">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-2xl border border-border/60 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 shadow-[0_18px_36px_rgba(0,0,0,0.45)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 md:text-base"
          placeholder="********"
        />
      </div>

      {state.error && (
        <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-100">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
