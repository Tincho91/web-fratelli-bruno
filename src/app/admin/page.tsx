import Link from "next/link";
import { prisma } from "@/lib/prisma";

function formatDate(date?: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AdminDashboardPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: [{ updatedAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      category: true,
      publishedAt: true,
      updatedAt: true,
    },
  });

  const published = posts.filter((post) => post.status === "PUBLISHED").length;
  const drafts = posts.filter((post) => post.status === "DRAFT").length;

  return (
    <div className="space-y-10">
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-sepia/20 bg-white/80 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-sepia">Artículos publicados</p>
          <p className="mt-3 text-4xl font-semibold text-ink">{published}</p>
          <p className="mt-2 text-sm text-ink/60">
            Historias visibles actualmente en el sitio web.
          </p>
        </div>
        <div className="rounded-2xl border border-sepia/20 bg-white/80 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-sepia">Borradores activos</p>
          <p className="mt-3 text-4xl font-semibold text-ink">{drafts}</p>
          <p className="mt-2 text-sm text-ink/60">
            Ideas en preparación antes de publicarlas.
          </p>
        </div>
        <div className="rounded-2xl border border-sepia/20 bg-white/80 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-sepia">Total</p>
          <p className="mt-3 text-4xl font-semibold text-ink">{posts.length}</p>
          <p className="mt-2 text-sm text-ink/60">Publicaciones registradas en la plataforma.</p>
        </div>
      </section>

      <section className="rounded-3xl border border-sepia/20 bg-white/80 shadow-sm">
        <div className="flex items-center justify-between border-b border-sepia/10 px-6 py-4">
          <h2 className="text-lg font-semibold text-ink">Historial de artículos</h2>
          <Link href="/admin/posts/new" className="rounded-full bg-sepia px-4 py-2 text-sm font-semibold text-old-paper transition hover:bg-ink">
            Nuevo artículo
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-sepia/10">
            <thead className="bg-old-paper/70">
              <tr className="text-left text-xs font-semibold uppercase tracking-widest text-ink/70">
                <th className="px-6 py-3">Título</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Categoría</th>
                <th className="px-6 py-3">Publicado</th>
                <th className="px-6 py-3">Actualizado</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sepia/10">
              {posts.map((post) => (
                <tr key={post.id} className="text-sm text-ink/80">
                  <td className="px-6 py-4 font-semibold text-ink">{post.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                        post.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.status === "PUBLISHED" ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{post.category}</td>
                  <td className="px-6 py-4">{formatDate(post.publishedAt)}</td>
                  <td className="px-6 py-4">{formatDate(post.updatedAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-sepia hover:text-ink" target="_blank">
                        Ver
                      </Link>
                      <Link href={`/admin/posts/${post.slug}/edit`} className="text-sm font-semibold text-ink hover:text-sepia">
                        Editar
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-ink/60">
                    Aún no se registran artículos. Usa el botón «Nuevo artículo» para comenzar.
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

