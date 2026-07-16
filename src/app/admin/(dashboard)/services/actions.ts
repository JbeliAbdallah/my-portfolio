"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { serviceSchema } from "@/lib/validation/service";

function getServiceData(formData: FormData) {
  return serviceSchema.parse({
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    icon: String(formData.get("icon") ?? ""),
    order: Number(formData.get("order") ?? 0),
    isVisible: formData.get("isVisible") === "on",
  });
}

export async function createService(formData: FormData) {
  await requireAdmin();

  await prisma.service.create({
    data: getServiceData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/services");

  redirect("/admin/services?created=true");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();

  await prisma.service.update({
    where: { id },
    data: getServiceData(formData),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/services");

  redirect("/admin/services?updated=true");
}

export async function deleteService(id: string) {
  await requireAdmin();

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
