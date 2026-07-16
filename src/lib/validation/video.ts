import { z } from "zod";

export const videoSchema = z.object({
  title: z.string().trim().min(2).max(100),

  description: z
    .string()
    .trim()
    .max(5000)
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  youtubeUrl: z.url("Please enter a valid YouTube URL."),

  thumbnailUrl: z
    .union([z.url(), z.literal("")])
    .transform((value) => (value === "" ? null : value)),

  publishedAt: z.date().nullable(),

  isVisible: z.boolean(),
});

export type VideoInput = z.infer<typeof videoSchema>;
