import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk, Manrope } from "next/font/google";
import { aboutPage } from "@/content/pages";
import { site } from "@/content/site";
import { CinematicCTA } from "@/components/scenes/CinematicCTA";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Button } from "@/components/ui/Button";

/**
 * Premium type pairing for this page.
 * Space Grotesk — a geometric, slightly technical display face — carries headlines,
 * echoing the precision/engineering register of the brand mark in the header.
 * Manrope handles body copy: warm enough to stay readable, tight enough to stay premium.
 * (If you want this site-wide rather than page-scoped, move this pairing into
 * app/layout.tsx and wire the two CSS variables into tailwind.config as `font-display` / `font-sans`.)
 */
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
  title: "About",
  description: site.description,
  alternates: { canonical: "/about" },
};

/** hero.image may be a plain string path or a StaticImageData-style object depending on the CMS/content layer — handle both. */
function resolveImageSrc(image: unknown): string | null {
  if (!image) return null;
  if (typeof image === "string") return image;
  if (typeof image === "object" && image !== null && "src" in image) {
    return String((image as { src: unknown }).src);
  }
  return null;
}

function GoldRule({ center = false }: { center?: boolean }) {
  return (
    <span
      className={`wol-shimmer mt-4 block h-0.75 w-14 rounded-full bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-size-[200%_100%] ${center ? "mx-auto" : ""}`}
    />
  );
}

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M10 18.5S16 12.9 16 8.5A6 6 0 1 0 4 8.5C4 12.9 10 18.5 10 18.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="10" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10 2.5 11.3 7.7 16.5 9l-5.2 1.3L10 15.5 8.7 10.3 3.5 9l5.2-1.3L10 2.5Z" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CARD_ICONS = [
  (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden="true">
      <path d="M5 12.5 10 17 19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden="true">
      <path d="M12 3 4.5 6v5.2c0 4.6 3.1 8.4 7.5 9.8 4.4-1.4 7.5-5.2 7.5-9.8V6L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 12.2 11.2 14.5 15.3 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden="true">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 19c.7-3 3-4.6 5.5-4.6s4.8 1.6 5.5 4.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15.8 14.8c2 .2 3.6 1.6 4.2 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
];

