import PostForm from "@/components/admin/PostForm";

export const metadata = {
  title: "Nuevo artículo | Panel Fratelli Bruno",
};

export default function NewPostPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-sepia">Publicaciones</p>
        <h1 className="text-3xl font-semibold text-ink">Crear nuevo artículo</h1>
        <p className="text-sm text-ink/60">
          Comparte novedades sobre turismo, consultoría, restauración o proyectos inmobiliarios.
        </p>
      </header>

      <PostForm mode="create" />
    </div>
  );
}
