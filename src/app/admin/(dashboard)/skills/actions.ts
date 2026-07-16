"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { skillSchema } from "@/lib/validation/skill";
import { validate } from "@/lib/validation/validate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getSkillData(formData: FormData) {
  const levelValue = String(formData.get("level") ?? "").trim();

  return validate(skillSchema, {
    name: String(formData.get("name") ?? ""),
    category: String(formData.get("category") ?? ""),
    level: levelValue === "" ? null : Number(levelValue),
    icon: String(formData.get("icon") ?? ""),
    order: Number(formData.get("order") ?? 0),
    isVisible: formData.get("isVisible") === "on",
  });
}

export async function createSkill(formData: FormData) {
  await requireAdmin();

  const result = getSkillData(formData);

  if (!result.success) {
    redirect(`/admin/skills/new?error=${encodeURIComponent(result.error)}`);
  }

  await prisma.skill.create({
    data: result.data,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/skills");

  redirect("/admin/skills?created=true");
}

export async function updateSkill(id: string, formData: FormData) {
  await requireAdmin();

  const result = getSkillData(formData);

  if (!result.success) {
    redirect(
      `/admin/skills/${id}/edit?error=${encodeURIComponent(result.error)}`,
    );
  }

  await prisma.skill.update({
    where: { id },
    data: result.data,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/skills");

  redirect("/admin/skills?updated=true");
}

export async function deleteSkill(id: string) {
  await requireAdmin();

  try {
    await prisma.skill.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/skills");
  } catch {
    redirect("/admin/skills?error=delete");
  }

  redirect("/admin/skills?deleted=true");
}
