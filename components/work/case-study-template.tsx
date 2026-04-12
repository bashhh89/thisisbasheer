"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/reveal";
import { cn, formatDate } from "@/lib/utils";
import type { CaseStudyData } from "@/lib/content/case-studies";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CaseStudyTemplateProps {
  data: CaseStudyData;
}

export function CaseStudyTemplate({ data }: CaseStudyTemplateProps) {
  return (
    <>
      {/* Section 01 — Hero */}
      <section className="pt-44 md:pt-56 pb-20 border-b border-ink-800/80">
        <Container>
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 hover:text-accent transition-colors duration-300 mb-16"
            >
              <ArrowLeft size={12} />
              All work
            </Link>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex items-center gap-3 mb-8 flex-wrap">
              <Badge tone={data.status === "live" ? "live" : "default"}>
                {data.status === "live" ? "● Live" : data.status}
              </Badge>
              <span className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500">
                {data.category}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500">
                {formatDate(data.date)}
              </span>
              {data.client && (
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500">
                  {data.client}
                </span>
              )}
              {data.duration && (
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500">
                  {data.duration}
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] tracking-tight text-ink-50 max-w-5xl">
              {data.title}
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-10 max-w-3xl text-xl text-ink-300 leading-relaxed">
              {data.subtitle}
            </p>
          </Reveal>

          {data.heroImage && (
            <Reveal delay={0.24}>
              <div className="mt-16 border border-ink-800/60 overflow-hidden">
                <Image
                  src={data.heroImage}
                  alt={data.title}
                  width={1440}
                  height={900}
                  className="w-full h-auto"
                />
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Section 02 — Challenge & Approach */}
      <section className="py-20 border-b border-ink-800/80">
        <Container>
          <Reveal>
            <div className="mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
              <span className="text-accent">01</span>
              <span className="h-px w-8 bg-ink-700" />
              <span>Context</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6">
              <Reveal delay={0.06}>
                <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-5">
                  The Challenge
                </div>
                <p className="text-ink-200 text-lg leading-relaxed">
                  {data.challenge}
                </p>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-6">
              <Reveal delay={0.12}>
                <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-5">
                  The Approach
                </div>
                <p className="text-ink-200 text-lg leading-relaxed">
                  {data.approach}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 03 — Key Metrics */}
      <section className="py-24 md:py-32 bg-ink-900/30">
        <Container>
          <Reveal>
            <div className="mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
              <span className="text-accent">02</span>
              <span className="h-px w-8 bg-ink-700" />
              <span>Impact</span>
            </div>
          </Reveal>

          <div
            className={cn(
              "grid gap-6 mt-12",
              data.metrics.length === 3
                ? "grid-cols-1 md:grid-cols-3"
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            )}
          >
            {data.metrics.map((metric, i) => (
              <Reveal key={i} delay={0.06 * (i + 1)}>
                <div className="border border-ink-800/60 p-8">
                  <div className="font-serif text-4xl md:text-5xl text-accent tracking-tight">
                    {metric.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-300 mt-3">
                    {metric.label}
                  </div>
                  {metric.detail && (
                    <div className="text-sm text-ink-400 mt-2">
                      {metric.detail}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 04 — System Architecture */}
      <section className="py-24 md:py-32 border-t border-ink-800/80">
        <Container>
          <Reveal>
            <div className="mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
              <span className="text-accent">03</span>
              <span className="h-px w-8 bg-ink-700" />
              <span>The system</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink-50">
              How it works
            </h2>
          </Reveal>

          <div
            className={cn(
              "mt-16 grid gap-px bg-ink-800/40",
              data.architectureSections.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-3",
              data.architectureSections.length === 4 &&
                "md:grid-cols-2 lg:grid-cols-4"
            )}
          >
            {data.architectureSections.map((block, i) => (
              <Reveal key={i} delay={0.06 * (i + 1)}>
                <div className="bg-ink-950 p-8 h-full relative">
                  <h3 className="font-serif text-xl text-ink-50 mb-3">
                    {block.title}
                  </h3>
                  <p className="text-ink-300 text-sm leading-relaxed">
                    {block.description}
                  </p>
                  {/* Connector line on desktop between blocks */}
                  {i < data.architectureSections.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-px w-px h-8 -translate-y-1/2 bg-ink-700" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 05 — Feature Highlights */}
      <section className="py-24 md:py-32 border-t border-ink-800/80">
        <Container>
          <Reveal>
            <div className="mb-16 flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
              <span className="text-accent">04</span>
              <span className="h-px w-8 bg-ink-700" />
              <span>Highlights</span>
            </div>
          </Reveal>

          <div className="space-y-24">
            {data.highlights.map((highlight, i) => {
              const isEven = i % 2 === 0;
              const hasImage = !!highlight.image;

              if (!hasImage) {
                return (
                  <Reveal key={i} delay={0.06}>
                    <div className="max-w-2xl">
                      <h3 className="font-serif text-2xl md:text-3xl text-ink-50 mb-4">
                        {highlight.title}
                      </h3>
                      <p className="text-ink-300 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </Reveal>
                );
              }

              return (
                <div
                  key={i}
                  className={cn(
                    "grid grid-cols-12 gap-8 items-center",
                    !isEven && "direction-rtl"
                  )}
                >
                  <div
                    className={cn(
                      "col-span-12 md:col-span-5",
                      !isEven && "md:col-start-8"
                    )}
                  >
                    <Reveal delay={0.06}>
                      <h3 className="font-serif text-2xl md:text-3xl text-ink-50 mb-4">
                        {highlight.title}
                      </h3>
                      <p className="text-ink-300 leading-relaxed">
                        {highlight.description}
                      </p>
                    </Reveal>
                  </div>
                  <div
                    className={cn(
                      "col-span-12 md:col-span-7",
                      isEven ? "md:col-start-6" : "md:col-start-1 md:row-start-1"
                    )}
                  >
                    <Reveal delay={0.12}>
                      <div className="border border-ink-800/60 overflow-hidden">
                        <Image
                          src={highlight.image!}
                          alt={highlight.title}
                          width={960}
                          height={600}
                          className="w-full h-auto"
                        />
                      </div>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Section 06 — Capabilities */}
      <section className="py-20 border-t border-ink-800/80">
        <Container>
          <Reveal>
            <div className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
              <span className="text-accent">05</span>
              <span className="h-px w-8 bg-ink-700" />
              <span>Capabilities</span>
            </div>
          </Reveal>

          <div className="flex flex-wrap gap-3">
            {data.capabilities.map((cap, i) => (
              <Reveal key={i} delay={0.04 * (i + 1)}>
                <span className="font-mono text-xs text-ink-300 border border-ink-800/60 px-4 py-2">
                  {cap}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 07 — Impact */}
      <section className="py-24 md:py-32 border-t border-ink-800/80">
        <Container>
          <Reveal>
            <div className="mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
              <span className="text-accent">06</span>
              <span className="h-px w-8 bg-ink-700" />
              <span>Outcome</span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="font-serif text-2xl md:text-3xl text-ink-100 leading-relaxed max-w-4xl">
              {data.impact}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Section 08 — Tech Stack */}
      <section className="py-16 border-t border-ink-800/80">
        <Container>
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-8">
              Built with
            </div>
          </Reveal>

          <div className="flex flex-wrap gap-3">
            {data.stack.map((tech, i) => (
              <Reveal key={tech} delay={0.04 * (i + 1)}>
                <span className="font-mono text-sm text-ink-300 border-b border-ink-800/80 pb-1">
                  {tech}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 09 — Navigation */}
      <section className="py-20 border-t border-ink-800/80">
        <Container>
          <div className="flex items-center justify-between flex-wrap gap-8">
            {data.prevProject && (
              <Reveal>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500 mb-3">
                    Previous case study
                  </div>
                  <Link
                    href={`/work/${data.prevProject.slug}`}
                    className="font-serif text-2xl md:text-3xl text-ink-50 hover:text-accent transition-colors duration-300 inline-flex items-center gap-4 group"
                  >
                    <ArrowLeft
                      size={20}
                      className="transition-transform duration-300 group-hover:-translate-x-1"
                    />
                    {data.prevProject.title}
                  </Link>
                </div>
              </Reveal>
            )}

            <div className={cn(!data.prevProject && "w-full")}>
              <Reveal delay={data.prevProject ? 0.06 : 0}>
                <div className={cn(!data.prevProject && "")}>
                  <div className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-500 mb-3">
                    {data.nextProject ? "Next case study" : ""}
                  </div>
                  {data.nextProject ? (
                    <Link
                      href={`/work/${data.nextProject.slug}`}
                      className="font-serif text-3xl md:text-4xl text-ink-50 hover:text-accent transition-colors duration-300 inline-flex items-center gap-4 group"
                    >
                      {data.nextProject.title}
                      <ArrowRight
                        size={24}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  ) : null}
                  <div className="mt-8">
                    <Button href="/contact" variant="outline">
                      Start a project &rarr;
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
