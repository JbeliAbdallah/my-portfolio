"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { educationSchema } from "@/lib/validation/education";

function getEducationData(formData: FormData) {
  const startDate = String(formData.get("startDate") ?? "").trim();
  const endDate = String(formData.get("endDate") ?? "").trim();

  return educationSchema.parse({
    institution: String(formData.get("institution") ?? ""),
    degree: String(formData.get("degree") ?? ""),
    field: String(formData.get("field") ?? ""),
    description: String(formData.get("description") ?? ""),
    startDate: startDate ? new Date(startDate) : null,
    endDate: endDate ? new Date(endDate) : null,
    order: Number(formData.get("order") ?? 0),
    isVisible: formData.get("isVisible") === "on",
  });
}

export async function createEducation(formData: FormData) {
  await requireAdmin();

  await prisma.education.create({
    data: getEducationData(formData),
  });

  revalidatePath("/admin/education");

  redirect("/admin/education?created=true");
}

export async function updateEducation(id: string, formData: FormData) {
  await requireAdmin();

  await prisma.education.update({
    where: { id },
    data: getEducationData(formData),
  });

  revalidatePath("/admin/education");

  redirect("/admin/education?updated=true");
}

export async function deleteEducation(id: string) {
  await requireAdmin();

  try {
    await prisma.education.delete({
      where: { id },
    });

    revalidatePath("/admin/education");
  } catch {
    redirect("/admin/education?error=delete");
  }

  redirect("/admin/education?deleted=true");
}
