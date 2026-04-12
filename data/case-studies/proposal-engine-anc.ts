import type { CaseStudyData } from "@/lib/content/case-studies";

export const caseStudy: CaseStudyData = {
  slug: "proposal-engine-anc",
  title: "Proposal Engine for ANC",
  subtitle:
    "A custom proposal platform that replaced spreadsheet quoting with structured intake, configurable pricing, and signature-ready output.",
  category: "Proposal Platform",
  status: "live",
  date: "2025-11-12",
  client: "ANC",

  challenge:
    "ANC's sales team was rebuilding proposals from scratch every week — spreadsheets, copy-paste pricing, inconsistent scope language. Deals slipped through gaps that nobody owned. Quotes were assembled by hand for every opportunity, pricing drifted between reps, and there was no system of record once a proposal was sent.",

  approach:
    "A purpose-built proposal engine: a structured intake flow that captures the shape of each opportunity, a versioned product and service catalog with centrally managed pricing rules, and a generator that assembles branded, client-ready proposals. Everything lives in one Postgres-backed system. There is no copy-paste between tools.",

  metrics: [
    {
      value: "< 1hr",
      label: "Proposal Turnaround",
      detail: "Down from 2-3 days of manual assembly",
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
    {
      value: "0",
      label: "Copy-Paste Steps",
      detail: "Everything flows from intake to output",
    },
  ],

  architectureSections: [
    {
      title: "Structured Intake",
      description:
        "A guided flow that captures the shape of each opportunity in a way the engine can act on. No free-form fields where structure is needed — the intake defines what the proposal will contain.",
    },
    {
      title: "Catalog Engine",
      description:
        "A versioned catalog of services, packages, and pricing rules — centrally managed. When pricing changes, it changes everywhere. Sent proposals stay reproducible because they reference the catalog version at time of creation.",
    },
    {
      title: "Proposal Generator",
      description:
        "Assembles proposals from intake data and catalog selections with consistent language and clean output. Client-ready PDFs, shareable links, and a full audit trail for every change.",
    },
  ],

  highlights: [
    {
      title: "Configurable Pricing Rules",
      description:
        "Per-service-line pricing logic that handles volume tiers, package bundling, and custom adjustments. Reps configure, they don't calculate. Finance trusts the numbers because they come from one place.",
    },
    {
      title: "Versioned Templates",
      description:
        "Every sent proposal is reproducible. Templates are versioned so that changes to language or structure don't retroactively alter what was already delivered to a client. Full history, no ambiguity.",
    },
    {
      title: "Role-Based Access",
      description:
        "Sales sees what they need to close. Ops sees what's been promised before it lands in their queue. Finance sees the numbers without the noise. Each role gets a view tuned to their decisions.",
    },
    {
      title: "Audit Trail",
      description:
        "Every change to a proposal is tracked — who changed what, when, and why. No more guessing which version was sent or what terms were agreed. The system remembers so the team doesn't have to.",
    },
  ],

  capabilities: [
    "Configurable pricing rules per service line",
    "Versioned templates for reproducible proposals",
    "Role-based access for sales, ops, and finance",
    "Client-ready PDF and shareable links",
    "Audit trail for every change",
    "Structured intake with guided flows",
    "Centrally managed service catalog",
    "One-click proposal generation",
  ],

  impact:
    "The team stopped negotiating with their own spreadsheets. Reps spend their time on the customer instead of the document. Finance trusts the numbers because they come from one place. Ops sees what's been promised before it lands in their queue. Onboarding a new offering is a configuration change, not a rebuild.",

  stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind"],

  prevProject: {
    title: "CRM Platform Extension",
    slug: "crm-platform-extension",
  },
  nextProject: {
    title: "Operations Cockpit",
    slug: "operations-cockpit",
  },
};
