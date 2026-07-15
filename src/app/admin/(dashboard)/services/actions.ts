"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getServiceData(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    icon: String(formData.get("icon") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0),
    isVisible: formData.get("isVisible") === "on",
  };
}

export async function createService(formData: FormData) {
  await prisma.service.create({
    data: getServiceData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/services");
  redirect("/admin/services?created=true");
}

export async function updateService(id: string, formData: FormData) {
  await prisma.service.update({
    where: { id },
    data: getServiceData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/services");
  redirect("/admin/services?updated=true");
}

export async function deleteService(id: string) {
  try {
    await prisma.service.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/services");
  } catch {
    redirect("/admin/services?error=delete");
  }

  redirect("/admin/services?deleted=true");
}
