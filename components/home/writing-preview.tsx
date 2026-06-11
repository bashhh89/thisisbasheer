import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/writing/article-card";
import { getAllArticles } from "@/lib/content/writing";

export async function WritingPreview() {
  const articles = (await getAllArticles()).slice(0, 3);

  if (articles.length === 0) return null;

  return (
    <Section bordered>
      <Container>
        <div className="flex items-end justify-between flex-wrap gap-8 mb-16">
          <SectionHeader
            number="06"
            eyebrow="Writing"
            title={
              <>
                Notes on building
                <br />
                <span className="text-ink-500">things that last.</span>
              </>
            }
          />
          <Button href="/writing" variant="ghost">
            All writing →
          </Button>
        </div>

        <div>
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
          <div className="border-t border-ink-800/80" />
        </div>
      </Container>
    </Section>
  );
}
