import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/common/reveal";
import { capabilities } from "@/data/capabilities";

export function Capabilities() {
  return (
    <Section bordered>
      <Container>
        <SectionHeader
          number="03"
          eyebrow="Capabilities"
          title={
            <>
              What I build,
              <br />
              <span className="text-ink-500">end to end.</span>
            </>
          }
        />

        {/* Editorial index — full-width ledger rows */}
        <div className="mt-20 border-t border-ink-800/80">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.id} delay={i * 0.04}>
              <div className="group grid grid-cols-12 gap-4 md:gap-8 items-baseline border-b border-ink-800/80 py-8 md:py-10 transition-colors duration-300 hover:border-ink-600">
                <div className="col-span-2 md:col-span-1 font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
                <h3 className="col-span-10 md:col-span-4 font-serif text-2xl md:text-3xl text-ink-50 leading-tight tracking-tight group-hover:text-accent transition-colors duration-500">
                  {cap.title}
                </h3>
                <p className="col-span-12 col-start-3 md:col-span-7 md:col-start-6 text-ink-400 leading-relaxed text-[15px] max-w-2xl">
                  {cap.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
