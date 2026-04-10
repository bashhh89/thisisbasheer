import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  bordered?: boolean;
  spacing?: "default" | "tight" | "loose";
};

export function Section({
  className,
  bordered = false,
  spacing = "default",
  ...props
}: SectionProps) {
  const spacings = {
    tight: "py-16 md:py-20",
    default: "py-24 md:py-32",
    loose: "py-32 md:py-44",
  } as const;

  return (
    <section
      className={cn(
        spacings[spacing],
        bordered && "border-t border-ink-800/80",
        className
      )}
      {...props}
    />
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  number?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  number,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {(eyebrow || number) && (
        <div className="mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
          {number && <span className="text-accent">{number}</span>}
          {eyebrow && (
            <>
              <span className="h-px w-8 bg-ink-700" />
              <span>{eyebrow}</span>
            </>
          )}
        </div>
      )}
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink-50">
        {title}
      </h2>
      {description && (
        <p className="mt-6 max-w-2xl text-lg text-ink-300 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
