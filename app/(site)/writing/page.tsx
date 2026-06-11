import { Container } from "@/components/layout/container";
import { ArticleCard } from "@/components/writing/article-card";
import { getAllArticles } from "@/lib/content/writing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Writing",
  description:
    "Notes, essays, and field-tested ideas on building systems that run companies.",
  path: "/writing",
});

export default async function WritingIndexPage() {
  const articles = await getAllArticles();

  return (
    <>
      <section className="pt-44 md:pt-56 pb-20">
        <Container>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 mb-12">
            <span className="text-accent">●</span>
            <span className="h-px w-10 bg-ink-700" />
            <span>Writing — {articles.length} entries</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-ink-50 max-w-5xl">
            Notes from
            <br />
            <span className="text-ink-500">building things.</span>
          </h1>
          <p className="mt-12 max-w-2xl text-lg text-ink-300 leading-relaxed">
            Field notes on systems, execution, and the discipline behind building
            things that hold up over time.
          </p>
        </Container>
      </section>

      <section className="pb-32">
        <Container>
          {articles.length === 0 ? (
            <p className="text-ink-400 border-t border-ink-800/80 py-16">
              No articles yet. Check back soon.
            </p>
          ) : (
            <>
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
              <div className="border-t border-ink-800/80" />
            </>
          )}
        </Container>
      </section>
    </>
  );
}
