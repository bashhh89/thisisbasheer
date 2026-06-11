export interface CaseStudyMetrics {
  value: string;
  label: string;
  detail?: string;
}

export interface ArchitectureBlock {
  title: string;
  description: string;
  icon?: string;
}

export interface Highlight {
  title: string;
  description: string;
  image?: string;
}

export interface CaseStudyData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  status: "live" | "in-development" | "completed";
  date: string;
  client?: string;
  duration?: string;
  heroImage?: string;
  challenge: string;
  approach: string;
  metrics: CaseStudyMetrics[];
  architectureSections: ArchitectureBlock[];
  highlights: Highlight[];
  capabilities: string[];
  impact: string;
  stack: string[];
  nextProject?: { title: string; slug: string };
  prevProject?: { title: string; slug: string };
}

import { caseStudy as crmCaseStudy } from "@/data/case-studies/crm-platform";
import { caseStudy as proposalCaseStudy } from "@/data/case-studies/proposal-engine";
import { caseStudy as opsCaseStudy } from "@/data/case-studies/venue-operations";

const caseStudyRegistry: Record<string, CaseStudyData> = {
  [crmCaseStudy.slug]: crmCaseStudy,
  [proposalCaseStudy.slug]: proposalCaseStudy,
  [opsCaseStudy.slug]: opsCaseStudy,
};

export function getCaseStudyData(slug: string): CaseStudyData | null {
  return caseStudyRegistry[slug] ?? null;
}
