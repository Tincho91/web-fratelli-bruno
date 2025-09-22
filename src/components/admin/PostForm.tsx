"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORY_OPTIONS = [
  { value: "NEWS", label: "Notizie aziendali" },
  { value: "TOURISM", label: "Turismo" },
  { value: "HOSPITALITY", label: "Ospitalità" },
  { value: "RESTAURANT", label: "Ristorazione" },
  { value: "REAL_ESTATE", label: "Immobiliare" },
  { value: "CONSTRUCTION", label: "Costruzioni" },
  { value: "CONSULTING", label: "Consulenza" },
] as const;

const STATUS_OPTIONS = [
  { value: "DRAFT", label: "Bozza" },
  { value: "PUBLISHED", label: "Pubblicato" },
] as const;

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface PostFormProps {
  initialData?: {
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    category: string;
    status: string;
    coverImageUrl: string | null;
    coverImageKey: string | null;
  };
  mode: "create" | "edit";
}

export default function PostForm({ initialData, mode }: PostFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "NEWS");
  const [status, setStatus] = useState(initialData?.status ?? "DRAFT");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.coverImageUrl ?? "");
  const [coverImageKey, setCoverImageKey] = useState(initialData?.coverImageKey ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (mode === "create") {
      setSlug(slugify(title));
    }
  }, [title, mode]);

  const isValid = useMemo(() => {
    return title.trim().length >= 3 && slug.trim().length >= 3 && content.trim().length >= 50;
  }, [title, slug, content]);

  async function handleUpload(file: File) {
    setError(null);
    setMessage(null);

    if (!file.type.startsWith("image/")) {
      setError("Seleziona un file immagine valido");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "blog");

      const response = await fetch("/api/uploads/image", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error((payload as { error?: string }).error ?? "Impossibile caricare l'immagine");
      }

      const data = (payload as { data?: { url?: string; publicId?: string } }).data ?? {};

      setCoverImageKey(data.publicId ?? "");
      setCoverImageUrl(data.url ?? "");
      setMessage("Immagine caricata correttamente");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Si e verificato un errore durante il caricamento dell'immagine");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!isValid) {
      setError("Controlla i campi obbligatori e il contenuto minimo (50 caratteri)");
      return;
    }

    setIsSaving(true);

    try {
      const body = {
        title,
        slug,
        excerpt: excerpt || null,
        category,
        status,
        content,
        coverImageUrl: coverImageUrl || null,
        coverImageKey: coverImageKey || null,
        publishedAt: status === "PUBLISHED" ? new Date().toISOString() : null,
      };

      const endpoint = mode === "create" ? "/api/posts" : `/api/posts/${initialData?.slug}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setError((payload as { error?: string }).error ?? "Impossibile salvare l'articolo");
        return;
      }

      setMessage("Articolo salvato correttamente");
      router.push("/admin");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Errore imprevisto durante il salvataggio");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!initialData) return;

    const confirmed = window.confirm("Sei sicuro di voler eliminare questo articolo? L'azione non puo essere annullata.");

    if (!confirmed) return;

    setError(null);
    setMessage(null);

    const response = await fetch(`/api/posts/${initialData.slug}`, {
      method: "DELETE",
    });

    if (!response.ok && response.status !== 204) {
      const payload = await response.json().catch(() => ({}));
      setError((payload as { error?: string }).error ?? "Impossibile eliminare l'articolo");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-ink" htmlFor="title">
              Titolo
            </label>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              className="w-full rounded-xl border border-sepia/30 bg-white/80 px-4 py-3 text-base text-ink shadow-sm focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
              placeholder="Nuove suite fronte lago"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-ink" htmlFor="slug">
              Slug (URL)
            </label>
            <input
              id="slug"
              value={slug}
              onChange={(event) => setSlug(slugify(event.target.value))}
              required
              className="w-full rounded-xl border border-sepia/30 bg-white/80 px-4 py-3 text-base text-ink shadow-sm focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
              placeholder="nuove-suite-fronte-lago"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-ink" htmlFor="excerpt">
              Riassunto breve
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              rows={3}
              className="w-full rounded-xl border border-sepia/30 bg-white/80 px-4 py-3 text-base text-ink shadow-sm focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
              placeholder="Presentiamo l'espansione del complesso con spazi di ristorazione rinnovati."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-ink" htmlFor="content">
              Contenuto (Markdown)
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={16}
              required
              className="w-full rounded-xl border border-sepia/30 bg-white/80 px-4 py-3 font-mono text-sm text-ink shadow-sm focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
              placeholder={"## Titolo\nDescrivi il progetto, i servizi e i risultati ottenuti..."}
            />
            <p className="text-xs text-ink/50">Puoi usare il formato Markdown con tabelle, elenchi e link.</p>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-ink" htmlFor="category">
              Categoria
            </label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-sepia/30 bg-white/80 px-4 py-3 text-base text-ink shadow-sm focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-ink" htmlFor="status">
              Stato
            </label>
            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-xl border border-sepia/30 bg-white/80 px-4 py-3 text-base text-ink shadow-sm focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-ink/50">
              Gli articoli pubblicati compaiono automaticamente sul sito pubblico.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-ink">
              Immagine di copertina (facoltativa)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) handleUpload(file);
              }}
              className="w-full rounded-xl border border-dashed border-sepia/30 bg-white/60 px-4 py-3 text-sm text-ink"
            />
            {coverImageUrl && (
              <div className="overflow-hidden rounded-xl border border-sepia/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImageUrl} alt="Copertina" className="h-40 w-full object-cover" />
              </div>
            )}
            {isUploading && <p className="text-xs text-ink/50">Caricamento immagine...</p>}
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={!isValid || isSaving}
              className="w-full rounded-xl bg-sepia px-4 py-3 text-sm font-semibold text-old-paper transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sepia disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Salvataggio..." : mode === "create" ? "Pubblica articolo" : "Salva modifiche"}
            </button>
            {mode === "edit" && (
              <button
                type="button"
                onClick={handleDelete}
                className="w-full rounded-xl border border-red-300 bg-white/80 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Elimina articolo
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

