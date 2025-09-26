"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, Tag, Grid, List, Clock, ArrowRight, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "../../../libs/utils";

type ViewMode = "grid" | "list";
type DateFilter = "recent" | "oldest" | "this-month" | "this-year";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string | null;
  category: string | null;
  publishedAt: string | null;
  createdAt: string;
};

type BlogListingProps = {
  posts: BlogPost[];
  categoryLabels: Record<string, string>;
};

const DATE_FILTER_OPTIONS: { value: DateFilter; label: string }[] = [
  { value: "recent", label: "Piu recenti" },
  { value: "oldest", label: "Piu antichi" },
  { value: "this-month", label: "Questo mese" },
  { value: "this-year", label: "Quest'anno" },
];

const WORDS_PER_MINUTE = 180;
const FALLBACK_CATEGORY = "Novita";

function formatDisplayDate(value: string | null) {
  if (!value) return "Prossimamente";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Prossimamente";
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function estimateReadTime(text: string) {
  const words = text.trim().length === 0 ? WORDS_PER_MINUTE : text.trim().split(/\s+/g).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min`;
}

function getEffectiveDate(post: BlogPost) {
  return post.publishedAt ?? post.createdAt;
}

function matchesDateFilter(post: BlogPost, filter: DateFilter) {
  if (filter === "recent" || filter === "oldest") {
    return true;
  }

  const reference = new Date();
  const target = getEffectiveDate(post);
  if (!target) return false;
  const candidate = new Date(target);
  if (Number.isNaN(candidate.getTime())) return false;

  if (filter === "this-month") {
    return candidate.getMonth() === reference.getMonth() && candidate.getFullYear() === reference.getFullYear();
  }

  if (filter === "this-year") {
    return candidate.getFullYear() === reference.getFullYear();
  }

  return true;
}

function sortByDate(posts: BlogPost[], filter: DateFilter) {
  if (filter === "recent") {
    return [...posts].sort((a, b) => {
      const aDate = new Date(getEffectiveDate(a));
      const bDate = new Date(getEffectiveDate(b));
      return bDate.getTime() - aDate.getTime();
    });
  }

  if (filter === "oldest") {
    return [...posts].sort((a, b) => {
      const aDate = new Date(getEffectiveDate(a));
      const bDate = new Date(getEffectiveDate(b));
      return aDate.getTime() - bDate.getTime();
    });
  }

  return posts;
}

type FilterOption = { value: string; label: string };

type FilterSelectProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
};

function FilterSelect({ icon: Icon, label, value, options, onChange }: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const selected = options.find((option) => option.value === value);

  return (
    <div ref={containerRef} className="relative w-[210px]">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-full border border-border/60  bg-background/95 backdrop-blur-sm px-4 py-2 text-left text-xs uppercase tracking-[0.35em] text-foreground transition-all duration-200",
          open && "rounded-b-none border-b-0 bg-background/90 text-accent shadow-[0_18px_38px_rgba(0,0,0,0.45)]"
        )}
      >
        <span className="inline-flex items-center gap-2">
          <Icon className={cn("h-4 w-4", open ? "text-accent" : "text-foreground/60")} />
          {selected?.label ?? label}
        </span>
        <ChevronDown className={cn("h-4 w-4 transition", open ? "rotate-180 text-accent" : "text-foreground/50")} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-20 overflow-hidden rounded-b-[1.75rem] border border-border/60 border-t-0 bg-black/90 shadow-[0_26px_60px_rgba(0,0,0,0.45)]">
          <ul role="listbox" className="max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isActive = option.value === value;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3 text-xs uppercase tracking-[0.35em] transition-colors",
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-foreground/70 hover:bg-accent/10 hover:text-accent"
                    )}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    {isActive && <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

type BlogCardProps = {
  post: BlogPost;
  viewMode: ViewMode;
  categoryLabels: Record<string, string>;
};

function BlogCard({ post, viewMode, categoryLabels }: BlogCardProps) {
  const categoryLabel = categoryLabels[post.category ?? ""] ?? post.category ?? FALLBACK_CATEGORY;
  const displayDate = formatDisplayDate(getEffectiveDate(post));
  const readTime = estimateReadTime(post.excerpt);
  const href = `/blog/${post.slug}`;

  if (viewMode === "list") {
    return (
      <Link
        href={href}
        className="group block overflow-hidden rounded-3xl border border-border/40 bg-background/80 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative aspect-[16/9] sm:aspect-[4/3] sm:w-80 overflow-hidden">
            {post.coverImageUrl ? (
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                sizes="(min-width: 640px) 320px, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 to-foreground/5 text-xs uppercase tracking-[0.4em] text-muted">
                {categoryLabel}
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
          </div>

          <div className="flex flex-1 flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-border/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-foreground/80">
                {categoryLabel}
              </span>
              <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-foreground/60">
                <Clock className="h-3 w-3" />
                {readTime}
              </span>
            </div>

            <h3 className="text-2xl font-heading uppercase leading-tight text-foreground transition group-hover:text-accent">
              {post.title}
            </h3>

            <p className="line-clamp-3 text-sm leading-relaxed text-foreground/70">{post.excerpt}</p>

            <div className="mt-auto flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-foreground/55">
              <span>{displayDate}</span>
              <ArrowRight className="h-4 w-4 text-foreground/50 transition group-hover:translate-x-1 group-hover:text-accent" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-3xl border border-border/40 bg-background/80 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/10 to-foreground/5 text-xs uppercase tracking-[0.4em] text-muted">
            {categoryLabel}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-border/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-foreground/80">
            {categoryLabel}
          </span>
          <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-foreground/60">
            <Clock className="h-3 w-3" />
            {readTime}
          </span>
        </div>

        <h3 className="text-2xl font-heading uppercase leading-tight text-foreground transition group-hover:text-accent">
          {post.title}
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-foreground/70">{post.excerpt}</p>

        <div className="mt-auto flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-foreground/55">
          <span>{displayDate}</span>
          <ArrowRight className="h-4 w-4 text-foreground/50 transition group-hover:translate-x-1 group-hover:text-accent" />
        </div>
      </div>
    </Link>
  );
}

export function BlogListing({ posts, categoryLabels }: BlogListingProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [category, setCategory] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("recent");

  const categoryOptions = useMemo<FilterOption[]>(() => {
    const unique = Array.from(new Set(posts.map((post) => post.category).filter(Boolean))) as string[];
    return unique
      .map((value) => ({ value, label: categoryLabels[value] ?? value }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [posts, categoryLabels]);

  const filteredPosts = useMemo(() => {
    const byCategory = category === "all" ? posts : posts.filter((post) => post.category === category);
    const byDate = byCategory.filter((post) => matchesDateFilter(post, dateFilter));
    return sortByDate(byDate, dateFilter);
  }, [posts, category, dateFilter]);

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <FilterSelect
            icon={Calendar}
            label="Periodo"
            value={dateFilter}
            onChange={(next) => setDateFilter(next as DateFilter)}
            options={DATE_FILTER_OPTIONS}
          />
          <FilterSelect
            icon={Tag}
            label="Categorie"
            value={category}
            onChange={setCategory}
            options={[{ value: "all", label: "Categorie" }, ...categoryOptions]}
          />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 p-1">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 transition",
              viewMode === "grid" ? "bg-foreground/10 text-accent" : "hover:text-foreground"
            )}
            aria-pressed={viewMode === "grid"}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 transition",
              viewMode === "list" ? "bg-foreground/10 text-accent" : "hover:text-foreground"
            )}
            aria-pressed={viewMode === "list"}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-3xl border border-border/60 bg-background/60 px-8 py-16 text-center shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
          <h2 className="text-2xl font-heading uppercase tracking-tight text-foreground">Contenuti disponibili a breve</h2>
          <p className="mt-4 text-sm text-foreground/70">
            Aggiorniamo regolarmente il nostro blog con progetti, cantieri e analisi di mercato. Prova a cambiare filtro o torna a visitarci.
          </p>
        </div>
      ) : (
        <div className={cn(viewMode === "grid" ? "grid gap-8 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-6")}> 
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} viewMode={viewMode} categoryLabels={categoryLabels} />
          ))}
        </div>
      )}
    </div>
  );
}
