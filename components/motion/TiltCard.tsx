"use client";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useCanHover } from "@/lib/hooks/useMediaQuery";
import { fadeUp, viewportOnce } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  intensity?: number;
  /** Lift on hover in px along z. */
  lift?: number;
  delay?: number;
  sheen?: boolean;
};

/** Card that tilts toward the pointer and lifts from its surface. Subtle by design. */
export function TiltCard({ children, className, intensity = 6, lift = 18, delay = 0, sheen = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const canHover = useCanHover();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const z = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });
  const sz = useSpring(z, { stiffness: 180, damping: 22 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${srx}deg) rotateY(${sry}deg) translateZ(${sz}px)`;
  const glow = useMotionTemplate`radial-gradient(240px circle at ${gx}% ${gy}%, rgba(255,255,255,0.06), transparent 60%)`;

  const onMove = (e: MouseEvent) => {
    if (!canHover || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set((0.5 - py) * intensity * 2);
    gx.set(px * 100);
    gy.set(py * 100);
    z.set(lift);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    z.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ delay }}
      className={cn("relative", className)}
    >
      {children}
      {sheen && <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />}
    </motion.div>
  );
}
