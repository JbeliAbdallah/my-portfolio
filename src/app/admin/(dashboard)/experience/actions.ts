"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { experienceSchema } from "@/lib/validation/experience";

function getExperienceData(formData: FormData) {
  const endDate = String(formData.get("endDate") ?? "").trim();

  return experienceSchema.parse({
    company: String(formData.get("company") ?? ""),
    position: String(formData.get("position") ?? ""),
    description: String(formData.get("description") ?? ""),
    location: String(formData.get("location") ?? ""),
    startDate: new Date(String(formData.get("startDate"))),
    endDate: endDate ? new Date(endDate) : null,
    isCurrent: formData.get("isCurrent") === "on",
    order: Number(formData.get("order") ?? 0),
    isVisible: formData.get("isVisible") === "on",
  });
}
export async function createExperience(formData: FormData) {
  await requireAdmin();

  await prisma.experience.create({
    data: getExperienceData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/experience");

  redirect("/admin/experience?created=true");
}

export async function updateExperience(id: string, formData: FormData) {
  await requireAdmin();

  await prisma.experience.update({
    where: { id },
    data: getExperienceData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/experience");

  redirect("/admin/experience?updated=true");
}

export async function deleteExperience(id: string) {
  await requireAdmin();

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
