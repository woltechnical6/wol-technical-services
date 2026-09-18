/**
 * Company-level content. Anything that is a verifiable fact about WOL
 * (registration, certifications, headcount, years) is deliberately a
 * placeholder until confirmed by the company.
 */
export const PLACEHOLDER = "[To be confirmed]" as const;

export const site = {
  name: "WOL Technical Services",
  shortName: "WOL",
  tagline: "Oil & Gas Technical Services",
  descriptor: "Oil & Gas · Technical Services · Dubai, UAE",
  description:
    "WOL Technical Services is a Dubai-based technical services company supporting oil & gas and industrial facilities with mechanical, piping, welding, electrical and maintenance work.",
  url: "https://www.woltechnical.com",
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
    { label: "Services", href: "/services", mega: true },
    { label: "Industries", href: "/industries" },
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
