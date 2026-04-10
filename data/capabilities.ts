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
      "Custom-built sales and service systems that fit how the business actually operates — not how a generic SaaS thinks it should.",
  },
  {
    id: "proposals",
    title: "Proposal Engines",
    description:
      "Structured intake, configurable pricing, and end-to-end proposal flows that turn requests into signed work.",
  },
  {
    id: "ops",
    title: "Operations Dashboards",
    description:
      "Live cockpits that pull every signal — pipeline, fulfillment, finance — into one screen the team can trust.",
  },
  {
    id: "automation",
    title: "Automation Systems",
    description:
      "Workflows that move data, trigger actions, and remove the manual steps that quietly slow companies down.",
  },
  {
    id: "integrations",
    title: "Platform Integrations",
    description:
      "Connect the tools the business already runs on — cleanly, reliably, and without brittle middleware.",
  },
  {
    id: "ai-tools",
    title: "AI-Assisted Internal Tools",
    description:
      "Practical AI woven into operational workflows where it earns its place — not bolted on as a feature.",
  },
];
