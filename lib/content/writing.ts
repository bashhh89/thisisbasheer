import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const WRITING_DIR = path.join(process.cwd(), "content/writing");

export type WritingFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags?: string[];
  cover?: string;
  draft?: boolean;
};

export type Article = WritingFrontmatter & {
  content: string;
  readingTimeMinutes: number;
};

async function readArticleFile(file: string): Promise<Article> {
  const raw = await fs.readFile(path.join(WRITING_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return {
    ...(data as WritingFrontmatter),
    content,
    readingTimeMinutes: Math.max(1, Math.round(stats.minutes)),
  };
}

export async function getAllArticles(includeDrafts = false): Promise<Article[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(WRITING_DIR);
  } catch {
    return [];
  }
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));
  const articles = await Promise.all(mdxFiles.map(readArticleFile));
  return articles
    .filter((a) => includeDrafts || !a.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await getAllArticles(true);
  return all.find((a) => a.slug === slug) ?? null;
}

export async function getArticleSlugs(): Promise<string[]> {
  const all = await getAllArticles();
  return all.map((a) => a.slug);
}
