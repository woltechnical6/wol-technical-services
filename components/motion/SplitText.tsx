"use client";
import { motion } from "motion/react";
import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  /** Applied to the final line only (e.g. a colour shift on the closing phrase). */
  lastLineClassName?: string;
  delay?: number;
  step?: number;
  as?: "h1" | "h2" | "h3" | "p";
  /** If true, animate immediately on mount rather than on viewport entry. */
  immediate?: boolean;
};

/** Reveals text line-by-line through a clipping mask. */
export function SplitText({ lines, className, lineClassName, lastLineClassName, delay = 0, step = 0.09, as = "h2", immediate = false }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      {...(immediate ? { animate: "visible" } : { whileInView: "visible", viewport: viewportOnce })}
      variants={{ hidden: {}, visible: { transition: { delayChildren: delay, staggerChildren: step } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={cn("block will-change-transform", lineClassName, i === lines.length - 1 && lastLineClassName)}
            variants={{
              hidden: { y: "105%", rotate: 1.5 },
              visible: { y: 0, rotate: 0, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
