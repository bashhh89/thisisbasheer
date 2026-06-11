import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/work/project-card";
import { getFeaturedProjects, getAllProjects } from "@/lib/content/projects";

export async function FeaturedWork() {
  let projects = await getFeaturedProjects(4);
  if (projects.length === 0) {
    projects = (await getAllProjects()).slice(0, 4);
  }

  return (
    <Section bordered>
      <Container>
        <div className="flex items-end justify-between flex-wrap gap-8 mb-16">
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
          <Button href="/work" variant="ghost">
            All work →
          </Button>
        </div>

        <div>
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
          <div className="border-t border-ink-800/80" />
        </div>
      </Container>
    </Section>
  );
}
