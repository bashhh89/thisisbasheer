import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/common/reveal";

export function Positioning() {
  return (
    <Section bordered spacing="loose">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3 mb-12 md:mb-0">
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
              <span className="text-accent">01</span>
              <span className="h-px w-8 bg-ink-700" />
              <span>Positioning</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] tracking-tight text-ink-100 max-w-4xl">
                Most businesses don't need more tools.
                <br />
                <span className="text-ink-500">
                  They need one system that makes the whole operation make sense.
                </span>
              </p>
              <p className="mt-12 max-w-2xl text-lg text-ink-300 leading-relaxed">
                I design and build internal platforms that replace fragmented
                workflows with a connected operational backbone — the kind of
                system a company can run on for years, not the kind that gets
                replaced every other quarter.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
