import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().trim().min(2).max(150),

  position: z.string().trim().min(2).max(150),

  description: z
    .string()
    .trim()
    .max(5000)
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  location: z
    .string()
    .trim()
    .max(150)
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  startDate: z.date(),

  endDate: z.date().nullable(),

  isCurrent: z.boolean(),

  order: z.number().int().min(0).max(9999),

  isVisible: z.boolean(),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;
