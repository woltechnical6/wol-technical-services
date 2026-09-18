import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { about } from "@/content/home";
import { site } from "@/content/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

/**
 * About — the company statement beside a framed site photograph. Copy,
 * four commitments and two calls to action on the left; a tilting photo
 * plate with a floating spec sheet on the right.
 */
export function AboutWOL() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28" aria-labelledby="about-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-1/3 size-120 rounded-full bg-blue-500/[0.06] blur-[120px]" />
        <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-amber-400/10 blur-[120px]" />
      </div>

      <div className="container-wol relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                <span className="wol-pulse-dot size-1.5 rounded-full bg-blue-600" />
                <span className="font-mono text-ink-400">01</span>
                {about.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="about-title" className="font-display mt-4 text-3xl font-bold leading-tight text-ink-900 md:text-4xl lg:text-[2.75rem]">
                {about.title}
              </h2>
            </Reveal>
            <span className="wol-shimmer mt-4 block h-0.75 w-14 rounded-full bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-size-[200%_100%]" />

            <RevealGroup className="mt-6 space-y-4 text-base leading-relaxed text-ink-600 md:text-lg" delay={0.1}>
              {about.body.map((p) => (
                <RevealItem key={p}>
                  <p>{p}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealGroup className="mt-9 grid gap-3 sm:grid-cols-2" step={0.07} delay={0.15}>
              {about.commitments.map((c) => (
                <RevealItem key={c.title}>
                  <div className="wol-color-card group flex h-full items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-[0_14px_28px_-24px_rgba(15,23,42,0.16)] transition-transform duration-300 hover:-translate-y-0.5">
                    <span className="wol-icon-box flex size-9 shrink-0 items-center justify-center rounded-lg text-white">
                      <CheckCircle2 className="size-4" strokeWidth={2} />
                    </span>
                    <span>
                      <span className="font-display block text-sm font-bold text-ink-900 transition-colors duration-200 group-hover:text-blue-700">{c.title}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-ink-600">{c.body}</span>
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.25}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href={about.cta.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
                >
                  {about.cta.label}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} />
                </Link>
                <Link
                  href={about.secondaryCta.href}
                  className="wol-chip inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink-900"
                >
                  {about.secondaryCta.label}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Photo plate + spec sheet */}
          <div className="relative lg:col-span-6">
            <TiltCard
              className="wol-tilt group relative overflow-hidden rounded-3xl border border-line bg-[#0a1330] shadow-[0_40px_90px_-40px_rgba(7,27,69,0.5)]"
              intensity={4}
              lift={10}
            >
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={about.image.src}
                  alt={about.image.alt}
                  fill
                  sizes="(min-width:1024px) 48vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  style={{ objectPosition: about.image.focal }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a1330]/85 via-[#0a1330]/10 to-transparent" />
              </div>
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-white backdrop-blur">
                FIG. 01 · SITE
              </span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                <div>
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                    <span className="wol-pulse-dot size-1.5 rounded-full bg-cyan-400" />
                    On site
                  </span>
                  <p className="font-display mt-1 text-lg font-semibold text-white md:text-xl">Walk-down before every scope.</p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-amber-400">
                  <MapPin className="size-3.5" strokeWidth={2} />
                  {site.location.city}, UAE
                </span>
              </div>
            </TiltCard>

            {/* Spec sheet — lifted plane between the photo and the reader */}
            <Reveal delay={0.2} className="relative z-10 -mt-8 mx-4 md:-mt-10 md:mx-8 lg:-mt-12 lg:ml-12 lg:mr-6">
              <dl className="wol-color-card group grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-white/95 shadow-[0_28px_56px_-30px_rgba(15,23,42,0.35)] backdrop-blur">
                {about.indicators.map((ind, i) => (
                  <div key={ind.label} className="p-4 md:p-5">
                    <dt className="flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-ink-500 md:text-[10px]">
                      <span className="text-blue-600">0{i + 1}</span>
                      {ind.label.toUpperCase()}
                    </dt>
                    <dd className="wol-num font-display mt-2 text-xl font-bold leading-none text-ink-900 md:text-[1.75rem]">{ind.value}</dd>
                    <dd className="mt-2 hidden text-[11px] leading-snug text-ink-600 sm:block">{ind.note}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
