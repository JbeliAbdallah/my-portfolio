import { z } from "zod";

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name must be less than 100 characters."),

  headline: z
    .string()
    .trim()
    .max(150, "Headline must be less than 150 characters.")
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  bio: z
    .string()
    .trim()
    .max(5000, "Bio is too long.")
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  location: z
    .string()
    .trim()
    .max(100)
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  email: z
    .email("Please enter a valid email address.")
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  phone: z
    .string()
    .trim()
    .max(30)
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),
});

export type ProfileInput = z.infer<typeof profileSchema>;
