import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk, Manrope } from "next/font/google";
import { ArrowRight, ArrowUpRight, ClipboardCheck, Phone, ShieldCheck, Wrench } from "lucide-react";
import { services } from "@/content/services";
import { servicesPage } from "@/content/pages";
import { process } from "@/content/home";
import { site } from "@/content/site";
import { CinematicCTA } from "@/components/scenes/CinematicCTA";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ServiceIcon } from "@/components/icons/ServiceIcon";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-wol-display",
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-wol-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Services",
  description:
    "Mechanical, piping, welding, electrical & instrumentation, installation, maintenance and site technical services for oil & gas and industrial facilities in the UAE.",
  alternates: { canonical: "/services" },
};

function GoldRule({ center = false }: { center?: boolean }) {
  return (
    <span
      className={`wol-shimmer mt-4 block h-0.75 w-14 rounded-full bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-size-[200%_100%] ${center ? "mx-auto" : ""}`}
    />
  );
}

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10 2.5 11.3 7.7 16.5 9l-5.2 1.3L10 15.5 8.7 10.3 3.5 9l5.2-1.3L10 2.5Z" />
    </svg>
  );
}

const ASSURANCES = [
  {
    icon: ClipboardCheck,
    title: "Surveyed before priced",
    body: "Every scope starts with a walk-down, drawings or a conversation about what the asset actually needs — never a generic quote.",
  },
  {
    icon: ShieldCheck,
    title: "Executed under permit",
    body: "Method statements, isolations and hold points are agreed before mobilisation and followed on site by supervised crews.",
  },
  {
    icon: Wrench,
    title: "Handed over with records",
    body: "Inspection records, as-built markups and a close-out pack are part of the job, so the work can be proven afterwards.",
  },
];

