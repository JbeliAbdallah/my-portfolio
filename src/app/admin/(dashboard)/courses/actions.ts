"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { courseSchema } from "@/lib/validation/course";
import { validate } from "@/lib/validation/validate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveUploadedFile } from "@/lib/upload";

function getCourseData(formData: FormData) {
  return validate(courseSchema, {
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

  const result = getCourseData(formData);

  if (!result.success) {
    redirect(`/admin/courses/new?error=${encodeURIComponent(result.error)}`);
  }

  const image = formData.get("image") as File | null;
  const imageUrl = await saveUploadedFile(image, "courses");

  await prisma.course.create({
    data: {
      ...result.data,
      ...(imageUrl && { imageUrl }),
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/courses");

  redirect("/admin/courses?created=true");
}

export async function updateCourse(id: string, formData: FormData) {
  await requireAdmin();

  const result = getCourseData(formData);

  if (!result.success) {
    redirect(
      `/admin/courses/${id}/edit?error=${encodeURIComponent(result.error)}`,
    );
  }

  const image = formData.get("image") as File | null;
  const imageUrl = await saveUploadedFile(image, "courses");

  await prisma.course.update({
    where: { id },
    data: {
      ...result.data,
      ...(imageUrl && { imageUrl }),
    },
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
