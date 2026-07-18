"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { contactSchema } from "@/lib/validation/contact";

export async function sendContactMessage(formData: FormData) {
  const result = contactSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  });

  if (!result.success) {
    redirect("/?contactError=validation#contact");
  }

  const data = result.data;

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
