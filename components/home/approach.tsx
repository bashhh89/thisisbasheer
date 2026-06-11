import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/common/reveal";

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
    <Section bordered>
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5 mb-12 md:mb-0">
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 mb-8">
              <span className="text-accent">05</span>
              <span className="h-px w-8 bg-ink-700" />
              <span>Approach</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink-50">
              I don&apos;t take on volume.
              <br />
              <span className="text-ink-500">I take on systems.</span>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-7 md:pl-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink-800/80">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05}>
                  <div className="bg-ink-950 p-8 h-full">
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
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
