import Link from "next/link";
import { Container } from "./container";
import { footerNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { getSetting } from "@/lib/admin/settings";

export async function SiteFooter() {
  const year = new Date().getFullYear();
  const availability = await getSetting("site.availability");

  return (
    <footer className="border-t border-ink-800/80 mt-32">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-20">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="font-serif text-2xl text-ink-50 hover:text-accent transition-colors duration-300"
            >
              Ahmad Basheer
            </Link>
            <p className="mt-6 max-w-md text-ink-400 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-eyebrow text-ink-500">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{availability}</span>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-8">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h4 className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500 mb-5">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.items.map((item) => {
                    const external = item.href.startsWith("http") || item.href.startsWith("mailto:");
                    return (
                      <li key={item.href}>
                        {external ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-ink-200 hover:text-accent transition-colors duration-300 text-sm"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="text-ink-200 hover:text-accent transition-colors duration-300 text-sm"
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-ink-800/80 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500">
            {siteConfig.location}
          </p>
        </div>
      </Container>
    </footer>
  );
}
