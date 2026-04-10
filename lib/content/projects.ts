import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export type ProjectStatus = "live" | "in-development" | "archived";

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  client?: string;
  problem: string;
  solution: string;
  status: ProjectStatus;
  featured?: boolean;
  date: string;
  stack?: string[];
  outcomes?: string[];
  cover?: string;
};

export type Project = ProjectFrontmatter & { content: string };

async function readProjectFile(file: string): Promise<Project> {
  const raw = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return { ...(data as ProjectFrontmatter), content };
}

export async function getAllProjects(): Promise<Project[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(PROJECTS_DIR);
  } catch {
    return [];
  }
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));
  const projects = await Promise.all(mdxFiles.map(readProjectFile));
  return projects.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getAllProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProjects(limit?: number): Promise<Project[]> {
  const all = await getAllProjects();
  const featured = all.filter((p) => p.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export async function getProjectSlugs(): Promise<string[]> {
  const all = await getAllProjects();
  return all.map((p) => p.slug);
}
