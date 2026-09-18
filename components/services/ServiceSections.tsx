import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Factory,
  FileCheck2,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Service } from "@/content/types";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ServiceIcon } from "@/components/icons/ServiceIcon";

type P = { service: Service };

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */
function GoldRule({ center = false }: { center?: boolean }) {
  return (
    <span
      className={`wol-shimmer mt-4 block h-0.75 w-14 rounded-full bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-size-[200%_100%] ${center ? "mx-auto" : ""}`}
    />
  );
}

function Eyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
      <span className="wol-pulse-dot size-1.5 rounded-full bg-blue-600" />
      <span className="font-mono text-ink-400">{index}</span>
      {children}
    </span>
  );
}

function SectionIntro({
  index,
  eyebrow,
  title,
  titleId,
  lede,
  center = false,
  light = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  titleId: string;
  lede?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 id={titleId} className={`font-display mt-4 text-3xl font-bold leading-tight md:text-4xl lg:text-[2.6rem] ${light ? "text-white" : "text-ink-900"}`}>
          {title}
        </h2>
      </Reveal>
      <GoldRule center={center} />
      {lede ? (
        <Reveal delay={0.12}>
          <p className={`mt-6 text-base leading-relaxed md:text-lg ${light ? "text-white/70" : "text-ink-600"}`}>{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

const CARD =
  "wol-tilt wol-shine wol-color-card group h-full rounded-2xl border border-line bg-white p-6 shadow-[0_18px_36px_-26px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_28px_56px_-24px_rgba(15,23,42,0.3)]";

/* ------------------------------------------------------------------ */
/* 01 · OVERVIEW                                                       */
/* ------------------------------------------------------------------ */
export function ServiceIntro({ service }: P) {
  const [lead, ...rest] = service.intro;
  const related = industries.filter((i) => service.relatedIndustries.includes(i.slug));

  const facts = [
    { icon: Layers, label: "Discipline", value: service.shortTitle },
    { icon: ClipboardList, label: "Capabilities", value: `${service.capabilities.length} core areas` },
    { icon: Factory, label: "Sectors", value: related.map((r) => r.title).join(" · ") },
    { icon: MapPin, label: "Coverage", value: `${site.location.city} · ${site.location.country}` },
  ];

  return (
    <section className="relative py-20 md:py-28" aria-labelledby="overview-title">
      <div className="container-wol grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionIntro index="01" eyebrow="Overview" titleId="overview-title" title={`${service.title}, delivered with method.`} lede={service.summary} />
          <Reveal delay={0.16}>
            <p className="font-display mt-8 border-l-2 border-amber-400 pl-5 text-xl font-semibold leading-snug text-ink-900 md:text-2xl">{lead}</p>
          </Reveal>
          <RevealGroup className="mt-6 space-y-5 text-base leading-relaxed text-ink-600 md:text-lg" delay={0.2}>
            {rest.map((p) => (
              <RevealItem key={p.slice(0, 24)}>
                <p>{p}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="lg:col-span-5" delay={0.15}>
          <TiltCard className="wol-tilt wol-color-card group rounded-3xl border border-line bg-white p-6 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.35)] md:p-8" intensity={3} lift={6}>
            <div className="flex items-center justify-between">
              <div className="wol-icon-box flex size-12 items-center justify-center rounded-xl text-white">
                <ServiceIcon name={service.icon} className="size-6" />
              </div>
              <span className="font-mono text-xs tracking-[0.14em] text-ink-400">SVC · {service.index}</span>
            </div>
            <h3 className="font-display mt-6 text-xl font-bold text-ink-900">At a glance</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{service.tagline}</p>
            <ul className="mt-6 divide-y divide-line">
              {facts.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4 py-3.5">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">{label}</span>
                    <span className="mt-0.5 block text-sm font-medium text-ink-900">{value}</span>
                  </span>
                </li>
              ))}
            </ul>
            <span className="wol-gradient-line-soft mt-4 block h-px w-full" />
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 transition-colors duration-200 hover:text-blue-700">
              Discuss this scope
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} />
            </Link>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · CAPABILITIES                                                   */
/* ------------------------------------------------------------------ */
export function ServiceCapabilities({ service }: P) {
  return (
    <section className="relative bg-slate-50 py-20 md:py-28" aria-labelledby="cap-title">
      <div className="container-wol">
        <SectionIntro
          index="02"
          eyebrow="Capabilities"
          titleId="cap-title"
          title="What the crew brings to site."
          lede="Each capability is delivered by supervised crews working to written method statements, with hold points agreed before the work begins."
        />
        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" step={0.07}>
          {service.capabilities.map((c, i) => (
            <RevealItem key={c.title} className="h-full">
              <TiltCard className={CARD} intensity={5} lift={10}>
                <div className="flex items-center justify-between">
                  <div className="wol-icon-box flex size-11 items-center justify-center rounded-xl text-white">
                    <ServiceIcon name={service.icon} className="size-5" />
                  </div>
                  <span className="wol-num font-display text-3xl font-bold text-ink-200">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display mt-6 text-lg font-bold leading-snug text-ink-900 transition-colors duration-200 group-hover:text-blue-700 md:text-xl">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{c.body}</p>
                <span className="mt-5 block h-px w-10 bg-amber-400/0 transition-all duration-500 group-hover:w-full group-hover:bg-amber-400" />
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · APPLICATIONS & SECTORS                                         */
/* ------------------------------------------------------------------ */
export function ServiceApplications({ service }: P) {
  const related = industries.filter((i) => service.relatedIndustries.includes(i.slug));

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#0a1330] via-[#101f47] to-[#0d1a3d] py-20 md:py-28" aria-labelledby="app-title">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="wol-blueprint-grid absolute inset-0" />
        <div className="wol-hero-orb-b absolute -right-24 top-0 size-88 rounded-full bg-cyan-400/15 blur-[110px]" />
        <div className="wol-hero-orb-a absolute -left-24 bottom-0 size-88 rounded-full bg-amber-500/10 blur-[110px]" />
      </div>

      <div className="container-wol relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionIntro
            index="03"
            eyebrow="Applications"
            titleId="app-title"
            title="Where this service applies."
            lede="Typical scopes WOL is mobilised for, and the sectors where this discipline is most often called on."
            light
          />
          <RevealGroup className="mt-10 flex flex-wrap gap-2.5" step={0.04}>
            {service.applications.map((a) => (
              <RevealItem key={a}>
                <span className="wol-chip group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur">
                  <CheckCircle2 className="size-4 text-amber-400 transition-colors duration-300 group-hover:text-white" strokeWidth={1.75} />
                  {a}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Related sectors</p>
          </Reveal>
          <RevealGroup className="mt-5 grid gap-5 sm:grid-cols-2" step={0.08}>
            {related.map((r) => (
              <RevealItem key={r.slug} className="h-full">
                <TiltCard
                  className="wol-tilt wol-shine wol-color-card group h-full rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition-colors duration-300 hover:bg-white/[0.1]"
                  intensity={4}
                  lift={8}
                >
                  <Link href={`/industries/${r.slug}`} className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <div className="wol-icon-box flex size-11 items-center justify-center rounded-xl border border-white/10 text-white">
                        <Factory className="size-5" strokeWidth={1.75} />
                      </div>
                      <span className="font-mono text-xs tracking-[0.14em] text-white/40">IND · {r.index}</span>
                    </div>
                    <h3 className="font-display mt-6 text-lg font-bold text-white transition-colors duration-200 group-hover:text-amber-300">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{r.summary}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-white/80 transition-colors duration-200 group-hover:text-amber-300">
                      View sector
                      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
                    </span>
                  </Link>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 04 · TECHNICAL APPROACH                                             */
/* ------------------------------------------------------------------ */
export function ServiceApproach({ service }: P) {
  return (
    <section className="relative py-20 md:py-28" aria-labelledby="approach-title">
      <div className="container-wol">
        <SectionIntro
          index="04"
          eyebrow="Technical approach"
          titleId="approach-title"
          title="How the work is controlled."
          lede="Three principles that shape every scope — so the client can see what will happen, when, and how it will be checked."
          center
        />
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3" step={0.1}>
          {service.approach.map((s, i) => (
            <RevealItem key={s.title} className="h-full">
              <TiltCard className={CARD} intensity={4} lift={8}>
                <div className="flex items-center gap-4">
                  <span className="wol-icon-box flex size-12 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="wol-gradient-line-soft h-px flex-1 transition-opacity duration-300" />
                  <Sparkles className="size-4 text-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" strokeWidth={1.75} />
                </div>
                <h3 className="font-display mt-6 text-xl font-bold text-ink-900 transition-colors duration-200 group-hover:text-blue-700">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 md:text-[15px]">{s.body}</p>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 05 · SAFETY & QUALITY                                               */
/* ------------------------------------------------------------------ */
export function ServiceSafety({ service }: P) {
  return (
    <section className="relative bg-slate-50 py-20 md:py-28" aria-labelledby="safety-title">
      <div className="container-wol grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionIntro
            index="05"
            eyebrow="Safety & quality"
            titleId="safety-title"
            title="Controls that travel with the crew."
            lede="Safety and quality arrangements apply to every scope. Specific certifications and third-party approvals are stated only where confirmed by WOL."
          />
          <Reveal delay={0.18}>
            <TiltCard className="wol-tilt-subtle wol-color-card group mt-8 rounded-2xl border border-line bg-white p-5" intensity={2} lift={4}>
              <div className="flex items-center gap-4">
                <span className="wol-icon-box flex size-11 shrink-0 items-center justify-center rounded-xl text-white">
                  <ShieldCheck className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-base font-bold text-ink-900">Permit-led execution</p>
                  <p className="text-sm text-ink-500">Every intervention starts inside the client&apos;s permit system.</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:col-span-8" step={0.07}>
          {service.safetyQuality.map((item, i) => (
            <RevealItem key={item} className="h-full">
              <TiltCard className={CARD} intensity={4} lift={8}>
                <div className="flex items-start gap-4">
                  <span className="wol-icon-box flex size-10 shrink-0 items-center justify-center rounded-lg text-white">
                    <FileCheck2 className="size-4.5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <span className="wol-num font-mono text-[11px] tracking-[0.14em] text-ink-400">CONTROL · {String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-1.5 text-[15px] font-medium leading-relaxed text-ink-900">{item}</p>
                  </div>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 06 · PROCESS                                                        */
/* ------------------------------------------------------------------ */
export function ServiceProcess({ service }: P) {
  const steps = service.process;
  return (
    <section className="relative py-20 md:py-28" aria-labelledby="process-title">
      <div className="container-wol">
        <SectionIntro
          index="06"
          eyebrow="Process"
          titleId="process-title"
          title="From scope to handover."
          lede="The same sequence on every engagement, so clients always know which stage the work is at."
          center
        />
        <div className="relative mt-14">
          <span className="wol-gradient-line-soft absolute left-0 right-0 top-7 hidden h-px lg:block" aria-hidden="true" />
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" step={0.08}>
            {steps.map((s, i) => (
              <RevealItem key={s.step} className="h-full">
                <TiltCard className={CARD} intensity={4} lift={8}>
                  <span className="wol-icon-box relative flex size-14 items-center justify-center rounded-2xl font-display text-lg font-bold text-white ring-4 ring-white">
                    {s.step}
                  </span>
                  <h3 className="font-display mt-5 text-lg font-bold text-ink-900 transition-colors duration-200 group-hover:text-blue-700">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
                  {i < steps.length - 1 ? (
                    <ArrowRight className="mt-4 size-4 text-ink-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-500" strokeWidth={1.75} />
                  ) : (
                    <CheckCircle2 className="mt-4 size-4 text-ink-300 transition-colors duration-300 group-hover:text-amber-500" strokeWidth={1.75} />
                  )}
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 07 · FAQ                                                            */
/* ------------------------------------------------------------------ */
export function ServiceFaq({ service }: P) {
  return (
    <section className="relative bg-slate-50 py-20 md:py-28" aria-labelledby="faq-title">
      <div className="container-wol">
        <SectionIntro
          index="07"
          eyebrow="FAQ"
          titleId="faq-title"
          title={`Common questions about ${service.shortTitle.toLowerCase()}.`}
          lede="Straight answers on how this service is scoped, mobilised and handed over."
          center
        />
        <RevealGroup className="mx-auto mt-12 max-w-3xl space-y-4" step={0.05}>
          {service.faq.map((item) => (
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
  );
}

/* ------------------------------------------------------------------ */
/* 08 · NEXT / PREVIOUS SERVICE                                        */
/* ------------------------------------------------------------------ */
export function NextService({ service }: P) {
  const idx = services.findIndex((s) => s.slug === service.slug);
  const next = services[(idx + 1) % services.length];
  const prev = services[(idx - 1 + services.length) % services.length];

  const items = [
    { label: "Previous service", s: prev, Icon: ArrowLeft, align: "" },
    { label: "Next service", s: next, Icon: ArrowRight, align: "md:text-right md:flex-row-reverse" },
  ];

  return (
    <nav aria-label="Other services" className="relative py-16 md:py-20">
      <div className="container-wol">
        <Reveal className="text-center">
          <Eyebrow index="08">Keep exploring</Eyebrow>
        </Reveal>
        <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2" step={0.1}>
          {items.map(({ label, s, Icon, align }) => (
            <RevealItem key={s.slug} className="h-full min-w-0">
              <TiltCard className={CARD} intensity={4} lift={8}>
                <Link href={`/services/${s.slug}`} className={`flex h-full items-center gap-5 ${align}`}>
                  <span className="wol-icon-box flex size-12 shrink-0 items-center justify-center rounded-xl text-white">
                    <ServiceIcon name={s.icon} className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
                      {label} · {s.index}
                    </span>
                    <span className="font-display mt-1 block text-lg font-bold text-ink-900 transition-colors duration-200 group-hover:text-blue-700 md:text-xl">{s.title}</span>
                    <span className="mt-1 block truncate text-sm text-ink-500">{s.menuDescription}</span>
                  </span>
                  <Icon className="size-5 shrink-0 text-ink-300 transition-colors duration-200 group-hover:text-amber-500" strokeWidth={1.75} />
                </Link>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </nav>
  );
}
