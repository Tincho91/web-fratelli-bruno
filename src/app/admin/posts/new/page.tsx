import PostForm from "@/components/admin/PostForm";

export const metadata = {
  title: "Nuovo articolo | Pannello Fratelli Bruno",
};

export default function NewPostPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-sepia">Pubblicazioni</p>
        <h1 className="text-3xl font-semibold text-ink">Crea un nuovo articolo</h1>
        <p className="text-sm text-ink/60">
          Condividi aggiornamenti su turismo, consulenza, ristorazione o sviluppo immobiliare.
        </p>
      </header>

      <PostForm mode="create" />
    </div>
  );
}