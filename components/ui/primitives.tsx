import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Monospace uppercase label with an optional leading tick mark. */
export function TechLabel({
  children,
  className,
  tick = true,
  tone = "steel",
}: {
  children: ReactNode;
  className?: string;
  tick?: boolean;
  tone?: "steel" | "cyan" | "amber";
}) {
  const toneCls = tone === "cyan" ? "text-cyan-400" : tone === "amber" ? "text-amber-500" : "text-ink-500";
  return (
    <span className={cn("tech-label inline-flex items-center gap-2", toneCls, className)}>
      {tick && <span className={cn("block h-px w-5", tone === "cyan" ? "bg-cyan-400" : tone === "amber" ? "bg-amber-500" : "bg-ink-500")} />}
      {children}
    </span>
  );
}

/** Section heading block: index + eyebrow, large title, optional lede. */
export function SectionHeader({
  index,
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  light = false,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <div className={cn("mb-5 flex items-center gap-4", align === "center" && "justify-center")}>
        {index && <span className={cn("font-mono text-xs", light ? "text-cyan-300" : "text-cyan-400")}>{index}</span>}
        <TechLabel tick={align !== "center"} className={light ? "text-steel-300 [&>span]:bg-steel-300" : undefined}>
          {eyebrow}
        </TechLabel>
      </div>
      <h2
        className={cn(
          "font-display text-[clamp(1.9rem,4.2vw,3.5rem)] font-medium leading-[1.04]",
          light ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {lede && <p className={cn("mt-6 max-w-2xl text-base leading-relaxed md:text-lg", light ? "text-steel-300" : "text-ink-500")}>{lede}</p>}
    </div>
  );
}

/** Horizontal technical rule with end ticks. */
export function TechRule({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-px w-full bg-line", className)} aria-hidden>
      <span className="absolute left-0 top-1/2 h-2 w-px -translate-y-1/2 bg-ink-500" />
      <span className="absolute right-0 top-1/2 h-2 w-px -translate-y-1/2 bg-ink-500" />
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-wol", className)}>{children}</div>;
}

/** Small numeric readout used across the site (coordinates, indices). */
export function Readout({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] tracking-[0.14em] text-ink-500", className)}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
