"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveSiteSettings(formData: FormData) {
  const siteName = String(formData.get("siteName") ?? "").trim();
  const siteDescription =
    String(formData.get("siteDescription") ?? "").trim() || null;
  const logoUrl = String(formData.get("logoUrl") ?? "").trim() || null;
  const faviconUrl = String(formData.get("faviconUrl") ?? "").trim() || null;

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
