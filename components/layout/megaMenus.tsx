import type { ReactNode } from "react";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import type { ImageAsset } from "@/content/types";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { IndustryIcon } from "@/components/icons/IndustryIcon";

export type MegaMenuKey = "services" | "industries";

export type MegaMenuItem = {
  key: string;
  index: string;
  href: string;
  icon: ReactNode;
  title: string;
  /** One-line row descriptor. */
  description: string;
  /** Longer line shown under the preview image. */
  tagline: string;
  image: ImageAsset;
};

export type MegaMenuConfig = {
  key: MegaMenuKey;
  label: string;
  indexLabel: string;
  openLabel: string;
  allHref: string;
  allLabel: string;
  items: MegaMenuItem[];
};

/**
 * Header dropdown configs. Both menus render through the same MegaMenu /
 * MobileNav components, so the Industries dropdown inherits the Services
 * dropdown's design language rather than re-implementing it.
 */
export const MEGA_MENUS: Record<MegaMenuKey, MegaMenuConfig> = {
  services: {
    key: "services",
    label: "Services",
    indexLabel: "Service index",
    openLabel: "Open service",
    allHref: "/services",
    allLabel: "View all services",
    items: services.map((s) => ({
      key: s.slug,
      index: s.index,
      href: `/services/${s.slug}`,
      icon: <ServiceIcon name={s.icon} className="size-5" />,
      title: s.title,
      description: s.menuDescription,
      tagline: s.tagline,
      image: s.image,
    })),
  },
  industries: {
    key: "industries",
    label: "Industries",
    indexLabel: "Sector index",
    openLabel: "Open sector",
    allHref: "/industries",
    allLabel: "View all industries",
    items: industries.map((i) => ({
      key: i.slug,
      index: i.index,
      href: `/industries/${i.slug}`,
      icon: <IndustryIcon slug={i.slug} className="size-5" />,
      title: i.title,
      description: i.menuDescription,
      tagline: i.summary,
      image: i.image,
    })),
  },
};
