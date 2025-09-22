"use client";

import { useEffect } from "react";
import { trackArticleView } from "@/lib/analytics/client";

interface ArticleViewTrackerProps {
  slug: string;
}

export default function ArticleViewTracker({ slug }: ArticleViewTrackerProps) {
  useEffect(() => {
    if (!slug) return;
    trackArticleView(slug);
  }, [slug]);

  return null;
}