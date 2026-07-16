import { z } from "zod";

export const serviceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters.")
    .max(100, "Title must be less than 100 characters."),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(5000, "Description is too long."),

  icon: z
    .string()
    .trim()
    .max(100)
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  order: z.number().int().min(0).max(9999),

  isVisible: z.boolean(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
