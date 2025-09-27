import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/blog";

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
  if (!value) return "Non pubblicato";
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
}

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const session = await auth();
  const post = await getPostBySlug(slug, session?.user?.role === "ADMIN");

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Fratelli Bruno`,
    description: post.excerpt ?? post.title,
  };
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
  const { slug } = await params;
  const session = await auth();
  const post = await getPostBySlug(slug, session?.user?.role === "ADMIN");

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="relative isolate">
        <div className="absolute inset-0 bg-old-paper/60" aria-hidden />
        <div className="relative mx-auto max-w-4xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
          <header className="space-y-4 text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-sepia/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sepia">
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
            <h1 className="text-4xl font-bold text-ink sm:text-5xl">{post.title}</h1>
            <div className="flex flex-col items-center gap-1 text-sm text-ink/70">
              <p>Di {post.author?.name ?? "Team Fratelli Bruno"}</p>
              <time dateTime={post.publishedAt?.toISOString() ?? undefined}>{formatDate(post.publishedAt)}</time>
              {post.status !== "PUBLISHED" && session?.user?.role === "ADMIN" && (
                <span className="rounded-full bg-yellow-200/70 px-3 py-1 text-xs font-semibold text-ink">
                  Bozza visibile solo agli amministratori
                </span>
              )}
            </div>
          </header>

          {post.coverImageUrl && (
            <div className="relative overflow-hidden rounded-3xl border border-sepia/20 bg-white/70 shadow-md">
              <div className="relative h-[360px] w-full sm:h-[420px]">
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          <section className="prose prose-lg prose-neutral mx-auto max-w-none prose-headings:text-ink prose-strong:text-ink prose-a:text-sepia">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </section>
        </div>
      </article>
    </>
  );
}



