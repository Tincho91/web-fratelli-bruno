"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

interface DashboardPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  status: string;
  category: string;
  publishedAt: string | null;
  updatedAt: string;
}

interface DashboardProject {
  id: string;
  description: string;
  showcaseDate: string;
  mainImageUrl: string;
  secondaryImageUrl?: string | null;
  relatedPost?: { slug: string; title: string } | null;
  updatedAt: string;
}

interface AdminDashboardTabsProps {

  posts: DashboardPost[];
  projects: DashboardProject[];
  defaultTab?: string;
}

const TAB_KEYS = ["overview", "posts", "projects"] as const;

function formatDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function toPlainText(markdown: string, maxLength = 180) {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~`-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength - 1).trimEnd()}…`;
}

export default function AdminDashboardTabs({ posts, projects, defaultTab }: AdminDashboardTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialTab = (defaultTab ?? searchParams.get("tab") ?? "overview").toLowerCase();
  const [activeTab, setActiveTab] = useState<typeof TAB_KEYS[number]>(
    TAB_KEYS.includes(initialTab as typeof TAB_KEYS[number]) ? (initialTab as typeof TAB_KEYS[number]) : "overview",
  );
  const [postSearch, setPostSearch] = useState("");
  const [postStatus, setPostStatus] = useState("all");
  const [projectSearch, setProjectSearch] = useState("");
  const [postData, setPostData] = useState(posts);
  const [projectData, setProjectData] = useState(projects);
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tab: typeof TAB_KEYS[number]) => {
    setActiveTab(tab);
    startTransition(() => {
      const params = new URLSearchParams(searchParams ?? undefined);
      if (tab === "overview") {
        params.delete("tab");
      } else {
        params.set("tab", tab);
      }
      router.replace(`${pathname}${params.size ? `?${params.toString()}` : ""}`);
    });
  };

  const filteredPosts = useMemo(() => {
    return postData.filter((post) => {
      const matchesStatus =
        postStatus === "all" || (postStatus === "published" ? post.status === "PUBLISHED" : post.status === "DRAFT");
      const query = postSearch.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(query) || post.slug.toLowerCase().includes(query) ||
        (post.excerpt ?? "").toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [postData, postStatus, postSearch]);

  const filteredProjects = useMemo(() => {
    return projectData.filter((project) =>
      project.description.toLowerCase().includes(projectSearch.toLowerCase()),
    );
  }, [projectData, projectSearch]);

  const recentPosts = useMemo(() => postData.slice(0, 5), [postData]);
  const recentProjects = useMemo(() => projectData.slice(0, 5), [projectData]);

  const handleDeletePost = async (slug: string) => {
    const confirmation = window.confirm("Sei sicuro di voler eliminare questo articolo?");
    if (!confirmation) return;

    try {
      const response = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      if (!response.ok && response.status !== 204) {
        throw new Error("Impossibile eliminare l'articolo");
      }
      setPostData((prev) => prev.filter((post) => post.slug !== slug));
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Si è verificato un errore eliminando l'articolo.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    const confirmation = window.confirm("Sei sicuro di voler eliminare questo progetto?");
    if (!confirmation) return;

    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!response.ok && response.status !== 204) {
        throw new Error("Impossibile eliminare il progetto");
      }
      setProjectData((prev) => prev.filter((project) => project.id !== id));
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Si è verificato un errore eliminando il progetto.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        {TAB_KEYS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              activeTab === tab ? "bg-sepia text-old-paper shadow" : "bg-white/80 text-ink hover:bg-sepia/10",
            )}
            onClick={() => handleTabChange(tab)}
          >
            {tab === "overview" && "Panoramica"}
            {tab === "posts" && "Articoli"}
            {tab === "projects" && "Progetti"}
          </button>
        ))}
        {isPending && <span className="text-xs text-ink/60">Aggiornando…</span>}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-10">
          <section className="grid gap-8 lg:grid-cols-2">
            <RecentTable
              title="Ultimi articoli"
              items={recentPosts.map((post) => ({
                id: post.id,
                title: post.title,
                subtitle: post.status === "PUBLISHED" ? "Pubblicato" : "Bozza",
                meta: formatDate(post.updatedAt),
                href: `/admin/posts/${post.slug}/edit`,
              }))}
              emptyLabel="Non ci sono articoli registrati."
              cta={{ label: "Gestisci articoli", href: "/admin?tab=posts" }}
            />
            <RecentTable
              title="Ultimi progetti"
              items={recentProjects.map((project) => ({
                id: project.id,
                title: toPlainText(project.description, 60),
                subtitle: project.relatedPost ? `Collegato a ${project.relatedPost.title}` : undefined,
                meta: formatDate(project.showcaseDate),
                href: `/admin/progetti/${project.id}/edit`,
              }))}
              emptyLabel="Non ci sono progetti registrati."
              cta={{ label: "Gestisci progetti", href: "/admin?tab=projects" }}
            />
          </section>
        </div>
      )}

      {activeTab === "posts" && (
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="search"
                value={postSearch}
                onChange={(event) => setPostSearch(event.target.value)}
                placeholder="Cerca per titolo o slug"
                className="w-52 rounded-xl border border-sepia/30 bg-white/80 px-3 py-2 text-sm text-ink focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
              />
              <select
                value={postStatus}
                onChange={(event) => setPostStatus(event.target.value)}
                className="rounded-xl border border-sepia/30 bg-white/80 px-3 py-2 text-sm text-ink focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
              >
                <option value="all">Tutti</option>
                <option value="published">Pubblicati</option>
                <option value="draft">Bozze</option>
              </select>
            </div>
            <Link
              href="/admin/posts/new"
              className="rounded-full bg-sepia px-4 py-2 text-sm font-semibold text-old-paper shadow-sm transition hover:bg-ink"
            >
              Nuovo articolo
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-sepia/20 bg-white/85 shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-sepia/10">
                <thead className="bg-old-paper/70">
                  <tr className="text-left text-xs font-semibold uppercase tracking-[0.3em] text-ink/70">
                    <th className="px-6 py-3">Titolo</th>
                    <th className="px-6 py-3">Stato</th>
                    <th className="px-6 py-3">Categoria</th>
                    <th className="px-6 py-3">Aggiornato</th>
                    <th className="px-6 py-3">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sepia/10">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="text-sm text-ink/80">
                      <td className="max-w-xs px-6 py-4 align-top">
                        <p className="font-semibold text-ink">{post.title}</p>
                        <p className="mt-1 text-xs text-ink/60">{toPlainText(post.excerpt ?? "", 80)}</p>
                      </td>
                      <td className="px-6 py-4 align-top">
                        <span
                          className={clsx(
                            "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                            post.status === "PUBLISHED"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-yellow-100 text-yellow-700",
                          )}
                        >
                          {post.status === "PUBLISHED" ? "Pubblicato" : "Bozza"}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-top text-xs uppercase tracking-[0.3em] text-ink/70">{post.category}</td>
                      <td className="px-6 py-4 align-top text-sm">{formatDate(post.updatedAt)}</td>
                      <td className="px-6 py-4 align-top">
                        <div className="flex flex-col items-start gap-2 text-sm">
                          <Link
                            href={`/admin/posts/${post.slug}/edit`}
                            className="font-semibold text-sepia transition hover:text-ink"
                          >
                            Modifica
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeletePost(post.slug)}
                            className="font-semibold text-red-600 transition hover:text-red-700"
                          >
                            Elimina
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredPosts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-sm text-ink/60">
                        Nessun articolo corrisponde ai filtri selezionati.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {activeTab === "projects" && (
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <input
              type="search"
              value={projectSearch}
              onChange={(event) => setProjectSearch(event.target.value)}
              placeholder="Cerca per descrizione"
              className="w-64 rounded-xl border border-sepia/30 bg-white/80 px-3 py-2 text-sm text-ink focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
            />
            <Link
              href="/admin/progetti/new"
              className="rounded-full bg-sepia px-4 py-2 text-sm font-semibold text-old-paper shadow-sm transition hover:bg-ink"
            >
              Nuovo progetto
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-sepia/20 bg-white/85 shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-sepia/10">
                <thead className="bg-old-paper/70">
                  <tr className="text-left text-xs font-semibold uppercase tracking-[0.3em] text-ink/70">
                    <th className="px-6 py-3">Descrizione</th>
                    <th className="px-6 py-3">Data</th>
                    <th className="px-6 py-3">Articolo correlato</th>
                    <th className="px-6 py-3">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sepia/10">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="text-sm text-ink/80">
                      <td className="max-w-xl px-6 py-4 align-top">
                        <p className="whitespace-pre-wrap text-ink/80" style={{ wordBreak: "break-word" }}>
                          {toPlainText(project.description, 140)}
                        </p>
                      </td>
                      <td className="px-6 py-4 align-top text-sm">{formatDate(project.showcaseDate)}</td>
                      <td className="px-6 py-4 align-top text-sm">
                        {project.relatedPost ? (
                          <Link
                            href={`/blog/${project.relatedPost.slug}`}
                            className="font-semibold text-sepia transition hover:text-ink"
                          >
                            {project.relatedPost.title}
                          </Link>
                        ) : (
                          <span className="text-ink/60">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 align-top">
                        <div className="flex flex-col items-start gap-2 text-sm">
                          <Link
                            href={`/admin/progetti/${project.id}/edit`}
                            className="font-semibold text-sepia transition hover:text-ink"
                          >
                            Modifica
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(project.id)}
                            className="font-semibold text-red-600 transition hover:text-red-700"
                          >
                            Elimina
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProjects.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-sm text-ink/60">
                        Nessun progetto corrisponde ai filtri selezionati.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

interface RecentTableProps {
  title: string;
  items: { id: string; title: string; subtitle?: string; meta?: string; href: string }[];
  emptyLabel: string;
  cta: { label: string; href: string };
}

function RecentTable({ title, items, emptyLabel, cta }: RecentTableProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-sepia/20 bg-white/85 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <Link href={cta.href} className="text-sm font-semibold text-sepia transition hover:text-ink">
          {cta.label}
        </Link>
      </div>
      <ul className="space-y-3">
        {items.length === 0 && <li className="text-sm text-ink/60">{emptyLabel}</li>}
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-old-paper/40 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              {item.subtitle && <p className="text-xs text-ink/60">{item.subtitle}</p>}
            </div>
            <div className="flex items-center gap-4 text-xs text-ink/60">
              {item.meta && <span>{item.meta}</span>}
              <Link href={item.href} className="text-sm font-semibold text-sepia transition hover:text-ink">
                Gestisci
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}









