export type ProofStat = {
  value: string;
  label: string;
  detail?: string;
};

/**
 * Live, verifiable scale numbers — aggregate only, no client internals.
 * Update when the real systems change; never inflate.
 */
export const heroProof: ProofStat[] = [
  {
    value: "100+",
    label: "Containers in production",
  },
  {
    value: "43+",
    label: "Venues running live",
  },
  {
    value: "150",
    label: "Field technicians supported",
  },
  {
    value: "< 1 hr",
    label: "Proposal turnaround, from days",
  },
];

export const operationStats: ProofStat[] = [
  {
    value: "100+",
    label: "Containers in production",
    detail: "Deployed and operated on infrastructure I run myself",
  },
  {
    value: "30+",
    label: "Databases under management",
    detail: "Postgres-first, every system on its own source of truth",
  },
  {
    value: "43+",
    label: "Venues live nationwide",
    detail: "Arenas and stadiums across 15 markets",
  },
  {
    value: "150",
    label: "Field technicians on the platform",
    detail: "Daily check-ins, workflows, and post-game reporting",
  },
  {
    value: "30,000+",
    label: "CRM records as one source of truth",
    detail: "Companies, people, and opportunities — migrated and live",
  },
  {
    value: "250+",
    label: "Live events synced per season",
    detail: "Scheduling, staffing, and field workflows in one system",
  },
];
