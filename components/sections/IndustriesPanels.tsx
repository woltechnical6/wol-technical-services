import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { industries } from "@/content/industries";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

/**
 * Industries — six sector cards on a navy band. Each card is a tilting
 * photo plate with the sector's typical scope; the edge lights blue→gold
 * on hover and the image pushes in.
 */
export function IndustriesPanels() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#0a1330] via-[#101f47] to-[#0d1a3d] py-20 md:py-28" aria-labelledby="industries-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="wol-blueprint-grid absolute inset-0" />
        <div className="wol-hero-orb-a absolute -left-24 bottom-0 size-96 rounded-full bg-cyan-400/15 blur-[110px]" />
        <div className="wol-hero-orb-b absolute -right-24 top-0 size-88 rounded-full bg-amber-500/10 blur-[110px]" />
      </div>

      <div className="container-wol relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
                <span className="wol-pulse-dot size-1.5 rounded-full bg-cyan-300" />
                <span className="font-mono text-white/40">04</span>
                Industries we serve
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="industries-title" className="font-display mt-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.75rem]">
                Where the work happens.
              </h2>
            </Reveal>
            <span className="wol-shimmer mt-4 block h-0.75 w-14 rounded-full bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-size-[200%_100%]" />
            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
                Sectors where mechanical, piping, welding, electrical and maintenance disciplines are needed every day — and where the same method applies.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link
              href="/industries"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors duration-200 hover:bg-amber-400"
            >
              All industries
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} />
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" step={0.08}>
          {industries.map((ind) => (
            <RevealItem key={ind.slug} className="h-full">
              <TiltCard
                className="wol-tilt wol-shine wol-color-card group h-full rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_24px_48px_-30px_rgba(2,8,23,0.8)] backdrop-blur transition-colors duration-300 hover:bg-white/[0.07]"
                intensity={5}
                lift={10}
              >
                <Link href={`/industries/${ind.slug}`} className="flex h-full flex-col p-5" aria-label={`${ind.title} — read more`}>
                  <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-[#0a1330]">
                    <Image
                      src={ind.image.src}
                      alt={ind.image.alt}
                      fill
                      sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: ind.image.focal }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a1330]/85 via-[#0a1330]/10 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-white backdrop-blur">
                      {ind.index}
                    </span>
                    <span className="wol-icon-box absolute right-3 top-3 flex size-9 items-center justify-center rounded-lg border border-white/10 text-white">
                      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display absolute bottom-4 left-4 right-4 text-xl font-bold text-white transition-colors duration-200 group-hover:text-amber-300">
                      {ind.title}
                    </h3>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-white/70">{ind.summary}</p>

                  <ul className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                    {ind.typicalScope.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold text-white/70 transition-colors duration-200 group-hover:border-amber-400/50 group-hover:text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-white transition-colors duration-200 group-hover:text-amber-300">
                    View sector
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} />
                  </span>
                </Link>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
