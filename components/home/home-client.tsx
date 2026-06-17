"use client";

import { Hero } from "@/components/home/hero";
import { Positioning } from "@/components/home/positioning";
import { FeaturedWork } from "@/components/home/featured-work";
import { Capabilities } from "@/components/home/capabilities";
import { Operation } from "@/components/home/operation";
import { Approach } from "@/components/home/approach";
import { WritingPreview } from "@/components/home/writing-preview";
import { CTA } from "@/components/home/cta";
import type { Project } from "@/lib/content/projects";
import type { Article } from "@/lib/content/writing";
import type { ProofStat } from "@/data/proof";

type HomeClientProps = {
  eyebrow: string;
  subline: string;
  heroProof: ProofStat[];
  operationStats: ProofStat[];
  projects: Project[];
  articles: Article[];
};

export function HomeClient({
  eyebrow,
  subline,
  heroProof,
  operationStats,
  projects,
  articles,
}: HomeClientProps) {
  return (
    <>
      <Hero eyebrow={eyebrow} subline={subline} heroProof={heroProof} />
      <Positioning />
      <FeaturedWork projects={projects} />
      <Capabilities />
      <Operation operationStats={operationStats} />
      <Approach />
      <WritingPreview articles={articles} />
      <CTA />
    </>
  );
}
