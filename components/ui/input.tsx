import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "w-full bg-transparent border-b border-ink-700 px-0 py-3 text-ink-100 placeholder:text-ink-500 focus:border-accent focus:outline-none transition-colors duration-300 font-sans text-base",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full bg-transparent border-b border-ink-700 px-0 py-3 text-ink-100 placeholder:text-ink-500 focus:border-accent focus:outline-none transition-colors duration-300 font-sans text-base resize-none",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "block font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 mb-2",
        className
      )}
      {...props}
    />
  );
}
