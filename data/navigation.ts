export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Site",
    items: [
      { label: "Work", href: "/work" },
      { label: "Writing", href: "/writing" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Elsewhere",
    items: [
      { label: "GitHub", href: "https://github.com/bashhh89" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmadbasheer" },
      { label: "Email", href: "mailto:ahmad@basheer.app" },
    ],
  },
];
