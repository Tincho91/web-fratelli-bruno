import { z } from "zod";

export const blogPostPayloadSchema = z.object({
  title: z.string().min(3).max(150),
  slug: z.string().regex(/^[a-z0-9-]+$/).min(3).max(160),
  excerpt: z.string().max(320).optional().nullable(),
  content: z.string().min(50),
  category: z.enum([
    "TOURISM",
    "HOSPITALITY",
    "RESTAURANT",
    "REAL_ESTATE",
    "CONSTRUCTION",
    "CONSULTING",
    "NEWS",
  ]),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  coverImageUrl: z.string().url().optional().nullable(),
  coverImageKey: z.string().optional().nullable(),
  publishedAt: z.coerce.date().optional().nullable(),
});

export type BlogPostPayload = z.infer<typeof blogPostPayloadSchema>;
