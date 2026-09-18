"use client";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: "div" | "section" | "li" | "span";
};

/** Fade/lift into view when the element enters the viewport. */
export function Reveal({ children, className, delay = 0, variants = fadeUp }: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct children that themselves use `variants`. */
export function RevealGroup({
  children,
  className,
  delay = 0,
  step = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
}) {
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(delay, step)}>
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, variants = fadeUp }: { children: ReactNode; className?: string; variants?: Variants }) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
