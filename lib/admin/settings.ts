import { prisma } from "@/lib/prisma";
import { heroProof, operationStats, type ProofStat } from "@/data/proof";

/**
 * Cockpit-controlled site content. Every key has a code-side default, so the
 * public site renders correctly even when the DB is unreachable (e.g. at
 * build time) or a key was never edited.
 */
export const settingDefaults = {
  "hero.eyebrow": "Ahmad Basheer — Systems builder & operator",
  "hero.subline":
    "Custom platforms for operations, sales, and service — designed, built, and operated end-to-end. The systems on this site run live businesses every day.",
  "site.availability": "Available for new engagements",
  "proof.hero": heroProof as ProofStat[],
  "proof.operation": operationStats as ProofStat[],
  "ai.models": ["minimax-m2", "glm-4.6", "kimi-k2"] as string[],
  "ai.defaultModel": "minimax-m2",
  "ai.systemPrompt":
    "You are the assistant inside Ahmad Basheer's cockpit at basheer.app. Be direct, sharp, and useful — no fluff, no corporate tone. You help with site content, drafting, and operations.",
} as const;

export type SettingKey = keyof typeof settingDefaults;
export type SettingValue<K extends SettingKey> = (typeof settingDefaults)[K];

export async function getSetting<K extends SettingKey>(
  key: K
): Promise<SettingValue<K>> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key } });
    if (row) return row.value as SettingValue<K>;
  } catch {
    // DB unreachable — fall through to defaults
  }
  return settingDefaults[key];
}

export async function getAllSettings(): Promise<Record<SettingKey, unknown>> {
  const result = { ...settingDefaults } as Record<SettingKey, unknown>;
  try {
    const rows = await prisma.siteSetting.findMany();
    for (const row of rows) {
      if (row.key in settingDefaults) {
        result[row.key as SettingKey] = row.value;
      }
    }
  } catch {
    // defaults already in place
  }
  return result;
}

export async function setSetting(key: SettingKey, value: unknown): Promise<void> {
  await prisma.siteSetting.upsert({
    where: { key },
    create: { key, value: value as object },
    update: { value: value as object },
  });
}

export async function resetSetting(key: SettingKey): Promise<void> {
  await prisma.siteSetting.deleteMany({ where: { key } });
}
