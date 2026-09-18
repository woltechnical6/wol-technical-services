"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { ImageAsset } from "@/content/types";
import { SplitText } from "@/components/motion/SplitText";
import { TechLabel, Readout } from "@/components/ui/primitives";
import { DrawLine } from "@/components/motion/DrawLine";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * One frame of the cinematic hero. Every slide carries its own wording —
 * eyebrow, headline and lede — so the sequence reads as a narrative rather
 * than a carousel of interchangeable photos.
 */
export type HeroSlide = {
  image: ImageAsset;
  eyebrow: string;
  /** Headline, one array entry per rendered line. */
  title: string[];
  lede?: string;
  /** Short label shown in the slide navigator at the foot of the hero. */
  tag?: string;
};

type Props = {
  eyebrow: string;
  index?: string;
  title: string[];
  lede?: string;
  image: ImageAsset;
  crumbs?: Crumb[];
  readout?: string[];
  /**
   * full      — image fills the viewport, text over it (immersive)
   * split     — text left, tall image right on a technical grid
   * band      — wide image band below the headline (editorial)
   * offset    — image offset to the right and lower, headline overlapping (technical)
   * cinematic — auto-advancing sequence; each slide has its own headline and lede
   */
  variant?: "full" | "split" | "band" | "offset" | "cinematic";
  /**
   * Slides for the cinematic variant. Supplying two or more switches the hero
   * into the sequence automatically, whatever `variant` says. With one or none,
   * the hero falls back to the single-image variants and nothing changes.
   */
  slides?: HeroSlide[];
  /** Milliseconds each slide holds before advancing. Default 4000. */
  interval?: number;
  children?: ReactNode;
  className?: string;
};

/**
 * Inner-page hero. One primary image per page, or a timed sequence via `slides`.
 * Variants change composition so service pages don't read as the same template
 * with a swapped photo.
 */
