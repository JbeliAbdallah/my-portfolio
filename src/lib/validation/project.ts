import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters.")
    .max(100, "Title must be less than 100 characters."),

  slug: z
    .string()
    .trim()
    .min(2, "Slug is required.")
    .max(100)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug may only contain lowercase letters, numbers, and hyphens.",
    ),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(5000),

  imageUrl: z
    .union([z.url(), z.literal("")])
    .transform((value) => (value === "" ? null : value)),

  liveUrl: z
    .union([z.url(), z.literal("")])
    .transform((value) => (value === "" ? null : value)),

  githubUrl: z
    .union([z.url(), z.literal("")])
    .transform((value) => (value === "" ? null : value)),

  technologies: z
    .array(z.string().trim().min(1))
    .max(30, "Too many technologies."),

  featured: z.boolean(),

  isVisible: z.boolean(),
});

export type ProjectInput = z.infer<typeof projectSchema>;
