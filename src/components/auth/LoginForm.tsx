"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full rounded-xl bg-sepia px-4 py-3 text-base font-semibold text-old-paper transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sepia disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
    >
      {pending ? "Ingresando..." : "Ingresar"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(authenticate, { error: "" });

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-ink">
          Correo electronico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-sepia/30 bg-white/70 px-4 py-3 text-base text-ink shadow-sm focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/40"
          placeholder="admin@fratellibruno.it"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-semibold text-ink">
          Contrasena
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-xl border border-sepia/30 bg-white/70 px-4 py-3 text-base text-ink shadow-sm focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/40"
          placeholder="********"
        />
      </div>

      {state.error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
