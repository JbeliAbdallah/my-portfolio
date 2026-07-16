"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { profileSchema } from "@/lib/validation/profile";

export async function saveProfile(formData: FormData) {
  await requireAdmin();

  const data = profileSchema.parse({
    fullName: String(formData.get("fullName") ?? ""),
    headline: String(formData.get("headline") ?? ""),
    bio: String(formData.get("bio") ?? ""),
    location: String(formData.get("location") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
  });

  const existingProfile = await prisma.profile.findFirst();

  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data,
    });
  } else {
    await prisma.profile.create({
      data,
    });
  }

  revalidatePath("/admin/profile");
  redirect("/admin/profile?saved=true");
}
