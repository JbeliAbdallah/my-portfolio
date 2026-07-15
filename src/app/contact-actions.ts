"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function sendContactMessage(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !subject || !message) {
    redirect("/?contactError=missing#contact");
  }

  await prisma.contactMessage.create({
    data: {
      name,
      email,
      subject,
      message,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/messages");

  redirect("/?contactSuccess=true#contact");
}
