import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Factory,
  FlaskConical,
  Fuel,
  Info,
  Lightbulb,
  Ship,
  TrendingUp,
  Zap,
} from "lucide-react";
import { industries } from "@/content/industries";
import { industriesPage } from "@/content/pages";
import { CinematicCTA } from "@/components/scenes/CinematicCTA";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SectionHeader } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const INDUSTRY_FAQS = [
  {
    q: "Which sectors does WOL support?",
    a: "Oil & gas production, refineries, petrochemical facilities, industrial plants, energy infrastructure and marine & offshore assets across the UAE. Each sector page describes the typical scopes we are mobilised for.",
  },
  {
    q: "Do you work inside live, operating facilities?",
    a: "Yes. Scopes are planned and sequenced within the client's permit-to-work and isolation system, so work proceeds safely alongside operations. Hot work, confined space and lifting are controlled through the site's own procedures.",
  },
  {
    q: "Can WOL support a shutdown or turnaround?",
    a: "Shutdown support is a core part of our work in every sector. Crews, supervision and tooling are planned against the shutdown schedule, with pre-shutdown fabrication completed in the workshop so the critical window is used for site work only.",
  },
  {
    q: "Are the same services available in every sector?",
    a: "All eight disciplines can be mobilised in any sector, but the mix differs. Refineries and petrochemical plants typically call on piping, welding and mechanical work; industrial plants and energy infrastructure lean more on E&I, installation and maintenance.",
  },
  {
    q: "What does a typical sector engagement look like?",
    a: "A joint site walk-down, a written proposal with scope boundary, method and hold points, supervised execution under the site permit system, and a handover pack with inspection records and red-lined drawings.",
  },
];

export const metadata: Metadata = {
  title: "Industries",
  description: "Oil & gas, refineries, petrochemical, industrial plants, energy infrastructure and marine/offshore — sectors WOL Technical Services supports in the UAE.",
  alternates: { canonical: "/industries" },
};

const normalize = (title: string) => title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Sector-specific icon, matched by normalized title so it survives minor copy edits in the content layer. */
const SECTOR_ICON: Record<string, typeof Fuel> = {
  "oil-and-gas": Fuel,
  refineries: Factory,
  "petrochemical-facilities": FlaskConical,
  "industrial-plants": Factory,
  "energy-infrastructure": Zap,
  "marine-and-offshore": Ship,
};

/**
 * Challenges / Solutions / Benefits copy for each sector, written out in full so this
 * section always renders complete regardless of what the content layer supplies.
 * Keyed by normalized sector title — extend this alongside `content/industries.ts`
 * if a new sector is added.
 */
