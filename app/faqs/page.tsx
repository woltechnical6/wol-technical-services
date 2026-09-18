import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk, Manrope } from "next/font/google";
import { ArrowRight, ArrowUpRight, ChevronDown, ClipboardList, FileCheck2, HardHat, Info, Mail, MessageSquare, Phone, ShieldCheck } from "lucide-react";
import { faqsPage, faqCategories, faqsFinalNote } from "@/content/faqs";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { CinematicCTA } from "@/components/scenes/CinematicCTA";
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
  title: "FAQs",
  description:
    "Answers to common questions about how WOL Technical Services scopes, mobilises, controls and hands over mechanical, piping, welding, E&I and maintenance work in the UAE.",
  alternates: { canonical: "/faqs" },
};

const CATEGORY_ICONS = {
  general: Info,
  scoping: ClipboardList,
  site: HardHat,
  safety: ShieldCheck,
  handover: FileCheck2,
} as const;

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

function FaqCard({ q, a }: { q: string; a: string }) {
  return (
    <details className="wol-tilt-subtle wol-color-card group rounded-2xl border border-line bg-white p-5 shadow-[0_14px_28px_-24px_rgba(15,23,42,0.16)] transition-colors duration-300 open:border-transparent md:p-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <span className="font-display text-base font-semibold text-ink-900 transition-colors duration-200 group-hover:text-blue-700 md:text-lg">{q}</span>
        <span className="wol-icon-box flex size-8 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-open:rotate-180">
          <ChevronDown className="size-4" strokeWidth={2} />
        </span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-ink-600 md:text-base">{a}</p>
      <span className="wol-gradient-line mt-4 block h-px w-10 opacity-0 transition-all duration-500 group-open:w-16 group-open:opacity-100" />
    </details>
  );
}

