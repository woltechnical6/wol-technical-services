/**
 * Company-level content. Anything that is a verifiable fact about WOL
 * (registration, certifications, headcount, years) is deliberately a
 * placeholder until confirmed by the company.
 */
export const PLACEHOLDER = "[To be confirmed]" as const;

/**
 * Public origin the site is served from. Used for every absolute URL Next
 * emits — og:image, twitter:image, canonical, sitemap, robots — so it must be
 * a host that actually resolves, or link previews silently break.
 *
 *   1. NEXT_PUBLIC_SITE_URL         — set explicitly (e.g. once woltechnical.com is live)
 *   2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel: the *.vercel.app host, or the
 *                                      custom production domain once one is attached
 *   3. localhost                     — local dev / local builds
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  name: "WOL Technical Services",
  shortName: "WOL",
  tagline: "Oil & Gas Technical Services",
  descriptor: "Oil & Gas · Technical Services · Dubai, UAE",
  description:
    "WOL Technical Services is a Dubai-based technical services company supporting oil & gas and industrial facilities with mechanical, piping, welding, electrical, automation and maintenance work.",
  url: resolveSiteUrl(),
  location: {
    city: "Dubai",
    country: "United Arab Emirates",
    address: PLACEHOLDER,
    coordinates: "25.2048° N, 55.2708° E",
  },
  contact: {
    phone: PLACEHOLDER,
    email: PLACEHOLDER,
    hours: "Sunday – Thursday, 08:00 – 18:00 (GST)",
  },
  legal: {
    tradeLicense: PLACEHOLDER,
    registeredEntity: PLACEHOLDER,
  },
  social: [] as { label: string; href: string }[],
};

export const nav = {
  primary: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services", mega: "services" as const },
    { label: "Industries", href: "/industries", mega: "industries" as const },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  company: [
    { label: "About WOL", href: "/about" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export type NavItem = (typeof nav.primary)[number];
