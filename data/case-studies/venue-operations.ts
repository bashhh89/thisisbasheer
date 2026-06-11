import type { CaseStudyData } from "@/lib/content/case-studies";

export const caseStudy: CaseStudyData = {
  slug: "venue-operations",
  title: "Venue Operations Platform",
  subtitle:
    "A live operations system for a national venue-services business — events, staffing, field workflows, and reporting for 43+ arenas and stadiums, 150 field technicians, and 15 markets. One platform where there used to be calendars, spreadsheets, and chat threads.",
  category: "Operations Platform",
  status: "live",
  date: "2025-09-04",
  client: "ANC",

  challenge:
    "Operations ran across a shared calendar, a CRM nobody trusted for field work, spreadsheets, and chat threads. Three operations managers coordinated roughly 150 technicians across 43+ venues by hand. Nobody could answer the basic questions — who is working tonight, is the venue ready, what broke last game — without calling someone.",

  approach:
    "One operations platform, built around the actual shape of the work: events flow in automatically, staffing is assigned against them, technicians run a structured mobile workflow on site, and everything they report rolls up into live dashboards and automated digests. Each layer feeds the next. Nothing is assembled by hand.",

  metrics: [
    {
      value: "43+",
      label: "Venues Live",
      detail: "Arenas and stadiums across 15 markets",
    },
    {
      value: "150",
      label: "Field Technicians",
      detail: "Daily check-ins and structured workflows",
    },
    {
      value: "250+",
      label: "Events Per Season",
      detail: "Synced automatically, staffed in one system",
    },
    {
      value: "4 → 1",
      label: "Reports Consolidated",
      detail: "One screen replaced four weekly reports",
    },
  ],

  architectureSections: [
    {
      title: "Event & Staffing Engine",
      description:
        "Events sync in automatically from the scheduling source — 250+ per season — and staffing is assigned against them in one view. Coverage gaps are visible before they become game-day problems, not after.",
    },
    {
      title: "Field Workflow",
      description:
        "A three-stage mobile flow for every event: check-in, game-ready confirmation, post-game report. Technicians work through it on their phones at the venue. The office sees status in real time instead of waiting for a call.",
    },
    {
      title: "Ticketing & Documentation",
      description:
        "Issues raised in the field become tracked tickets with owners and history. Every venue carries its own documentation — equipment, contacts, procedures — so knowledge stops living in one person's head.",
    },
    {
      title: "AI Reporting Layer",
      description:
        "Daily digests, escalation alerts, post-game summaries, and a weekly operations report — generated from live data and delivered where the team already communicates. Nobody compiles a status report by hand anymore.",
    },
  ],

  highlights: [
    {
      title: "One screen for game day",
      description:
        "Tonight's events, who is assigned, who has checked in, what is game-ready, and what's open — live. The question 'are we covered tonight?' is now a glance, not a phone tree.",
    },
    {
      title: "Workflows that match the floor",
      description:
        "The mobile flow mirrors what technicians actually do at a venue, in the order they do it. Adoption came from fit, not mandate — the system is easier than the workaround.",
    },
    {
      title: "Issues surface before clients see them",
      description:
        "Post-game reports and tickets feed escalation rules. A display issue at a venue becomes a tracked, assigned item the same night — not a surprise in next week's client call.",
    },
    {
      title: "Synced with the system of record",
      description:
        "Events and tickets sync with the company CRM on a fixed cadence, so sales, service, and field operations read the same reality. No re-keying, no drift.",
    },
  ],

  capabilities: [
    "Automatic event sync, 250+ events per season",
    "Staffing assignment with coverage visibility",
    "Three-stage mobile field workflow",
    "Ticketing with owners, history, and escalation",
    "Per-venue documentation portal",
    "AI-generated digests and post-game summaries",
    "Two-way CRM sync on a fixed cadence",
    "Role-based views for office and field",
  ],

  impact:
    "Three operations managers now run a national field operation from one screen. Decision cycles moved from weekly to daily. Operational issues surface and get owners before they become client-facing. The platform replaced four weekly reports, a shared calendar, and a culture of phone calls with a system the team actually works in.",

  stack: ["Next.js", "TypeScript", "PostgreSQL", "Server Actions", "Tailwind"],

  prevProject: {
    title: "Proposal Engine for ANC",
    slug: "proposal-engine",
  },
  nextProject: {
    title: "CRM Platform Extension",
    slug: "crm-platform",
  },
};
