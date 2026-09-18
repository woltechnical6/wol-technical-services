"use client";
import { motion } from "motion/react";
import { EASE_INDUSTRIAL, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** A technical line that draws itself in when it enters the viewport. */
export function DrawLine({
  orientation = "horizontal",
  className,
  delay = 0,
  duration = 1.2,
  tone = "steel",
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
  delay?: number;
  duration?: number;
  tone?: "steel" | "cyan" | "amber";
}) {
  const color = tone === "cyan" ? "bg-cyan-400/70" : tone === "amber" ? "bg-amber-500/70" : "bg-line-strong";
  const h = orientation === "horizontal";
  return (
    <div className={cn("relative overflow-hidden", h ? "h-px w-full" : "h-full w-px", className)} aria-hidden>
      <motion.span
        className={cn("absolute inset-0 origin-left", color, !h && "origin-top")}
        initial={{ scaleX: h ? 0 : 1, scaleY: h ? 1 : 0 }}
        whileInView={{ scaleX: 1, scaleY: 1 }}
        viewport={viewportOnce}
        transition={{ duration, delay, ease: EASE_INDUSTRIAL }}
      />
    </div>
  );
}

/** SVG path drawing helper — wraps children paths with pathLength animation. */
export function DrawPath({
  d,
  className,
  delay = 0,
  duration = 1.6,
  stroke = "currentColor",
  strokeWidth = 1,
  dashed = false,
}: {
  d: string;
  className?: string;
  delay?: number;
  duration?: number;
  stroke?: string;
  strokeWidth?: number;
  dashed?: boolean;
}) {
  return (
    <motion.path
      d={d}
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={dashed ? "4 6" : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={viewportOnce}
      transition={{ pathLength: { duration, delay, ease: EASE_INDUSTRIAL }, opacity: { duration: 0.3, delay } }}
    />
  );
}
