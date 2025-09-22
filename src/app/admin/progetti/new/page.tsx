import ProjectForm from "@/components/admin/ProjectForm";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Nuovo progetto | Pannello Fratelli Bruno",
};

export default async function NewProjectPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { title: "asc" },
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-sepia">Progetti</p>
        <h1 className="text-3xl font-semibold text-ink">Carica un nuovo progetto</h1>
        <p className="text-sm text-ink/60">Aggiungi immagini, descrizione e data per aggiornare la galleria.</p>
      </header>

      <ProjectForm mode="create" posts={posts} />
    </div>
  );
}
