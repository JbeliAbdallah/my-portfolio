"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function markMessageAsRead(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${id}`);
}

export async function markMessageAsUnread(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: false },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${id}`);

  redirect("/admin/messages?updated=unread");
}

export async function deleteMessage(id: string) {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/messages");
  } catch {
    redirect("/admin/messages?error=delete");
  }

  redirect("/admin/messages?deleted=true");
}
