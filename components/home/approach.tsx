import { Container } from "@/components/layout/container";
import { AnimatedLines, FadeReveal } from "@/components/motion/primitives";
import { CinematicSection, SectionEyebrow } from "@/components/motion/section";

const principles = [
  {
    title: "Direct collaboration",
    body: "You work with the person building the system. No account managers, no translation layers, no hand-offs.",
  },
  {
    title: "Clear scope",
    body: "Decisions made up front, in writing, before a single line of code is shipped.",
  },
  {
    title: "Premium execution",
    body: "Built to a standard, not to a deadline. The shortcuts are the ones that show later.",
  },
  {
    title: "Built to last",
    body: "Architected to grow with the business — not to be replaced when the business does.",
  },
];

export function Approach() {
  return (
    <CinematicSection>
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5 mb-12 md:mb-0">
            <SectionEyebrow number="05" label="Approach" className="mb-8" />
            <AnimatedLines
              as="h2"
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink-50"
              delay={0.1}
              stagger={0.1}
              duration={0.9}
            >
              I don&apos;t take on volume.
              {"\n"}
              I take on systems.
            </AnimatedLines>
          </div>

          <div className="col-span-12 md:col-span-7 md:pl-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink-800/80">
              {principles.map((p, i) => (
                <FadeReveal key={p.title} delay={0.15 + i * 0.08} direction="up" distance={30}>
                  <div className="bg-ink-950 p-8 h-full transition-colors duration-500 hover:bg-ink-900/30">
                    <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-5">
                      {(i + 1).toString().padStart(2, "0")}
                    </div>
                    <h3 className="font-serif text-xl text-ink-50 mb-3">
                      {p.title}
                    </h3>
                    <p className="text-ink-400 text-[15px] leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </FadeReveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </CinematicSection>
  );
}
