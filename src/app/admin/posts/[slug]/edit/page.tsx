import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { prisma } from "@/lib/prisma";

interface EditPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const metadata = {
  title: "Modifica articolo | Pannello Fratelli Bruno",
};

export default async function EditPostPage({ params }: EditPageProps) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      category: true,
      status: true,
      coverImageUrl: true,
      coverImageKey: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-sepia">Pubblicazioni</p>
        <h1 className="text-3xl font-semibold text-ink">Modifica articolo</h1>
        <p className="text-sm text-ink/60">Aggiorna le informazioni pubblicate e salva di nuovo quando hai finito.</p>
      </header>

      <PostForm mode="edit" initialData={post} />
    </div>
  );
}