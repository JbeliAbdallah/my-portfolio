"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { settingsSchema } from "@/lib/validation/settings";
import { validate } from "@/lib/validation/validate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveUploadedFile } from "@/lib/upload";

function getSettingsData(formData: FormData) {
  return validate(settingsSchema, {
    siteName: String(formData.get("siteName") ?? ""),
    siteDescription: String(formData.get("siteDescription") ?? ""),
  });
}

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();

  const result = getSettingsData(formData);

  if (!result.success) {
    redirect(`/admin/settings?error=${encodeURIComponent(result.error)}`);
  }

  const logo = formData.get("logo") as File | null;
  const favicon = formData.get("favicon") as File | null;

  const logoUrl = await saveUploadedFile(logo, "logos");
  const faviconUrl = await saveUploadedFile(favicon, "favicons");

  console.log({
    logoUrl,
    faviconUrl,
  });

  const existingSettings = await prisma.siteSettings.findFirst();

  const data = {
    ...result.data,
    ...(logoUrl && { logoUrl }),
    ...(faviconUrl && { faviconUrl }),
  };

  if (existingSettings) {
    await prisma.siteSettings.update({
      where: {
        id: existingSettings.id,
      },
      data,
    });
  } else {
    await prisma.siteSettings.create({
      data,
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");

  redirect("/admin/settings?saved=true");
}
