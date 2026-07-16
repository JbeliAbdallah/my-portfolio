"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { videoSchema } from "@/lib/validation/video";

function getVideoData(formData: FormData) {
  const publishedAt = String(formData.get("publishedAt") ?? "").trim();

  return videoSchema.parse({
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    youtubeUrl: String(formData.get("youtubeUrl") ?? ""),
    thumbnailUrl: String(formData.get("thumbnailUrl") ?? ""),
    publishedAt: publishedAt ? new Date(publishedAt) : null,
    isVisible: formData.get("isVisible") === "on",
  });
}

export async function createVideo(formData: FormData) {
  await requireAdmin();

  await prisma.video.create({
    data: getVideoData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/videos");

  redirect("/admin/videos?created=true");
}

export async function updateVideo(id: string, formData: FormData) {
  await requireAdmin();

  await prisma.video.update({
    where: { id },
    data: getVideoData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/videos");

  redirect("/admin/videos?updated=true");
}

export async function deleteVideo(id: string) {
  await requireAdmin();

  try {
    await prisma.video.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/videos");
  } catch {
    redirect("/admin/videos?error=delete");
  }

  redirect("/admin/videos?deleted=true");
}
