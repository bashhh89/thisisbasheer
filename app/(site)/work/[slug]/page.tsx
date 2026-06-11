import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CaseStudyTemplate } from "@/components/work/case-study-template";
import { mdxComponents } from "@/components/common/mdx-components";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/content/projects";
import { getCaseStudyData } from "@/lib/content/case-studies";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return buildMetadata({ title: "Not found" });
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    type: "article",
    publishedTime: project.date,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try structured case study data first
  const caseStudy = getCaseStudyData(slug);
  if (caseStudy) {
    return <CaseStudyTemplate data={caseStudy} />;
  }

  // Fall back to MDX rendering for slugs without structured data
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const all = await getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  return (
    <>
      <section className="pt-44 md:pt-56 pb-20 border-b border-ink-800/80">
        <Container>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 hover:text-accent transition-colors duration-300 mb-16"
          >
            <ArrowLeft size={12} />
            All work
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <Badge tone={project.status === "live" ? "live" : "default"}>
              {project.status === "live" ? "● Live" : project.status}
            </Badge>
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500">
              {project.category}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500">
              {formatDate(project.date)}
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] tracking-tight text-ink-50 max-w-5xl">
            {project.title}
          </h1>
          <p className="mt-10 max-w-3xl text-xl text-ink-300 leading-relaxed">
            {project.summary}
          </p>
        </Container>
      </section>

      <section className="py-20 border-b border-ink-800/80">
        <Container>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6">
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-5">
                The problem
              </div>
              <p className="text-ink-200 text-lg leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-5">
                The solution
              </div>
              <p className="text-ink-200 text-lg leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container size="narrow">
          <article className="max-w-prose">
            <MDXRemote source={project.content} components={mdxComponents} />
          </article>
        </Container>
      </section>

      {(project.stack || project.outcomes) && (
        <section className="py-20 border-t border-ink-800/80">
          <Container>
            <div className="grid grid-cols-12 gap-8">
              {project.outcomes && project.outcomes.length > 0 && (
                <div className="col-span-12 md:col-span-7">
                  <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-8">
                    Outcomes
                  </div>
                  <ul className="space-y-5">
                    {project.outcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-5">
                        <span className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500 pt-2 w-6">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="text-ink-100 font-serif text-2xl leading-snug">
                          {o}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.stack && project.stack.length > 0 && (
                <div className="col-span-12 md:col-span-5 md:pl-12">
                  <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-8">
                    Stack
                  </div>
                  <ul className="space-y-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="font-mono text-sm text-ink-300 border-b border-ink-800/80 py-3"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      <section className="py-20 border-t border-ink-800/80">
        <Container>
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500 mb-3">
                Next case study
              </div>
              <Link
                href={`/work/${next.slug}`}
                className="font-serif text-3xl md:text-4xl text-ink-50 hover:text-accent transition-colors duration-300 inline-flex items-center gap-4 group"
              >
                {next.title}
                <ArrowRight
                  size={24}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
            <Button href="/contact" variant="outline">
              Start a project &rarr;
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
