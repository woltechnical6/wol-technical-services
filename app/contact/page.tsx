import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Space_Grotesk, Manrope } from "next/font/google";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  MessageSquare,
  ClipboardList,
  Send,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { contactPage } from "@/content/pages";
import { site } from "@/content/site";
import { CinematicCTA } from "@/components/scenes/CinematicCTA";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

/**
 * Page-scoped type pairing, matched to the About page so the two read as one site.
 * Space Grotesk carries headlines; Manrope handles body copy.
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
  title: "Contact",
  description:
    "Request a consultation or quotation from WOL Technical Services, Dubai. Tell us about the scope and we will respond with a considered approach.",
  alternates: { canonical: "/contact" },
};

type SearchParams = Promise<{ service?: string | string[]; sent?: string | string[] }>;

const INQUIRY_OPTIONS = [
  { value: "general", label: "General enquiry" },
  { value: "quotation", label: "Request a quotation" },
  { value: "mechanical", label: "Mechanical" },
  { value: "piping", label: "Piping" },
  { value: "welding", label: "Welding" },
  { value: "electrical-instrumentation", label: "Electrical & Instrumentation" },
  { value: "site-support", label: "Site technical support" },
  { value: "other", label: "Other" },
];

/** Three-step expectation setter — a genuine sequence, so numbering is meaningful. */
const PROCESS = [
  {
    icon: Send,
    title: "You send the scope",
    body: "Site, discipline, timeline — as much or as little detail as you have. Drawings and specs are welcome but not required to start.",
  },
  {
    icon: MessageSquare,
    title: "We come back with questions",
    body: "A member of the team who will actually run the work reviews it, usually within one working day, and confirms what we still need.",
  },
  {
    icon: ClipboardList,
    title: "You get a scoped quotation",
    body: "Broken down by discipline and deliverable, with realistic mobilisation dates and crew availability confirmed up front.",
  },
];

/** hero.title may be a string or an array of lines depending on the content layer — handle both. */
function resolveTitle(title: unknown): string {
  if (Array.isArray(title)) return title.join(" ");
  return typeof title === "string" ? title : "";
}

/** hero.image may be a plain path or a StaticImageData-style object. */
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
      className={`wol-shimmer mt-4 block h-0.75 w-14 rounded-full bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-size-[200%_100%] ${
        center ? "mx-auto" : ""
      }`}
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

/**
 * Handles the enquiry form as a Server Action, so the form works with plain HTML
 * submission — no client component required. Swap the console.log for a real
 * integration (email provider, CRM, ticketing) when one is available.
 */
async function submitContactForm(formData: FormData) {
  "use server";

  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    country: formData.get("country"),
    service: formData.get("service"),
    message: formData.get("message"),
  };

  // TODO: send `payload` to your email/CRM provider of choice.
  console.log("Contact enquiry received:", payload);

  redirect("/contact?sent=true#form-title");
}

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/15";

const selectClass =
  "w-full appearance-none rounded-full border border-line bg-white px-4 py-3 pr-10 text-sm text-ink-900 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/15";

