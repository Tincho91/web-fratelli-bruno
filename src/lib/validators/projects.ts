import { z } from "zod";

export const projectPayloadSchema = z.object({
  description: z.string().min(10).max(6000),
  showcaseDate: z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), "Data non valida"),
  mainImageUrl: z.string().url(),
  mainImageKey: z.string().optional().nullable(),
  secondaryImageUrl: z.string().url().optional().nullable(),
  secondaryImageKey: z.string().optional().nullable(),
  relatedPostId: z.string().optional().nullable(),
});
