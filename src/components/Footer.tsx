"use client";

import Link from "next/link";

const aboutLinks = [
  { href: "#noi", label: "Chi siamo" },
  { href: "/progetti", label: "Progetti" },
  { href: "/blog", label: "Blog" },
];

const serviceLinks = [
  "Ospitalita integrata",
  "Costruzione e sviluppo",
  "Gestione immobiliare",
  "Consulenza tecnica",
];

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative z-20 mt-32 overflow-hidden">
      <div className="relative mx-auto flex min-h-[60vh] max-w-6xl flex-col justify-between gap-16 px-6 py-16 sm:px-8 lg:px-0">
        <div className="grid gap-12 md:grid-cols-[1.2fr,1fr]">
          <div className="max-w-xl space-y-6">
            <span className="text-xs uppercase tracking-[0.5em] text-muted">Fratelli Bruno</span>
            <p className="text-sm text-muted">
              Strategie, cantieri e gestione per destinazioni che vogliono sorprendere. Siamo al fianco di investitori e
              territori dalla prima idea alla gestione quotidiana.
            </p>
            <Link
              href="#contatti"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.4em] text-foreground transition-colors duration-300 hover:text-accent"
            >
              Pianifica con noi
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.4em] text-muted">Scopri</h3>
              <div className="flex flex-col gap-2 text-sm text-foreground/70">
                {aboutLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="transition-colors duration-300 hover:text-accent">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.4em] text-muted">Servizi</h3>
              <ul className="flex flex-col gap-2 text-sm text-foreground/70">
                {serviceLinks.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-[18vw] leading-[0.8] text-foreground/5 sm:text-[14vw]">FRATELLI</h1>
          <div className="space-y-2 text-xs text-foreground/60">
            <p className="uppercase tracking-[0.35em]">{year} Tutti i diritti riservati</p>
            <p>Via Roma 125, Verona, Italia</p>
            <p>projects@fratellibruno.it</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

