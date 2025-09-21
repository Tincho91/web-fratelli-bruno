import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/blog";

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
  if (!value) return "Sin publicar";
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
}

interface BlogPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPageProps) {
  const session = await auth();
  const post = await getPostBySlug(params.slug, session?.user?.role === "ADMIN");

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Fratelli Bruno`,
    description: post.excerpt ?? post.title,
  };
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
  const session = await auth();
  const post = await getPostBySlug(params.slug, session?.user?.role === "ADMIN");

  if (!post) {
    notFound();
  }

  return (
    <article className="relative isolate">
      <div className="absolute inset-0 bg-old-paper/50" aria-hidden />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="space-y-6 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-sepia/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-sepia">
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-ink">
            {post.title}
          </h1>
          <div className="flex flex-col items-center gap-1 text-sm text-ink/70">
            <p>Por {post.author?.name ?? "Equipo Fratelli"}</p>
            <time dateTime={post.publishedAt?.toISOString() ?? undefined}>
              {formatDate(post.publishedAt)}
            </time>
            {post.status !== "PUBLISHED" && session?.user?.role === "ADMIN" && (
              <span className="rounded-full bg-yellow-200/70 px-3 py-1 text-xs font-semibold text-ink">
                Borrador visible solo para administradores
              </span>
            )}
          </div>
        </header>

        {post.coverImageUrl && (
          <div className="relative my-10 overflow-hidden rounded-3xl border border-sepia/20 bg-old-paper shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full max-h-[420px] object-cover"
            />
          </div>
        )}

        <section className="prose prose-neutral mx-auto max-w-none prose-headings:text-ink prose-strong:text-ink prose-a:text-sepia">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </section>
      </div>
    </article>
  );
}