const SECTOR_DETAILS: Record<string, { challenges: string[]; solutions: string[]; benefits: string[] }> = {
  "oil-and-gas": {
    challenges: [
      "Extreme project complexity and scale",
      "Stringent HSE requirements",
      "High-consequence risk exposure",
      "Multi-contractor coordination on a live plant",
    ],
    solutions: [
      "Disciplined mobilisation across five trades",
      "Site-tested HSE and QA/QC regimes",
      "One point of coordination per scope",
      "Structured, compliance-led documentation",
    ],
    benefits: [
      "Predictable delivery inside live operations",
      "Reduced risk exposure on site",
      "Regulatory-ready records at handover",
      "One contact across every discipline",
    ],
  },
  refineries: {
    challenges: [
      "Continuous-operation constraints",
      "Tight shutdown and turnaround windows",
      "Corrosive, high-temperature environments",
      "Strict permit-to-work discipline",
    ],
    solutions: [
      "Turnaround-ready crew mobilisation",
      "Piping, welding and mechanical crews scheduled to the window",
      "Site-specific permit and access management",
      "Real-time progress tracking against the programme",
    ],
    benefits: [
      "Shutdown windows held to schedule",
      "Reduced unplanned downtime",
      "Full traceability on welds and piping work",
      "Crews cleared and ready before the window opens",
    ],
  },
  "petrochemical-facilities": {
    challenges: [
      "Hazardous material handling",
      "Process-critical tolerances",
      "Overlapping electrical, mechanical and instrumentation scopes",
      "Continuous regulatory scrutiny",
    ],
    solutions: [
      "Cross-discipline crews working to one scope",
      "E&I and mechanical teams coordinated under one lead",
      "Documented QA/QC at every stage",
      "HSE briefings built around the specific process risk",
    ],
    benefits: [
      "Fewer handover gaps between disciplines",
      "Process integrity protected throughout the works",
      "Audit-ready documentation on close-out",
      "Fewer site incidents through discipline-specific safety planning",
    ],
  },
  "industrial-plants": {
    challenges: [
      "Ageing infrastructure and legacy systems",
      "Minimal tolerance for unplanned stoppages",
      "Coordinating maintenance around live production",
      "Spare-parts and equipment lead times",
    ],
    solutions: [
      "Planned and reactive maintenance crews on standby",
      "Equipment installation scheduled around production windows",
      "Site technical support embedded for the scope's duration",
      "A clear escalation path for urgent issues",
    ],
    benefits: [
      "Less unplanned downtime",
      "Maintenance completed without disrupting production",
      "A team already briefed on your site when issues arise",
      "Faster resolution on urgent call-outs",
    ],
  },
  "energy-infrastructure": {
    challenges: [
      "Distributed, hard-to-access sites",
      "Long-term asset reliability demands",
      "Multi-stakeholder sign-off requirements",
      "Weather- and environment-driven scheduling risk",
    ],
    solutions: [
      "Crews mobilised to remote and distributed sites",
      "Preventive maintenance built around asset life",
      "Structured reporting for every stakeholder in the chain",
      "Flexible scheduling around access and weather windows",
    ],
    benefits: [
      "Assets maintained to a consistent standard across sites",
      "Fewer surprise failures over the asset's life",
      "Clear reporting every stakeholder can rely on",
      "Work completed within the access windows available",
    ],
  },
  "marine-and-offshore": {
    challenges: [
      "Confined and corrosive environments",
      "Strict access and mobilisation windows",
      "Specialist welding and fabrication standards",
      "Logistics for equipment and crew to site",
    ],
    solutions: [
      "Marine-rated welding and fabrication crews",
      "Mobilisation planned around vessel or platform access",
      "Equipment and materials logistics managed end-to-end",
      "HSE protocols built for offshore and marine conditions",
    ],
    benefits: [
      "Work completed inside tight access windows",
      "Fabrication and welds that meet marine-grade standards",
      "One point of contact managing logistics",
      "Crews mobilised without last-minute delays",
    ],
  },
};

const FALLBACK_DETAILS = {
  challenges: ["Complex, site-specific requirements", "Strict safety and compliance standards", "Coordination across multiple trades"],
  solutions: ["Integrated project controls", "Site-tested QA/QC and HSE practice", "One point of coordination"],
  benefits: ["Predictable, on-schedule delivery", "Audit-ready documentation", "A single team across every discipline"],
};

