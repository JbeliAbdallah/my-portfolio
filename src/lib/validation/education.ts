import { z } from "zod";

export const educationSchema = z.object({
  institution: z.string().trim().min(2).max(150),

  degree: z.string().trim().min(2).max(150),

  field: z
    .string()
    .trim()
    .max(150)
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  description: z
    .string()
    .trim()
    .max(5000)
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  startDate: z.date().nullable(),

  endDate: z.date().nullable(),

  order: z.number().int().min(0).max(9999),

  isVisible: z.boolean(),
});

export type EducationInput = z.infer<typeof educationSchema>;
