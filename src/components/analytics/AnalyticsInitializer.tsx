"use client";

import { useEffect } from "react";
import { trackSiteVisit } from "@/lib/analytics/client";

export default function AnalyticsInitializer() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname.startsWith("/admin")) return;
    trackSiteVisit();
  }, []);

  return null;
}
