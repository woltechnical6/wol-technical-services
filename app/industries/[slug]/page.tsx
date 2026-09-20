import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Space_Grotesk, Manrope } from "next/font/google";
import { ArrowRight, ArrowUpRight, CheckCircle2, ClipboardList, Factory, Layers, MapPin, Phone } from "lucide-react";
import { getIndustry, industrySlugs, industries } from "@/content/industries";
import { services } from "@/content/services";
import { faq, process } from "@/content/home";
import { site } from "@/content/site";
import { CinematicCTA } from "@/components/scenes/CinematicCTA";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FAQSection } from "@/components/sections/FAQSection";
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

type Params = Promise<{ slug: string }>;

/** Brand share card — PNG so Facebook, LinkedIn, WhatsApp, X, Slack and iMessage all render it. */
const OG_IMAGE = { url: "/brand/og-image.png", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}`, type: "image/png" };

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return {
    title: ind.seo.title,
    description: ind.seo.description,
    alternates: { canonical: `/industries/${ind.slug}` },
    openGraph: { title: ind.seo.title, description: ind.seo.description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: ind.seo.title, description: ind.seo.description, images: [OG_IMAGE.url] },
  };
}

function splitTitle(title: string): string[] {
  // "Petrochemical Facilities" → ["Petrochemical", "Facilities"]; "Oil & Gas" → ["Oil &", "Gas"].
  const parts = title.split(" ");
  if (parts.length < 2) return [title];
  return [parts.slice(0, -1).join(" "), parts.slice(-1).join(" ")];
}

const CARD =
  "wol-tilt wol-shine wol-color-card group h-full rounded-2xl border border-line bg-white p-6 shadow-[0_18px_36px_-26px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_28px_56px_-24px_rgba(15,23,42,0.3)]";

function GoldRule({ center = false }: { center?: boolean }) {
  return (
    <span
      className={`wol-shimmer mt-4 block h-0.75 w-14 rounded-full bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-size-[200%_100%] ${center ? "mx-auto" : ""}`}
    />
  );
}

function Eyebrow({ index, children, light = false }: { index: string; children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] ${light ? "text-cyan-300" : "text-blue-600"}`}>
      <span className={`wol-pulse-dot size-1.5 rounded-full ${light ? "bg-cyan-300" : "bg-blue-600"}`} />
      <span className={`font-mono ${light ? "text-white/40" : "text-ink-400"}`}>{index}</span>
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
        <Eyebrow index={index} light={light}>
          {eyebrow}
        </Eyebrow>
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

