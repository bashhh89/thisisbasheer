import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { getSetting } from "@/lib/admin/settings";

export async function Hero() {
  const [eyebrow, subline, heroProof] = await Promise.all([
    getSetting("hero.eyebrow"),
    getSetting("hero.subline"),
    getSetting("proof.hero"),
  ]);

  return (
    <section className="relative pt-44 md:pt-56 pb-0 overflow-hidden">
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
          <span>{eyebrow}</span>
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
          {subline}
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

        {/* Proof ledger */}
        <div
          className="mt-24 md:mt-32 border-t border-ink-800/80 animate-fade-up"
          style={{ animationDelay: "480ms" }}
        >
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {heroProof.map((stat, i) => (
              <div
                key={stat.label}
                className={[
                  "py-8 md:py-10 pr-6",
                  i > 0 ? "lg:border-l lg:border-ink-800/80 lg:pl-8" : "",
                  i % 2 === 1 ? "border-l border-ink-800/80 pl-6 lg:pl-8" : "",
                  i > 1 ? "border-t border-ink-800/80 lg:border-t-0" : "",
                ].join(" ")}
              >
                <dd className="font-serif text-3xl md:text-4xl text-ink-50 tracking-tight tabular-nums">
                  {stat.value}
                </dd>
                <dt className="mt-3 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
