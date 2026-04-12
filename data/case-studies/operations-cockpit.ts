import type { CaseStudyData } from "@/lib/content/case-studies";

export const caseStudy: CaseStudyData = {
  slug: "operations-cockpit",
  title: "Operations Cockpit",
  subtitle:
    "A live operations dashboard that consolidates pipeline, fulfillment, and finance into a single screen the leadership team actually trusts.",
  category: "Internal Platform",
  status: "live",
  date: "2025-09-04",

  challenge:
    "Leadership was making decisions from three different exports stitched together once a week. By the time the picture was assembled, it was already stale. Data lived everywhere — CRM, accounting, the field-ops tool, a few spreadsheets — and nobody owned the consolidated view.",

  approach:
    "A real-time cockpit that pulls directly from the systems of record — pipeline, jobs in flight, invoicing, cash position — with drill-downs that match the way the team thinks. Each panel is a thin layer over the underlying source of truth. Nothing is recomputed in a spreadsheet.",

  metrics: [
    {
      value: "4 \u2192 1",
      label: "Reports Consolidated",
      detail: "One screen replaced four weekly reports",
    },
    {
      value: "Daily",
      label: "Decision Cycle",
      detail: "Down from weekly assembly sessions",
    },
    {
      value: "Real-time",
      label: "Data Freshness",
      detail: "Direct from systems of record",
    },
    {
      value: "0",
      label: "Spreadsheet Reports",
      detail: "Nothing recomputed outside the system",
    },
  ],

  architectureSections: [
    {
      title: "Pipeline View",
      description:
        "Live pipeline and conversion visibility. Where is revenue right now? What's the current close rate? What does next month look like at the current pace? Answers available on demand, not after a weekly rebuild.",
    },
    {
      title: "Fulfillment Tracker",
      description:
        "Status across all active engagements in real time. What's stuck and where? What's at risk this week? Operational issues surface before they become customer-facing problems.",
    },
    {
      title: "Financial Position",
      description:
        "Cash position and AR aging pulled directly from the books. No manual reconciliation, no stale exports. The numbers trace back to the source on demand.",
    },
    {
      title: "Drill-downs",
      description:
        "Every number on the page is clickable. Drill into any metric to see the underlying records, history, and context. No more asking someone to pull the data behind a chart.",
    },
  ],

  highlights: [
    {
      title: "Single-Screen Operations",
      description:
        "The entire operational picture on one screen. Pipeline, fulfillment, and finance consolidated into a view designed around the questions leadership actually asks — not the structure of the underlying databases.",
    },
    {
      title: "Source-of-Truth Integrity",
      description:
        "Every panel is a thin layer over the real data. Nothing is copied, transformed, or recomputed in a separate tool. When the underlying system updates, the cockpit reflects it immediately.",
    },
    {
      title: "Proactive Issue Detection",
      description:
        "Operational issues surface before they become customer-facing. At-risk engagements, stalled pipeline, aging receivables — the cockpit highlights what needs attention without waiting for someone to ask.",
    },
  ],

  capabilities: [
    "Live pipeline and conversion view",
    "Fulfillment status across active engagements",
    "Cash position and AR aging from the books",
    "Drill-down into any number on the page",
    "Permissioned views per role",
    "Real-time data from systems of record",
    "At-risk and exception highlighting",
    "Mobile-responsive for on-the-go checks",
  ],

  impact:
    "Weekly reporting meetings stopped being assembly sessions and became decision sessions. The team trusts the numbers because they trace back to the source on demand. The cockpit became the default screen. New reporting requests are answered by extending the system, not by rebuilding a report.",

  stack: ["Next.js", "TypeScript", "PostgreSQL", "Server Actions", "Recharts"],

  prevProject: {
    title: "Proposal Engine for ANC",
    slug: "proposal-engine-anc",
  },
};
