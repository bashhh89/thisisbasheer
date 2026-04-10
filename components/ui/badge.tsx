import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "live" | "muted";
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  const tones: Record<string, string> = {
    default: "border-ink-700 text-ink-300",
    live: "border-accent/40 text-accent",
    muted: "border-ink-800 text-ink-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-eyebrow",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
