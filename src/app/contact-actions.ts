"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { contactSchema } from "@/lib/validation/contact";

export async function sendContactMessage(formData: FormData) {
  const data = contactSchema.parse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  });

  if (!data.name || !data.email || !data.subject || !data.message) {
    redirect("/?contactError=missing#contact");
  }

  await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/messages");

  redirect("/?contactSuccess=true#contact");
}
