"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { courseSchema } from "@/lib/validation/course";

function getCourseData(formData: FormData) {
  return courseSchema.parse({
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    description: String(formData.get("description") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    courseUrl: String(formData.get("courseUrl") ?? ""),
    isPublished: formData.get("isPublished") === "on",
  });
}

export async function createCourse(formData: FormData) {
  await requireAdmin();

  await prisma.course.create({
    data: getCourseData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/courses");

  redirect("/admin/courses?created=true");
}

export async function updateCourse(id: string, formData: FormData) {
  await requireAdmin();

  await prisma.course.update({
    where: { id },
    data: getCourseData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/courses");

  redirect("/admin/courses?updated=true");
}

export async function deleteCourse(id: string) {
  await requireAdmin();

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
