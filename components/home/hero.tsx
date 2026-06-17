import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AnimatedLines, FadeReveal } from "@/components/motion/primitives";
import { CountingStat } from "@/components/motion/effects";
import { AmbientGrain } from "@/components/motion/section";
import type { ProofStat } from "@/data/proof";

export function Hero({
  eyebrow,
  subline,
  heroProof,
}: {
  eyebrow: string;
  subline: string;
  heroProof: ProofStat[];
}) {
  return (
    <section className="relative pt-44 md:pt-56 pb-0 overflow-hidden">
      <AmbientGrain />

      {/* subtle ambient grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* radial fade */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(232, 194, 142, 0.06) 0%, transparent 55%)",
        }}
      />

      <Container>
        <FadeReveal delay={0} className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="h-px w-10 bg-ink-700" />
          <span>{eyebrow}</span>
        </FadeReveal>

        <AnimatedLines
          as="h1"
          className="font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight text-ink-50 max-w-5xl"
          delay={0.15}
          stagger={0.12}
          duration={1}
        >
          I build systems
          {"\n"}that run companies.
        </AnimatedLines>

        <FadeReveal delay={0.55} className="mt-12 max-w-2xl">
          <p className="text-lg md:text-xl text-ink-300 leading-relaxed">
            {subline}
          </p>
        </FadeReveal>

        <FadeReveal delay={0.75} className="mt-14 flex flex-wrap items-center gap-6">
          <MagneticButtonWrapper href="/work">
            <Button>View selected work</Button>
          </MagneticButtonWrapper>
          <Button href="/contact" variant="ghost">
            Start a project →
          </Button>
        </FadeReveal>

        {/* Proof ledger */}
        <FadeReveal delay={0.9} className="mt-24 md:mt-32 border-t border-ink-800/80">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {heroProof.map((stat, i) => (
              <div
                key={stat.label}
                className={[
                  "py-8 md:py-10 pr-6",
                  i > 0 ? "lg:border-l lg:border-ink-800/80 lg:pl-8" : "",
                  i % 2 === 1 ? "border-l border-ink-800/80 pl-6 lg:pl-8" : "",
                  i > 1 ? "border-t border-ink-800/80 lg:border-t-0" : "",
                ].join(" ")}
              >
                <CountingStat
                  value={stat.value}
                  label={stat.label}
                  delay={1 + i * 0.1}
                />
              </div>
            ))}
          </dl>
        </FadeReveal>
      </Container>
    </section>
  );
}

import { MagneticButton } from "@/components/motion/effects";

function MagneticButtonWrapper({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <MagneticButton href={href}>
      {children}
    </MagneticButton>
  );
}
