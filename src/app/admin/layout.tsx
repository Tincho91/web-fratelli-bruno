import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";

export const metadata = {
  title: "Panel Administrativo | Fratelli Bruno",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    redirect("/auth/login");
  }

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <div className="min-h-screen bg-old-paper/60 pt-20">
      <header className="border-b border-sepia/20 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sepia">Fratelli Bruno</p>
            <h1 className="text-xl font-semibold text-ink">Panel de gestión</h1>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium text-ink/80">
            <Link href="/admin" className="rounded-full px-4 py-2 transition hover:bg-sepia/10">
              Inicio
            </Link>
            <Link href="/admin/posts/new" className="rounded-full bg-sepia px-4 py-2 text-old-paper transition hover:bg-ink">
              Nuevo artículo
            </Link>
            <form action={handleSignOut}>
              <button className="rounded-full border border-sepia/20 px-4 py-2 transition hover:bg-ink hover:text-old-paper" type="submit">
                Cerrar sesión
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
