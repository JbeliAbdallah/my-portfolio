"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return;
  }

  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return;
  }

  const passwordIsValid = await bcrypt.compare(password, admin.passwordHash);

  if (!passwordIsValid) {
    return;
  }

  await createSession({
    adminId: admin.id,
    email: admin.email,
  });

  redirect("/admin");
}
