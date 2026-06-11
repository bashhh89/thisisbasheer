import type { CaseStudyData } from "@/lib/content/case-studies";

export const caseStudy: CaseStudyData = {
  slug: "crm-platform",
  title: "CRM Platform Extension",
  subtitle:
    "A migration off legacy SaaS CRM onto a platform extended to fit one business exactly — 13 first-class objects for the work the team actually manages, 30,000+ records migrated, and an AI layer that quietly absorbs the busywork.",
  category: "CRM Platform",
  status: "live",
  date: "2026-02-18",
  client: "ANC",

  challenge:
    "The incumbent CRM forced a national sports-technology business into someone else's data model. Maintenance logs, design requests, inventory, field walkthroughs — none of it fit the contact-deal-task shape, so it lived in notes, side spreadsheets, and a second subscription. Leadership couldn't trust reports that depended on data nobody actually maintained.",

  approach:
    "Extend a self-hosted CRM platform into the company's actual operating system: first-class objects for the things the team really manages, automation for the repetitive moves, dashboards built on live data, and AI helpers where they save senior-level time. Migrate the history — 30,000+ records — and validate it against the legacy system until the numbers reconcile.",

  metrics: [
    {
      value: "13",
      label: "Custom Objects",
      detail: "Modelled on the business, not the vendor",
    },
    {
      value: "30,000+",
      label: "Records Migrated",
      detail: "Companies, people, and opportunities — reconciled",
    },
    {
      value: "16",
      label: "Live Dashboards",
      detail: "Pipeline, estimation, win/loss, backlog",
    },
    {
      value: "Days",
      label: "New-Hire Ramp",
      detail: "The system reflects how the work actually happens",
    },
  ],

  architectureSections: [
    {
      title: "Domain Objects",
      description:
        "Thirteen first-class objects for the real work — maintenance, inventory, design requests, field walkthroughs, parts orders, content schedules, and more. Fields, relationships, and views that match how the team thinks, not a contact-deal-task compromise.",
    },
    {
      title: "Migration & Parity",
      description:
        "30,000+ records moved from the legacy CRM, then reconciled against it report by report until finance and leadership trusted the numbers. The old system retired because it was beaten, not because it was switched off.",
    },
    {
      title: "Automation & Reporting",
      description:
        "Rollups, recurring task generation, scheduled exports, and 16 live dashboards. The reports leadership used to wait a week for are now screens that are simply always current.",
    },
    {
      title: "AI Helpers",
      description:
        "An assistant inside the CRM that drafts, summarizes, triages, and generates reports on request — with skills scoped to the company's own data. The work that used to need a senior operator's afternoon now takes a prompt.",
    },
  ],

  highlights: [
    {
      title: "The CRM models the business",
      description:
        "An account-centric model that mirrors how the company actually sells and services venues. Repeat-client value, revenue splits, and multi-year relationships are first-class data — not a spreadsheet someone maintains on the side.",
    },
    {
      title: "Reports leadership actually trusts",
      description:
        "Every dashboard was validated against the legacy system before anyone was asked to rely on it. Parity first, then retirement. That order is why the migration held.",
    },
    {
      title: "Integrated, not isolated",
      description:
        "The CRM syncs with the field-operations platform and receives closed deals from the proposal engine. One record of the business, three systems feeding it.",
    },
    {
      title: "AI where it earns its place",
      description:
        "Drafting, summarizing, triage, on-demand reports — reviewed by humans where it matters. The AI layer absorbs work; it doesn't perform for demos.",
    },
  ],

  capabilities: [
    "13 custom objects modelled on the domain",
    "30,000+ records migrated and reconciled",
    "16 live dashboards, 150+ saved views",
    "Automation for rollups, tasks, and exports",
    "AI assistant with company-scoped skills",
    "Two-way sync with the operations platform",
    "Proposal-engine hand-off on closed deals",
    "Single sign-on and role-based permissions",
  ],

  impact:
    "The CRM stopped being a place to log things after the fact and became the system the team works in. Leadership reads live dashboards instead of waiting on exports. New hires ramp in days because the system reflects the actual work. And the legacy subscription is on its way out — replaced, validated, and outgrown.",

  stack: ["TypeScript", "PostgreSQL", "GraphQL", "Server Actions", "Claude API"],

  prevProject: {
    title: "Venue Operations Platform",
    slug: "venue-operations",
  },
  nextProject: {
    title: "Proposal Engine for ANC",
    slug: "proposal-engine",
  },
};
