"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getProjectData(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
    liveUrl: String(formData.get("liveUrl") ?? "").trim() || null,
    githubUrl: String(formData.get("githubUrl") ?? "").trim() || null,
    technologies: String(formData.get("technologies") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    featured: formData.get("featured") === "on",
    isVisible: formData.get("isVisible") === "on",
  };
}

export async function createProject(formData: FormData) {
  const data = getProjectData(formData);

  await prisma.project.create({ data });

  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  redirect("/admin/projects?created=true");
}

export async function updateProject(id: string, formData: FormData) {
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