export default function FaqsPage() {
  const { hero } = faqsPage;
  const phoneHref = `tel:${String(site.contact.phone).replace(/[^+\d]/g, "")}`;
  const totalQuestions = faqCategories.reduce((n, c) => n + c.items.length, 0) + services.reduce((n, s) => n + s.faq.length, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...faqCategories.flatMap((c) => c.items), ...services.flatMap((s) => s.faq)].map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} wol-faqs`}>
      <style>{`
        .wol-faqs { font-family: var(--font-wol-body), ui-sans-serif, system-ui, sans-serif; }
        .wol-faqs .font-display {
          font-family: var(--font-wol-display), ui-sans-serif, system-ui, sans-serif;
          letter-spacing: -0.015em;
        }
      `}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
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
            <span className="text-white/70">FAQs</span>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
                  <SparkleIcon className="size-3.5 text-amber-400" />
                  {hero.eyebrow} · {totalQuestions} answers
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
                    href="#faq-topics"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors duration-200 hover:bg-amber-400"
                  >
                    Browse the topics
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
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">{faqCategories.length} topics · {services.length} services</span>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-400">{site.location.city}, UAE</span>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Topic cards — jump links                                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="faq-topics" className="relative scroll-mt-24 py-20 md:py-28" aria-labelledby="topics-title">
        <div className="container-wol">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                <span className="wol-pulse-dot size-1.5 rounded-full bg-blue-600" />
                Browse by topic
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="topics-title" className="font-display mt-4 text-3xl font-bold leading-tight text-ink-900 md:text-5xl">
                Pick the stage you are at.
              </h2>
            </Reveal>
            <GoldRule center />
            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-ink-600 md:text-lg">
                From first enquiry to final handover — each topic collects the questions clients ask most at that stage.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" step={0.07}>
            {faqCategories.map((c) => {
              const Icon = CATEGORY_ICONS[c.id as keyof typeof CATEGORY_ICONS] ?? Info;
              return (
                <RevealItem key={c.id} className="h-full">
                  <TiltCard
                    className="wol-tilt wol-shine wol-color-card group h-full rounded-2xl border border-line bg-white p-6 shadow-[0_18px_36px_-26px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_28px_56px_-24px_rgba(15,23,42,0.3)]"
                    intensity={5}
                    lift={10}
                  >
                    <a href={`#${c.id}`} className="flex h-full flex-col">
                      <div className="flex items-center justify-between">
                        <div className="wol-icon-box flex size-11 items-center justify-center rounded-xl text-white">
                          <Icon className="size-5" strokeWidth={1.75} />
                        </div>
                        <span className="wol-num font-display text-2xl font-bold text-ink-200">{String(c.items.length).padStart(2, "0")}</span>
                      </div>
                      <h3 className="font-display mt-6 text-lg font-bold leading-snug text-ink-900 transition-colors duration-200 group-hover:text-blue-700">{c.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.blurb}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-ink-900 transition-colors duration-200 group-hover:text-blue-700">
                        Jump to topic
                        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
                      </span>
                    </a>
                  </TiltCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Topic sections                                                    */}
      {/* ---------------------------------------------------------------- */}
      {faqCategories.map((c, i) => {
        const Icon = CATEGORY_ICONS[c.id as keyof typeof CATEGORY_ICONS] ?? Info;
        return (
          <section
            key={c.id}
            id={c.id}
            className={`relative scroll-mt-24 py-20 md:py-28 ${i % 2 === 0 ? "bg-slate-50" : ""}`}
            aria-labelledby={`${c.id}-title`}
          >
            <div className="container-wol grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4 lg:sticky lg:top-32">
                <Reveal>
                  <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                    <span className="wol-pulse-dot size-1.5 rounded-full bg-blue-600" />
                    <span className="font-mono text-ink-400">{String(i + 1).padStart(2, "0")}</span>
                    Topic
                  </span>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 id={`${c.id}-title`} className="font-display mt-4 text-3xl font-bold leading-tight text-ink-900 md:text-4xl">
                    {c.title}
                  </h2>
                </Reveal>
                <GoldRule />
                <Reveal delay={0.12}>
                  <p className="mt-6 text-base leading-relaxed text-ink-600">{c.blurb}</p>
                </Reveal>
                <Reveal delay={0.18}>
                  <TiltCard className="wol-tilt-subtle wol-color-card group mt-8 rounded-2xl border border-line bg-white p-5" intensity={2} lift={4}>
                    <div className="flex items-center gap-4">
                      <span className="wol-icon-box flex size-11 shrink-0 items-center justify-center rounded-xl text-white">
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <div>
                        <p className="font-display text-base font-bold text-ink-900">{c.items.length} questions</p>
                        <p className="text-sm text-ink-500">Expand any card to read the answer.</p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              </div>

              <RevealGroup className="space-y-4 lg:col-span-8" step={0.05}>
                {c.items.map((item) => (
                  <RevealItem key={item.q}>
                    <FaqCard q={item.q} a={item.a} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        );
      })}

      {/* ---------------------------------------------------------------- */}
      {/* Per-service questions                                             */}
      {/* ---------------------------------------------------------------- */}
      <section id="services" className="relative overflow-hidden scroll-mt-24 bg-linear-to-br from-[#0a1330] via-[#101f47] to-[#0d1a3d] py-20 md:py-28" aria-labelledby="svc-faq-title">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="wol-blueprint-grid absolute inset-0" />
          <div className="wol-hero-orb-b absolute -right-24 top-0 size-88 rounded-full bg-cyan-400/15 blur-[110px]" />
        </div>
        <div className="container-wol relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-400">
                <span className="wol-pulse-dot size-1.5 rounded-full bg-amber-400" />
                By service
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="svc-faq-title" className="font-display mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
                Questions specific to each discipline.
              </h2>
            </Reveal>
            <GoldRule center />
            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
                The most common questions for each of our eight services, with a link to the full service page.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2" step={0.06}>
            {services.map((s) => (
              <RevealItem key={s.slug} className="h-full">
                <TiltCard
                  className="wol-tilt wol-shine wol-color-card group h-full rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition-colors duration-300 hover:bg-white/[0.09]"
                  intensity={3}
                  lift={6}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="wol-icon-box flex size-11 items-center justify-center rounded-xl border border-white/10 text-white">
                        <ServiceIcon name={s.icon} className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-white transition-colors duration-200 group-hover:text-amber-300">{s.title}</h3>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">SVC · {s.index}</p>
                      </div>
                    </div>
                    <Link
                      href={`/services/${s.slug}`}
                      className="wol-chip inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white/85"
                    >
                      View service
                      <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
                    </Link>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {s.faq.map((item) => (
                      <li key={item.q}>
                        <details className="group/item rounded-xl border border-white/10 bg-[#0a1330]/40 p-4 transition-colors duration-300 open:border-amber-400/40 hover:border-white/25">
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white/90">
                            {item.q}
                            <ChevronDown className="size-4 shrink-0 text-amber-400 transition-transform duration-300 group-open/item:rotate-180" strokeWidth={2} />
                          </summary>
                          <p className="mt-3 text-sm leading-relaxed text-white/65">{item.a}</p>
                        </details>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Still have a question                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative py-20 md:py-28" aria-labelledby="ask-title">
        <div className="container-wol">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                <span className="wol-pulse-dot size-1.5 rounded-full bg-blue-600" />
                Still have a question?
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="ask-title" className="font-display mt-4 text-3xl font-bold leading-tight text-ink-900 md:text-4xl">
                Ask the team directly.
              </h2>
            </Reveal>
            <GoldRule center />
            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-ink-600">{faqsFinalNote}</p>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-3" step={0.08}>
            {[
              { icon: MessageSquare, title: "Describe your scope", body: "Send drawings, photos or a short description and we will respond with a considered approach.", href: "/contact", cta: "Open the enquiry form" },
              { icon: Phone, title: "Call the team", body: site.contact.hours, href: phoneHref, cta: String(site.contact.phone) },
              { icon: Mail, title: "Email us", body: "Replies within one working day.", href: `mailto:${site.contact.email}`, cta: String(site.contact.email) },
            ].map(({ icon: Icon, title, body, href, cta }) => (
              <RevealItem key={title} className="h-full">
                <TiltCard
                  className="wol-tilt wol-shine wol-color-card group h-full rounded-2xl border border-line bg-white p-6 shadow-[0_18px_36px_-26px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-22px_rgba(15,23,42,0.26)]"
                  intensity={4}
                  lift={8}
                >
                  <Link href={href} className="flex h-full flex-col">
                    <div className="wol-icon-box flex size-11 items-center justify-center rounded-xl text-white">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display mt-5 text-lg font-bold text-ink-900 transition-colors duration-200 group-hover:text-blue-700">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{body}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-ink-900 transition-colors duration-200 group-hover:text-blue-700">
                      {cta}
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} />
                    </span>
                  </Link>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CinematicCTA />
    </div>
  );
}
