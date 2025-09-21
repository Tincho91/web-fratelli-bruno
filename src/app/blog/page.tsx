/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";

export const metadata = {
  title: "Noticias y Blog | Fratelli Bruno",
  description:
    "Actualizaciones sobre proyectos turísticos, gastronómicos e inmobiliarios de Fratelli Bruno Francesco e Carlo & C. S.n.c.",
};

const CATEGORY_LABELS: Record<string, string> = {
  TOURISM: "Turismo",
  HOSPITALITY: "Hospitalidad",
  RESTAURANT: "Restauración",
  REAL_ESTATE: "Inmobiliaria",
  CONSTRUCTION: "Construcción",
  CONSULTING: "Consultoría",
  NEWS: "Noticias",
};

function formatDate(value?: Date | null) {
  if (!value) return "Próximamente";
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
}

export default async function BlogPage() {
  const posts = await getPublishedPosts(24);

  return (
    <div className="relative isolate">
      <div className="absolute inset-0 bg-gradient-to-b from-old-paper/60 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section className="text-center space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-sepia/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-sepia">
            Blog y Noticias
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-ink">Historias que construyen destinos</h1>
          <p className="max-w-3xl mx-auto text-lg text-ink/80">
            Conoce cómo FRATELLI BRUNO Francesco e Carlo & C. s.n.c. impulsa la hospitalidad, la restauración y el desarrollo inmobiliario en cada proyecto. Compartimos novedades, aprendizajes técnicos y tendencias del sector turístico.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          {posts.length === 0 && (
            <div className="col-span-full text-center border border-sepia/20 rounded-xl bg-old-paper/40 px-6 py-16">
              <h2 className="text-2xl font-semibold text-ink">Pronto compartiremos nuestras novedades</h2>
              <p className="mt-4 text-ink/70 max-w-2xl mx-auto">
                Estamos preparando contenidos sobre nuevas aperturas, consultorías estratégicas y proyectos inmobiliarios en curso. Vuelve pronto o contáctanos para recibir noticias personalizadas.
              </p>
            </div>
          )}

          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-sepia/20 bg-old-paper/60 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {post.coverImageUrl ? (
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-old-paper/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sepia">
                    {CATEGORY_LABELS[post.category] ?? post.category}
                  </span>
                </div>
              ) : (
                <div className="flex h-56 items-center justify-center bg-gradient-to-br from-sepia/10 to-sepia/20">
                  <span className="text-sm font-semibold uppercase tracking-widest text-sepia">
                    {CATEGORY_LABELS[post.category] ?? post.category}
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between text-sm text-ink/60">
                  <span>{post.author?.name ?? "Equipo Fratelli"}</span>
                  <time dateTime={post.publishedAt?.toISOString() ?? undefined}>{formatDate(post.publishedAt)}</time>
                </div>
                <h3 className="text-2xl font-semibold text-ink transition group-hover:text-sepia">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="flex-1 text-ink/70">{post.excerpt ?? "Descubre cómo evolucionan nuestros servicios integrales en turismo, construcción y gestión inmobiliaria."}</p>
                <div className="flex items-center justify-between pt-4 text-sm font-semibold text-sepia">
                  <span>Leer historia</span>
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

