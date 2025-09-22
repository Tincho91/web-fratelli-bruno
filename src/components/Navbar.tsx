"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../libs/utils";

const NAV_ITEMS = [
  { key: "noi", label: "Chi siamo", mode: "scroll" },
  { key: "servizi", label: "Servizi", mode: "scroll" },
  { key: "progetti", label: "Progetti", mode: "link", href: "/progetti" },
  { key: "blog", label: "Blog", mode: "link", href: "/blog" },
  { key: "contatti", label: "Contatti", mode: "scroll" },
] as const;

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          "pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-transparent px-6 transition-all duration-500",
          scrolled
            ? "mt-4 bg-background/85 py-4 backdrop-blur-xl border-border/60 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            : "mt-8 bg-transparent py-6"
        )}
      >
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.5em] text-muted transition-colors hover:text-foreground"
        >
          Fratelli Bruno
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {NAV_ITEMS.map((item) => {
            const className =
              "text-[0.7rem] uppercase tracking-[0.35em] text-foreground/80 transition-colors duration-300 hover:text-accent";

            if (item.mode === "link" && item.href) {
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
          <Link
            href="/auth/login"
            className="rounded-full border border-border/60 px-5 py-2 text-[0.65rem] uppercase tracking-[0.4em] text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
          >
            Admin
          </Link>
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
            className="pointer-events-auto fixed inset-0 z-40 flex flex-col gap-8 bg-background/95 px-6 py-28 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => {
                if (item.mode === "link" && item.href) {
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg uppercase tracking-[0.4em] text-foreground transition-colors duration-300 hover:text-accent"
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
                    className="text-left text-lg uppercase tracking-[0.4em] text-foreground transition-colors duration-300 hover:text-accent"
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto flex flex-col gap-4 text-sm text-muted">
              <span className="text-xs uppercase tracking-[0.4em] text-foreground/60">Stay connected</span>
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.3em] text-foreground transition-colors hover:text-accent"
              >
                Admin access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
