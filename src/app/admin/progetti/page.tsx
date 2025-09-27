import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
type ProjectResult = Awaited<ReturnType<typeof getAllProjects>>[number];


function formatDate(value: Date) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

export const metadata = {
  title: "Progetti | Pannello Fratelli Bruno",
};

export default async function AdminProjectsPage() {
  const projects: ProjectResult[] = await getAllProjects();

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-sepia">Progetti</p>
          <h1 className="text-3xl font-semibold text-ink">Gestione della galleria</h1>
          <p className="text-sm text-ink/60">Carica nuovi progetti, aggiorna le descrizioni e mantieni aggiornata la vetrina visiva.</p>
        </div>
        <Link
          href="/admin/progetti/new"
          className="inline-flex items-center justify-center rounded-full bg-sepia px-5 py-2 text-sm font-semibold text-old-paper transition hover:bg-ink"
        >
          Nuovo progetto
        </Link>
      </header>

      <section className="overflow-hidden rounded-3xl border border-sepia/20 bg-white/80 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-sepia/10">
            <thead className="bg-old-paper/70">
              <tr className="text-left text-xs font-semibold uppercase tracking-widest text-ink/70">
                <th className="px-6 py-3">Descrizione</th>
                <th className="px-6 py-3">Data</th>
                <th className="px-6 py-3">Ultimo aggiornamento</th>
                <th className="px-6 py-3">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sepia/10">
              {projects.map((project: ProjectResult) => (
                <tr key={project.id} className="text-sm text-ink/80">
                  <td className="px-6 py-4">
                    <p className="max-w-xl max-h-16 overflow-hidden text-ellipsis">{project.description}</p>
                  </td>
                  <td className="px-6 py-4">{formatDate(project.showcaseDate)}</td>
                  <td className="px-6 py-4">{formatDate(project.updatedAt ?? project.createdAt)}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/progetti/${project.id}/edit`} className="text-sm font-semibold text-sepia hover:text-ink">
                      Modifica
                    </Link>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-ink/60">
                    Non ci sono ancora progetti caricati. Usa il pulsante Nuovo progetto per iniziare.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

