"use client";

import { useState, useTransition } from "react";
import { updateSubmissionAction } from "@/app/admin/actions";
import type { ContactSubmission, ContactStatus } from "@prisma/client";

const STATUSES: ContactStatus[] = ["NEW", "READ", "REPLIED", "CLOSED", "SPAM"];

const statusColor: Record<ContactStatus, string> = {
  NEW: "text-accent border-accent/50",
  READ: "text-ink-300 border-ink-700",
  REPLIED: "text-emerald-400 border-emerald-400/40",
  CLOSED: "text-ink-500 border-ink-800",
  SPAM: "text-red-400 border-red-400/40",
};

export function InboxRow({ submission }: { submission: ContactSubmission }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const setStatus = (status: ContactStatus) =>
    startTransition(() => updateSubmissionAction(submission.id, status));

  return (
    <div className="border-b border-ink-800/80">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left grid grid-cols-12 gap-4 items-baseline py-5 hover:bg-ink-900/30 transition-colors duration-200"
      >
        <span
          className={`col-span-2 lg:col-span-1 font-mono text-[10px] uppercase tracking-eyebrow border px-2 py-1 text-center ${statusColor[submission.status]}`}
        >
          {submission.status}
        </span>
        <span className="col-span-4 lg:col-span-3 text-ink-100 truncate pl-2">
          {submission.name}
        </span>
        <span className="col-span-3 font-mono text-xs text-ink-400 truncate hidden lg:block">
          {submission.email}
        </span>
        <span className="col-span-4 lg:col-span-3 text-ink-400 text-sm truncate">
          {submission.company || "—"}
        </span>
        <span className="col-span-2 font-mono text-[10px] text-ink-500 text-right tabular-nums">
          {new Date(submission.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </button>

      {open && (
        <div className="pb-8 pl-2 pr-2 space-y-6">
          <div className="grid md:grid-cols-3 gap-6 font-mono text-xs text-ink-300">
            <div>
              <div className="text-[10px] uppercase tracking-eyebrow text-ink-500 mb-1.5">
                Email
              </div>
              <a href={`mailto:${submission.email}`} className="hover:text-accent">
                {submission.email}
              </a>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-eyebrow text-ink-500 mb-1.5">
                Budget
              </div>
              {submission.budget || "—"}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-eyebrow text-ink-500 mb-1.5">
                Received
              </div>
              {new Date(submission.createdAt).toLocaleString()}
            </div>
          </div>

          <p className="text-ink-200 leading-relaxed max-w-3xl whitespace-pre-wrap">
            {submission.message}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                disabled={pending || s === submission.status}
                onClick={() => setStatus(s)}
                className={`font-mono text-[10px] uppercase tracking-eyebrow border px-3 py-1.5 transition-colors duration-200 disabled:opacity-40 ${
                  s === submission.status
                    ? statusColor[s]
                    : "text-ink-400 border-ink-800 hover:text-ink-100 hover:border-ink-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
