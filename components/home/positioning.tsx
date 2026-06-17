import { Container } from "@/components/layout/container";
import { AnimatedLines, FadeReveal, DrawLine } from "@/components/motion/primitives";
import { CinematicSection, SectionEyebrow } from "@/components/motion/section";

export function Positioning() {
  return (
    <CinematicSection spacing="loose">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3 mb-12 md:mb-0">
            <SectionEyebrow number="01" label="Positioning" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <DrawLine className="h-px w-full mb-12" delay={0.1} />
            <AnimatedLines
              as="p"
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] tracking-tight text-ink-100 max-w-4xl"
              delay={0.2}
              stagger={0.1}
              duration={0.9}
            >
              Most businesses don&apos;t need more tools.
              {"\n"}
              They need one system that makes the whole operation make sense.
            </AnimatedLines>
            <FadeReveal delay={0.6} className="mt-12 max-w-2xl">
              <p className="text-lg text-ink-300 leading-relaxed">
                I design and build internal platforms that replace fragmented
                workflows with a connected operational backbone — then I run
                them. Not handed off, not outgrown in two quarters. The kind of
                system a company operates on for years.
              </p>
            </FadeReveal>
          </div>
        </div>
      </Container>
    </CinematicSection>
  );
}
