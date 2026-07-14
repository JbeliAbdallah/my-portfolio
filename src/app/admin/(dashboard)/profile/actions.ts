"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveProfile(formData: FormData) {
  const data = {
    fullName: String(formData.get("fullName") ?? "").trim(),
    headline: String(formData.get("headline") ?? "").trim() || null,
    bio: String(formData.get("bio") ?? "").trim() || null,
    location: String(formData.get("location") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
  };

  const existingProfile = await prisma.profile.findFirst();

  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data,
    });
  } else {
    await prisma.profile.create({ data });
  }

  revalidatePath("/admin/profile");
  redirect("/admin/profile?saved=true");
}
