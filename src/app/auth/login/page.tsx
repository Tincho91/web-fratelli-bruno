import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Acceso Administrador | Fratelli Bruno",
  description:
    "Panel privado para gestionar artículos, proyectos y contenidos de FRATELLI BRUNO Francesco e Carlo & C. S.n.c.",
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
        <h1 className="text-3xl font-bold text-ink">Acceso a la plataforma</h1>
        <p className="mt-2 text-sm text-ink/70">
          Inicia sesión para publicar noticias, registrar proyectos y mantener actualizada la presencia digital de Fratelli Bruno.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
