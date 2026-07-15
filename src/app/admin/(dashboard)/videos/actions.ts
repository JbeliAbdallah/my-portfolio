"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getVideoData(formData: FormData) {
  const publishedAt = String(formData.get("publishedAt") ?? "").trim();

  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    youtubeUrl: String(formData.get("youtubeUrl") ?? "").trim(),
    thumbnailUrl: String(formData.get("thumbnailUrl") ?? "").trim() || null,
    publishedAt: publishedAt ? new Date(publishedAt) : null,
    isVisible: formData.get("isVisible") === "on",
  };
}

export async function createVideo(formData: FormData) {
  await prisma.video.create({
    data: getVideoData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/videos");
  redirect("/admin/videos?created=true");
}

export async function updateVideo(id: string, formData: FormData) {
  await prisma.video.update({
    where: { id },
    data: getVideoData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/videos");
  redirect("/admin/videos?updated=true");
}

export async function deleteVideo(id: string) {
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
