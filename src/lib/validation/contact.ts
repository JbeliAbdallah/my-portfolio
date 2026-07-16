import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),

  email: z.email("Please enter a valid email address."),

  subject: z.string().trim().min(2).max(200),

  message: z.string().trim().min(10).max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
