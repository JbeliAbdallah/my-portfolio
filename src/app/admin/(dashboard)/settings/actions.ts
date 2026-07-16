"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { settingsSchema } from "@/lib/validation/settings";

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();

  const { siteName, siteDescription, logoUrl, faviconUrl } =
    settingsSchema.parse({
      siteName: String(formData.get("siteName") ?? ""),
      siteDescription: String(formData.get("siteDescription") ?? ""),
      logoUrl: String(formData.get("logoUrl") ?? ""),
      faviconUrl: String(formData.get("faviconUrl") ?? ""),
    });

  if (!siteName) {
    redirect("/admin/settings?error=missing-site-name");
  }

  const existingSettings = await prisma.siteSettings.findFirst();

  if (existingSettings) {
    await prisma.siteSettings.update({
      where: {
        id: existingSettings.id,
      },
      data: {
        siteName,
        siteDescription,
        logoUrl,
        faviconUrl,
      },
    });
  } else {
    await prisma.siteSettings.create({
      data: {
        siteName,
        siteDescription,
        logoUrl,
        faviconUrl,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");

  redirect("/admin/settings?saved=true");
}
