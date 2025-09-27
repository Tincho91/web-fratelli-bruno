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
    <div className="space-y-10">
      <AdminDashboardTabs posts={serializedPosts} projects={serializedProjects} defaultTab={tab} />
    </div>
  );
}