/** Icon set for the "Why Businesses Choose WOL" grid — kept distinct from CARD_ICONS above. */
const WHY_ICONS = [
  // single point of contact
  (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden="true">
      <circle cx="12" cy="7" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 20c.9-4 3.4-6 7-6s6.1 2 7 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M15.5 4.5c1.6.5 2.7 1.9 2.7 3.5 0 1.1-.5 2-1.3 2.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  // documentation / sign-off
  (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden="true">
      <path d="M6.5 3.5h8l3 3v13.5a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12.3l2 2 4-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // mobilisation speed
  (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // multi-discipline crew
  (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="4" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="13" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="13" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  // safety / HSE discipline
  (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden="true">
      <path d="M12 3.5 5 6.3v5.4c0 4.7 3 8.6 7 9.8 4-1.2 7-5.1 7-9.8V6.3L12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 8.5v4.2M12 15.6h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  // transparent scoping / quoting
  (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden="true">
      <path d="M4 18.5v-2.8L15.2 4.5a1.8 1.8 0 0 1 2.6 0l1.7 1.7a1.8 1.8 0 0 1 0 2.6L8.3 20H5.5A1.5 1.5 0 0 1 4 18.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
];

/**
 * Concrete, self-contained "why choose us" reasons — written out in full rather than
 * pulled from an optional external `principles` list, so this section always renders
 * complete regardless of what the CMS/content layer supplies.
 */
const WHY_CHOOSE = [
  {
    title: "One point of coordination",
    body: "A single project lead tracks every discipline on your scope, so you're never chasing five different crews for one answer.",
  },
  {
    title: "Documentation you can hand over",
    body: "Sign-offs, inspection records and certifications are compiled as work happens — ready the moment your scope closes, not weeks later.",
  },
  {
    title: "Mobilisation without the guesswork",
    body: "We confirm crew availability and realistic timelines up front, so the schedule you're given is the schedule you get.",
  },
  {
    title: "Five disciplines, one crew",
    body: "Mechanical, piping, welding, electrical & instrumentation and site technical support work from the same scope and the same standards.",
  },
  {
    title: "Site-tested safety discipline",
    body: "Every mobilisation follows structured HSE practice built for live plant environments, not adapted from office-based checklists.",
  },
  {
    title: "Scopes priced the way they're built",
    body: "Quotes are broken down by discipline and deliverable, so you can see exactly what you're paying for before work starts.",
  },
];

const FAQS = [
  {
    q: "What areas does WOL Technical Services cover?",
    a: "We're based in Dubai and support clients across the wider UAE, mobilising technical teams to site as scopes require.",
  },
  {
    q: "Which industries and plant types do you work with?",
    a: "Our disciplines span mechanical, piping, welding, electrical & instrumentation, and site technical support — built for the way plants and process facilities actually operate.",
  },
  {
    q: "How quickly can you mobilise a team?",
    a: "Mobilisation timelines depend on scope and discipline. Share your requirement through the contact form and we'll confirm realistic timelines and crew availability up front.",
  },
  {
    q: "Do you provide documentation and compliance support?",
    a: "Yes — every engagement follows structured, compliance-led documentation so certifications, sign-offs and site records are ready when you need them.",
  },
  {
    q: "How do I request a quote or certification documentation?",
    a: "Reach out via our contact page with your scope and site details. Formal accreditation and licensing documentation is available directly from our team on request.",
  },
];

export default function AboutPage() {
  const { hero, statement, values, disciplines } = aboutPage;

  const heroImageSrc = resolveImageSrc(hero.image);
  const disciplineLine = disciplines.map((d) => d.title).join(" · ");

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} wol-about`}>
      <style>{`
        .wol-about { font-family: var(--font-wol-body), ui-sans-serif, system-ui, sans-serif; }
        .wol-about .font-display {
          font-family: var(--font-wol-display), ui-sans-serif, system-ui, sans-serif;
          letter-spacing: -0.015em;
        }

        @keyframes wol-orb-a { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(3rem,2rem,0) scale(1.12); } }
        @keyframes wol-orb-b { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-2.5rem,-1.5rem,0) scale(1.08); } }
        .wol-hero-orb-a { animation: wol-orb-a 16s ease-in-out infinite; }
        .wol-hero-orb-b { animation: wol-orb-b 20s ease-in-out infinite; }

        @keyframes wol-shimmer-move { 0% { background-position: 0% 0; } 100% { background-position: 200% 0; } }
        .wol-shimmer { animation: wol-shimmer-move 2.6s linear infinite; }

        @keyframes wol-pulse-glow { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
        .wol-pulse-dot { animation: wol-pulse-glow 2s ease-in-out infinite; }

        @keyframes wol-shine { 0% { transform: translateX(-140%) skewX(-15deg); } 100% { transform: translateX(240%) skewX(-15deg); } }
        .wol-shine { position: relative; overflow: hidden; }
        .wol-shine::after {
          content: ""; position: absolute; inset: -20% -60%;
          background: linear-gradient(75deg, transparent 42%, rgba(251,146,60,0.3) 50%, transparent 58%);
          transform: translateX(-140%) skewX(-15deg); pointer-events: none;
        }
        .group:hover .wol-shine::after { animation: wol-shine 0.9s ease forwards; }

        .wol-tilt { transform-style: preserve-3d; transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease; }
        .wol-tilt:hover { transform: perspective(1200px) rotateX(2.5deg) rotateY(-3.5deg) translateY(-5px); }

        /* Color-changing hover: a slow blue → orange gradient traces the card edge on hover. */
        @keyframes wol-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .wol-color-card { position: relative; }
        .wol-color-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(120deg, #2563eb, #f59e0b, #2563eb);
          background-size: 220% 220%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
        }
        .wol-color-card:hover::before { opacity: 1; animation: wol-gradient-shift 3.2s ease infinite; }
        .wol-color-card .wol-icon-box {
          transition: background 0.5s ease;
          background: #0f172a;
        }
        .wol-color-card:hover .wol-icon-box {
          background: linear-gradient(135deg, #2563eb, #f59e0b);
        }

        @media (prefers-reduced-motion: reduce) {
          .wol-color-card:hover::before { animation: none; opacity: 1; }
        }

        .wol-blueprint-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 85%);
        }

        @media (prefers-reduced-motion: reduce) {
          .wol-hero-orb-a, .wol-hero-orb-b, .wol-shimmer, .wol-pulse-dot, .group:hover .wol-shine::after { animation: none !important; }
          .wol-tilt:hover { transform: none; }
        }
      `}</style>

      {/* ---------------------------------------------------------------- */}
      {/* Hero — dark navy gradient, blueprint grid, centered pill badge,   */}
      {/* bold headline, shimmering gold rule, dual CTAs, discipline line. */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#0a1330] via-[#101f47] to-[#0d1a3d] pt-[calc(var(--header-h)+2.5rem)] pb-24 md:pt-32 md:pb-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="wol-blueprint-grid absolute inset-0" />
          <div className="wol-hero-orb-a absolute -left-24 top-0 size-104 rounded-full bg-cyan-400/20 blur-[110px]" />
          <div className="wol-hero-orb-b absolute -right-24 bottom-0 size-96 rounded-full bg-cyan-500/10 blur-[110px]" />
        </div>

        <div className="container-wol relative flex flex-col items-center text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
              <SparkleIcon className="size-3.5 text-amber-400" />
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-display mt-6 max-w-4xl text-4xl font-bold leading-[1.08] text-white md:text-6xl">
              {hero.title}
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">{hero.lede}</p>
          </Reveal>

          <GoldRule center />

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
              <Button href="/contact">Request a Consultation</Button>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/5"
              >
                Explore Our Disciplines
                <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          {disciplineLine && (
            <Reveal delay={0.28}>
              <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-white/40">{disciplineLine}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Who We Are — statement, service pills, captioned photo           */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative py-20 md:py-28" aria-labelledby="who-we-are-title">
        <div className="container-wol grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 id="who-we-are-title" className="font-display text-3xl font-bold text-ink-900 md:text-4xl">
                Who We Are
              </h2>
              <GoldRule />
            </Reveal>
            <RevealGroup className="mt-7 max-w-xl space-y-5 text-base leading-relaxed text-ink-500 md:text-lg" delay={0.1}>
              {[statement.lead, ...statement.body].map((p) => (
                <RevealItem key={p.slice(0, 24)}>
                  <p>{p}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            {disciplines.length > 0 && (
              <RevealGroup className="mt-7 flex flex-wrap gap-2.5" delay={0.2} step={0.03}>
                {disciplines.map((d) => (
                  <RevealItem key={d.code}>
                    <span className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm text-ink-700 transition-colors duration-200 hover:border-cyan-400 hover:text-cyan-700">
                      {d.title}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>

          <Reveal className="lg:col-span-6" delay={0.15}>
            <div className="wol-tilt relative overflow-hidden rounded-3xl border border-cyan-100 shadow-[0_28px_60px_-28px_rgba(15,23,42,0.35)]">
              {heroImageSrc ? (
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={heroImageSrc}
                    alt={hero.title.join(" ")}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              ) : (
                <div className="flex aspect-4/3 w-full items-center justify-center bg-slate-100 text-sm text-ink-500">
                  Image coming soon
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink-900/85 via-ink-900/40 to-transparent p-5">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  <PinIcon className="size-4 text-amber-400" />
                  {site.location.city ?? "Dubai"}, {site.location.country ?? "United Arab Emirates"}
                </p>
                <p className="mt-1 text-xs text-white/75">Structured support · Clear scopes · Fast follow-up</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Why Businesses Choose WOL — sits above Core Values, fully        */}
      {/* self-contained with six concrete, written-out reasons.          */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative bg-slate-50 py-20 md:py-28" aria-labelledby="why-title">
        <div className="container-wol">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 id="why-title" className="font-display text-3xl font-bold text-ink-900 md:text-4xl">
              Why Businesses Choose WOL
            </h2>
            <GoldRule center />
            <p className="mt-5 text-base leading-relaxed text-ink-500 md:text-lg">
              We don&rsquo;t deliver generic scopes. Every engagement runs on disciplined execution, clear
              documentation, and one point of coordination across every discipline on site.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" step={0.06}>
            {WHY_CHOOSE.map((item, i) => {
              const Icon = WHY_ICONS[i % WHY_ICONS.length];
              return (
                <RevealItem key={item.title}>
                  <TiltCard
                    className="wol-tilt wol-color-card group h-full rounded-2xl border border-line bg-white p-6 shadow-[0_18px_36px_-26px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-22px_rgba(15,23,42,0.26)]"
                    intensity={4}
                    lift={8}
                  >
                    <div className="wol-icon-box flex size-11 items-center justify-center rounded-xl">
                      <Icon className="size-5 text-white" />
                    </div>
                    <h3 className="font-display mt-5 text-lg font-semibold text-ink-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.body}</p>
                  </TiltCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Our Core Values                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative py-20 md:py-28" aria-labelledby="values-title">
        <div className="container-wol">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 id="values-title" className="font-display text-3xl font-bold text-ink-900 md:text-4xl">
              Our Core Values
            </h2>
            <GoldRule center />
            <p className="mt-5 text-base leading-relaxed text-ink-500 md:text-lg">
              The standards our crews carry onto every site, on every scope, in every discipline.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" step={0.07}>
            {values.map((v, i) => {
              const Icon = CARD_ICONS[i % CARD_ICONS.length];
              return (
                <RevealItem key={v.title}>
                  <TiltCard
                    className="wol-tilt wol-shine wol-color-card group h-full rounded-2xl border border-line bg-white p-6 shadow-[0_18px_36px_-26px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-22px_rgba(15,23,42,0.26)]"
                    intensity={5}
                    lift={10}
                  >
                    <div className="wol-icon-box flex size-11 items-center justify-center rounded-xl">
                      <Icon className="size-5 text-white" />
                    </div>
                    <h3 className="font-display mt-5 text-lg font-semibold text-ink-900">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.body}</p>
                  </TiltCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Disciplines                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative bg-slate-50 py-20 md:py-28" aria-labelledby="disc-title">
        <div className="container-wol">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <h2 id="disc-title" className="font-display text-3xl font-bold text-ink-900 md:text-4xl">
                Five Disciplines Under One Roof
              </h2>
              <GoldRule />
            </Reveal>
            <Reveal delay={0.15}>
              <Button href="/services" variant="secondary">
                See all services
              </Button>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" step={0.05}>
            {disciplines.map((d) => (
              <RevealItem key={d.code}>
                <TiltCard
                  className="wol-tilt wol-shine wol-color-card group h-full rounded-2xl border border-line bg-white p-6 shadow-[0_14px_28px_-24px_rgba(15,23,42,0.18)] transition-colors duration-300"
                  intensity={4}
                  lift={8}
                >
                  <span className="text-xs font-semibold text-amber-500">{d.code}</span>
                  <h3 className="font-display mt-5 text-lg font-medium text-ink-900">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{d.body}</p>
                  <span className="mt-5 block h-px w-8 bg-ink-200 transition-all duration-300 group-hover:w-12 group-hover:bg-amber-400" />
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQs                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative bg-slate-50 py-20 md:py-28" aria-labelledby="faq-title">
        <div className="container-wol">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                <span className="wol-pulse-dot size-1.5 rounded-full bg-blue-600" />
                FAQs
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="faq-title" className="font-display mt-4 text-3xl font-bold leading-tight text-ink-900 md:text-4xl">
                Frequently Asked Questions
              </h2>
            </Reveal>
            <GoldRule center />
            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-ink-600 md:text-lg">
                Straight answers on coverage, mobilisation, and documentation. Anything else, reach out directly.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mx-auto mt-12 max-w-3xl space-y-4" step={0.05}>
            {FAQS.map((item) => (
              <RevealItem key={item.q}>
                <details className="wol-tilt-subtle wol-color-card group rounded-2xl border border-line bg-white p-5 shadow-[0_14px_28px_-24px_rgba(15,23,42,0.16)] transition-colors duration-300 open:border-transparent md:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="font-display text-base font-semibold text-ink-900 transition-colors duration-200 group-hover:text-blue-700 md:text-lg">{item.q}</span>
                    <span className="wol-icon-box flex size-8 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-open:rotate-180">
                      <ChevronIcon className="size-4" />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600 md:text-base">{item.a}</p>
                  <span className="wol-gradient-line mt-4 block h-px w-10 opacity-0 transition-all duration-500 group-open:w-16 group-open:opacity-100" />
                </details>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 text-center" delay={0.1}>
            <Link href="/faqs" className="wol-chip inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink-900">
              Browse all FAQs
              <ArrowIcon className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CinematicCTA />
    </div>
  );
}