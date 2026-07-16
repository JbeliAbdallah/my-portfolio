import { z } from "zod";

export const skillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Skill name must be at least 2 characters.")
    .max(100, "Skill name must be less than 100 characters."),

  category: z
    .string()
    .trim()
    .max(100)
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  level: z
    .number()
    .int()
    .min(0, "Level must be at least 0.")
    .max(100, "Level cannot exceed 100.")
    .nullable(),

  icon: z
    .string()
    .trim()
    .max(100)
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  order: z.number().int().min(0).max(9999),

  isVisible: z.boolean(),
});

export type SkillInput = z.infer<typeof skillSchema>;
