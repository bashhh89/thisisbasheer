import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function formatYear(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.getFullYear().toString();
}

export function pad(n: number, width = 2): string {
  return n.toString().padStart(width, "0");
}
