"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/types";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";

type Props = {
  service: Service;
  variant?: "grid" | "feature" | "row";
  className?: string;
};

/**
 * Service card: number, title, description, technical icon, image reveal
 * on hover, link. Perspective lift on hover.
 */
export function ServiceCard({ service, variant = "grid", className }: Props) {
  const feature = variant === "feature";
  return (
    <motion.article variants={fadeUp} className={cn("group relative", className)}>
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          "surface-metal relative flex h-full flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
          "hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_30px_60px_-30px_rgba(16,21,29,0.25)]",
          feature ? "min-h-[26rem] md:min-h-[30rem]" : "min-h-[18rem]",
        )}
      >
        {/* Image reveal — feature keeps a full photo + dark scrim; grid keeps a faint wash so ink text stays legible in both states */}
        <div className={cn("absolute inset-0 overflow-hidden", feature ? "opacity-100" : "opacity-0 transition-opacity duration-700 group-hover:opacity-[0.14]")}>
          <Image
            src={service.image.src}
            alt=""
            fill
            sizes={feature ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"}
            className={cn("object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]", feature ? "scale-100 group-hover:scale-105" : "scale-110 group-hover:scale-100")}
            style={{ objectPosition: service.image.focal }}
          />
          {feature && <div className="absolute inset-0 bg-linear-to-t from-scrim-900 via-scrim-900/70 to-scrim-900/15" />}
        </div>

        <div className="relative flex h-full flex-col p-5 md:p-6">
          <div className="flex items-start justify-between">
            <span className="font-mono text-xs text-cyan-400">{service.index}</span>
            <ServiceIcon name={service.icon} className={cn("size-9 transition-colors duration-500", feature ? "text-steel-400 group-hover:text-white" : "text-ink-300 group-hover:text-cyan-400")} />
          </div>

          <div className="mt-auto pt-10">
            <h3 className={cn("font-display font-medium leading-tight", feature ? "text-white text-2xl md:text-3xl" : "text-ink-900 text-lg md:text-xl")}>{service.title}</h3>
            <p className={cn("mt-3 text-sm leading-relaxed", feature ? "text-steel-300 max-w-md md:text-base" : "text-ink-500 line-clamp-3")}>{feature ? service.summary : service.menuDescription}</p>
            <span className={cn("mt-5 inline-flex items-center gap-2 font-display text-[11px] font-medium uppercase tracking-[0.14em] transition-colors group-hover:text-cyan-400", feature ? "text-steel-300" : "text-ink-700")}>
              View service
              <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
            </span>
          </div>
        </div>

        {/* Bottom rail */}
        <span className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
      </Link>
    </motion.article>
  );
}
