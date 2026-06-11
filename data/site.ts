export const siteConfig = {
  name: "Ahmad Basheer",
  shortName: "basheer.app",
  title: "Ahmad Basheer — Systems builder",
  description:
    "I design, build, and operate custom platforms for operations, sales, and service — end-to-end systems that run companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://basheer.app",
  email: "ahmad@basheer.app",
  location: "Operating worldwide",
  social: {
    github: "https://github.com/bashhh89",
    linkedin: "https://www.linkedin.com/in/ahmadbasheer",
    x: "https://x.com/ahmadbasheer",
  },
} as const;

export type SiteConfig = typeof siteConfig;
