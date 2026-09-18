export type ImageAsset = {
  src: string;
  alt: string;
  /** Focal point as CSS object-position, e.g. "50% 40%" */
  focal?: string;
};

export type ServiceIconKey =
  | "mechanical"
  | "piping"
  | "welding"
  | "electrical"
  | "installation"
  | "maintenance"
  | "support"
  | "site";

/** Layout variant drives how each service page composes its sections. */
export type ServiceLayout = "editorial" | "technical" | "split" | "immersive";

export type ProcessStep = {
  step: string;
  title: string;
  body: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type Service = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  menuDescription: string;
  tagline: string;
  summary: string;
  icon: ServiceIconKey;
  layout: ServiceLayout;
  image: ImageAsset;
  intro: string[];
  capabilities: { title: string; body: string }[];
  applications: string[];
  approach: { title: string; body: string }[];
  safetyQuality: string[];
  process: ProcessStep[];
  faq: FaqItem[];
  relatedIndustries: string[];
  seo: { title: string; description: string };
};

export type Industry = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  description: string[];
  image: ImageAsset;
  typicalScope: string[];
  relatedServices: string[];
  seo: { title: string; description: string };
};
