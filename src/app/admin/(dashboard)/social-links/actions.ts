"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getSocialLinkData(formData: FormData) {
  return {
    platform: String(formData.get("platform") ?? "").trim(),
    url: String(formData.get("url") ?? "").trim(),
    icon: String(formData.get("icon") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0),
    isVisible: formData.get("isVisible") === "on",
  };
}

export async function createSocialLink(formData: FormData) {
  await prisma.socialLink.create({
    data: getSocialLinkData(formData),
  });

  revalidatePath("/admin/social-links");
  redirect("/admin/social-links?created=true");
}

export async function updateSocialLink(id: string, formData: FormData) {
  await prisma.socialLink.update({
    where: { id },
    data: getSocialLinkData(formData),
  });

  revalidatePath("/admin/social-links");
  redirect("/admin/social-links?updated=true");
}

export async function deleteSocialLink(id: string) {
  try {
    await prisma.socialLink.delete({
      where: { id },
    });

    revalidatePath("/admin/social-links");
  } catch {
    redirect("/admin/social-links?error=delete");
  }

  redirect("/admin/social-links?deleted=true");
}
