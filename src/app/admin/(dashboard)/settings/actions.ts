"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { settingsSchema } from "@/lib/validation/settings";
import { validate } from "@/lib/validation/validate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getSettingsData(formData: FormData) {
  return validate(settingsSchema, {
    siteName: String(formData.get("siteName") ?? ""),
    siteDescription: String(formData.get("siteDescription") ?? ""),
    logoUrl: String(formData.get("logoUrl") ?? ""),
    faviconUrl: String(formData.get("faviconUrl") ?? ""),
  });
}

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();

  const result = getSettingsData(formData);

  if (!result.success) {
    redirect(`/admin/settings?error=${encodeURIComponent(result.error)}`);
  }

  const existingSettings = await prisma.siteSettings.findFirst();

  if (existingSettings) {
    await prisma.siteSettings.update({
      where: {
        id: existingSettings.id,
      },
      data: result.data,
    });
  } else {
    await prisma.siteSettings.create({
      data: result.data,
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");

  redirect("/admin/settings?saved=true");
}
