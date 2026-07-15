"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getCourseData(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
    courseUrl: String(formData.get("courseUrl") ?? "").trim() || null,
    isPublished: formData.get("isPublished") === "on",
  };
}

export async function createCourse(formData: FormData) {
  await prisma.course.create({
    data: getCourseData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/courses");
  redirect("/admin/courses?created=true");
}

export async function updateCourse(id: string, formData: FormData) {
  await prisma.course.update({
    where: { id },
    data: getCourseData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/courses");
  redirect("/admin/courses?updated=true");
}

export async function deleteCourse(id: string) {
  try {
    await prisma.course.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/courses");
  } catch {
    redirect("/admin/courses?error=delete");
  }

  redirect("/admin/courses?deleted=true");
}
