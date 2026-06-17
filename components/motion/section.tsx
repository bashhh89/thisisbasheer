"use client";

import { motion } from "framer-motion";
import { useClientReducedMotion } from "./use-client-reduced-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const outExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function CinematicSection({
  children,
  className,
  bordered = true,
  spacing = "default",
}: {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  spacing?: "default" | "tight" | "loose";
}) {
  const prefersReducedMotion = useClientReducedMotion();

  const spacings = {
    tight: "py-16 md:py-20",
    default: "py-24 md:py-32",
    loose: "py-32 md:py-44",
  } as const;

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        spacings[spacing],
        bordered && "border-t border-ink-800/80",
        className
      )}
    >
      {prefersReducedMotion ? null : (
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: outExpo }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />
        </motion.div>
      )}
      {children}
    </section>
  );
}

export function SectionEyebrow({
  number,
  label,
  className,
}: {
  number: string;
  label: string;
  className?: string;
}) {
  const prefersReducedMotion = useClientReducedMotion();

  return (
    <motion.div
      className={cn(
        "flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400",
        className
      )}
      initial={prefersReducedMotion ? undefined : { opacity: 0, x: -12 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: outExpo }}
    >
      <span className="text-accent">{number}</span>
      <span className="h-px w-8 bg-ink-700" />
      <span>{label}</span>
    </motion.div>
  );
}

export function AmbientGrain({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 opacity-[0.035] mix-blend-overlay",
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
