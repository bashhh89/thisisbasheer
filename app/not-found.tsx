import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="pt-44 md:pt-56 pb-32 min-h-[80vh] flex items-center">
      <Container>
        <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-8">
          404 — Not found
        </div>
        <h1 className="font-serif text-6xl md:text-8xl leading-[0.95] tracking-tight text-ink-50 max-w-4xl">
          This page
          <br />
          <span className="text-ink-500">doesn't exist.</span>
        </h1>
        <p className="mt-10 max-w-xl text-lg text-ink-300 leading-relaxed">
          The link may be broken, or the page may have moved. From here you can
          head back to the homepage or browse the work.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Button href="/">Back to home</Button>
          <Link
            href="/work"
            className="font-mono text-[11px] uppercase tracking-eyebrow text-ink-300 hover:text-accent transition-colors"
          >
            Browse work →
          </Link>
        </div>
      </Container>
    </section>
  );
}
