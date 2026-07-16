"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { profileSchema } from "@/lib/validation/profile";
import { validate } from "@/lib/validation/validate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getProfileData(formData: FormData) {
  return validate(profileSchema, {
    fullName: String(formData.get("fullName") ?? ""),
    headline: String(formData.get("headline") ?? ""),
    bio: String(formData.get("bio") ?? ""),
    location: String(formData.get("location") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
  });
}

export async function saveProfile(formData: FormData) {
  await requireAdmin();

  const result = getProfileData(formData);

  if (!result.success) {
    redirect(`/admin/profile?error=${encodeURIComponent(result.error)}`);
  }

  const existingProfile = await prisma.profile.findFirst();

  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: result.data,
    });
  } else {
    await prisma.profile.create({
      data: result.data,
    });
  }

  revalidatePath("/admin/profile");

  redirect("/admin/profile?saved=true");
}
