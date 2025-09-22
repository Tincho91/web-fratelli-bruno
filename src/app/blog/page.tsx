import Image from "next/image";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";

export const metadata = {
  title: "Notizie e Blog | Fratelli Bruno",
  description:
    "Aggiornamenti su progetti turistici, gastronomici e immobiliari di Fratelli Bruno Francesco e Carlo & C. S.n.c.",
};

const CATEGORY_LABELS: Record<string, string> = {
  TOURISM: "Turismo",
  HOSPITALITY: "Ospitalità",
  RESTAURANT: "Ristorazione",
  REAL_ESTATE: "Immobiliare",
  CONSTRUCTION: "Costruzioni",
  CONSULTING: "Consulenza",
  NEWS: "Notizie",
};

function formatDate(value?: Date | null) {
  if (!value) return "Prossimamente";
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
}

function getExcerpt(text?: string | null) {
  if (!text) {
    return "Scopri come evolvono i nostri servizi integrati in turismo, costruzioni e gestione immobiliare.";
  }
  const sanitized = text.replace(/\s+/g, " ").trim();
  if (sanitized.length <= 160) return sanitized;
  return `${sanitized.slice(0, 157).trimEnd()}…`;
}

export default async function BlogPage() {
  const posts = await getPublishedPosts(24);

  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-old-paper/60 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        <section className="space-y-6 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-sepia/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.4em] text-sepia">
            Blog e Notizie
          </p>
          <h1 className="text-4xl font-bold text-ink sm:text-5xl">Storie che costruiscono destinazioni</h1>
          <p className="mx-auto max-w-3xl text-lg text-ink/80">
            Scopri come FRATELLI BRUNO Francesco e Carlo & C. S.n.c. promuove ospitalità, ristorazione e sviluppo immobiliare in ogni progetto. Condividiamo novità, approfondimenti tecnici e trend del settore turistico.
          </p>
        </section>

        <section className="grid gap-10 sm:grid-cols-2">
          {posts.length === 0 && (
            <div className="col-span-full rounded-3xl border border-sepia/20 bg-old-paper/60 px-8 py-16 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-ink">Presto condivideremo le nostre novità</h2>
              <p className="mt-4 mx-auto max-w-2xl text-sm text-ink/70">
                Stiamo preparando contenuti su nuove aperture, consulenze strategiche e progetti immobiliari in corso. Torna a trovarci oppure contattaci per ricevere aggiornamenti dedicati.
              </p>
            </div>
          )}

          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sepia/20 bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-sepia/10 to-sepia/20">
                {post.coverImageUrl ? (
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-[0.3em] text-sepia">
                    {CATEGORY_LABELS[post.category] ?? post.category}
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-old-paper/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sepia">
                  {CATEGORY_LABELS[post.category] ?? post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-5 p-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-ink/60">
                  <span>{post.author?.name ?? "Team Fratelli Bruno"}</span>
                  <time dateTime={post.publishedAt?.toISOString() ?? undefined}>{formatDate(post.publishedAt)}</time>
                </div>
                <h3 className="text-2xl font-semibold text-ink transition group-hover:text-sepia">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-sm leading-relaxed text-ink/70">{getExcerpt(post.excerpt)}</p>
                <div className="mt-auto flex items-center justify-between pt-2 text-sm font-semibold text-sepia">
                  <span>Leggi la storia</span>
                  <span aria-hidden="true">→</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
