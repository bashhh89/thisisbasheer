import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/common/reveal";
import { getSetting } from "@/lib/admin/settings";

export async function Operation() {
  const operationStats = await getSetting("proof.operation");

  return (
    <Section bordered>
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5 mb-12 md:mb-0">
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 mb-8">
              <span className="text-accent">04</span>
              <span className="h-px w-8 bg-ink-700" />
              <span>The operation</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink-50">
              Not demos.
              <br />
              <span className="text-ink-500">Live systems.</span>
            </h2>
            <p className="mt-10 max-w-md text-lg text-ink-300 leading-relaxed">
              The platforms on this site run real operations every day —
              events, field teams, pricing, proposals — on infrastructure I
              architect, deploy, and operate myself. When something matters,
              it doesn&apos;t get handed off.
            </p>
          </div>

          <div className="col-span-12 md:col-span-7 md:pl-12">
            <dl className="border-t border-ink-800/80">
              {operationStats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.04}>
                  <div className="grid grid-cols-12 gap-4 items-baseline border-b border-ink-800/80 py-6">
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
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
