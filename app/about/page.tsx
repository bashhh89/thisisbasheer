import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Ahmad Basheer designs and builds custom internal platforms — CRM, ops, proposal, and automation systems that run companies end-to-end.",
  path: "/about",
});

const facts = [
  { label: "Discipline", value: "Systems engineering & platform design" },
  { label: "Focus", value: "CRM, operations, proposals, automation, AI tools" },
  { label: "Stack", value: "TypeScript, Next.js, Postgres, Server Actions" },
  { label: "Mode", value: "Direct collaboration, fixed scope, no layers" },
];

export default function AboutPage() {
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
            I build the systems
            <br />
            <span className="text-ink-500">companies run on.</span>
          </h1>
        </Container>
      </section>

      <section className="py-20 border-t border-ink-800/80">
        <Container>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-6">
                01 — Approach
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="space-y-8 text-ink-200 text-lg leading-[1.85] max-w-2xl">
                <p>
                  I'm Ahmad Basheer. I design and build internal platforms that
                  replace the patchwork of tools most companies operate on with
                  one system that fits how the business actually works.
                </p>
                <p>
                  My work tends to start where spreadsheets end and where
                  off-the-shelf SaaS starts forcing the business into someone
                  else's data model. CRM platforms, proposal engines, operations
                  cockpits, automation layers, and the AI-assisted tools that
                  quietly remove the work nobody wanted to do.
                </p>
                <p>
                  I take on a small number of engagements at a time. Direct
                  collaboration, clear scope, and execution to a standard — not to a
                  deadline. The point is to build something the business can run
                  on for years.
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
                02 — At a glance
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
                03 — Working together
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <p className="font-serif text-2xl md:text-3xl text-ink-100 leading-snug max-w-2xl mb-10">
                If you're operating across nine tools held together with manual
                workflows — and the duct tape is starting to feel like the
                product — that's the conversation I'm built for.
              </p>
              <Button href="/contact">Start a project</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
