"use client";

import { useState, type ReactNode } from "react";
import { trackContactEmail, trackContactForm, trackContactPhone } from "@/lib/analytics/client";

const infoCards: { label: string; value: ReactNode }[] = [
  {
    label: "Sede principale",
    value: "Via Roma 125, Verona, Italia",
  },
  {
    label: "Contatto diretto",
    value: (
      <div className="space-y-1">
        <a href="tel:+390451234567" onClick={trackContactPhone} className="text-sm text-foreground transition-colors duration-300 hover:text-accent">
          +39 045 123 4567
        </a>
        <a
          href="mailto:projects@fratellibruno.it"
          onClick={trackContactEmail}
          className="text-sm text-foreground transition-colors duration-300 hover:text-accent"
        >
          projects@fratellibruno.it
        </a>
      </div>
    ),
  },
];

export default function Contatti() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nome = formData.get("nome");
    const email = formData.get("email");
    trackContactForm({
      nome: typeof nome === "string" ? nome : undefined,
      email: typeof email === "string" ? email : undefined,
    });
    event.currentTarget.reset();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <section id="contatti" className="relative z-20 py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-0">
        <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.6em] text-muted">Contattaci</span>
              <h2 className="text-4xl font-heading uppercase leading-tight sm:text-5xl">
                Allineiamo visione, numeri e operativita
              </h2>
              <p className="text-sm text-foreground/70 sm:text-base">
                Raccontaci obiettivi, tempistiche e stakeholder. Organizziamo una sessione di lavoro per definire percorso,
                budget e governance del progetto.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {infoCards.map((card) => (
                <div key={card.label} className="rounded-4xl border border-border/60 bg-background/60 p-6 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.4em] text-muted">{card.label}</p>
                  <div className="mt-3 text-sm text-foreground/75">{card.value}</div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-4xl border border-border/60 bg-background/80 p-6 backdrop-blur sm:p-8"
          >
            <fieldset className="space-y-1">
              <label htmlFor="nome" className="text-xs uppercase tracking-[0.35em] text-muted">
                Nome completo
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                className="w-full rounded-3xl border border-border/60 bg-black/30 px-5 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </fieldset>
            <fieldset className="space-y-1">
              <label htmlFor="email" className="text-xs uppercase tracking-[0.35em] text-muted">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-3xl border border-border/60 bg-black/30 px-5 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </fieldset>
            <fieldset className="space-y-1">
              <label htmlFor="messaggio" className="text-xs uppercase tracking-[0.35em] text-muted">
                Raccontaci la tua idea
              </label>
              <textarea
                id="messaggio"
                name="messaggio"
                rows={4}
                className="w-full rounded-3xl border border-border/60 bg-black/30 px-5 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Tipo di progetto, localita, tempistiche previste"
              />
            </fieldset>
            <button
              type="submit"
              className="w-full rounded-full border border-accent px-6 py-3 text-xs uppercase tracking-[0.4em] text-accent transition-colors duration-300 hover:border-foreground hover:text-foreground"
            >
              Invia messaggio
            </button>
            {submitted && (
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Messaggio ricevuto. Ti ricontatteremo a breve.</p>
            )}
            <p className="text-[0.65rem] text-foreground/50">
              Con l invio autorizzi FRATELLI BRUNO Francesco e Carlo & C. S.n.c. a contattarti in merito ai propri servizi.
            </p>
          </form>
        </div>

        <div className="mt-16 overflow-hidden rounded-4xl border border-border/60 shadow-[0_40px_80px_rgba(0,0,0,0.35)]">
          <iframe
            title="Sede Fratelli Bruno"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11393.837047473493!2d10.9886937!3d45.438384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f5f717c4b1f5d%3A0xb53dd0b191d257a7!2sVerona%20VR%2C%20Italia!5e0!3m2!1sit!2sit!4v1701638940000!5m2!1sit!2sit"
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

