import type { CaseStudyData } from "@/lib/content/case-studies";

export const caseStudy: CaseStudyData = {
  slug: "crm-platform-extension",
  title: "CRM Platform Extension",
  subtitle:
    "Extending an open-source CRM into a full operational platform — custom objects, automation, and AI-assisted internal tools tuned to one business.",
  category: "CRM Platform",
  status: "live",
  date: "2026-02-18",

  challenge:
    "Off-the-shelf CRMs forced the team to flatten their real workflow into someone else's data model. Critical context lived in notes nobody could query. The work didn't fit the contact-deal-task model — the team needed first-class objects for the things they actually managed, with automation that respected how those objects relate.",

  approach:
    "A heavily extended CRM with custom objects for the business's actual entities, automation for the repetitive moves, and AI-assisted helpers for the parts that used to need a senior person. The platform runs as a single source of truth — one system the team works in, not one they log into after the fact.",

  metrics: [
    {
      value: "Days \u2192 Hours",
      label: "Onboarding Time",
      detail: "New hires ramp on the system in days, not weeks",
    },
    {
      value: "100%",
      label: "Workflow Coverage",
      detail: "Every ops move modelled in the platform",
    },
    {
      value: "0",
      label: "Manual Data Entry",
      detail: "Automation handles the repetitive moves",
    },
    {
      value: "1",
      label: "Source of Truth",
      detail: "CRM models the business, not the other way around",
    },
  ],

  architectureSections: [
    {
      title: "Custom Objects",
      description:
        "Domain-specific entities modelled directly on the business's real-world structure — not forced into contacts and deals. Fields, relationships, and views that match how the team actually thinks about their work.",
    },
    {
      title: "Automation Rules",
      description:
        "Workflow automation tied to real-world events. The moves the team was making by hand now run on their own — status transitions, notifications, data propagation, and assignment logic.",
    },
    {
      title: "Internal Tools",
      description:
        "Purpose-built interfaces that surface the right data at the right step. Permissioned views by role and team, so each person sees what they need without the noise.",
    },
    {
      title: "AI Helpers",
      description:
        "AI-assisted drafting, summarizing, and triage integrated where they save real time. The AI layer quietly absorbs the work that used to need a senior operator.",
    },
  ],

  highlights: [
    {
      title: "Domain-Specific Data Model",
      description:
        "Custom objects, fields, and relationships that mirror the business's actual domain. No more flattening complex operations into a generic contact-deal structure. The system speaks the same language as the team.",
    },
    {
      title: "Event-Driven Automation",
      description:
        "Workflow rules triggered by real business events — not manual button clicks. Status changes cascade, assignments happen automatically, and notifications reach the right person at the right moment.",
    },
    {
      title: "AI-Assisted Operations",
      description:
        "Intelligent helpers for drafting, summarizing, and routing work. Integrated at the points where they replace real labor, not bolted on as a novelty. The AI layer gets better as the system accumulates context.",
    },
    {
      title: "Clean Upgrade Path",
      description:
        "Built on an open-source CRM core with a clear boundary between platform and extensions. New requirements are configuration changes, not workarounds — and the upstream CRM can evolve without breaking the custom layer.",
    },
  ],

  capabilities: [
    "Domain-specific objects, fields, and relationships",
    "Workflow automation tied to real-world events",
    "AI helpers integrated where they save real time",
    "Permissioned views by role and team",
    "Clean upgrade path as the upstream CRM evolves",
    "Single source of truth for all operational data",
    "Custom internal tools per workflow step",
    "Event-driven notifications and assignment",
  ],

  impact:
    "The CRM stopped being a place to log things after the fact. It became the system the team works in. Onboarding is faster because the system reflects how the work actually happens. New requirements are configuration changes, not workarounds — and the AI layer keeps quietly absorbing the work that used to need a senior operator.",

  stack: ["TypeScript", "PostgreSQL", "GraphQL", "Server Actions", "Claude API"],

  nextProject: {
    title: "Proposal Engine for ANC",
    slug: "proposal-engine-anc",
  },
};
