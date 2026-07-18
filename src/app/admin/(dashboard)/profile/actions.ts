"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/upload";
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

  const avatar = formData.get("avatar") as File | null;
  const avatarUrl = await saveUploadedFile(avatar, "avatars");

  const cv = formData.get("cv") as File | null;
  const cvUrl = await saveUploadedFile(cv, "cv", [".pdf"]);

  const existingProfile = await prisma.profile.findFirst();

  const data = {
    ...result.data,
    ...(avatarUrl && { avatarUrl }),
    ...(cvUrl && { cvUrl }),
  };

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

  revalidatePath("/");
  revalidatePath("/admin/profile");

  redirect("/admin/profile?saved=true");
}
