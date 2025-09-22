import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Accesso Amministratore | Fratelli Bruno",
  description:
    "Area riservata per gestire articoli, progetti e contenuti di FRATELLI BRUNO Francesco e Carlo & C. S.n.c.",
};

export default async function LoginPage() {
  const session = await auth();

  if (session?.user?.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-old-paper/80 via-white to-old-paper/60" aria-hidden />
      <div className="relative w-full max-w-md rounded-3xl border border-sepia/20 bg-white/90 p-10 shadow-2xl">
        <h1 className="text-3xl font-bold text-ink">Accesso alla piattaforma</h1>
        <p className="mt-2 text-sm text-ink/70">
          Accedi per pubblicare notizie, registrare progetti e mantenere aggiornata la presenza digitale di Fratelli Bruno.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}