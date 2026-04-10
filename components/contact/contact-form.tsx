"use client";

import { useState } from "react";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Something went wrong.");
      }

      setState("success");
      event.currentTarget.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "success") {
    return (
      <div className="border border-ink-800 p-10">
        <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-4">
          ● Received
        </div>
        <h3 className="font-serif text-3xl text-ink-50 mb-4 leading-snug">
          Thanks — your message is in.
        </h3>
        <p className="text-ink-300 leading-relaxed">
          You'll hear back from me directly within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" autoComplete="organization" />
        </div>
        <div>
          <Label htmlFor="budget">Budget (optional)</Label>
          <Input id="budget" name="budget" placeholder="e.g. $25k–$75k" />
        </div>
      </div>

      <div>
        <Label htmlFor="message">Project summary</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="What system are you trying to build, and what's not working today?"
        />
      </div>

      {state === "error" && error && (
        <div className="border border-red-900/50 bg-red-950/20 text-red-200 px-4 py-3 font-mono text-xs">
          {error}
        </div>
      )}

      <div className="pt-4">
        <Button type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
