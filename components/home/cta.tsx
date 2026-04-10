import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <Section bordered spacing="loose">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
              <span className="text-accent">06</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1] tracking-tight text-ink-50 max-w-4xl">
              Have a system in mind?
              <br />
              <span className="text-ink-500">Let's build it properly.</span>
            </h2>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Button href="/contact">Start a project</Button>
              <Button href="/work" variant="ghost">
                View selected work →
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
