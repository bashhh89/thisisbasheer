import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/common/reveal";
import { capabilities } from "@/data/capabilities";

export function Capabilities() {
  return (
    <Section bordered>
      <Container>
        <SectionHeader
          number="02"
          eyebrow="Capabilities"
          title={
            <>
              What I build,
              <br />
              <span className="text-ink-500">end to end.</span>
            </>
          }
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.id} delay={i * 0.06}>
              <div className="border-t border-ink-800/80 lg:[&:nth-child(-n+3)]:border-t md:[&:nth-child(-n+2)]:lg:border-t md:border-l-0 lg:border-l lg:[&:nth-child(3n+1)]:border-l-0 lg:border-ink-800/80 px-0 lg:px-8 py-10">
                <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-6">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
                <h3 className="font-serif text-2xl text-ink-50 mb-4 leading-tight">
                  {cap.title}
                </h3>
                <p className="text-ink-400 leading-relaxed text-[15px]">
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
