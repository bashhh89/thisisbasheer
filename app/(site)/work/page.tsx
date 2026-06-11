import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/work/project-card";
import { getAllProjects } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Selected systems, platforms, and internal tools — designed and built end-to-end.",
  path: "/work",
});

export default async function WorkIndexPage() {
  const projects = await getAllProjects();

  return (
    <>
      <section className="pt-44 md:pt-56 pb-20">
        <Container>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 mb-12">
            <span className="text-accent">●</span>
            <span className="h-px w-10 bg-ink-700" />
            <span>Selected work — {projects.length} projects</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-ink-50 max-w-5xl">
            Work that becomes
            <br />
            <span className="text-ink-500">infrastructure.</span>
          </h1>
          <p className="mt-12 max-w-2xl text-lg text-ink-300 leading-relaxed">
            Systems built and operated end-to-end — proposal engines, venue
            operations platforms, and CRM systems tuned to a single business.
            Every one of them is live, running a real operation today.
          </p>
        </Container>
      </section>

      <section className="pb-32">
        <Container>
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
          <div className="border-t border-ink-800/80" />
        </Container>
      </section>
    </>
  );
}
