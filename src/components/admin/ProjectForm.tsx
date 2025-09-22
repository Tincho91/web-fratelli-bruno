"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectFormProps {
  initialData?: {
    id: string;
    description: string;
    showcaseDate: string;
    mainImageUrl: string;
    mainImageKey: string | null;
    secondaryImageUrl: string | null;
    secondaryImageKey: string | null;
    relatedPostId: string | null;
  };
  posts: Array<{
    id: string;
    title: string;
    slug: string;
  }>;
  mode: "create" | "edit";
}

function formatDateInput(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "projects");

  const response = await fetch("/api/uploads/image", {
    method: "POST",
    body: formData,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((payload as { error?: string }).error ?? "Impossibile caricare l'immagine");
  }

  const data = (payload as { data?: { url?: string; publicId?: string } }).data ?? {};

  if (!data.url) {
    throw new Error("Risposta del server non valida");
  }

  return {
    url: data.url as string,
    key: (data.publicId as string | undefined) ?? null,
  };
}

export default function ProjectForm({ initialData, posts, mode }: ProjectFormProps) {
  const router = useRouter();

  const [description, setDescription] = useState(initialData?.description ?? "");
  const [showcaseDate, setShowcaseDate] = useState(formatDateInput(initialData?.showcaseDate));
  const [relatedPostId, setRelatedPostId] = useState(initialData?.relatedPostId ?? "");
  const [mainImageUrl, setMainImageUrl] = useState(initialData?.mainImageUrl ?? "");
  const [mainImageKey, setMainImageKey] = useState(initialData?.mainImageKey ?? "");
  const [secondaryImageUrl, setSecondaryImageUrl] = useState(initialData?.secondaryImageUrl ?? "");
  const [secondaryImageKey, setSecondaryImageKey] = useState(initialData?.secondaryImageKey ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploadingMain, setIsUploadingMain] = useState(false);
  const [isUploadingSecondary, setIsUploadingSecondary] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isValid = useMemo(() => {
    return description.trim().length >= 10 && mainImageUrl.trim().length > 0 && showcaseDate.trim().length > 0;
  }, [description, mainImageUrl, showcaseDate]);

  async function handleMainImageUpload(file: File) {
    setError(null);
    setMessage(null);

    if (!file.type.startsWith("image/")) {
      setError("Seleziona un file immagine valido");
      return;
    }

    setIsUploadingMain(true);

    try {
      const uploaded = await uploadImage(file);
      setMainImageUrl(uploaded.url);
      setMainImageKey(uploaded.key ?? "");
      setMessage("Immagine principale caricata");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Errore nel caricamento dell'immagine principale");
    } finally {
      setIsUploadingMain(false);
    }
  }

  async function handleSecondaryImageUpload(file: File) {
    setError(null);
    setMessage(null);

    if (!file.type.startsWith("image/")) {
      setError("Seleziona un file immagine valido");
      return;
    }

    setIsUploadingSecondary(true);

    try {
      const uploaded = await uploadImage(file);
      setSecondaryImageUrl(uploaded.url);
      setSecondaryImageKey(uploaded.key ?? "");
      setMessage("Immagine secondaria caricata");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Errore nel caricamento dell'immagine secondaria");
    } finally {
      setIsUploadingSecondary(false);
    }
  }

  function normalizeDate(value: string) {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return new Date().toISOString();
    }
    return parsed.toISOString();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!isValid) {
      setError("Completa i campi obbligatori e la data valida");
      return;
    }

    setIsSaving(true);

    try {
      const body = {
        description,
        showcaseDate: normalizeDate(showcaseDate),
        mainImageUrl,
        mainImageKey: mainImageKey || null,
        secondaryImageUrl: secondaryImageUrl || null,
        secondaryImageKey: secondaryImageKey || null,
        relatedPostId: relatedPostId || null,
      };

      const endpoint = mode === "create" ? "/api/projects" : `/api/projects/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setError((payload as { error?: string }).error ?? "Impossibile salvare il progetto");
        return;
      }

      setMessage("Progetto salvato correttamente");
      router.push("/admin?tab=projects");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Errore imprevisto durante il salvataggio");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!initialData) return;

    const confirmed = window.confirm("Sei sicuro di voler eliminare questo progetto? L'azione non può essere annullata.");

    if (!confirmed) return;

    setError(null);
    setMessage(null);

    const response = await fetch(`/api/projects/${initialData.id}`, {
      method: "DELETE",
    });

    if (!response.ok && response.status !== 204) {
      const payload = await response.json().catch(() => ({}));
      setError((payload as { error?: string }).error ?? "Impossibile eliminare il progetto");
      return;
    }

    router.push("/admin?tab=projects");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-ink" htmlFor="description">
              Descrizione del progetto (Markdown)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={10}
              required
              className="w-full rounded-xl border border-sepia/30 bg-white/80 px-4 py-3 font-mono text-sm text-ink shadow-sm focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
              placeholder="## Titolo del progetto\nDettaglia attività, risultati e peculiarità..."
            />
            <p className="text-xs text-ink/50">Supportiamo Markdown con liste, link e testo evidenziato.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-ink" htmlFor="showcaseDate">
                Data di riferimento
              </label>
              <input
                type="date"
                id="showcaseDate"
                value={showcaseDate}
                onChange={(event) => setShowcaseDate(event.target.value)}
                required
                className="w-full rounded-xl border border-sepia/30 bg-white/80 px-4 py-3 text-base text-ink shadow-sm focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-ink" htmlFor="relatedPostId">
                Articolo collegato (opzionale)
              </label>
              <select
                id="relatedPostId"
                value={relatedPostId}
                onChange={(event) => setRelatedPostId(event.target.value)}
                className="w-full rounded-xl border border-sepia/30 bg-white/80 px-4 py-3 text-base text-ink shadow-sm focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
              >
                <option value="">Nessun articolo</option>
                {posts.map((post) => (
                  <option key={post.id} value={post.id}>
                    {post.title}
                  </option>
                ))}
              </select>
              <p className="text-xs text-ink/50">Comparirà come &quot;Scopri di più&quot; nella galleria pubblica.</p>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-ink">
              Immagine principale
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) handleMainImageUpload(file);
              }}
              className="w-full rounded-xl border border-dashed border-sepia/30 bg-white/60 px-4 py-3 text-sm text-ink"
            />
            {mainImageUrl && (
              <div className="overflow-hidden rounded-xl border border-sepia/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mainImageUrl} alt="Anteprima immagine principale" className="h-40 w-full object-cover" />
              </div>
            )}
            {isUploadingMain && <p className="text-xs text-ink/50">Caricamento immagine principale...</p>}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-ink">
              Immagine secondaria (opzionale)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) handleSecondaryImageUpload(file);
              }}
              className="w-full rounded-xl border border-dashed border-sepia/30 bg-white/60 px-4 py-3 text-sm text-ink"
            />
            {secondaryImageUrl && (
              <div className="overflow-hidden rounded-xl border border-sepia/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={secondaryImageUrl} alt="Anteprima immagine secondaria" className="h-32 w-full object-cover" />
              </div>
            )}
            {secondaryImageUrl && (
              <button
                type="button"
                onClick={() => {
                  setSecondaryImageUrl("");
                  setSecondaryImageKey("");
                }}
                className="text-xs font-semibold text-red-600 hover:text-red-700"
              >
                Rimuovi immagine secondaria
              </button>
            )}
            {isUploadingSecondary && <p className="text-xs text-ink/50">Caricamento immagine secondaria...</p>}
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={!isValid || isSaving}
              className="w-full rounded-xl bg-sepia px-4 py-3 text-sm font-semibold text-old-paper transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sepia disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Salvataggio..." : mode === "create" ? "Pubblica progetto" : "Salva modifiche"}
            </button>
            {mode === "edit" && (
              <button
                type="button"
                onClick={handleDelete}
                className="w-full rounded-xl border border-red-300 bg-white/80 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Elimina progetto
              </button>
            )}
            {message && <p className="text-xs font-semibold text-emerald-600">{message}</p>}
            {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
          </div>
        </aside>
      </section>
    </form>
  );
}

