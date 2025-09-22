import GalleryGrid from "@/components/GalleryGrid";
import { getPublishedProjects } from "@/lib/projects";

export const metadata = {
  title: "Progetti | Fratelli Bruno",
  description:
    "Esplora gli interventi turistici, gastronomici e immobiliari realizzati da Fratelli Bruno Francesco e Carlo & C. S.n.c.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();
  const serialized = projects.map((project) => ({
    id: project.id,
    description: project.description,
    mainImageUrl: project.mainImageUrl,
    secondaryImageUrl: project.secondaryImageUrl,
    showcaseDate: project.showcaseDate.toISOString(),
    relatedPost: project.relatedPost
      ? {
          slug: project.relatedPost.slug,
          title: project.relatedPost.title,
        }
      : null,
  }));

  return (
    <div className="relative isolate">
      <div className="absolute inset-0 bg-gradient-to-b from-old-paper/70 via-transparent to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="space-y-6 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-sepia/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-sepia">
            Progetti
          </p>
          <h1 className="text-4xl font-bold text-ink sm:text-5xl">Portfolio di cantieri e aperture</h1>
          <p className="mx-auto max-w-3xl text-lg text-ink/80">
            Una selezione di sviluppi alberghieri, ristrutturazioni e concept gastronomici coordinati dal team Fratelli Bruno.
            Ogni progetto racchiude consulenza tecnica, gestione operativa e cura del dettaglio.
          </p>
        </section>

        <section className="mt-16">
          {serialized.length > 0 ? (
            <GalleryGrid projects={serialized} />
          ) : (
            <div className="rounded-3xl border border-sepia/20 bg-white/80 px-8 py-16 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-ink">Nuovi progetti in arrivo</h2>
              <p className="mt-3 text-sm text-ink/70">
                Stiamo preparando aggiornamenti fotografici sui cantieri più recenti. Torna presto per scoprirli.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
