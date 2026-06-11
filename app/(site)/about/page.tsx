import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { getSetting } from "@/lib/admin/settings";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Ahmad Basheer designs, builds, and operates custom internal platforms — CRM, operations, proposal, and automation systems that run companies end-to-end.",
  path: "/about",
});

const facts = [
  { label: "Discipline", value: "Systems engineering & platform design" },
  {
    label: "Focus",
    value: "CRM, operations, proposals, automation, AI inside the workflow",
  },
  { label: "Stack", value: "TypeScript, Next.js, Postgres, Server Actions" },
  { label: "Mode", value: "Direct collaboration, fixed scope, no layers" },
  { label: "Infrastructure", value: "Designed, deployed, and operated myself" },
];

const engagement = [
  {
    step: "Scope",
    body: "We define the system on paper first — entities, workflows, decisions, integrations. What it replaces, what it must survive. Fixed scope, in writing, before code.",
  },
  {
    step: "Build",
    body: "One coherent platform, not a pile of features. Built to a standard, not a deadline — the architecture is the deliverable, the UI is its proof.",
  },
  {
    step: "Ship",
    body: "Verified on the live system before anyone is asked to trust it. Parity against the old way first, retirement of the old way second. That order is why migrations hold.",
  },
  {
    step: "Run",
    body: "I operate what I build — infrastructure, monitoring, iteration. The system keeps earning its place long after launch day.",
  },
];

export default async function AboutPage() {
  const operationStats = await getSetting("proof.operation");

  return (
    <>
      <section className="pt-44 md:pt-56 pb-20">
        <Container>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 mb-12">
            <span className="text-accent">●</span>
            <span className="h-px w-10 bg-ink-700" />
            <span>About</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-ink-50 max-w-5xl">
            I design it. I build it.
            <br />
            <span className="text-ink-500">I run it.</span>
          </h1>
        </Container>
      </section>

      <section className="py-20 border-t border-ink-800/80">
        <Container>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-6">
                01 — The work
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="space-y-8 text-ink-200 text-lg leading-[1.85] max-w-2xl">
                <p>
                  I&apos;m Ahmad Basheer. I design and build internal platforms
                  that replace the patchwork of tools most companies operate on
                  with one system that fits how the business actually works.
                </p>
                <p>
                  My work starts where spreadsheets end and where off-the-shelf
                  SaaS starts forcing the business into someone else&apos;s data
                  model. CRM platforms, proposal engines, operations cockpits,
                  automation layers — and AI placed inside the workflow where it
                  earns its seat, not bolted on for the demo.
                </p>
                <p>
                  The difference between me and an agency is the last mile: I
                  don&apos;t hand over a repository and a goodbye document. The
                  systems I build run on infrastructure I deploy and operate
                  myself, and I stay accountable for them in production. That
                  changes how you build — every shortcut is one you&apos;ll
                  personally meet again at 11pm on a game night.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 border-t border-ink-800/80">
        <Container>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-6">
                02 — The operation
              </div>
              <p className="text-ink-400 text-[15px] leading-relaxed max-w-xs">
                Live numbers from systems currently in production. Not
                projections, not case-study archaeology.
              </p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <dl className="border-t border-ink-800/80">
                {operationStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="grid grid-cols-12 gap-4 items-baseline border-b border-ink-800/80 py-6"
                  >
                    <dd className="col-span-4 md:col-span-3 font-serif text-2xl md:text-3xl text-accent tracking-tight tabular-nums">
                      {stat.value}
                    </dd>
                    <div className="col-span-8 md:col-span-9">
                      <dt className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-200">
                        {stat.label}
                      </dt>
                      {stat.detail && (
                        <p className="mt-1.5 text-sm text-ink-400 leading-relaxed">
                          {stat.detail}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 border-t border-ink-800/80">
        <Container>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-6">
                03 — How engagements run
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink-800/80 border border-ink-800/80">
                {engagement.map((e, i) => (
                  <div key={e.step} className="bg-ink-950 p-8">
                    <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-5">
                      {(i + 1).toString().padStart(2, "0")} — {e.step}
                    </div>
                    <p className="text-ink-300 text-[15px] leading-relaxed">
                      {e.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 border-t border-ink-800/80">
        <Container>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-6">
                04 — At a glance
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <dl className="divide-y divide-ink-800/80 border-y border-ink-800/80">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="py-6 grid grid-cols-12 gap-4 items-baseline"
                  >
                    <dt className="col-span-12 md:col-span-3 font-mono text-[10px] uppercase tracking-eyebrow text-ink-500">
                      {f.label}
                    </dt>
                    <dd className="col-span-12 md:col-span-9 text-ink-100 text-lg">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 border-t border-ink-800/80">
        <Container>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-6">
                05 — Working together
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <p className="font-serif text-2xl md:text-3xl text-ink-100 leading-snug max-w-2xl mb-10">
                If you&apos;re operating across nine tools held together with
                manual workflows — and the duct tape is starting to feel like
                the product — that&apos;s the conversation I&apos;m built for.
              </p>
              <Button href="/contact">Start a project</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
