"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getExperienceData(formData: FormData) {
  const endDate = String(formData.get("endDate") ?? "").trim();

  return {
    company: String(formData.get("company") ?? "").trim(),
    position: String(formData.get("position") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    location: String(formData.get("location") ?? "").trim() || null,
    startDate: new Date(String(formData.get("startDate"))),
    endDate: endDate ? new Date(endDate) : null,
    isCurrent: formData.get("isCurrent") === "on",
    order: Number(formData.get("order") ?? 0),
    isVisible: formData.get("isVisible") === "on",
  };
}

export async function createExperience(formData: FormData) {
  await prisma.experience.create({
    data: getExperienceData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/experience");
  redirect("/admin/experience?created=true");
}

export async function updateExperience(id: string, formData: FormData) {
  await prisma.experience.update({
    where: { id },
    data: getExperienceData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/experience");
  redirect("/admin/experience?updated=true");
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/experience");
  } catch {
    redirect("/admin/experience?error=delete");
  }

  redirect("/admin/experience?deleted=true");
}
