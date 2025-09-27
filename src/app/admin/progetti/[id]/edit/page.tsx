import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
type PostResult = Awaited<ReturnType<typeof getAllPosts>>[number];


interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Modifica progetto | Pannello Fratelli Bruno",
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;

  const [project, posts] = await Promise.all([
    getProjectById(id),
    getAllPosts(),
  ]);

  if (!project) {
    notFound();
  }

  const projectData = {
    id: project.id,
    description: project.description,
    showcaseDate: project.showcaseDate.toISOString(),
    mainImageUrl: project.mainImageUrl,
    mainImageKey: project.mainImageKey,
    secondaryImageUrl: project.secondaryImageUrl,
    secondaryImageKey: project.secondaryImageKey,
    relatedPostId: project.relatedPostId,
  };

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-sepia">Progetti</p>
        <h1 className="text-3xl font-semibold text-ink">Modifica progetto</h1>
        <p className="text-sm text-ink/60">Aggiorna informazioni e immagini, quindi salva le modifiche.</p>
      </header>

      <ProjectForm
        mode="edit"
        posts={posts.map((post: PostResult) => ({ id: post.id, title: post.title, slug: post.slug }))}
        initialData={projectData}
      />
    </div>
  );
}
