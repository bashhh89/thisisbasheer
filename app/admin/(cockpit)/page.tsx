import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAllProjects } from "@/lib/content/projects";
import { getAllArticles } from "@/lib/content/writing";

export const dynamic = "force-dynamic";

async function safeCount<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export default async function CockpitOverview() {
  const [newLeads, totalLeads, conversations, projects, articles] =
    await Promise.all([
      safeCount(
        () => prisma.contactSubmission.count({ where: { status: "NEW" } }),
        0
      ),
      safeCount(() => prisma.contactSubmission.count(), 0),
      safeCount(() => prisma.aiConversation.count(), 0),
      getAllProjects(),
      getAllArticles(),
    ]);

  const tiles = [
    {
      value: String(newLeads),
      label: "New leads",
      href: "/admin/inbox",
      accent: newLeads > 0,
    },
    { value: String(totalLeads), label: "Total submissions", href: "/admin/inbox" },
    { value: String(projects.length), label: "Case studies", href: "/work" },
    { value: String(articles.length), label: "Articles", href: "/writing" },
    { value: String(conversations), label: "AI conversations", href: "/admin/assistant" },
  ];

  return (
    <div className="px-10 py-12">
      <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 mb-10">
        <span className="text-accent">●</span>
        <span className="h-px w-10 bg-ink-700" />
        <span>Overview</span>
      </div>
      <h1 className="font-serif text-4xl md:text-5xl text-ink-50 tracking-tight mb-16">
        Flight deck.
      </h1>

      <dl className="grid grid-cols-2 lg:grid-cols-5 border-t border-l border-ink-800/80">
        {tiles.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className="border-r border-b border-ink-800/80 p-8 hover:bg-ink-900/40 transition-colors duration-200"
          >
            <dd
              className={`font-serif text-4xl tracking-tight tabular-nums ${
                t.accent ? "text-accent" : "text-ink-50"
              }`}
            >
              {t.value}
            </dd>
            <dt className="mt-3 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
              {t.label}
            </dt>
          </Link>
        ))}
      </dl>

      <div className="mt-16 grid md:grid-cols-2 gap-px bg-ink-800/80 border border-ink-800/80 max-w-3xl">
        <Link
          href="/admin/site"
          className="bg-ink-950 p-8 hover:bg-ink-900/40 transition-colors duration-200"
        >
          <h2 className="font-serif text-xl text-ink-50 mb-2">Site controls</h2>
          <p className="text-ink-400 text-sm leading-relaxed">
            Edit hero copy, availability, and the proof ledgers. Changes go
            live without a deploy.
          </p>
        </Link>
        <Link
          href="/admin/assistant"
          className="bg-ink-950 p-8 hover:bg-ink-900/40 transition-colors duration-200"
        >
          <h2 className="font-serif text-xl text-ink-50 mb-2">Assistant</h2>
          <p className="text-ink-400 text-sm leading-relaxed">
            Draft, rewrite, and think — on your own models, in your own
            cockpit.
          </p>
        </Link>
      </div>
    </div>
  );
}
