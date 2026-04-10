"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        scrolled
          ? "backdrop-blur-md bg-ink-950/70 border-b border-ink-800/60"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-[88rem] items-center justify-between px-6 md:px-10 lg:px-16 h-20">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-ink-50 hover:text-accent transition-colors duration-300"
        >
          Ahmad Basheer
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-eyebrow text-ink-300 hover:text-ink-50 transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-ink-100 p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink-800 bg-ink-950">
          <nav className="flex flex-col px-6 py-6 gap-1">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-eyebrow text-ink-200 py-3 border-b border-ink-800/60 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
