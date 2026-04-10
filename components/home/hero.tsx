import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function Hero() {
  return (
    <section className="relative pt-44 md:pt-56 pb-32 md:pb-44 overflow-hidden">
      {/* subtle ambient grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* radial fade */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(232, 194, 142, 0.05) 0%, transparent 50%)",
        }}
      />

      <Container>
        <div className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="h-px w-10 bg-ink-700" />
          <span>Ahmad Basheer — Systems builder</span>
        </div>

        <h1
          className="font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight text-ink-50 max-w-5xl animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          I build systems
          <br />
          that <em className="text-accent not-italic font-serif italic">run</em> companies.
        </h1>

        <p
          className="mt-12 max-w-2xl text-lg md:text-xl text-ink-300 leading-relaxed animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          Custom platforms for operations, sales, service, and automation —
          designed, built, and deployed end-to-end.
        </p>

        <div
          className="mt-14 flex flex-wrap items-center gap-6 animate-fade-up"
          style={{ animationDelay: "360ms" }}
        >
          <Button href="/work">View selected work</Button>
          <Button href="/contact" variant="ghost">
            Start a project →
          </Button>
        </div>
      </Container>
    </section>
  );
}
