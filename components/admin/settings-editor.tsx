"use client";

import { useState, useTransition } from "react";
import { saveSettingAction, resetSettingAction } from "@/app/admin/actions";
import type { SettingKey } from "@/lib/admin/settings";

type FieldDef = {
  key: SettingKey;
  label: string;
  hint?: string;
  kind: "text" | "textarea" | "json";
};

const FIELDS: FieldDef[] = [
  {
    key: "hero.eyebrow",
    label: "Hero eyebrow",
    hint: "The small mono label above the headline",
    kind: "text",
  },
  {
    key: "hero.subline",
    label: "Hero subline",
    hint: "The paragraph under the headline",
    kind: "textarea",
  },
  {
    key: "site.availability",
    label: "Availability line",
    hint: "Shown in the footer next to the accent dot",
    kind: "text",
  },
  {
    key: "proof.hero",
    label: "Hero proof ledger",
    hint: 'JSON array of { "value", "label" } — the four stats under the hero',
    kind: "json",
  },
  {
    key: "proof.operation",
    label: "Operation ledger",
    hint: 'JSON array of { "value", "label", "detail" } — home + about',
    kind: "json",
  },
  {
    key: "ai.models",
    label: "Assistant models",
    hint: 'JSON array of model names available on your endpoint, e.g. ["minimax-m2", "glm-4.6", "kimi-k2"]',
    kind: "json",
  },
  {
    key: "ai.defaultModel",
    label: "Default model",
    kind: "text",
  },
  {
    key: "ai.systemPrompt",
    label: "Assistant system prompt",
    kind: "textarea",
  },
];

function toEditable(value: unknown, kind: FieldDef["kind"]): string {
  if (kind === "json") return JSON.stringify(value, null, 2);
  return String(value ?? "");
}

export function SettingsEditor({
  initial,
}: {
  initial: Record<string, unknown>;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      FIELDS.map((f) => [f.key, toEditable(initial[f.key], f.kind)])
    )
  );
  const [status, setStatus] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();

  const save = (field: FieldDef) => {
    let parsed: unknown = values[field.key];
    if (field.kind === "json") {
      try {
        parsed = JSON.parse(values[field.key]);
      } catch {
        setStatus((s) => ({ ...s, [field.key]: "Invalid JSON" }));
        return;
      }
    }
    startTransition(async () => {
      const res = await saveSettingAction(field.key, parsed);
      setStatus((s) => ({
        ...s,
        [field.key]: res.ok ? "Saved" : res.error ?? "Failed",
      }));
    });
  };

  const reset = (field: FieldDef) => {
    startTransition(async () => {
      await resetSettingAction(field.key);
      setStatus((s) => ({ ...s, [field.key]: "Reset to default — reload to see it" }));
    });
  };

  return (
    <div className="space-y-12 max-w-3xl">
      {FIELDS.map((field) => (
        <div key={field.key} className="border-t border-ink-800/80 pt-8">
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <label
              htmlFor={field.key}
              className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-200"
            >
              {field.label}
            </label>
            <span className="font-mono text-[10px] text-ink-600">
              {field.key}
            </span>
          </div>
          {field.hint && (
            <p className="text-ink-500 text-xs mb-4">{field.hint}</p>
          )}

          {field.kind === "text" ? (
            <input
              id={field.key}
              value={values[field.key]}
              onChange={(e) =>
                setValues((v) => ({ ...v, [field.key]: e.target.value }))
              }
              className="w-full bg-transparent border border-ink-800 px-4 py-3 text-ink-100 focus:border-accent focus:outline-none transition-colors duration-300"
            />
          ) : (
            <textarea
              id={field.key}
              value={values[field.key]}
              onChange={(e) =>
                setValues((v) => ({ ...v, [field.key]: e.target.value }))
              }
              rows={field.kind === "json" ? 10 : 4}
              className={`w-full bg-transparent border border-ink-800 px-4 py-3 text-ink-100 focus:border-accent focus:outline-none transition-colors duration-300 ${
                field.kind === "json" ? "font-mono text-sm" : ""
              }`}
            />
          )}

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              disabled={pending}
              onClick={() => save(field)}
              className="font-mono text-[10px] uppercase tracking-eyebrow border border-accent/60 text-accent px-4 py-2 hover:bg-accent hover:text-ink-950 transition-colors duration-300 disabled:opacity-50"
            >
              Save
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => reset(field)}
              className="font-mono text-[10px] uppercase tracking-eyebrow border border-ink-800 text-ink-400 px-4 py-2 hover:border-ink-600 hover:text-ink-100 transition-colors duration-300 disabled:opacity-50"
            >
              Reset
            </button>
            {status[field.key] && (
              <span
                className={`font-mono text-[10px] uppercase tracking-eyebrow ${
                  status[field.key] === "Saved"
                    ? "text-emerald-400"
                    : status[field.key].startsWith("Reset")
                      ? "text-ink-400"
                      : "text-red-400"
                }`}
              >
                {status[field.key]}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
