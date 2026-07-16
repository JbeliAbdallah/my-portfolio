import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().trim().min(2).max(100),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format."),

  description: z.string().trim().min(10).max(5000),

  imageUrl: z
    .union([z.url(), z.literal("")])
    .transform((value) => (value === "" ? null : value)),

  courseUrl: z
    .union([z.url(), z.literal("")])
    .transform((value) => (value === "" ? null : value)),

  isPublished: z.boolean(),
});

export type CourseInput = z.infer<typeof courseSchema>;
