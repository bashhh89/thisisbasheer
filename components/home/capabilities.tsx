import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { StaggerContainer, StaggerItem } from "@/components/motion/primitives";
import { capabilities } from "@/data/capabilities";
import { cn } from "@/lib/utils";

export function Capabilities() {
  return (
    <Section bordered className="relative">
      <Container>
        <StaggerContainer stagger={0.08} delay={0.05}>
          <StaggerItem>
            <SectionHeader
              number="03"
              eyebrow="Capabilities"
              title={
                <>
                  What I build,
                  <br />
                  <span className="text-ink-500">end to end.</span>
                </>
              }
            />
          </StaggerItem>
        </StaggerContainer>

        {/* Editorial index — full-width ledger rows */}
        <div className="mt-20 border-t border-ink-800/80">
          {capabilities.map((cap, i) => (
            <CapabilityRow key={cap.id} cap={cap} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

import { motion } from "framer-motion";
import { useClientReducedMotion } from "@/components/motion/use-client-reduced-motion";

function CapabilityRow({
  cap,
  index,
}: {
  cap: { id: string; title: string; description: string };
  index: number;
}) {
  const prefersReducedMotion = useClientReducedMotion();

  return (
    <motion.div
      className="group grid grid-cols-12 gap-4 md:gap-8 items-baseline border-b border-ink-800/80 py-8 md:py-10 cursor-default"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="col-span-2 md:col-span-1 font-mono text-[10px] uppercase tracking-eyebrow text-accent">
        {(index + 1).toString().padStart(2, "0")}
      </div>
      <motion.h3
        className={cn(
          "col-span-10 md:col-span-4 font-serif text-2xl md:text-3xl text-ink-50 leading-tight tracking-tight transition-colors duration-500",
          "group-hover:text-accent"
        )}
      >
        {cap.title}
      </motion.h3>
      <p className="col-span-12 col-start-3 md:col-span-7 md:col-start-6 text-ink-400 leading-relaxed text-[15px] max-w-2xl transition-colors duration-500 group-hover:text-ink-300">
        {cap.description}
      </p>
    </motion.div>
  );
}
