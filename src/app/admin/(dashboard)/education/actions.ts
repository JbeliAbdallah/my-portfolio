"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { educationSchema } from "@/lib/validation/education";
import { validate } from "@/lib/validation/validate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getEducationData(formData: FormData) {
  const startDate = String(formData.get("startDate") ?? "").trim();
  const endDate = String(formData.get("endDate") ?? "").trim();

  return validate(educationSchema, {
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

  const result = getEducationData(formData);

  if (!result.success) {
    redirect(`/admin/education/new?error=${encodeURIComponent(result.error)}`);
  }

  await prisma.education.create({
    data: result.data,
  });

  revalidatePath("/admin/education");

  redirect("/admin/education?created=true");
}

export async function updateEducation(id: string, formData: FormData) {
  await requireAdmin();

  const result = getEducationData(formData);

  if (!result.success) {
    redirect(
      `/admin/education/${id}/edit?error=${encodeURIComponent(result.error)}`,
    );
  }

  await prisma.education.update({
    where: { id },
    data: result.data,
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
