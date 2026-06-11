import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/container";
import { mdxComponents } from "@/components/common/mdx-components";
import {
  getAllArticles,
  getArticleBySlug,
  getArticleSlugs,
} from "@/lib/content/writing";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return buildMetadata({ title: "Not found" });
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/writing/${article.slug}`,
    type: "article",
    publishedTime: article.date,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const all = await getAllArticles();
  const idx = all.findIndex((a) => a.slug === slug);
  const next = all[(idx + 1) % all.length];

  return (
    <>
      <section className="pt-44 md:pt-56 pb-16 border-b border-ink-800/80">
        <Container size="narrow">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 hover:text-accent transition-colors duration-300 mb-16"
          >
            <ArrowLeft size={12} />
            All writing
          </Link>

          <div className="flex items-center gap-4 mb-8 font-mono text-[10px] uppercase tracking-eyebrow text-ink-500">
            <span>{formatDate(article.date)}</span>
            <span className="h-px w-6 bg-ink-700" />
            <span>{article.readingTimeMinutes} min read</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1] tracking-tight text-ink-50">
            {article.title}
          </h1>
          <p className="mt-8 text-xl text-ink-300 leading-relaxed">
            {article.excerpt}
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container size="narrow">
          <article className="max-w-prose">
            <MDXRemote source={article.content} components={mdxComponents} />
          </article>
        </Container>
      </section>

      <section className="py-20 border-t border-ink-800/80">
        <Container size="narrow">
          <div className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500 mb-3">
            Next entry
          </div>
          <Link
            href={`/writing/${next.slug}`}
            className="font-serif text-3xl md:text-4xl text-ink-50 hover:text-accent transition-colors duration-300 inline-flex items-center gap-4 group"
          >
            {next.title}
            <ArrowRight
              size={24}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Container>
      </section>
    </>
  );
}
