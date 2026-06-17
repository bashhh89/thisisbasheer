"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useClientReducedMotion } from "./use-client-reduced-motion";

export function CountingStat({
  value,
  label,
  className,
  delay = 0,
}: {
  value: string;
  label: string;
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useClientReducedMotion();

  const numericMatch = value.match(/[\d.]+/);
  const numeric = numericMatch ? parseFloat(numericMatch[0]) : null;
  const prefix = value.replace(/[\d.,]+/g, "").split(numeric?.toString() || "")[0] || "";
  const suffix = value.replace(/[\d.,]+/g, "").replace(prefix, "") || "";

  const ref = useRef<HTMLDivElement>(null);
  const spring = useSpring(0, { stiffness: 40, damping: 24 });
  const display = useTransform(spring, (v) => {
    if (numeric === null) return value;
    const decimals = (numericMatch?.[0].split(".")[1]?.length) || 0;
    return `${prefix}${v.toFixed(decimals).replace(/\.0+$/, "")}${suffix}`;
  });

  useEffect(() => {
    if (numeric === null || prefersReducedMotion) return;
    const timer = setTimeout(() => {
      spring.set(numeric);
    }, delay * 1000 + 400);
    return () => clearTimeout(timer);
  }, [numeric, spring, delay, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="font-serif text-3xl md:text-4xl text-ink-50 tracking-tight tabular-nums">
        {numeric !== null && !prefersReducedMotion ? (
          <motion.span>{display}</motion.span>
        ) : (
          value
        )}
      </div>
      <div className="mt-3 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
        {label}
      </div>
    </motion.div>
  );
}

export function SplitText({
  children,
  className,
  as: Tag = "span",
  delay = 0,
  stagger = 0.02,
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  delay?: number;
  stagger?: number;
}) {
  const prefersReducedMotion = useClientReducedMotion();

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={className}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: "1.2em", rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });
  const prefersReducedMotion = useClientReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-block", className)}
      style={{ x, y }}
    >
      {href ? (
        <a href={href} onClick={onClick}>
          {children}
        </a>
      ) : (
        <button type="button" onClick={onClick}>
          {children}
        </button>
      )}
    </motion.span>
  );
}