function FormField({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-500">
        {label}
      </label>
      {children}
    </div>
  );
}

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const defaultService = typeof sp.service === "string" ? sp.service : undefined;
  const justSent = sp.sent === "true" || (Array.isArray(sp.sent) && sp.sent.includes("true"));

  const { hero } = contactPage;
  const heroTitle = resolveTitle(hero.title);
  const heroImageSrc = resolveImageSrc(hero.image);

  const details = [
    {
      icon: MapPin,
      label: "Location",
      value: `${site.location.city}, ${site.location.country}`,
      sub: site.location.address,
      href: undefined as string | undefined,
    },
    {
      icon: Phone,
      label: "Phone",
      value: site.contact.phone,
      sub: "Direct to the enquiries team",
      href: `tel:${String(site.contact.phone).replace(/[^+\d]/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: site.contact.email,
      sub: "Replies within one working day",
      href: `mailto:${site.contact.email}`,
    },
    { icon: Clock, label: "Hours", value: site.contact.hours, sub: "GST · UTC+4", href: undefined },
  ];

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} wol-contact`}>
      <style>{`
        .wol-contact { font-family: var(--font-wol-body), ui-sans-serif, system-ui, sans-serif; }
        .wol-contact .font-display {
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

        /* Tilt motion — applied to every card on the page via TiltCard + this hover fallback. */
        .wol-tilt { transform-style: preserve-3d; transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease; }
        .wol-tilt:hover { transform: perspective(1200px) rotateX(2.5deg) rotateY(-3.5deg) translateY(-5px); }
        .wol-tilt-subtle:hover { transform: perspective(1400px) rotateX(1.2deg) rotateY(-1.6deg) translateY(-3px); }

        /* Gradient edge on hover — same treatment as the About page cards. */
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
        .wol-color-card .wol-icon-box { transition: background 0.5s ease; background: #0f172a; }
        .wol-color-card:hover .wol-icon-box { background: linear-gradient(135deg, #2563eb, #f59e0b); }

        .wol-blueprint-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 85%);
        }

        .wol-sweep {
          background-image: linear-gradient(90deg, transparent, rgba(34,211,238,0.35), transparent);
        }

        @media (prefers-reduced-motion: reduce) {
          .wol-hero-orb-a, .wol-hero-orb-b, .wol-shimmer, .wol-pulse-dot { animation: none !important; }
          .wol-tilt:hover, .wol-tilt-subtle:hover { transform: none; }
          .wol-color-card:hover::before { animation: none; opacity: 1; }
        }
      `}</style>

      {/* ---------------------------------------------------------------- */}
      {/* Hero — dark blueprint field, breadcrumb, badge, headline, gold    */}
      {/* rule, dual CTAs, framed site photo, coordinate readout.           */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#0a1330] via-[#101f47] to-[#0d1a3d] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="wol-blueprint-grid absolute inset-0" />
          <div className="wol-hero-orb-a absolute -left-24 top-0 size-104 rounded-full bg-cyan-400/20 blur-[110px]" />
          <div className="wol-hero-orb-b absolute -right-24 bottom-0 size-96 rounded-full bg-cyan-500/10 blur-[110px]" />
        </div>

        <div className="container-wol relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/40">
            <Link href="/" className="transition-colors hover:text-white/80">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/70">Contact</span>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
                  <SparkleIcon className="size-3.5 text-amber-400" />
                  {hero.eyebrow}
                </span>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="font-display mt-6 text-4xl font-bold leading-[1.08] text-white md:text-6xl">{heroTitle}</h1>
              </Reveal>

              <GoldRule />

              <Reveal delay={0.14}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">{hero.lede}</p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="#form-title"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors duration-200 hover:bg-amber-400"
                  >
                    Describe your scope
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} />
                  </a>
                  <a
                    href={`tel:${String(site.contact.phone).replace(/[^+\d]/g, "")}`}
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
                {heroImageSrc ? (
                  <div className="relative aspect-4/3 w-full">
                    <Image src={heroImageSrc} alt={heroTitle} fill sizes="(min-width:1024px) 45vw, 100vw" priority className="object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a1330]/70 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="flex aspect-4/3 w-full items-center justify-center bg-white/5 text-sm text-white/50">Image coming soon</div>
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5">
                  <span className="wol-pulse-dot size-2 rounded-full bg-cyan-400" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">Enquiries open · {site.location.city}</span>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Contact detail cards                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative -mt-10 pb-4" aria-label="Contact details">
        <div className="container-wol">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" step={0.06}>
            {details.map((d) => {
              const Icon = d.icon;
              const inner = (
                <>
                  <div className="wol-icon-box flex size-11 items-center justify-center rounded-xl">
                    <Icon className="size-5 text-white" strokeWidth={1.7} />
                  </div>
                  <p className="font-display mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">{d.label}</p>
                  <p className="mt-1.5 wrap-break-word text-base font-semibold text-ink-900">{d.value}</p>
                  {d.sub && <p className="mt-1 text-xs leading-relaxed text-ink-500">{d.sub}</p>}
                </>
              );

              return (
                <RevealItem key={d.label}>
                  <TiltCard
                    className="wol-tilt wol-color-card group h-full rounded-2xl border border-line bg-white p-6 shadow-[0_18px_36px_-26px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-22px_rgba(15,23,42,0.26)]"
                    intensity={4}
                    lift={8}
                  >
                    {d.href ? (
                      <a href={d.href} className="block focus-visible:outline-none">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </TiltCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
          <p className="mt-4 text-[11px] leading-relaxed text-ink-500">
            Bracketed values are placeholders until confirmed by WOL Technical Services.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Enquiry form + locator panel                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative scroll-mt-24 py-20 md:py-28" aria-labelledby="form-title">
        <div className="container-wol grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                <span className="h-px w-6 bg-blue-600" />
                Enquiry form
              </span>
              <h2 id="form-title" className="font-display mt-5 text-3xl font-bold text-ink-900 md:text-4xl">
                Describe the scope.
              </h2>
              <GoldRule />
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-500">
                Tell us the site, the discipline and the window you&rsquo;re working to. The more you can share, the closer the first
                response will be to a real answer.
              </p>
            </Reveal>

            <Reveal className="mt-10" delay={0.1}>
              <TiltCard
                className="wol-tilt-subtle wol-color-card rounded-3xl border border-line bg-white p-6 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.35)] md:p-8"
                intensity={1.5}
                lift={4}
              >
                {justSent ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-emerald-50">
                      <CheckCircle2 className="size-7 text-emerald-600" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-ink-900">Message sent.</h3>
                    <p className="max-w-xs text-sm leading-relaxed text-ink-500">
                      Thanks — a member of the team will come back to you within one working day.
                    </p>
                    <Link href="/contact" className="mt-2 text-sm font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700">
                      Send another message
                    </Link>
                  </div>
                ) : (
                  <form action={submitContactForm} className="space-y-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-ink-900">Start a conversation</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                        Tell us about the scope — the more context, the sharper our first response.
                      </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField label="Full name" htmlFor="name">
                        <input id="name" name="name" type="text" required placeholder="Jane Doe" className={inputClass} />
                      </FormField>
                      <FormField label="Work email" htmlFor="email">
                        <input id="email" name="email" type="email" required placeholder="jane@company.com" className={inputClass} />
                      </FormField>
                      <FormField label="Company" htmlFor="company">
                        <input id="company" name="company" type="text" placeholder="Company Inc." className={inputClass} />
                      </FormField>
                      <FormField label="Country" htmlFor="country">
                        <input id="country" name="country" type="text" placeholder="United Arab Emirates" className={inputClass} />
                      </FormField>
                    </div>

                    <FormField label="How can we help?" htmlFor="service">
                      <div className="relative">
                        <select id="service" name="service" defaultValue={defaultService ?? ""} required className={selectClass}>
                          <option value="" disabled>
                            Select an enquiry type...
                          </option>
                          {INQUIRY_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-400" strokeWidth={1.75} />
                      </div>
                    </FormField>

                    <FormField label="Your message" htmlFor="message">
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us about your project, timelines and goals..."
                        className={`${inputClass} resize-none`}
                      />
                    </FormField>

                    <label className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        className="mt-0.5 size-4 shrink-0 rounded border-line text-blue-600 focus:ring-2 focus:ring-blue-500/25"
                      />
                      I agree to be contacted by WOL Technical Services regarding my enquiry.
                    </label>

                    <div>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
                      >
                        Send message
                        <Send className="size-4" strokeWidth={2} />
                      </button>
                      <p className="mt-3 text-xs leading-relaxed text-ink-500">
                        We typically reply within one business day. Your details are kept confidential.
                      </p>
                    </div>
                  </form>
                )}
              </TiltCard>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            {/* Locator panel — technical rendering of the coordinates rather than a third-party map. */}
            <Reveal delay={0.2}>
              <TiltCard className="wol-tilt relative aspect-4/3 overflow-hidden rounded-2xl border border-line bg-[#0a1330]" intensity={3} lift={6}>
                <div className="wol-blueprint-grid absolute inset-0 opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_46%,rgba(34,211,238,0.22),transparent_50%)]" />
                <span className="absolute left-[58%] top-[46%] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400" />
                <span className="absolute left-[58%] top-[46%] size-12 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-cyan-400/40 [animation-duration:3s]" />
                <span className="absolute left-[58%] top-0 h-full w-px bg-cyan-400/20" />
                <span className="absolute left-0 top-[46%] h-px w-full bg-cyan-400/20" />
                <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.16em] text-white/50">LOCATOR · DXB</span>
                <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.14em] text-cyan-300">{site.location.coordinates}</span>
                <span className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.14em] text-white/40">GRID · NTS</span>
              </TiltCard>
              <div className="wol-sweep mt-4 h-px w-full" />
            </Reveal>

            <Reveal delay={0.3} className="mt-10">
              <TiltCard className="wol-tilt-subtle rounded-2xl border border-line bg-slate-50 p-6" intensity={2} lift={5}>
                <h3 className="font-display text-lg font-semibold text-ink-900">Prefer to skip the form?</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  Phone and email go straight to the team handling enquiries — no call centre, no hand-offs.
                </p>
                <div className="mt-5 space-y-3">
                  <a
                    href={`tel:${String(site.contact.phone).replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink-900 transition-colors duration-200 hover:border-amber-400 hover:text-amber-600"
                  >
                    <Phone className="size-4 shrink-0" strokeWidth={1.7} />
                    {site.contact.phone}
                  </a>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink-900 transition-colors duration-200 hover:border-amber-400 hover:text-amber-600"
                  >
                    <Mail className="size-4 shrink-0" strokeWidth={1.7} />
                    <span className="break-all">{site.contact.email}</span>
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* What happens next — a real three-step sequence                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative border-y border-line bg-slate-50 py-20 md:py-28" aria-labelledby="process-title">
        <div className="container-wol">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 id="process-title" className="font-display text-3xl font-bold text-ink-900 md:text-4xl">
              What happens after you send it
            </h2>
            <GoldRule center />
            <p className="mt-5 text-base leading-relaxed text-ink-500 md:text-lg">
              No automated funnel. Three steps, each handled by someone who will be on the job.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" step={0.08}>
            {PROCESS.map((step, i) => {
              const Icon = step.icon;
              return (
                <RevealItem key={step.title}>
                  <TiltCard
                    className="wol-tilt wol-color-card group h-full rounded-2xl border border-line bg-white p-6 shadow-[0_18px_36px_-26px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-22px_rgba(15,23,42,0.26)]"
                    intensity={4}
                    lift={8}
                  >
                    <div className="flex items-center justify-between">
                      <div className="wol-icon-box flex size-11 items-center justify-center rounded-xl">
                        <Icon className="size-5 text-white" strokeWidth={1.7} />
                      </div>
                      <span className="font-mono text-xs font-semibold text-amber-500">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-display mt-5 text-lg font-semibold text-ink-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.body}</p>
                    <span className="mt-5 block h-px w-8 bg-ink-200 transition-all duration-300 group-hover:w-14 group-hover:bg-amber-400" />
                  </TiltCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <CinematicCTA
        eyebrow="Contact · Next step"
        title={["Prefer to", "call instead?"]}
        body="Phone and email go straight to the team handling enquiries — no call centre, no hand-offs."
        primary={{ label: "Request a Consultation", href: "/contact" }}
        secondary={{ label: "View All Services", href: "/services" }}
      />
    </div>
  );
}