export function PageHero({
  eyebrow,
  index,
  title,
  lede,
  image,
  crumbs,
  readout,
  variant = "split",
  slides,
  interval = 4000,
  children,
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  const isSequence = Boolean(slides && slides.length > 1);

  const onPhoto = variant === "full";
  const headline = (
    <motion.div style={{ y: textY, opacity: fade }}>
      {crumbs && <Breadcrumbs crumbs={crumbs} onPhoto={onPhoto} />}
      <div className="mt-6 flex items-center gap-4">
        {index && <span className="font-mono text-xs text-cyan-400">{index}</span>}
        <TechLabel tone="cyan">{eyebrow}</TechLabel>
      </div>
      <SplitText
        as="h1"
        immediate
        delay={0.25}
        lines={title}
        className={cn(
          "mt-6 font-display font-medium tracking-[-0.015em]",
          onPhoto ? "text-white" : "text-ink-900",
          onPhoto ? "text-[clamp(2.4rem,7.5vw,6rem)]" : "text-[clamp(2.2rem,5.6vw,4.6rem)]",
          // keep after the size class: tailwind-merge treats font-size as overriding line-height
          "leading-[0.98]"
        )}
      />
      {lede && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE_OUT_EXPO }}
          className={cn("mt-7 max-w-xl text-base leading-relaxed md:text-lg", onPhoto ? "text-steel-300" : "text-ink-500")}
        >
          {lede}
        </motion.p>
      )}
      {children && (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: EASE_OUT_EXPO }} className="mt-8">
          {children}
        </motion.div>
      )}
    </motion.div>
  );

  const picture = (cls: string, sizes: string, clip: "up" | "left" | "down") => {
    const from = clip === "up" ? "inset(100% 0 0 0)" : clip === "left" ? "inset(0 100% 0 0)" : "inset(0 0 100% 0)";
    return (
      <motion.div
        initial={{ clipPath: from }}
        animate={{ clipPath: "inset(0 0 0 0)" }}
        transition={{ duration: 1.3, delay: 0.15, ease: EASE_OUT_EXPO }}
        className={cn("grade corner-marks relative overflow-hidden", cls)}
      >
        <motion.div className="absolute -inset-y-[12%] inset-x-0" style={{ y: imgY }}>
          <Image src={image.src} alt={image.alt} fill priority sizes={sizes} className="object-cover" style={{ objectPosition: image.focal }} />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-navy-900/10 mix-blend-multiply" />
        <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.16em] text-white/70 [text-shadow:0_1px_6px_rgba(7,9,12,0.6)]">FIG. 01</span>
      </motion.div>
    );
  };

  /* ---------- CINEMATIC SEQUENCE ---------- */
  if (isSequence && slides) {
    return (
      <CinematicHero
        ref={ref}
        slides={slides}
        interval={interval}
        crumbs={crumbs}
        readout={readout}
        imgY={imgY}
        textY={textY}
        fade={fade}
        reduced={reduced}
        className={className}
      >
        {children}
      </CinematicHero>
    );
  }

  /* ---------- FULL ---------- */
  if (variant === "full") {
    return (
      <section ref={ref} data-hero="photo" className={cn("relative flex min-h-[92svh] items-end overflow-hidden pb-14 pt-[calc(var(--header-h)+3rem)] md:pb-20", className)}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, ease: EASE_OUT_EXPO }}>
          <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y: imgY }}>
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: image.focal }} />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-scrim-900 via-scrim-900/55 to-scrim-900/15" />
          <div className="absolute inset-0 bg-linear-to-r from-scrim-900/55 via-transparent to-transparent" />
          {/* top scrim keeps the fixed header legible before it goes solid */}
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-scrim-900/70 to-transparent" />
          <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        </motion.div>
        <div className="container-wol relative w-full">
          <div className="max-w-4xl">{headline}</div>
          {readout && <Readout items={readout} className="mt-10" />}
        </div>
        <div className="absolute inset-x-[var(--gutter)] bottom-0">
          <DrawLine delay={1} tone="cyan" />
        </div>
      </section>
    );
  }

  /* ---------- BAND ---------- */
  if (variant === "band") {
    return (
      <section ref={ref} className={cn("relative overflow-hidden pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]", className)}>
        <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="container-wol relative">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">{headline}</div>
            {readout && (
              <div className="lg:col-span-4 lg:self-end lg:justify-self-end">
                <Readout items={readout} className="lg:flex-col lg:items-end lg:gap-y-2" />
              </div>
            )}
          </div>
          <div className="mt-12 md:mt-16">
            <DrawLine delay={0.9} />
          </div>
          {picture("mt-6 aspect-16/9 w-full md:aspect-21/8", "100vw", "down")}
        </div>
      </section>
    );
  }

  /* ---------- OFFSET ---------- */
  if (variant === "offset") {
    return (
      <section ref={ref} className={cn("relative overflow-hidden pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]", className)}>
        <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-70 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
        <div className="pointer-events-none absolute inset-0 light-pool-blue" />
        <div className="container-wol relative">
          <div className="relative grid gap-6 lg:grid-cols-12 lg:gap-0">
            <div className="relative z-10 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:pr-10 lg:pt-16">{headline}</div>
            <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:pt-0">
              {picture("aspect-4/3 w-full lg:aspect-5/4 lg:w-full", "(min-width:1024px) 50vw, 100vw", "left")}
            </div>
          </div>
          <div className="relative mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <DrawLine className="md:flex-1" delay={0.9} />
            {readout && <Readout items={readout} className="shrink-0" />}
          </div>
        </div>
      </section>
    );
  }

  /* ---------- SPLIT (default) ---------- */
  return (
    <section ref={ref} className={cn("relative overflow-hidden pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+4rem)]", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-line lg:block" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:linear-gradient(to_right,black,transparent_60%)]" />
      <div className="container-wol relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-between">
            {headline}
            {readout && <Readout items={readout} className="mt-12 hidden lg:flex" />}
          </div>
          {picture("aspect-4/5 w-full max-h-[78svh] lg:aspect-auto lg:h-[min(78svh,44rem)]", "(min-width:1024px) 50vw, 100vw", "up")}
        </div>
        <div className="mt-8 lg:mt-10">
          <DrawLine delay={0.9} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cinematic sequence                                                  */
/* ------------------------------------------------------------------ */

type CinematicProps = {
  slides: HeroSlide[];
  interval: number;
  crumbs?: Crumb[];
  readout?: string[];
  imgY: ReturnType<typeof useTransform<number, string>>;
  textY: ReturnType<typeof useTransform<number, number>>;
  fade: ReturnType<typeof useTransform<number, number>>;
  reduced: boolean;
  className?: string;
  children?: ReactNode;
  ref: React.RefObject<HTMLElement | null>;
};

function CinematicHero({ slides, interval, crumbs, readout, imgY, textY, fade, reduced, className, children, ref }: CinematicProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const slide = slides[active];

  const goTo = useCallback(
    (i: number) => setActive(((i % count) + count) % count),
    [count]
  );

  // Auto-advance. Pauses on hover/focus, and never runs under reduced motion —
  // the navigator below stays available so the content is still reachable.
  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % count), interval);
    return () => window.clearTimeout(timer);
  }, [active, paused, reduced, count, interval]);

  return (
    <section
      ref={ref}
      data-hero="photo"
      aria-roledescription="carousel"
      aria-label="Hero"
      className={cn("relative flex min-h-[94svh] items-end overflow-hidden pb-12 pt-[calc(var(--header-h)+3rem)] md:pb-16", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <style>{`
        @keyframes wol-hero-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .wol-hero-progress { transform-origin: left center; animation: wol-hero-progress linear forwards; }
        @keyframes wol-hero-drift { from { transform: scale(1.06); } to { transform: scale(1.14); } }
        .wol-hero-drift { animation: wol-hero-drift linear forwards; }
        @media (prefers-reduced-motion: reduce) {
          .wol-hero-progress, .wol-hero-drift { animation: none !important; transform: none !important; }
        }
      `}</style>

      {/* ---- Image stack: crossfade with a slow drift on the active frame ---- */}
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 1.1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y: imgY }}>
              <div
                className={cn("absolute inset-0", !reduced && "wol-hero-drift")}
                style={!reduced ? { animationDuration: `${interval + 1400}ms`, animationPlayState: paused ? "paused" : "running" } : undefined}
              >
                <Image
                  src={slide.image.src}
                  alt=""
                  fill
                  priority={active === 0}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: slide.image.focal }}
                />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Scrims — bottom weight for the headline, left weight for readability,
            top scrim keeps the fixed header legible before it goes solid. */}
        <div className="absolute inset-0 bg-linear-to-t from-scrim-900 via-scrim-900/60 to-scrim-900/20" />
        <div className="absolute inset-0 bg-linear-to-r from-scrim-900/70 via-scrim-900/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-44 bg-linear-to-b from-scrim-900/75 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      {/* ---- Wording: re-mounts per slide so the headline re-animates ---- */}
      <div className="container-wol relative w-full">
        <motion.div style={{ y: textY, opacity: fade }}>
          {crumbs && <Breadcrumbs crumbs={crumbs} onPhoto />}

          <div className="mt-6 max-w-4xl" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.28 } }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-cyan-400">{String(active + 1).padStart(2, "0")}</span>
                  <TechLabel tone="cyan">{slide.eyebrow}</TechLabel>
                </div>

                <SplitText
                  as="h1"
                  immediate
                  delay={0.1}
                  lines={slide.title}
                  className="mt-6 font-display font-medium tracking-[-0.015em] text-white text-[clamp(2.4rem,7.5vw,6rem)] leading-[0.98]"
                />

                {slide.lede && (
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: EASE_OUT_EXPO }}
                    className="mt-7 max-w-xl text-base leading-relaxed text-steel-300 md:text-lg"
                  >
                    {slide.lede}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT_EXPO }}
              className="mt-9"
            >
              {children}
            </motion.div>
          )}
        </motion.div>

        {/* ---- Slide navigator: numbered, labelled, with a progress rule ---- */}
        <div className="mt-12 border-t border-white/15 pt-5 md:mt-16">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {slides.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.tag ?? s.eyebrow}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show slide ${i + 1}: ${s.tag ?? s.eyebrow}`}
                    aria-current={isActive}
                    className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <span className="relative block h-px w-full bg-white/20">
                      {isActive && (
                        <span
                          key={`${active}-${paused}`}
                          className={cn("absolute inset-0 block bg-cyan-400", !reduced && "wol-hero-progress")}
                          style={
                            reduced
                              ? { transform: "scaleX(1)" }
                              : { animationDuration: `${interval}ms`, animationPlayState: paused ? "paused" : "running" }
                          }
                        />
                      )}
                    </span>
                    <span className="mt-3 flex items-baseline gap-2">
                      <span className={cn("font-mono text-[10px] tracking-[0.16em] transition-colors", isActive ? "text-cyan-400" : "text-steel-500")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "text-xs font-medium uppercase tracking-widest transition-colors",
                          isActive ? "text-white" : "text-steel-400 group-hover:text-steel-200"
                        )}
                      >
                        {s.tag ?? s.eyebrow}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {readout && <Readout items={readout} className="shrink-0 md:justify-end" />}
          </div>
        </div>
      </div>
    </section>
  );
}

function Breadcrumbs({ crumbs, onPhoto }: { crumbs: Crumb[]; onPhoto?: boolean }) {
  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={cn("flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.14em]", onPhoto ? "text-steel-300" : "text-ink-500")}
    >
      {crumbs.map((c, i) => (
        <span key={`${c.label}-${i}`} className="inline-flex items-center gap-2">
          {i > 0 && <span className={onPhoto ? "text-steel-500" : "text-ink-300"}>/</span>}
          {c.href ? (
            <Link href={c.href} className="uppercase transition-colors hover:text-cyan-400">
              {c.label}
            </Link>
          ) : (
            <span className={cn("uppercase", onPhoto ? "text-steel-200" : "text-ink-700")}>{c.label}</span>
          )}
        </span>
      ))}
    </motion.nav>
  );
}