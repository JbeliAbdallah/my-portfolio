"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { videoSchema } from "@/lib/validation/video";
import { validate } from "@/lib/validation/validate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getVideoData(formData: FormData) {
  const publishedAt = String(formData.get("publishedAt") ?? "").trim();

  return validate(videoSchema, {
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

  const result = getVideoData(formData);

  if (!result.success) {
    redirect(`/admin/videos/new?error=${encodeURIComponent(result.error)}`);
  }

  await prisma.video.create({
    data: result.data,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/videos");

  redirect("/admin/videos?created=true");
}

export async function updateVideo(id: string, formData: FormData) {
  await requireAdmin();

  const result = getVideoData(formData);

  if (!result.success) {
    redirect(
      `/admin/videos/${id}/edit?error=${encodeURIComponent(result.error)}`,
    );
  }

  await prisma.video.update({
    where: { id },
    data: result.data,
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
