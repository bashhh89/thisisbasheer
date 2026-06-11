import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin/auth";
import { logoutAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const nav = [
  { label: "Overview", href: "/admin" },
  { label: "Inbox", href: "/admin/inbox" },
  { label: "Site", href: "/admin/site" },
  { label: "Assistant", href: "/admin/assistant" },
];

export default async function CockpitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-ink-800/80 flex flex-col">
        <div className="px-6 py-8 border-b border-ink-800/80">
          <Link href="/admin" className="block">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>Cockpit</span>
            </div>
            <span className="font-serif text-xl text-ink-50 tracking-tight">
              basheer.app
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2.5 font-mono text-[11px] uppercase tracking-eyebrow text-ink-300 hover:text-accent hover:bg-ink-900/60 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-6 border-t border-ink-800/80 space-y-1">
          <Link
            href="/"
            className="block px-3 py-2.5 font-mono text-[11px] uppercase tracking-eyebrow text-ink-500 hover:text-ink-200 transition-colors duration-200"
          >
            ← Public site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full text-left px-3 py-2.5 font-mono text-[11px] uppercase tracking-eyebrow text-ink-500 hover:text-red-400 transition-colors duration-200"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
