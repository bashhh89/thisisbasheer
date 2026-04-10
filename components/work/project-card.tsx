import Link from "next/link";
import type { Project } from "@/lib/content/projects";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const num = (index + 1).toString().padStart(2, "0");

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block border-t border-ink-800/80 py-12 md:py-14 transition-colors duration-300 hover:border-ink-600"
    >
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 md:col-span-1 font-mono text-[10px] uppercase tracking-eyebrow text-ink-500 pt-2">
          {num}
        </div>

        <div className="col-span-12 md:col-span-7">
          <div className="flex items-center gap-3 mb-4">
            <Badge tone={project.status === "live" ? "live" : "default"}>
              {project.status === "live" ? "● Live" : project.status}
            </Badge>
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500">
              {project.category}
            </span>
          </div>
          <h3 className="font-serif text-3xl md:text-4xl text-ink-50 leading-[1.1] tracking-tight group-hover:text-accent transition-colors duration-500 mb-4">
            {project.title}
          </h3>
          <p className="text-ink-300 leading-relaxed max-w-xl text-base">
            {project.summary}
          </p>
        </div>

        <div className="col-span-12 md:col-span-3 md:col-start-10 md:text-right">
          {project.stack && (
            <ul className="space-y-1.5 mb-6">
              {project.stack.slice(0, 4).map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-[11px] text-ink-400"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-ink-300 group-hover:text-accent transition-colors duration-300">
            View case study
            <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
