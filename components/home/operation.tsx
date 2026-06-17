import { Container } from "@/components/layout/container";
import { AnimatedLines, FadeReveal } from "@/components/motion/primitives";
import { CinematicSection, SectionEyebrow } from "@/components/motion/section";
import { CountingStat } from "@/components/motion/effects";
import type { ProofStat } from "@/data/proof";

export function Operation({ operationStats }: { operationStats: ProofStat[] }) {
  return (
    <CinematicSection>
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5 mb-12 md:mb-0">
            <SectionEyebrow number="04" label="The operation" className="mb-8" />
            <AnimatedLines
              as="h2"
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink-50"
              delay={0.1}
              stagger={0.1}
              duration={0.9}
            >
              Not demos.
              {"\n"}
              Live systems.
            </AnimatedLines>
            <FadeReveal delay={0.4} className="mt-10 max-w-md">
              <p className="text-lg text-ink-300 leading-relaxed">
                The platforms on this site run real operations every day —
                events, field teams, pricing, proposals — on infrastructure I
                architect, deploy, and operate myself. When something matters,
                it doesn&apos;t get handed off.
              </p>
            </FadeReveal>
          </div>

          <div className="col-span-12 md:col-span-7 md:pl-12">
            <dl className="border-t border-ink-800/80">
              {operationStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="grid grid-cols-12 gap-4 items-baseline border-b border-ink-800/80 py-6"
                >
                  <dd className="col-span-4 md:col-span-3">
                    <CountingStat
                      value={stat.value}
                      label=""
                      delay={0.2 + i * 0.08}
                      className="font-serif text-2xl md:text-3xl text-accent tracking-tight tabular-nums"
                    />
                  </dd>
                  <div className="col-span-8 md:col-span-9">
                    <FadeReveal delay={0.25 + i * 0.08}>
                      <dt className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-200">
                        {stat.label}
                      </dt>
                      {stat.detail && (
                        <p className="mt-1.5 text-sm text-ink-400 leading-relaxed">
                          {stat.detail}
                        </p>
                      )}
                    </FadeReveal>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </CinematicSection>
  );
}