export default function ServicesIndexPage() {
  const { hero } = servicesPage;
  const phoneHref = `tel:${String(site.contact.phone).replace(/[^+\d]/g, "")}`;

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} wol-services`}>
      <style>{`
        .wol-services { font-family: var(--font-wol-body), ui-sans-serif, system-ui, sans-serif; }
        .wol-services .font-display {
          font-family: var(--font-wol-display), ui-sans-serif, system-ui, sans-serif;
          letter-spacing: -0.015em;
        }
      `}</style>

      {/* ---------------------------------------------------------------- */}
      {/* Hero — dark blueprint field, breadcrumb, badge, headline, gold    */}
      {/* rule, dual CTAs, framed plant photo, discipline readout.          */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#0a1330] via-[#101f47] to-[#0d1a3d] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="wol-blueprint-grid absolute inset-0" />
          <div className="wol-hero-orb-a absolute -left-24 top-0 size-104 rounded-full bg-cyan-400/20 blur-[110px]" />
          <div className="wol-hero-orb-b absolute -right-24 bottom-0 size-96 rounded-full bg-amber-500/10 blur-[110px]" />
        </div>

        <div className="container-wol relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/40">
            <Link href="/" className="transition-colors hover:text-white/80">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/70">Services</span>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
                  <SparkleIcon className="size-3.5 text-amber-400" />
                  {hero.eyebrow} · {services.length} disciplines
                </span>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="font-display mt-6 text-4xl font-bold leading-[1.08] text-white md:text-6xl">
                  {hero.title[0]}
                  <br />
                  <span className="text-amber-400">{hero.title[1]}</span>
                </h1>
              </Reveal>

              <GoldRule />

              <Reveal delay={0.14}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">{hero.lede}</p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="#services-grid"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors duration-200 hover:bg-amber-400"
                  >
                    Explore the services
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} />
                  </a>
                  <a
                    href={phoneHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/5"
                  >
                    <Phone className="size-4" strokeWidth={1.75} />
                    Call the team
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-6" delay={0.15}>
              <TiltCard
                className="wol-tilt relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_32px_70px_-30px_rgba(2,8,23,0.8)]"
                intensity={4}
                lift={8}
              >
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={hero.image.src}
                    alt={hero.image.alt}
                    fill
                    sizes="(min-width:1024px) 45vw, 100vw"
                    priority
                    className="object-cover"
                    style={{ objectPosition: hero.image.focal }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a1330]/80 via-transparent to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5">
                  <span className="flex items-center gap-3">
                    <span className="wol-pulse-dot size-2 rounded-full bg-cyan-400" />
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                      Index · {String(services.length).padStart(2, "0")} services
                    </span>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-400">{site.location.city}, UAE</span>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Service cards — every discipline as a tilting, gradient-edged     */}
      {/* card with icon, index, summary, top capabilities and a link.      */}
      {/* ---------------------------------------------------------------- */}
      <section id="services-grid" className="relative scroll-mt-24 py-20 md:py-28" aria-labelledby="services-grid-title">
        <div className="container-wol">
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                <span className="wol-pulse-dot size-1.5 rounded-full bg-blue-600" />
                What we deliver
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="services-grid-title" className="font-display mt-4 text-3xl font-bold leading-tight text-ink-900 md:text-5xl">
                Eight disciplines. One point of responsibility.
              </h2>
            </Reveal>
            <GoldRule />
            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-ink-600 md:text-lg">
                Each service is a self-contained capability that can be mobilised alone or combined into a multi-discipline package —
                planned, supervised and closed out by the same team.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" step={0.07}>
            {services.map((service) => (
              <RevealItem key={service.slug} className="h-full">
                <TiltCard
                  className="wol-tilt wol-shine wol-color-card group flex h-full flex-col rounded-2xl border border-line bg-white shadow-[0_18px_36px_-26px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_28px_56px_-24px_rgba(15,23,42,0.3)]"
                  intensity={5}
                  lift={10}
                >
                  <Link href={`/services/${service.slug}`} className="flex h-full flex-col p-6" aria-label={`${service.title} — read more`}>
                    <div className="relative mb-6 aspect-16/10 overflow-hidden rounded-xl bg-[#0a1330]">
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        fill
                        sizes="(min-width:1280px) 22vw, (min-width:640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ objectPosition: service.image.focal }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#0a1330]/80 via-[#0a1330]/10 to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-white backdrop-blur">
                        {service.index}
                      </span>
                      <div className="wol-icon-box absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-xl border border-white/10 text-white">
                        <ServiceIcon name={service.icon} className="size-5" />
                      </div>
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">{service.tagline}</p>
                    <h3 className="font-display mt-2 text-xl font-bold leading-snug text-ink-900 transition-colors duration-200 group-hover:text-blue-700">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{service.menuDescription}</p>

                    <ul className="mt-5 space-y-1.5 border-t border-line pt-4">
                      {service.capabilities.slice(0, 3).map((cap) => (
                        <li key={cap.title} className="flex items-start gap-2 text-sm text-ink-700">
                          <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-amber-500" />
                          <span>{cap.title}</span>
                        </li>
                      ))}
                    </ul>

                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ink-900 transition-colors duration-200 group-hover:text-blue-700">
                      View service
                      <ArrowUpRight
                        className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.75}
                      />
                    </span>
                  </Link>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Assurance strip — what every engagement includes.                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative bg-slate-50 py-20 md:py-28" aria-labelledby="assurance-title">
        <div className="container-wol">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                  <span className="wol-pulse-dot size-1.5 rounded-full bg-blue-600" />
                  Included in every scope
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 id="assurance-title" className="font-display mt-4 text-3xl font-bold leading-tight text-ink-900 md:text-4xl">
                  The same standard, whichever discipline you call on.
                </h2>
              </Reveal>
              <GoldRule />
              <Reveal delay={0.12}>
                <p className="mt-6 text-base leading-relaxed text-ink-600">
                  Whether it is a single pump overhaul or a multi-discipline shutdown package, the method behind the work does not change.
                </p>
              </Reveal>
            </div>

            <RevealGroup className="grid gap-6 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-1" step={0.08}>
              {ASSURANCES.map(({ icon: Icon, title, body }) => (
                <RevealItem key={title} className="h-full">
                  <TiltCard
                    className="wol-tilt wol-color-card group h-full rounded-2xl border border-line bg-white p-6 shadow-[0_18px_36px_-26px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-22px_rgba(15,23,42,0.26)]"
                    intensity={3}
                    lift={6}
                  >
                    <div className="flex items-start gap-4">
                      <div className="wol-icon-box flex size-11 shrink-0 items-center justify-center rounded-xl text-white">
                        <Icon className="size-5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-ink-900">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-600">{body}</p>
                      </div>
                    </div>
                  </TiltCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <ProcessTimeline steps={process} index="03" eyebrow="Shared method" title="Every service runs on the same process." compact />

      <CinematicCTA />
    </div>
  );
}
