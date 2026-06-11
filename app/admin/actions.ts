"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  verifyPassword,
  setSessionCookie,
  clearSessionCookie,
  isAuthenticated,
} from "@/lib/admin/auth";
import {
  setSetting,
  resetSetting,
  type SettingKey,
} from "@/lib/admin/settings";
import type { ContactStatus } from "@prisma/client";

async function requireAdmin(): Promise<void> {
  if (!(await isAuthenticated())) redirect("/admin/login");
}

export async function loginAction(
  _prev: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    return { error: "Wrong password." };
  }
  await setSessionCookie();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function saveSettingAction(
  key: SettingKey,
  value: unknown
): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();
  try {
    await setSetting(key, value);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed" };
  }
}

export async function resetSettingAction(
  key: SettingKey
): Promise<{ ok: boolean }> {
  await requireAdmin();
  await resetSetting(key);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function updateSubmissionAction(
  id: string,
  status: ContactStatus,
  notes?: string
): Promise<void> {
  await requireAdmin();
  await prisma.contactSubmission.update({
    where: { id },
    data: { status, ...(notes !== undefined ? { notes } : {}) },
  });
  revalidatePath("/admin/inbox");
}

export async function deleteConversationAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.aiConversation.delete({ where: { id } });
  revalidatePath("/admin/assistant");
}
