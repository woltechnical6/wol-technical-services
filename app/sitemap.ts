import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { serviceSlugs } from "@/content/services";
import { industrySlugs } from "@/content/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const statics = ["", "/about", "/services", "/industries", "/faqs", "/contact", "/privacy", "/terms"];
  return [
    ...statics.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...serviceSlugs.map((s) => ({ url: `${base}/services/${s}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...industrySlugs.map((s) => ({ url: `${base}/industries/${s}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
