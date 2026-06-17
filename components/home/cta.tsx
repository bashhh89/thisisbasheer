import { Container } from "@/components/layout/container";
import { AnimatedLines, FadeReveal } from "@/components/motion/primitives";
import { CinematicSection, SectionEyebrow } from "@/components/motion/section";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/motion/effects";

export function CTA() {
  return (
    <CinematicSection spacing="loose">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <SectionEyebrow number="07" label="Next" />
          </div>
          <div className="col-span-12 md:col-span-10">
            <AnimatedLines
              as="h2"
              className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1] tracking-tight text-ink-50 max-w-4xl"
              delay={0.1}
              stagger={0.1}
              duration={0.95}
            >
              Have a system in mind?
              {"\n"}
              Let&apos;s build it properly.
            </AnimatedLines>

            <FadeReveal delay={0.5} className="mt-10 max-w-xl">
              <p className="text-lg text-ink-300 leading-relaxed">
                I take on a small number of engagements at a time. If the
                operation is held together with spreadsheets and goodwill,
                that&apos;s the conversation I&apos;m built for.
              </p>
            </FadeReveal>

            <FadeReveal delay={0.65} className="mt-12 flex flex-wrap items-center gap-6">
              <MagneticButton href="/contact">
                <Button>Start a project</Button>
              </MagneticButton>
              <Button href="/work" variant="ghost">
                View selected work →
              </Button>
            </FadeReveal>
          </div>
        </div>
      </Container>
    </CinematicSection>
  );
}
