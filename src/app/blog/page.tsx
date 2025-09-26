import { BlogListing } from "@/components/blog/BlogListing";
import { getPublishedPosts } from "@/lib/blog";

export const metadata = {
  title: "Notizie e Blog | Fratelli Bruno",
  description:
    "Aggiornamenti su progetti turistici, gastronomici e immobiliari di Fratelli Bruno Francesco e Carlo & C. S.n.c.",
};

const CATEGORY_LABELS: Record<string, string> = {
  TOURISM: "Turismo",
  HOSPITALITY: "Ospitalita",
  RESTAURANT: "Ristorazione",
  REAL_ESTATE: "Immobiliare",
  CONSTRUCTION: "Costruzioni",
  CONSULTING: "Consulenza",
  NEWS: "Notizie",
};

const FALLBACK_EXCERPT =
  "Scopri come evolvono i nostri servizi integrati in turismo, costruzioni e gestione immobiliare.";

function normalizeExcerpt(value?: string | null) {
  if (!value) return FALLBACK_EXCERPT;
  const sanitized = value.replace(/\s+/g, " ").trim();
  if (sanitized.length <= 160) return sanitized;
  return `${sanitized.slice(0, 157).trimEnd()}.`;
}

export default async function BlogPage() {
  const posts = await getPublishedPosts(48);

  const serialized = posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: normalizeExcerpt(post.excerpt),
    coverImageUrl: post.coverImageUrl,
    category: post.category,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    createdAt: post.createdAt.toISOString(),
  }));

  return (
    <div className="relative isolate">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-old-paper/60 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-6xl space-y-16 px-4 pb-24 pt-40 sm:px-6 lg:px-8">
        <section className="space-y-6 text-center">
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-sepia/20 bg-old-paper/60 px-5 py-2 text-xs uppercase tracking-[0.45em] text-sepia">
            Blog e notizie
          </span>
          <h1 className="text-4xl font-heading uppercase leading-tight text-ink sm:text-5xl">
            Storie che costruiscono destinazioni
          </h1>
          <p className="mx-auto max-w-3xl text-sm text-ink/75 sm:text-base">
            Condividiamo cantieri, strategie operative e idee che accendono hospitality, costruzioni e gestione patrimoniale.
            Approfondisci trend, visioni e metriche che guidano il metodo Fratelli Bruno.
          </p>
        </section>

        <BlogListing posts={serialized} categoryLabels={CATEGORY_LABELS} />
      </div>
    </div>
  );
}
