"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getEducationData(formData: FormData) {
  const startDate = String(formData.get("startDate") ?? "").trim();
  const endDate = String(formData.get("endDate") ?? "").trim();

  return {
    institution: String(formData.get("institution") ?? "").trim(),
    degree: String(formData.get("degree") ?? "").trim(),
    field: String(formData.get("field") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    startDate: startDate ? new Date(startDate) : null,
    endDate: endDate ? new Date(endDate) : null,
    order: Number(formData.get("order") ?? 0),
    isVisible: formData.get("isVisible") === "on",
  };
}

export async function createEducation(formData: FormData) {
  await prisma.education.create({
    data: getEducationData(formData),
  });

  revalidatePath("/admin/education");
  redirect("/admin/education?created=true");
}

export async function updateEducation(id: string, formData: FormData) {
  await prisma.education.update({
    where: { id },
    data: getEducationData(formData),
  });

  revalidatePath("/admin/education");
  redirect("/admin/education?updated=true");
}

export async function deleteEducation(id: string) {
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