export default async function IndustryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const related = services.filter((s) => ind.relatedServices.includes(s.slug));
  const others = industries.filter((i) => i.slug !== ind.slug);
  const [lead, ...rest] = ind.description;
  const [titleA, titleB] = splitTitle(ind.title);
  const total = String(industries.length).padStart(2, "0");
  const phoneHref = `tel:${String(site.contact.phone).replace(/[^+\d]/g, "")}`;

  const facts = [
    { icon: Factory, label: "Sector", value: ind.title },
    { icon: Layers, label: "Disciplines", value: related.map((r) => r.shortTitle).join(" · ") },
    { icon: ClipboardList, label: "Scope items", value: `${ind.typicalScope.length} typical work types` },
    { icon: MapPin, label: "Coverage", value: `${site.location.city} · ${site.location.country}` },
  ];

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} wol-service`}>
      <style>{`
        .wol-service { font-family: var(--font-wol-body), ui-sans-serif, system-ui, sans-serif; }
        .wol-service .font-display {
          font-family: var(--font-wol-display), ui-sans-serif, system-ui, sans-serif;
          letter-spacing: -0.015em;
        }
      `}</style>

      {/* ---------------------------------------------------------------- */}
      {/* Hero — full-bleed sector photograph with a deep navy wash, copy   */}
      {/* set left, and a glass "typical scope" ledger along the base.      */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="relative flex min-h-[78svh] flex-col overflow-hidden bg-[#0a1330] pt-[var(--header-h)]"
        data-hero="photo"
        aria-labelledby="industry-title"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={ind.image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: ind.image.focal }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0a1330]/95 via-[#0a1330]/70 to-[#0a1330]/20" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a1330] via-[#0a1330]/30 to-[#0a1330]/40" />
          <div className="wol-blueprint-grid absolute inset-0 opacity-40" />
          <div className="wol-hero-orb-a absolute -left-24 top-1/4 size-104 rounded-full bg-cyan-400/15 blur-[120px]" />
          <div className="wol-hero-orb-b absolute -right-24 bottom-0 size-96 rounded-full bg-amber-500/10 blur-[120px]" />
        </div>

        <div className="container-wol relative flex flex-1 flex-col justify-center py-16 md:py-20">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/45">
            <Link href="/" className="transition-colors hover:text-white/85">
              Home
            </Link>
            <span>/</span>
            <Link href="/industries" className="transition-colors hover:text-white/85">
              Industries
            </Link>
            <span>/</span>
            <span className="text-white/75">{ind.title}</span>
          </nav>

          <div className="mt-10 max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
                <span className="wol-pulse-dot size-1.5 rounded-full bg-amber-400" />
                Industry {ind.index} of {total}
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 id="industry-title" className="font-display mt-6 text-4xl font-bold leading-[1.06] text-white md:text-6xl lg:text-7xl">
                {titleA}
                {titleB ? (
                  <>
                    <br />
                    <span className="text-amber-400">{titleB}</span>
                  </>
                ) : null}
              </h1>
            </Reveal>

            <GoldRule />

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{ind.summary}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors duration-200 hover:bg-amber-400"
                >
                  Request a consultation
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} />
                </Link>
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors duration-200 hover:border-white/50 hover:bg-white/5"
                >
                  <Phone className="size-4" strokeWidth={1.75} />
                  Call the team
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scope ledger */}
        <div className="container-wol relative pb-8 md:pb-10">
          <Reveal delay={0.25}>
            <div className="rounded-2xl border border-white/12 bg-white/8 backdrop-blur-md">
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
                <span className="wol-pulse-dot size-1.5 rounded-full bg-cyan-300" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200">Typical scope in this sector</span>
              </div>
              <ul className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
                {ind.typicalScope.map((t, i) => (
                  <li key={t} className="flex items-start gap-3 px-5 py-4">
                    <span className="font-mono text-xs text-amber-400">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-medium leading-snug text-white/90">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 01 · OVERVIEW                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative py-20 md:py-28" aria-labelledby="overview-title">
        <div className="container-wol grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionIntro index="01" eyebrow="Sector overview" titleId="overview-title" title={`How WOL works in ${ind.title.toLowerCase()}.`} lede={ind.summary} />
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
                  <Factory className="size-6" strokeWidth={1.75} />
                </div>
                <span className="font-mono text-xs tracking-[0.14em] text-ink-400">IND · {ind.index}</span>
              </div>
              <h3 className="font-display mt-6 text-xl font-bold text-ink-900">At a glance</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{ind.seo.description}</p>
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
              <span className="wol-gradient-line mt-6 block h-px w-full" />
              <p className="mt-4 text-xs text-ink-400">Scope is indicative and confirmed for each enquiry after a site walk-down.</p>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 02 · TYPICAL SCOPE                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative bg-slate-50 py-20 md:py-28" aria-labelledby="scope-title">
        <div className="container-wol">
          <SectionIntro
            index="02"
            eyebrow="Typical scope"
            titleId="scope-title"
            title="Work we are usually asked to carry out."
            lede={`The scopes below are representative of WOL's work in ${ind.title.toLowerCase()}. Each one is planned, executed and documented to the client's site systems.`}
            center
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" step={0.08}>
            {ind.typicalScope.map((t, i) => (
              <RevealItem key={t} className="h-full">
                <TiltCard className={CARD} intensity={4} lift={8}>
                  <span className="wol-icon-box flex size-14 items-center justify-center rounded-2xl font-display text-lg font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-5 text-lg font-bold leading-snug text-ink-900 transition-colors duration-200 group-hover:text-blue-700">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">Surveyed, method-stated and executed under the site permit system with inspection hold points agreed up front.</p>
                  <CheckCircle2 className="mt-4 size-4 text-ink-300 transition-colors duration-300 group-hover:text-amber-500" strokeWidth={1.75} />
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 03 · RELATED SERVICES                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative py-20 md:py-28" aria-labelledby="related-title">
        <div className="container-wol">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionIntro
              index="03"
              eyebrow="Related services"
              titleId="related-title"
              title="Disciplines applied in this sector."
              lede={`The services most often combined for ${ind.title.toLowerCase()} clients — each delivered by the same supervised crews and documentation standard.`}
            />
            <Reveal delay={0.1}>
              <Link href="/services" className="wol-chip inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink-900">
                All services
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </Link>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" step={0.07}>
            {related.map((service) => (
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
                      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
                    </span>
                  </Link>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 04 · PROCESS                                                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-slate-50">
        <ProcessTimeline
          steps={process}
          index="04"
          eyebrow="How we work"
          title="The same method in every sector."
          lede="From first walk-down to close-out pack, the sequence does not change — only the site systems it runs under."
          compact
        />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 05 · OTHER INDUSTRIES                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#0a1330] via-[#101f47] to-[#0d1a3d] py-20 md:py-28" aria-labelledby="others-title">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="wol-blueprint-grid absolute inset-0" />
          <div className="wol-hero-orb-a absolute -left-24 top-0 size-96 rounded-full bg-cyan-400/15 blur-[110px]" />
          <div className="wol-hero-orb-b absolute -right-24 bottom-0 size-96 rounded-full bg-amber-500/10 blur-[110px]" />
        </div>
        <div className="container-wol relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionIntro
              index="05"
              eyebrow="Other industries"
              titleId="others-title"
              title="More sectors we serve."
              lede="The same disciplines, adapted to the systems and constraints of each facility type."
              light
            />
            <Reveal delay={0.1}>
              <Link href="/industries" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors duration-200 hover:bg-amber-400">
                All industries
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} />
              </Link>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" step={0.07}>
            {others.map((o) => (
              <RevealItem key={o.slug} className="h-full">
                <TiltCard
                  className="wol-tilt wol-shine group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-colors duration-300 hover:border-amber-400/40"
                  intensity={5}
                  lift={8}
                >
                  <Link href={`/industries/${o.slug}`} className="flex h-full flex-col" aria-label={`${o.title} — view sector`}>
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image
                        src={o.image.src}
                        alt={o.image.alt}
                        fill
                        sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ objectPosition: o.image.focal }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#0a1330] via-[#0a1330]/30 to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur">
                        {o.index}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-bold leading-snug text-white transition-colors duration-200 group-hover:text-amber-300">{o.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/65">{o.summary}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-white/85 transition-colors duration-200 group-hover:text-amber-300">
                        View sector
                        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 06 · FAQ                                                          */}
      {/* ---------------------------------------------------------------- */}
      <FAQSection
        items={ind.faq ?? faq.slice(0, 4)}
        index="06"
        title={`Working with WOL in ${ind.title.toLowerCase()}.`}
        lede="Straight answers on how work in this sector is scoped, mobilised and handed over."
        compact
      />

      <CinematicCTA
        eyebrow={`${ind.title} · Consultation`}
        title={["Discuss your", "scope with WOL."]}
        body={`Share the asset, drawings or site conditions involved, and we will respond with a considered approach for ${ind.title.toLowerCase()} work.`}
      />
    </div>
  );
}
