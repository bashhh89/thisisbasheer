"use client";

import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useClientReducedMotion } from "./use-client-reduced-motion";

const outExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const EASE = {
  out: [0.16, 1, 0.3, 1] as const,
  outSlow: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export type AnimatedLinesProps = {
  children: string | (string | ReactNode)[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  splitBy?: "line" | "word";
};

function splitLines(text: string): string[] {
  return text.split("\n").map((l) => l.trim());
}

function splitWords(text: string): string[] {
  return text.split(/(\s+)/).filter(Boolean);
}

export function AnimatedLines({
  children,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
  duration = 0.9,
  splitBy = "line",
}: AnimatedLinesProps) {
  const prefersReducedMotion = useClientReducedMotion();

  const text = useMemo(() => (typeof children === "string" ? children : children.filter((c): c is string => typeof c === "string").join("")), [children]);

  const parts = useMemo(() => {
    if (splitBy === "word") return splitWords(text);
    return splitLines(text);
  }, [text, splitBy]);

  if (prefersReducedMotion) {
    return (
      <Tag className={className}>
        {text.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {parts.map((part, i) => {
        const content = splitBy === "word" ? part : part || "\u00A0";
        return (
          <motion.span
            key={i}
            className={cn(
              "inline-block overflow-hidden",
              splitBy === "line" && "block"
            )}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: delay + i * stagger, duration: 0.01 }}
          >
            <motion.span
              className={cn(
                "inline-block will-change-transform",
                splitBy === "line" && "block",
                lineClassName
              )}
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration,
                delay: delay + i * stagger,
                ease: outExpo,
              }}
            >
              {content === " " ? "\u00A0" : content}
            </motion.span>
          </motion.span>
        );
      })}
    </Tag>
  );
}

export type FadeRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

export function FadeReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 0.8,
  once = true,
  amount = 0.2,
}: FadeRevealProps) {
  const prefersReducedMotion = useClientReducedMotion();

  const initial = useMemo(() => {
    if (direction === "none") return { opacity: 0, y: 0, x: 0 };
    const axis = direction === "up" || direction === "down" ? "y" : "x";
    const sign = direction === "up" || direction === "left" ? 1 : -1;
    return { opacity: 0, [axis]: distance * sign };
  }, [direction, distance]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: outExpo }}
    >
      {children}
    </motion.div>
  );
}

export type DrawLineProps = {
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "horizontal" | "vertical";
};

export function DrawLine({
  className,
  delay = 0,
  duration = 1,
  direction = "horizontal",
}: DrawLineProps) {
  const prefersReducedMotion = useClientReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn("bg-ink-800/80", className)} />;
  }

  return (
    <motion.div
      className={cn("bg-ink-800/80 origin-left", className)}
      initial={
        direction === "horizontal"
          ? { scaleX: 0 }
          : { scaleY: 0 }
      }
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration, delay, ease: outExpo }}
    />
  );
}

export type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
};

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: StaggerContainerProps) {
  const prefersReducedMotion = useClientReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {prefersReducedMotion ? children : children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useClientReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: outExpo },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

export function Parallax({ children, className, speed = 0.1 }: ParallaxProps) {
  const prefersReducedMotion = useClientReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: `${speed * -40}px` }}
      viewport={{ once: false, amount: 0 }}
      transition={{ duration: 0 }}
      style={{ willChange: "transform" }}
    />
  );
}
