"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { socialLinkSchema } from "@/lib/validation/socialLink";
import { validate } from "@/lib/validation/validate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getSocialLinkData(formData: FormData) {
  return validate(socialLinkSchema, {
    platform: String(formData.get("platform") ?? ""),
    url: String(formData.get("url") ?? ""),
    icon: String(formData.get("icon") ?? ""),
    order: Number(formData.get("order") ?? 0),
    isVisible: formData.get("isVisible") === "on",
  });
}

export async function createSocialLink(formData: FormData) {
  await requireAdmin();

  const result = getSocialLinkData(formData);

  if (!result.success) {
    redirect(
      `/admin/social-links/new?error=${encodeURIComponent(result.error)}`,
    );
  }

  await prisma.socialLink.create({
    data: result.data,
  });

  revalidatePath("/admin/social-links");

  redirect("/admin/social-links?created=true");
}

export async function updateSocialLink(id: string, formData: FormData) {
  await requireAdmin();

  const result = getSocialLinkData(formData);

  if (!result.success) {
    redirect(
      `/admin/social-links/${id}/edit?error=${encodeURIComponent(result.error)}`,
    );
  }

  await prisma.socialLink.update({
    where: { id },
    data: result.data,
  });

  revalidatePath("/admin/social-links");

  redirect("/admin/social-links?updated=true");
}

export async function deleteSocialLink(id: string) {
  await requireAdmin();

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