export default function IndustriesIndexPage() {
  const { hero } = industriesPage;

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero — breadcrumb, eyebrow, headline, lede, dual CTAs, framed     */}
      {/* image, stat row, jump-to nav.                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-linear-to-b from-slate-50 to-white py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 70% 60% at 30% 20%, black 30%, transparent 80%)",
          }}
        />

        <div className="container-wol relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-ink-400">
            <Link href="/" className="transition-colors hover:text-ink-700">
              Home
            </Link>
            <span>/</span>
            <span className="text-ink-600">Industries</span>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                  <span className="h-px w-6 bg-blue-600" />
                  Industries
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="font-display mt-5 text-4xl font-bold leading-[1.05] text-ink-900 md:text-6xl">{hero.title}</h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500 md:text-lg">{hero.lede}</p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-600"
                  >
                    Discuss Your Site
                    <ArrowRight className="size-4" strokeWidth={1.75} />
                  </Link>
                  <a
                    href="#matrix-title"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink-700 transition-colors duration-200 hover:border-amber-400 hover:text-amber-600"
                  >
                    View Coverage Matrix
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-6" delay={0.15}>
              <div className="relative overflow-hidden rounded-3xl shadow-[0_32px_70px_-30px_rgba(15,23,42,0.35)]">
                <div className="relative aspect-4/3 w-full">
                  <Image src={hero.image.src ?? hero.image} alt={hero.image.alt ?? ""} fill priority className="object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-ink-900/25 via-transparent to-transparent" />
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-ink-900/70 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-white/90 backdrop-blur">
                  FIG. 01
                </span>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400 md:mt-20">
            <span className="text-ink-700">Index</span>
            <span className="text-amber-600">{String(industries.length).padStart(2, "0")} Sectors</span>
            <span>Dubai · UAE</span>
          </div>
        </div>
      </section>

      <div className="border-b border-line bg-white py-5">
        <div className="container-wol flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">Jump to</span>
          {industries.map((ind) => (
            <a
              key={ind.slug}
              href={`#${ind.slug}`}
              className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-700 transition-colors duration-200 hover:border-amber-400 hover:text-amber-600"
            >
              {ind.title}
            </a>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Sector focus blocks                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative py-20 md:py-28" aria-label="Sectors">
        <div className="container-wol space-y-24 md:space-y-32">
          {industries.map((ind, i) => {
            const key = normalize(ind.title);
            const Icon = SECTOR_ICON[key] ?? Building2;
            const details = SECTOR_DETAILS[key] ?? FALLBACK_DETAILS;
            const flip = i % 2 === 1;

            return (
              <article key={ind.slug} id={ind.slug} className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <Reveal className={cn("lg:col-span-6", flip && "lg:order-2")}>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-amber-600">
                    <span className="h-px w-6 bg-amber-500" />
                    Sector focus
                  </span>
                  <div className="mt-5 flex size-12 items-center justify-center rounded-full bg-ink-900">
                    <Icon className="size-5 text-amber-400" strokeWidth={1.75} />
                  </div>
                  <h2 className="font-display mt-5 text-3xl font-bold text-ink-900 md:text-4xl">{ind.title}</h2>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-500">{ind.summary}</p>

                  <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-ink-900">
                        <Info className="size-3.5 text-ink-400" strokeWidth={1.75} />
                        Challenges
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {details.challenges.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-sm leading-snug text-ink-500">
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-ink-300" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-ink-900">
                        <Lightbulb className="size-3.5 text-blue-500" strokeWidth={1.75} />
                        Solutions
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {details.solutions.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm leading-snug text-ink-600">
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-blue-500" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-ink-900">
                        <TrendingUp className="size-3.5 text-amber-500" strokeWidth={1.75} />
                        Benefits
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {details.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm leading-snug text-ink-600">
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-amber-500" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 transition-colors duration-200 hover:text-amber-600"
                  >
                    Discuss a {ind.title.toLowerCase()} project
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} />
                  </Link>
                </Reveal>

                <Reveal className={cn("lg:col-span-6", flip && "lg:order-1")} delay={0.1}>
                  <div className="group relative overflow-hidden rounded-3xl shadow-[0_28px_60px_-28px_rgba(15,23,42,0.35)]">
                    <ParallaxImage
                      src={ind.image.src}
                      alt={ind.image.alt}
                      focal={ind.image.focal}
                      sizes="(min-width:1024px) 45vw, 100vw"
                      className="aspect-4/3"
                    >
                      <div />
                    </ParallaxImage>
                    <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-white/95 py-1.5 pl-1.5 pr-5 shadow-lg backdrop-blur">
                      <span className="flex size-9 items-center justify-center rounded-full bg-amber-400">
                        <Icon className="size-4 text-ink-900" strokeWidth={1.75} />
                      </span>
                      <span>
                        <span className="block text-[10px] font-semibold uppercase tracking-widest text-ink-500">
                          Sector {String(i + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
                        </span>
                        <span className="block text-sm font-semibold text-ink-900">{ind.title}</span>
                      </span>
                    </div>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>
      {/* ---------------------------------------------------------------- */}
      {/* FAQs — five sector-level questions.                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative border-t border-line bg-slate-50 py-20 md:py-28" aria-labelledby="ind-faq-title">
        <div className="container-wol">
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeader index="02" eyebrow="FAQs" title={<span id="ind-faq-title">Common questions by sector.</span>} align="center" />
          </div>

          <RevealGroup className="mx-auto mt-12 max-w-3xl space-y-4" step={0.05}>
            {INDUSTRY_FAQS.map((item) => (
              <RevealItem key={item.q}>
                <details className="wol-tilt-subtle wol-color-card group rounded-2xl border border-line bg-white p-5 shadow-[0_14px_28px_-24px_rgba(15,23,42,0.16)] transition-colors duration-300 open:border-transparent md:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
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

          <Reveal className="mt-10 text-center" delay={0.1}>
            <Link href="/faqs" className="wol-chip inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink-900">
              Browse all FAQs
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </Reveal>
        </div>
      </section>

      <CinematicCTA />
    </>
  );
}
