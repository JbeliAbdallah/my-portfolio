"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validation/project";
import { validate } from "@/lib/validation/validate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveUploadedFile } from "@/lib/upload";

function getProjectData(formData: FormData) {
  return validate(projectSchema, {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    description: String(formData.get("description") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    liveUrl: String(formData.get("liveUrl") ?? ""),
    githubUrl: String(formData.get("githubUrl") ?? ""),
    technologies: String(formData.get("technologies") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    featured: formData.get("featured") === "on",
    isVisible: formData.get("isVisible") === "on",
  });
}

export async function createProject(formData: FormData) {
  await requireAdmin();

  const result = getProjectData(formData);

  if (!result.success) {
    redirect(`/admin/projects/new?error=${encodeURIComponent(result.error)}`);
  }

  const image = formData.get("image") as File | null;
  const imageUrl = await saveUploadedFile(image, "projects");

  await prisma.project.create({
    data: {
      ...result.data,
      ...(imageUrl && { imageUrl }),
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  redirect("/admin/projects?created=true");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();

  const result = getProjectData(formData);

  if (!result.success) {
    redirect(
      `/admin/projects/${id}/edit?error=${encodeURIComponent(result.error)}`,
    );
  }

  const image = formData.get("image") as File | null;
  const imageUrl = await saveUploadedFile(image, "projects");

  await prisma.project.update({
    where: { id },
    data: {
      ...result.data,
      ...(imageUrl && { imageUrl }),
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  redirect("/admin/projects?updated=true");
}

export async function deleteProject(id: string) {
  await requireAdmin();

  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/projects");
  } catch {
    redirect("/admin/projects?error=delete");
  }

  redirect("/admin/projects?deleted=true");
}
