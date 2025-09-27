import AdminDashboardTabs from "@/components/admin/AdminDashboardTabs";
import { prisma } from "@/lib/prisma";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { InteractionType } from "@prisma/client";

interface AdminDashboardPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function AdminDashboardPage({ searchParams }: AdminDashboardPageProps) {
  const { tab } = await searchParams;

  const [siteVisits, articleViews, projectViews, contactInteractions, posts, projects] = await Promise.all([
    prisma.interactionEvent.count({ where: { type: InteractionType.SITE_VISIT } }),
    prisma.interactionEvent.count({ where: { type: InteractionType.ARTICLE_VIEW } }),
    prisma.interactionEvent.count({ where: { type: InteractionType.PROJECT_VIEW } }),
    prisma.interactionEvent.count({
      where: {
        type: {
          in: [InteractionType.CONTACT_FORM, InteractionType.CONTACT_EMAIL, InteractionType.CONTACT_PHONE],
        },
      },
    }),
    getAllPosts(),
    getAllProjects(),
  ]);

  const stats = {
    siteVisits,
    articleViews,
    projectViews,
    contactInteractions,
  };

  const serializedPosts = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    status: post.status,
    category: post.category,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    updatedAt: post.updatedAt.toISOString(),
    interactionCount: post._count?.interactionEvents ?? 0,
  }));

  const serializedProjects = projects.map((project) => ({
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
    interactionCount: project._count?.interactionEvents ?? 0,
  }));

  return (
    <div className="space-y-10">
      <AdminDashboardTabs stats={stats} posts={serializedPosts} projects={serializedProjects} defaultTab={tab} />
    </div>
  );
}
