"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { experienceSchema } from "@/lib/validation/experience";
import { validate } from "@/lib/validation/validate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getExperienceData(formData: FormData) {
  const endDate = String(formData.get("endDate") ?? "").trim();

  return validate(experienceSchema, {
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

  const result = getExperienceData(formData);

  if (!result.success) {
    redirect(`/admin/experience/new?error=${encodeURIComponent(result.error)}`);
  }

  await prisma.experience.create({
    data: result.data,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/experience");

  redirect("/admin/experience?created=true");
}

export async function updateExperience(id: string, formData: FormData) {
  await requireAdmin();

  const result = getExperienceData(formData);

  if (!result.success) {
    redirect(
      `/admin/experience/${id}/edit?error=${encodeURIComponent(result.error)}`,
    );
  }

  await prisma.experience.update({
    where: { id },
    data: result.data,
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
