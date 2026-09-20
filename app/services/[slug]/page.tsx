import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Space_Grotesk, Manrope } from "next/font/google";
import { ArrowRight, Phone } from "lucide-react";
import { getService, serviceSlugs, services } from "@/content/services";
import { site } from "@/content/site";
import type { Service } from "@/content/types";
import {
  ServiceIntro,
  ServiceCapabilities,
  ServiceApplications,
  ServiceApproach,
  ServiceSafety,
  ServiceProcess,
  ServiceFaq,
  NextService,
} from "@/components/services/ServiceSections";
import { CinematicCTA } from "@/components/scenes/CinematicCTA";
import { Reveal } from "@/components/motion/Reveal";
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
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.seo.title, description: service.seo.description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: service.seo.title, description: service.seo.description, images: [OG_IMAGE.url] },
  };
}

function splitTitle(title: string): string[] {
  // "Piping & Fabrication" → ["Piping &", "Fabrication"]; single words stay whole.
  const parts = title.split(" ");
  if (parts.length < 2) return [title];
  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")];
}

/** Maps a service icon key to the matching enquiry option on the contact form. */
const CONTACT_ENQUIRY: Partial<Record<Service["icon"], string>> = {
  mechanical: "mechanical",
  piping: "piping",
  welding: "welding",
  electrical: "electrical-instrumentation",
  site: "site-support",
  support: "site-support",
  automation: "automation",
  scada: "automation",
  plc: "automation",
  integration: "automation",
};

function contactHref(service: Service) {
  const enquiry = CONTACT_ENQUIRY[service.icon];
  return enquiry ? `/contact?service=${enquiry}` : "/contact";
}

function GoldRule() {
  return <span className="wol-shimmer mt-4 block h-0.75 w-14 rounded-full bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-size-[200%_100%]" />;
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const [titleA, titleB] = splitTitle(service.title);
  const phoneHref = `tel:${String(site.contact.phone).replace(/[^+\d]/g, "")}`;

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
      {/* Hero — dark blueprint field, breadcrumb, service badge, headline, */}
      {/* gold rule, tagline, dual CTAs, framed service photo, readout.     */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#0a1330] via-[#101f47] to-[#0d1a3d] pt-[calc(var(--header-h)+2rem)] pb-20 md:pt-28 md:pb-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="wol-blueprint-grid absolute inset-0" />
          <div className="wol-hero-orb-a absolute -left-24 top-0 size-104 rounded-full bg-cyan-400/20 blur-[110px]" />
          <div className="wol-hero-orb-b absolute -right-24 bottom-0 size-96 rounded-full bg-amber-500/10 blur-[110px]" />
        </div>

        <div className="container-wol relative">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/40">
            <Link href="/" className="transition-colors hover:text-white/80">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="transition-colors hover:text-white/80">
              Services
            </Link>
            <span>/</span>
            <span className="text-white/70">{service.shortTitle}</span>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
                  <ServiceIcon name={service.icon} className="size-4 text-amber-400" />
                  Service {service.index} of {String(services.length).padStart(2, "0")}
                </span>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="font-display mt-6 text-4xl font-bold leading-[1.08] text-white md:text-6xl">
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
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">{service.tagline}</p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    href={contactHref(service)}
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors duration-200 hover:bg-amber-400"
                  >
                    Request a consultation
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} />
                  </Link>
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
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width:1024px) 45vw, 100vw"
                    priority
                    className="object-cover"
                    style={{ objectPosition: service.image.focal }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a1330]/80 via-transparent to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5">
                  <span className="flex items-center gap-3">
                    <span className="wol-pulse-dot size-2 rounded-full bg-cyan-400" />
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">SVC · {service.index}</span>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-400">{site.location.city}, UAE</span>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      <ServiceIntro service={service} />
      <ServiceCapabilities service={service} />
      <ServiceApplications service={service} />
      <ServiceApproach service={service} />
      <ServiceSafety service={service} />
      <ServiceProcess service={service} />
      <ServiceFaq service={service} />
      <NextService service={service} />
      <CinematicCTA
        eyebrow={`${service.shortTitle} · Consultation`}
        title={["Discuss your", "scope with WOL."]}
        body={`Share the equipment, drawings or site conditions involved, and we will respond with a considered approach for ${service.title.toLowerCase()}.`}
      />
    </div>
  );
}
