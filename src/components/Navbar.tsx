"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../libs/utils";
import { logout } from "@/lib/actions/auth";

type NavItem =
  | { key: string; label: string; mode: "scroll" }
  | { key: string; label: string; mode: "link"; href: string };

const NAV_ITEMS: NavItem[] = [
  { key: "noi", label: "Chi siamo", mode: "scroll" },
  { key: "servizi", label: "Servizi", mode: "scroll" },
  { key: "progetti", label: "Progetti", mode: "link", href: "/progetti" },
  { key: "contatti", label: "Contatti", mode: "scroll" },
  { key: "blog", label: "Blog", mode: "link", href: "/blog" },
];

const BLOG_NAV_ITEMS: NavItem[] = [
  { key: "home", label: "Home", mode: "link", href: "/" },
  { key: "blog", label: "Blog", mode: "link", href: "/blog" },
];

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isBlogRoute = pathname?.startsWith("/blog") ?? false;
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;
  const navItems = isBlogRoute || isAdminRoute ? BLOG_NAV_ITEMS : NAV_ITEMS;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <div
        className={cn(
          "pointer-events-auto flex w-full max-w-full items-center justify-between rounded-full border border-transparent px-4 transition-all duration-500 md:max-w-6xl md:px-6",
          scrolled
            ? "mt-4 bg-background/85 py-4 backdrop-blur-xl border-border/60 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            : "mt-8 bg-transparent py-6"
        )}
      >
        <Link
          href="/"
          className="text-base font-heading uppercase text-muted transition-colors hover:text-foreground md:text-lg lg:text-xl"
        >
          Fratelli Bruno
        </Link>

        <div className="hidden items-center gap-6 md:flex md:gap-6 lg:gap-10">
          {navItems.map((item) => {
            const className =
              "text-[0.7rem] font-semibold uppercase text-foreground/80 transition-colors duration-300 hover:text-accent md:text-sm lg:text-base";

            if (item.mode === "link") {
              return (
                <Link key={item.key} href={item.href} className={className}>
                  {item.label}
                </Link>
              );
            }

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => scrollToSection(item.key)}
                className={className}
              >
                {item.label}
              </button>
            );
          })}
          {isAdminRoute ? (
            <form action={logout} className="contents">
              <button
                type="submit"
                className="rounded-full border border-border/60 px-5 py-2 text-[0.7rem] font-semibold uppercase text-foreground transition-all duration-300 hover:border-accent hover:text-accent md:text-sm lg:text-base"
              >
                Logout
              </button>
            </form>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-full border border-border/60 px-5 py-2 text-[0.7rem] font-semibold uppercase text-foreground transition-all duration-300 hover:border-accent hover:text-accent md:text-sm lg:text-base"
            >
              Admin
            </Link>
          )}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground transition-colors duration-300 hover:border-accent hover:text-accent md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="relative flex h-full flex-col gap-8 px-6 pb-16 pt-24"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Chiudi menu"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6">
                {navItems.map((item) => {
                  if (item.mode === "link") {
                    return (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-xl font-semibold uppercase text-foreground transition-colors duration-300 hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        scrollToSection(item.key);
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-xl font-semibold uppercase text-foreground transition-colors duration-300 hover:text-accent"
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto flex flex-col gap-4 text-sm text-muted">
                <span className="text-xs uppercase tracking-[0.3em] text-foreground/60">Stay connected</span>
                {isAdminRoute ? (
                  <form
                    action={logout}
                    onSubmit={() => setIsMobileMenuOpen(false)}
                    className="text-sm uppercase text-foreground transition-colors hover:text-accent"
                  >
                    <button type="submit" className="w-full text-left">Logout</button>
                  </form>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm uppercase text-foreground transition-colors hover:text-accent"
                  >
                    Admin access
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
