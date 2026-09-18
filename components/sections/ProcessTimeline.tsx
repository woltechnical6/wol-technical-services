"use client";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { ProcessStep } from "@/content/types";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

type Props = {
  steps: ProcessStep[];
  index?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  compact?: boolean;
};

/**
 * Engineering process — six numbered step cards on a rail. The rail fills
 * with scroll and each card's numeral lights as the fill passes it; cards
 * tilt toward the pointer and take the blue→gold edge on hover.
 */
export function ProcessTimeline({ steps, index = "04", eyebrow = "Engineering process", title = "From scope to support.", lede, compact = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const fill = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section className={cn("relative", compact ? "py-16 md:py-24" : "py-20 md:py-28")} aria-labelledby="process-title">
      <div className="container-wol">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
              <span className="wol-pulse-dot size-1.5 rounded-full bg-blue-600" />
              <span className="font-mono text-ink-400">{index}</span>
              {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="process-title" className="font-display mt-4 text-3xl font-bold leading-tight text-ink-900 md:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>
          </Reveal>
          <span className="wol-shimmer mx-auto mt-4 block h-0.75 w-14 rounded-full bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-size-[200%_100%]" />
          {lede ? (
            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-ink-600 md:text-lg">{lede}</p>
            </Reveal>
          ) : null}
        </div>

        <div ref={ref} className="relative mt-14 md:mt-16">
          {/* Rail — fills as the reader scrolls through the steps */}
          <div className="absolute inset-x-0 top-7 hidden h-px bg-line xl:block" aria-hidden="true">
            <motion.span className="wol-gradient-line absolute inset-0 origin-left" style={{ scaleX: fill }} />
          </div>

          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" step={0.08}>
            {steps.map((s, i) => (
              <RevealItem key={s.step} className="h-full">
                <Step step={s} i={i} total={steps.length} progress={progress} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

function Step({ step, i, total, progress }: { step: ProcessStep; i: number; total: number; progress: ReturnType<typeof useSpring> }) {
  const threshold = (i + 0.5) / total;
  const lit = useTransform(progress, [threshold - 0.08, threshold], [0, 1]);
  const last = i === total - 1;

  return (
    <TiltCard
      className="wol-tilt wol-shine wol-color-card group h-full rounded-2xl border border-line bg-white p-6 shadow-[0_18px_36px_-26px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_28px_56px_-24px_rgba(15,23,42,0.3)]"
      intensity={4}
      lift={8}
    >
      <span className="wol-icon-box relative flex size-14 items-center justify-center overflow-hidden rounded-2xl font-display text-lg font-bold text-white ring-4 ring-white">
        <motion.span className="absolute inset-0 bg-linear-to-br from-blue-600 to-amber-500" style={{ opacity: lit }} aria-hidden="true" />
        <span className="relative">{step.step}</span>
      </span>
      <h3 className="font-display mt-5 text-lg font-bold text-ink-900 transition-colors duration-200 group-hover:text-blue-700">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.body}</p>
      {last ? (
        <CheckCircle2 className="mt-4 size-4 text-ink-300 transition-colors duration-300 group-hover:text-amber-500" strokeWidth={1.75} />
      ) : (
        <ArrowRight className="mt-4 size-4 text-ink-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-500" strokeWidth={1.75} />
      )}
    </TiltCard>
  );
}
