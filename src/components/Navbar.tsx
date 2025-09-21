"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { key: "noi", label: "Nosotros", mode: "scroll" },
  { key: "servizi", label: "Servicios", mode: "scroll" },
  { key: "proyectos", label: "Proyectos", mode: "link", href: "/galleria" },
  { key: "blog", label: "Blog", mode: "link", href: "/blog" },
  { key: "contacto", label: "Contacto", mode: "scroll" },
] as const;

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (item: (typeof NAV_ITEMS)[number]) => {
    if (item.mode === "scroll") {
      scrollToSection(item.key);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed inset-x-0 z-50">
      <div className="backdrop-blur-md bg-old-paper/70 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-2xl font-bold uppercase tracking-[0.3em] text-sepia">
            Fratelli Bruno
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {NAV_ITEMS.map((item) => {
              if (item.mode === "link" && item.href) {
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-sepia hover:text-old-paper"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleNavigate(item)}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-sepia hover:text-old-paper"
                >
                  {item.label}
                </button>
              );
            })}
            <Link
              href="/auth/login"
              className="rounded-full border border-sepia/40 px-4 py-2 text-sm font-semibold text-sepia transition hover:bg-ink hover:text-old-paper"
            >
              Administración
            </Link>
          </div>

          <button
            type="button"
            className="rounded-full border border-sepia/40 p-2 text-sepia transition hover:bg-sepia hover:text-old-paper md:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="border-b border-sepia/20 bg-old-paper/95 shadow-xl md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_ITEMS.map((item) => {
                if (item.mode === "link" && item.href) {
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="block rounded-xl px-4 py-3 text-base font-semibold text-ink transition hover:bg-sepia hover:text-old-paper"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleNavigate(item)}
                    className="block w-full rounded-xl px-4 py-3 text-left text-base font-semibold text-ink transition hover:bg-sepia hover:text-old-paper"
                  >
                    {item.label}
                  </button>
                );
              })}
              <Link
                href="/auth/login"
                className="block rounded-xl border border-sepia/40 px-4 py-3 text-center text-base font-semibold text-sepia transition hover:bg-ink hover:text-old-paper"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Administración
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
