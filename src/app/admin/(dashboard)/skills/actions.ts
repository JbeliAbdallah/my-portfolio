"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getSkillData(formData: FormData) {
  const levelValue = String(formData.get("level") ?? "").trim();

  return {
    name: String(formData.get("name") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim() || null,
    level: levelValue ? Number(levelValue) : null,
    icon: String(formData.get("icon") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0),
    isVisible: formData.get("isVisible") === "on",
  };
}

export async function createSkill(formData: FormData) {
  await prisma.skill.create({ data: getSkillData(formData) });
  revalidatePath("/admin");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  await prisma.skill.update({
    where: { id },
    data: getSkillData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/admin/skills");
}
