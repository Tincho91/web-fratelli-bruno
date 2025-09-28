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
    <div className="relative isolate flex min-h-screen items-center justify-center px-4 pt-36 pb-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-black/88 via-black/80 to-black/90" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_20%_18%,rgba(247,227,125,0.2),transparent_60%)] opacity-65" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(70%_65%_at_78%_22%,rgba(116,104,255,0.22),transparent_68%)] opacity-60" aria-hidden />
      <div className="relative w-full max-w-xl space-y-10 rounded-[2.5rem] border border-border/60 bg-background/80 px-8 py-12 shadow-[0_40px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.5em] text-muted">Area riservata</span>
          <h1 className="text-4xl font-heading uppercase tracking-tight text-foreground">Accesso amministratore</h1>
          <p className="max-w-md text-sm text-foreground/70">
            Gestisci articoli, progetti e contenuti strategici del mondo Fratelli Bruno da un unico pannello operativo.
          </p>
        </div>
        <div className="relative rounded-3xl border border-border/40 bg-background/70 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <LoginForm />
        </div>
        <div className="text-xs uppercase tracking-[0.35em] text-muted/80">
          <p>Supporto interno - operations@fratellibruno.it</p>
          <p>Per assistenza contatta l&apos;ufficio digitale</p>
        </div>
      </div>
    </div>
  );
}
