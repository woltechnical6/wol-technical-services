import { Building2, Cog, Factory, FlaskConical, Fuel, Ship, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Sector icon keyed by industry slug — shared by the header menus and the industries index. */
export const INDUSTRY_ICON: Record<string, LucideIcon> = {
  "oil-gas": Fuel,
  refineries: Factory,
  petrochemical: FlaskConical,
  "industrial-plants": Factory,
  "energy-infrastructure": Zap,
  "marine-offshore": Ship,
  "manufacturing-industrial": Cog,
};

export function IndustryIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = INDUSTRY_ICON[slug] ?? Building2;
  return <Icon className={cn("size-5", className)} strokeWidth={1.75} aria-hidden />;
}
