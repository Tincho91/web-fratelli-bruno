"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnimatePresence, motion } from "framer-motion";

type ProjectItem = {
  id: string;
  description: string;
  mainImageUrl: string;
  secondaryImageUrl?: string | null;
  showcaseDate: string;
  relatedPost?: {
    slug: string;
    title: string;
  } | null;
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function summarize(markdown: string, maxLength = 180) {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~`-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= maxLength) return plain;
  return `${plain.substring(0, maxLength - 1).trimEnd()}…`;
}

function GalleryImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-old-paper/60 to-old-paper/40">
      {!isLoaded && <div className="absolute inset-0 animate-pulse bg-old-paper/80" />}
      <Image
        fill
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        src={src}
        alt={alt}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        onLoadingComplete={() => setIsLoaded(true)}
        priority={priority}
      />
    </div>
  );
}

export default function GalleryGrid({ projects }: { projects: ProjectItem[] }) {
  type EnrichedProject = ProjectItem & { showcaseDateLabel: string; summary: string };
  const [selected, setSelected] = useState<EnrichedProject | null>(null);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelected(null);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [selected]);

  const items = useMemo<EnrichedProject[]>(
    () =>
      projects.map((project) => ({
        ...project,
        showcaseDateLabel: formatDate(project.showcaseDate),
        summary: summarize(project.description),
      })),
    [projects],
  );

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((project, index) => (
          <button
            key={project.id}
            type="button"
            onClick={() => {
              setSelected(project);
            }}
            className="group flex flex-col gap-4 rounded-3xl border border-sepia/20 bg-white/80 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sepia"
          >
            <GalleryImage src={project.mainImageUrl} alt={project.summary || project.description} priority={index < 2} />
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sepia">{project.showcaseDateLabel}</p>
              <p
                className="text-sm text-ink/80 leading-relaxed"
                style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
              >
                {project.summary}
              </p>
              {project.relatedPost?.slug && (
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-sepia transition group-hover:text-ink">
                  Scopri di più
                  <span aria-hidden>?</span>
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm px-4 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl space-y-6 overflow-hidden rounded-3xl border border-sepia/20 bg-old-paper/95 p-6 shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 rounded-full border border-sepia/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-ink transition hover:bg-ink hover:text-old-paper"
              >
                Chiudi
              </button>

              <div className="max-h-[70vh] space-y-6 overflow-y-auto pr-2">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sepia">
                    {selected.showcaseDateLabel}
                  </p>
                  <div className="prose prose-sm max-w-none text-ink/80 prose-headings:text-ink">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{selected.description}</ReactMarkdown>
                  </div>
                  {selected.relatedPost?.slug && (
                    <Link
                      href={`/blog/${selected.relatedPost.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-sepia transition hover:text-ink"
                    >
                      Scopri di più sul progetto
                      <span aria-hidden>?</span>
                    </Link>
                  )}
                </div>

                <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-sepia/20 bg-white/70">
                    <GalleryImage src={selected.mainImageUrl} alt={selected.summary || selected.description} priority />
                  </div>
                  {selected.secondaryImageUrl && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-sepia/20 bg-white/60">
                      <GalleryImage
                        src={selected.secondaryImageUrl}
                        alt={`${selected.summary || selected.description} - dettaglio`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


