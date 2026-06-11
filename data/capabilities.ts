export type Capability = {
  id: string;
  title: string;
  description: string;
};

export const capabilities: Capability[] = [
  {
    id: "crm",
    title: "CRM Platforms",
    description:
      "Sales and service systems shaped around how the business actually operates — first-class objects for the work the team really manages, with automation and views to match. Not a generic pipeline with your logo on it.",
  },
  {
    id: "proposals",
    title: "Proposal Engines",
    description:
      "Structured intake, versioned catalogs, configurable pricing, client-ready output. A quote becomes a configuration change, not an afternoon of spreadsheet work.",
  },
  {
    id: "ops",
    title: "Operations Platforms",
    description:
      "Live cockpits for events, staffing, field work, and fulfillment — one screen the team trusts, with drill-downs to the records behind every number.",
  },
  {
    id: "automation",
    title: "Automation Systems",
    description:
      "The repetitive moves — status changes, hand-offs, digests, reminders — run on their own, with an audit trail. The team stops being the integration layer.",
  },
  {
    id: "integrations",
    title: "Platform Integrations",
    description:
      "The systems the business already runs on, connected cleanly. Two-way sync, one source of truth, no brittle middleware holding the operation together.",
  },
  {
    id: "ai-tools",
    title: "AI Inside the Workflow",
    description:
      "Drafting, triage, summarizing, categorizing — placed where it saves real hours and reviewed where it matters. AI that earns its seat in the workflow, not a chatbot bolted to the side.",
  },
];
