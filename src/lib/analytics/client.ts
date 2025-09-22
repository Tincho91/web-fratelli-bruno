"use client";

const ANALYTICS_ENDPOINT = "/api/analytics";

type InteractionPayload = {
  type:
    | "SITE_VISIT"
    | "ARTICLE_VIEW"
    | "PROJECT_VIEW"
    | "CONTACT_FORM"
    | "CONTACT_EMAIL"
    | "CONTACT_PHONE";
  postSlug?: string;
  projectId?: string;
  metadata?: Record<string, unknown>;
};

async function sendInteraction(payload: InteractionPayload) {
  try {
    await fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to send interaction", error);
    }
  }
}

export function trackSiteVisit() {
  if (typeof window === "undefined") return;
  const key = "fratelli-site-visit";
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  void sendInteraction({ type: "SITE_VISIT" });
}

export function trackArticleView(slug: string) {
  if (!slug) return;
  void sendInteraction({ type: "ARTICLE_VIEW", postSlug: slug });
}

export function trackProjectView(id: string) {
  if (!id) return;
  void sendInteraction({ type: "PROJECT_VIEW", projectId: id });
}

export function trackContactForm(metadata?: Record<string, unknown>) {
  void sendInteraction({ type: "CONTACT_FORM", metadata });
}

export function trackContactEmail() {
  void sendInteraction({ type: "CONTACT_EMAIL" });
}

export function trackContactPhone() {
  void sendInteraction({ type: "CONTACT_PHONE" });
}