"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Vertical travel in percent of container height over the scroll range. */
  strength?: number;
  focal?: string;
  priority?: boolean;
  sizes?: string;
  /** Reveal the image through a mask when entering the viewport. */
  mask?: "up" | "left" | "none";
  grade?: boolean;
  corner?: boolean;
  /** Optional overlay rendered above the image (labels, technical marks). */
  children?: React.ReactNode;
};

/** Image that drifts on scroll and optionally reveals through a mask. */
export function ParallaxImage({
  src,
  alt,
  className,
  strength = 12,
  focal = "50% 50%",
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  mask = "up",
  grade = true,
  corner = false,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  const clip =
    mask === "up"
      ? { hidden: { clipPath: "inset(100% 0 0 0)" }, visible: { clipPath: "inset(0 0 0 0)" } }
      : mask === "left"
        ? { hidden: { clipPath: "inset(0 100% 0 0)" }, visible: { clipPath: "inset(0 0 0 0)" } }
        : { hidden: {}, visible: {} };

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", grade && "grade", corner && "corner-marks", className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={clip}
      transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
    >
      <motion.div className="absolute -inset-y-[14%] inset-x-0" style={{ y: reduced ? 0 : y }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: focal }} />
      </motion.div>
      {children}
    </motion.div>
  );
}
