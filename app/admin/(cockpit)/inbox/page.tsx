import { prisma } from "@/lib/prisma";
import { InboxRow } from "@/components/admin/inbox-row";
import type { ContactSubmission } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function InboxPage() {
  let submissions: ContactSubmission[] = [];
  let dbError = false;
  try {
    submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
  } catch {
    dbError = true;
  }

  return (
    <div className="px-10 py-12">
      <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 mb-10">
        <span className="text-accent">●</span>
        <span className="h-px w-10 bg-ink-700" />
        <span>Inbox — {submissions.length} submissions</span>
      </div>
      <h1 className="font-serif text-4xl md:text-5xl text-ink-50 tracking-tight mb-16">
        Leads.
      </h1>

      {dbError ? (
        <p className="text-ink-400">Database unreachable — check DATABASE_URL.</p>
      ) : submissions.length === 0 ? (
        <p className="text-ink-400">
          No submissions yet. The /contact form lands here.
        </p>
      ) : (
        <div className="border-t border-ink-800/80">
          {submissions.map((s) => (
            <InboxRow key={s.id} submission={s} />
          ))}
        </div>
      )}
    </div>
  );
}
