import AdminDashboardTabs from "@/components/admin/AdminDashboardTabs";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";

type PostResult = Awaited<ReturnType<typeof getAllPosts>>[number];
type ProjectResult = Awaited<ReturnType<typeof getAllProjects>>[number];

interface AdminDashboardPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function AdminDashboardPage({ searchParams }: AdminDashboardPageProps) {
  const { tab } = await searchParams;

  const [posts, projects] = await Promise.all([getAllPosts(), getAllProjects()]);

  const serializedPosts = posts.map((post: PostResult) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    status: post.status,
    category: post.category,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    updatedAt: post.updatedAt.toISOString(),
  }));

  const serializedProjects = projects.map((project: ProjectResult) => ({
    id: project.id,
    description: project.description,
    showcaseDate: project.showcaseDate.toISOString(),
    mainImageUrl: project.mainImageUrl,
    secondaryImageUrl: project.secondaryImageUrl,
    relatedPost: project.relatedPost
      ? {
          slug: project.relatedPost.slug,
          title: project.relatedPost.title,
        }
      : null,
    updatedAt: project.updatedAt.toISOString(),
  }));

  return (
    <div className="relative isolate min-h-screen overflow-hidden px-4 py-24 sm:px-6 lg:px-10">
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/82 to-black/92" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(85%_60%_at_18%_22%,rgba(247,227,125,0.18),transparent_65%)] opacity-60" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_15%,rgba(116,104,255,0.2),transparent_70%)] opacity-55" aria-hidden />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12">
        <header className="space-y-3">
          <span className="text-xs uppercase tracking-[0.5em] text-muted">Console operativa</span>
          <h1 className="text-4xl font-heading uppercase tracking-tight text-foreground">Pannello di controllo</h1>
          <p className="max-w-2xl text-sm text-foreground/70">
            Monitora pubblicazioni, coordina progetti e mantieni coerente la presenza del brand con l'estetica Fratelli Bruno.
          </p>
        </header>

        <AdminDashboardTabs posts={serializedPosts} projects={serializedProjects} defaultTab={tab} />
      </div>
    </div>
  );
}
