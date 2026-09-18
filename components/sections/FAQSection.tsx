import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { FaqItem } from "@/content/types";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type Props = {
  items: FaqItem[];
  index?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  compact?: boolean;
};

/**
 * FAQ — the shared accordion card pattern used on the about, industries
 * and FAQs pages: gradient-edged detail cards that tilt on hover, with a
 * link through to the full FAQs page.
 */
export function FAQSection({ items, index = "05", eyebrow = "FAQ", title = "Questions we are asked.", lede, compact = false }: Props) {
  return (
    <section className={cn("relative bg-slate-50", compact ? "py-16 md:py-24" : "py-20 md:py-28")} aria-labelledby="faq-title">
      <div className="container-wol grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
              <span className="wol-pulse-dot size-1.5 rounded-full bg-blue-600" />
              <span className="font-mono text-ink-400">{index}</span>
              {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="faq-title" className="font-display mt-4 text-3xl font-bold leading-tight text-ink-900 md:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>
          </Reveal>
          <span className="wol-shimmer mt-4 block h-0.75 w-14 rounded-full bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-size-[200%_100%]" />
          {lede ? (
            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-ink-600 md:text-lg">{lede}</p>
            </Reveal>
          ) : null}
          <Reveal delay={0.2}>
            <Link href="/faqs" className="wol-chip mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink-900">
              Browse all FAQs
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="space-y-4 lg:col-span-8" step={0.06} delay={0.1}>
          {items.map((item) => (
            <RevealItem key={item.q}>
              <details className="wol-tilt-subtle wol-color-card group rounded-2xl border border-line bg-white p-5 shadow-[0_14px_28px_-24px_rgba(15,23,42,0.16)] transition-colors duration-300 open:border-transparent md:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-base font-semibold text-ink-900 transition-colors duration-200 group-hover:text-blue-700 md:text-lg">{item.q}</span>
                  <span className="wol-icon-box flex size-8 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown className="size-4" strokeWidth={2} />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 md:text-base">{item.a}</p>
                <span className="wol-gradient-line mt-4 block h-px w-10 opacity-0 transition-all duration-500 group-open:w-16 group-open:opacity-100" />
              </details>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
