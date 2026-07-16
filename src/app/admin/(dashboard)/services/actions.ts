"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validation/service";
import { validate } from "@/lib/validation/validate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getServiceData(formData: FormData) {
  return validate(serviceSchema, {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    icon: String(formData.get("icon") ?? ""),
    order: Number(formData.get("order") ?? 0),
    isVisible: formData.get("isVisible") === "on",
  });
}

export async function createService(formData: FormData) {
  await requireAdmin();

  const result = getServiceData(formData);

  if (!result.success) {
    redirect(`/admin/services/new?error=${encodeURIComponent(result.error)}`);
  }

  await prisma.service.create({
    data: result.data,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/services");

  redirect("/admin/services?created=true");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();

  const result = getServiceData(formData);

  if (!result.success) {
    redirect(
      `/admin/services/${id}/edit?error=${encodeURIComponent(result.error)}`,
    );
  }

  await prisma.service.update({
    where: { id },
    data: result.data,
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
