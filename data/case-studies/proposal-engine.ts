import type { CaseStudyData } from "@/lib/content/case-studies";

export const caseStudy: CaseStudyData = {
  slug: "proposal-engine",
  title: "Proposal Engine for ANC",
  subtitle:
    "A proposal platform for a national LED display integrator — structured intake, versioned pricing, and client-ready output. Turnaround went from days of spreadsheet assembly to under an hour.",
  category: "Proposal Platform",
  status: "live",
  date: "2025-11-12",
  client: "ANC",

  challenge:
    "Every proposal was rebuilt by hand — spreadsheets, copy-paste pricing, scope language that drifted between reps. Quoting a stadium display project meant days of assembly, and once a proposal went out there was no system of record for what was promised, at what price, under which version of the numbers.",

  approach:
    "A purpose-built proposal engine: structured intake that captures the shape of each opportunity, a versioned catalog of products, services, and pricing rules, and a generator that assembles branded, client-ready proposals. Every sent proposal references the catalog version it was built from — reproducible by design. One Postgres-backed system, zero copy-paste.",

  metrics: [
    {
      value: "< 1 hr",
      label: "Proposal Turnaround",
      detail: "Down from 2–3 days of manual assembly",
    },
    {
      value: "100%",
      label: "Reproducible",
      detail: "Every sent proposal traces to its catalog version",
    },
    {
      value: "1",
      label: "Source of Truth",
      detail: "For pricing, scope, and history",
    },
    {
      value: "3 Teams",
      label: "Unified Workflow",
      detail: "Sales, ops, and finance on the same data",
    },
  ],

  architectureSections: [
    {
      title: "Structured Intake",
      description:
        "A guided flow that captures each opportunity — including the source documents it arrives in. RFPs and legacy spreadsheets are parsed into structured data the engine can act on, instead of being re-typed by hand.",
    },
    {
      title: "Catalog & Pricing Engine",
      description:
        "A versioned catalog of products, services, and pricing rules — centrally managed. When pricing changes, it changes everywhere going forward, while sent proposals stay frozen to the version they were built from.",
    },
    {
      title: "Proposal Generator",
      description:
        "Assembles client-ready output from intake data and catalog selections — consistent language, clean PDFs, shareable links, and a full audit trail for every change on every version.",
    },
  ],

  highlights: [
    {
      title: "Two ways to build a quote",
      description:
        "The engine can reproduce an existing estimate exactly — down to the formatting finance expects — or recalculate from the catalog's pricing rules. Teams migrate at their own pace without a forced cutover.",
    },
    {
      title: "Configurable pricing rules",
      description:
        "Per-line pricing logic handles tiers, bundles, and project-specific adjustments. Reps configure, they don't calculate. Finance trusts the numbers because they come from one place.",
    },
    {
      title: "Versioned everything",
      description:
        "Templates, catalogs, and pricing are all versioned. Changing the language or the numbers never retroactively alters what a client already received. Full history, no ambiguity.",
    },
    {
      title: "Role-based views",
      description:
        "Sales sees what they need to close. Ops sees what's been promised before it lands in their queue. Finance sees the numbers without the noise.",
    },
  ],

  capabilities: [
    "Document intake — RFPs and spreadsheets parsed to structured data",
    "Versioned product and service catalog",
    "Configurable pricing rules per line",
    "Exact-reproduction and recalculated quote modes",
    "Client-ready PDF and shareable links",
    "Audit trail for every change",
    "Role-based access for sales, ops, and finance",
    "Webhook hand-off to the CRM on close",
  ],

  impact:
    "The team stopped negotiating with their own spreadsheets. A proposal that took days now takes under an hour, and every number in it traces back to a versioned catalog. Reps spend their time on the customer instead of the document. Onboarding a new offering is a configuration change, not a rebuild.",

  stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind"],

  prevProject: {
    title: "CRM Platform Extension",
    slug: "crm-platform",
  },
  nextProject: {
    title: "Venue Operations Platform",
    slug: "venue-operations",
  },
};
