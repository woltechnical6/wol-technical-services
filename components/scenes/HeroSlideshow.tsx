"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionTemplate, useTransform } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { hero, heroSlides } from "@/content/home";
import { site } from "@/content/site";
import { usePointer } from "@/lib/hooks/usePointer";
import { useIsTablet } from "@/lib/hooks/useMediaQuery";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { EASE_OUT_EXPO } from "@/lib/motion";

const COUNT = heroSlides.length;
const HOLD_MS = hero.interval * 1000;

/**
 * Hero slideshow — ten full-bleed photographs, one at a time, each held
 * for `hero.interval` seconds. The active photograph swings in on the y-axis behind a
 * dark wash and drifts with the pointer; the copy over it is written for
 * that photograph. Only a hidden tab pauses the cycle.
 */
export function HeroSlideshow() {
  const reduced = useReducedMotion();
  const isTablet = useIsTablet();
  const enable3d = isTablet && !reduced;
  const pointer = usePointer(enable3d);

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [visible, setVisible] = useState(true);
  const running = visible;

  const go = useCallback((next: number, direction: number) => {
    setDir(direction);
    setIndex(((next % COUNT) + COUNT) % COUNT);
  }, []);

  // Auto-advance, re-armed whenever the index changes.
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => go(index + 1, 1), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [running, index, go]);

  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // The photograph drifts a few pixels against the pointer for depth.
  const driftX = useTransform(pointer.x, [-1, 1], [14, -14]);
  const driftY = useTransform(pointer.y, [-1, 1], [10, -10]);
  const drift = useMotionTemplate`translate3d(${driftX}px, ${driftY}px, 0)`;

  const slide = heroSlides[index];

  return (
    <section
      data-hero="photo"
      aria-roledescription="carousel"
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col overflow-hidden bg-[#0a1330] pt-[var(--header-h)]"
    >
      {/* ------------------------------------------------------------ */}
      {/* Photographs — full-bleed, turning in and out on the y-axis     */}
      {/* ------------------------------------------------------------ */}
      <div className="absolute inset-0 [perspective:1800px]" aria-hidden="true">
        <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={enable3d ? { transform: drift } : undefined}>
          {heroSlides.map((s, i) => {
            const active = i === index;
            const leaving = ((i - index + COUNT) % COUNT) === COUNT - 1;
            return (
              <motion.div
                key={s.id}
                className="absolute inset-0 will-change-transform"
                style={{ zIndex: active ? 3 : leaving ? 2 : 1, transformOrigin: dir > 0 ? "100% 50%" : "0% 50%" }}
                initial={false}
                animate={
                  reduced
                    ? { opacity: active ? 1 : 0 }
                    : active
                      ? { opacity: 1, x: "0%", rotateY: 0, scale: 1 }
                      : leaving
                        ? { opacity: 0, x: `${-6 * dir}%`, rotateY: 10 * dir, scale: 1.06 }
                        : { opacity: 0, x: `${6 * dir}%`, rotateY: -10 * dir, scale: 1.06 }
                }
                transition={{ duration: reduced ? 0.5 : 0.9, ease: EASE_OUT_EXPO }}
              >
                {/* Slow push-in while the photograph is on screen */}
                <motion.div
                  className="absolute inset-0"
                  animate={reduced ? { scale: 1 } : { scale: active ? 1.08 : 1 }}
                  transition={{ duration: active ? hero.interval + 1.5 : 0.6, ease: "linear" }}
                >
                  <Image src={s.src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" style={{ objectPosition: s.focal }} />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Wash — keeps the copy legible over any photograph */}
        <div className="absolute inset-0 z-10 bg-linear-to-r from-[#050b1f]/90 via-[#0a1330]/55 to-[#0a1330]/25" />
        <div className="absolute inset-0 z-10 bg-linear-to-t from-[#050b1f]/90 via-transparent to-[#050b1f]/45" />
        <div className="wol-hero-orb-a absolute -left-24 top-1/3 z-10 size-104 rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="wol-hero-orb-b absolute -right-32 bottom-0 z-10 size-96 rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Copy — swaps with the slide                                    */}
      {/* ------------------------------------------------------------ */}
      <div className="container-wol relative z-20 flex flex-1 flex-col justify-center py-20 md:py-24">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              aria-live="polite"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${COUNT}: ${slide.label}`}
            >
              <span className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
                <span className="wol-shimmer h-px w-14 bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-size-[200%_100%]" />
                {slide.tag} · {site.location.city}, UAE
              </span>

              <h1 className="font-display mt-6 text-[clamp(2.6rem,6vw,5.25rem)] font-bold leading-[1.02] tracking-tight text-white">
                {slide.headline[0]}
                <br />
                {slide.headline[1]}
              </h1>

              <p className="mt-7 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">{slide.sub}</p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href={hero.secondaryCta.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 bg-size-[200%_100%] px-7 py-3.5 text-sm font-semibold text-ink-900 shadow-[0_18px_40px_-16px_rgba(245,158,11,0.6)] transition-[background-position] duration-500 hover:bg-right"
                >
                  {hero.secondaryCta.label}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} />
                </Link>
                <Link
                  href={slide.cta.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors duration-200 hover:border-white/50 hover:bg-white/10"
                >
                  {slide.cta.label}
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
