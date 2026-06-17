import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/work/project-card";
import { FadeReveal, StaggerContainer, StaggerItem } from "@/components/motion/primitives";
import type { Project } from "@/lib/content/projects";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <Section bordered className="relative">
      <Container>
        <div className="flex items-end justify-between flex-wrap gap-8 mb-16">
          <FadeReveal>
            <SectionHeader
              number="02"
              eyebrow="Selected work"
              title={
                <>
                  Systems built
                  <br />
                  <span className="text-ink-500">for the long run.</span>
                </>
              }
            />
          </FadeReveal>
          <FadeReveal delay={0.2}>
            <Button href="/work" variant="ghost">
              All work →
            </Button>
          </FadeReveal>
        </div>

        <StaggerContainer stagger={0.1} delay={0.1}>
          <div className="border-t border-ink-800/80" />
          {projects.map((project, i) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} index={i} animated />
            </StaggerItem>
          ))}
          <div className="border-t border-ink-800/80" />
        </StaggerContainer>
      </Container>
    </Section>
  );
}
