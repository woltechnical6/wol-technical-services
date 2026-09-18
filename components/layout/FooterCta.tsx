"use client";
import Link from "next/link";
import { motion, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";

/**
 * CTA band with a subtle physical-feeling 3D tilt on hover — same spring
 * language as the header's TiltLogo/MagneticCTA, scaled down so the box
 * reads as reacting to the cursor rather than swinging around.
 */
export function FooterCta() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const rotateX = useSpring(0, { stiffness: 240, damping: 24, mass: 0.5 });
  const rotateY = useSpring(0, { stiffness: 240, damping: 24, mass: 0.5 });
  const scale = useSpring(1, { stiffness: 240, damping: 24 });
  const glowX = useSpring(50, { stiffness: 200, damping: 26 });
  const glowY = useSpring(50, { stiffness: 200, damping: 26 });
  const glowOpacity = useTransform(scale, [1, 1.012], [0, 1]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 5);
    rotateX.set((py - 0.5) * -5);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => {
        scale.set(1.012);
        setHovered(true);
      }}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, scale, transformPerspective: 1000 }}
      className="relative overflow-hidden rounded-3xl border border-deep-line-strong bg-linear-to-br from-deep-800/70 via-deep-800/30 to-deep-900/70 px-6 py-8 mt-16 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.6)] transition-shadow duration-300 [transform-style:preserve-3d] sm:px-10 sm:py-10 lg:mt-20"
    >
      {/* cursor-tracking sheen, only visible while hovered */}
      <motion.div
        aria-hidden
        style={{
          opacity: hovered ? glowOpacity : 0,
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(420px circle at ${gx}% ${gy}%, rgba(249,115,22,0.14), transparent 65%)`,
          ),
        }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
      />

      <span aria-hidden className="pointer-events-none absolute -left-16 -top-20 h-56 w-72 rounded-full bg-linear-to-br from-cyan-400/20 via-cyan-300/5 to-transparent blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -right-10 -bottom-16 h-48 w-64 rounded-full bg-linear-to-tl from-amber-400/20 via-orange-500/5 to-transparent blur-3xl" />

      <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center" style={{ transform: "translateZ(24px)" }}>
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/80">Start a project</span>
          <h2 className="mt-2 font-display text-2xl font-medium leading-tight text-white sm:text-3xl">
            Precision technical work, delivered on schedule.
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-steel-300">{site.description}</p>
        </div>

        <Link href="/contact" className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-linear-to-br from-blue-500 via-blue-600 to-blue-800 px-6 py-3 font-display text-[13px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(29,78,216,0.55)] ring-1 ring-transparent transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:from-amber-500 hover:via-orange-500 hover:to-orange-600 hover:shadow-[0_16px_36px_-8px_rgba(249,115,22,0.55)] hover:ring-orange-300/50 active:scale-[0.98]">
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 -translate-x-[160%] bg-linear-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[220%]" />
          <span className="relative flex size-1.5 items-center justify-center">
            <span className="absolute inset-0 scale-0 rounded-full bg-white/80 opacity-0 transition-all duration-300 group-hover:scale-150 group-hover:animate-ping group-hover:opacity-70" />
            <span className="relative size-1.5 rounded-full bg-white/90" />
          </span>
          <span className="relative">Request Consultation</span>
          <ArrowRight className="relative size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" strokeWidth={1.75} />
        </Link>
      </div>
    </motion.div>
  );
}