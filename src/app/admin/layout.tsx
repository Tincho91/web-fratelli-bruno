import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";

export const metadata = {
  title: "Pannello Amministrativo | Fratelli Bruno",
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
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
