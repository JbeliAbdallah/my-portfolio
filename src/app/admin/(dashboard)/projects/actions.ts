"use server";

import { projectSchema } from "@/lib/validation/project";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getProjectData(formData: FormData) {
  return projectSchema.parse({
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

  const data = getProjectData(formData);

  await prisma.project.create({ data });

  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  redirect("/admin/projects?created=true");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();

  const data = getProjectData(formData);

  await prisma.project.update({
    where: { id },
    data,
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
