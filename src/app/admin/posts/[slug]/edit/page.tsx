import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { prisma } from "@/lib/prisma";

interface EditPageProps {
  params: {
    slug: string;
  };
}

export const metadata = {
  title: "Editar artículo | Panel Fratelli Bruno",
};

export default async function EditPostPage({ params }: EditPageProps) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
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
        <p className="text-xs uppercase tracking-[0.3em] text-sepia">Publicaciones</p>
        <h1 className="text-3xl font-semibold text-ink">Editar artículo</h1>
        <p className="text-sm text-ink/60">Actualiza la información publicada y vuelve a guardar cuando finalices.</p>
      </header>

      <PostForm mode="edit" initialData={post} />
    </div>
  );
}
