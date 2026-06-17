import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/writing/article-card";
import { FadeReveal, StaggerContainer, StaggerItem } from "@/components/motion/primitives";
import type { Article } from "@/lib/content/writing";

export function WritingPreview({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <Section bordered className="relative">
      <Container>
        <div className="flex items-end justify-between flex-wrap gap-8 mb-16">
          <FadeReveal>
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
          </FadeReveal>
          <FadeReveal delay={0.2}>
            <Button href="/writing" variant="ghost">
              All writing →
            </Button>
          </FadeReveal>
        </div>

        <StaggerContainer stagger={0.1} delay={0.1}>
          <div className="border-t border-ink-800/80" />
          {articles.map((a) => (
            <StaggerItem key={a.slug}>
              <ArticleCard article={a} />
            </StaggerItem>
          ))}
          <div className="border-t border-ink-800/80" />
        </StaggerContainer>
      </Container>
    </Section>
  );
}
