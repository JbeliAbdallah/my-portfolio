import { z } from "zod";

export const settingsSchema = z.object({
  siteName: z.string().trim().min(2).max(100),

  siteDescription: z
    .string()
    .trim()
    .max(5000)
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  logoUrl: z
    .union([z.url(), z.literal("")])
    .transform((value) => (value === "" ? null : value)),

  faviconUrl: z
    .union([z.url(), z.literal("")])
    .transform((value) => (value === "" ? null : value)),
});

export type SettingsInput = z.infer<typeof settingsSchema>;
