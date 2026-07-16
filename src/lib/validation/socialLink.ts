import { z } from "zod";

export const socialLinkSchema = z.object({
  platform: z.string().trim().min(2).max(100),

  url: z.url("Please enter a valid URL."),

  icon: z
    .string()
    .trim()
    .max(100)
    .or(z.literal(""))
    .transform((value) => (value === "" ? null : value)),

  order: z.number().int().min(0).max(9999),

  isVisible: z.boolean(),
});

export type SocialLinkInput = z.infer<typeof socialLinkSchema>;
