"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Close menus on navigation (state adjustment during render, no effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  // Escape closes any open menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || megaOpen;
  // The header pill is always solid white, so nav text always stays dark —
  // no light/transparent variant to switch to over a photo hero anymore.
  const light = false;
  const navIdle = "text-ink-500 hover:text-ink-900";
  const navActive = "text-ink-900";

  // One shared id: whichever nav item is hovered (or active, if none is)
  // owns the pill, and it glides between items instead of popping.
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const routeActiveHref = nav.primary.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
  )?.href;
  const highlightedHref = hoveredHref ?? routeActiveHref ?? null;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
      >
        {/* onMouseLeave lives here (wrapping BOTH pill and menu) so moving
            the cursor from the pill down into the menu never closes it */}
        <div
          onMouseLeave={() => {
            setMegaOpen(false);
            setHoveredHref(null);
          }}
          className="relative mx-auto max-w-6xl"
        >
          <div
            className={cn(
              "relative flex h-16 items-center justify-between gap-4 rounded-full px-3 pl-2 transition-all duration-500 sm:px-4 lg:px-5",
              "border border-blue-100/70 bg-white shadow-[0_12px_40px_-16px_rgba(30,64,175,0.28)]",
              solid && "shadow-[0_16px_44px_-16px_rgba(30,64,175,0.35)]",
            )}
          >
            {/* faint amber glow tucked in the top-right corner — the only warmth
                allowed to bleed into the shell itself, everything else stays cool */}
            {!light && (
              <span
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-10 h-24 w-40 rounded-full bg-linear-to-br from-amber-300/25 via-orange-400/10 to-transparent blur-2xl"
              />
            )}

            <TiltLogo light={light} />

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {nav.primary.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const highlighted = highlightedHref === item.href;

                const pill = highlighted && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className={cn(
                      "absolute inset-0 z-0 rounded-full",
                      light ? "bg-white/15" : "bg-linear-to-b from-blue-50 via-blue-50 to-orange-50/40",
                    )}
                  >
                    <motion.span
                      layoutId="nav-accent"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      className={cn(
                        "absolute inset-x-4 bottom-1 h-0.5 rounded-full",
                        light ? "bg-amber-300/70" : "bg-linear-to-r from-amber-400 to-orange-500",
                      )}
                    />
                  </motion.span>
                );

                if (item.mega) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => {
                        setMegaOpen(true);
                        setHoveredHref(item.href);
                      }}
                    >
                      {pill}
                      <button
                        aria-expanded={megaOpen}
                        aria-haspopup="true"
                        onClick={() => setMegaOpen((o) => !o)}
                        className={cn(
                          "relative z-10 flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-[13px] font-medium transition-colors",
                          active || megaOpen ? navActive : navIdle,
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-all duration-300",
                            megaOpen ? "rotate-180 text-orange-500" : "text-current",
                          )}
                          strokeWidth={1.75}
                        />
                      </button>
                    </div>
                  );
                }
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => {
                      setMegaOpen(false);
                      setHoveredHref(item.href);
                    }}
                  >
                    {pill}
                    <Link
                      href={item.href}
                      className={cn(
                        "relative z-10 block rounded-full px-4 py-2 font-display text-[13px] font-medium transition-colors",
                        active ? navActive : navIdle,
                      )}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <MagneticCTA light={light} />
              <button
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((o) => !o)}
                className={cn(
                  "relative grid size-11 place-items-center overflow-hidden rounded-full border transition-colors lg:hidden",
                  light
                    ? "border-white/25 text-white hover:border-amber-300/50"
                    : "border-blue-100 text-ink-700 hover:border-orange-300 hover:bg-orange-50/60",
                )}
              >
                <AnimatePresence initial={false} mode="wait">
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                      className="grid place-items-center"
                    >
                      <X className="size-5" strokeWidth={1.5} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                      className="grid place-items-center"
                    >
                      <Menu className="size-5" strokeWidth={1.5} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>{mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}</AnimatePresence>

      <span className="sr-only">{site.name}</span>
    </>
  );
}

/** Logo with a faint, physical-feeling 3D tilt on hover — perspective + spring. */
function TiltLogo({ light }: { light: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 300, damping: 22, mass: 0.4 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 22, mass: 0.4 });
  const scale = useSpring(1, { stiffness: 300, damping: 22 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 12);
    rotateX.set(py * -12);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => scale.set(1.05)}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, scale, transformPerspective: 400 }}
      className="shrink-0 pl-1 [transform-style:preserve-3d]"
    >
      <Logo className="h-9 sm:h-10 lg:h-11" priority light={light} />
    </motion.div>
  );
}

/** Primary CTA — rounded pill with a gentle magnetic pull and a one-shot light sweep. */
function MagneticCTA({ light }: { light: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });
  const rotateX = useTransform(springY, [-8, 8], [5, -5]);
  const rotateY = useTransform(springX, [-8, 8], [-5, 5]);

  const [hovered, setHovered] = useState(false);
  const sweep = useMotionTemplate`translateX(${hovered ? "160%" : "-60%"})`;

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 14);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 14);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div style={{ transformPerspective: 500 }} className="hidden [transform-style:preserve-3d] md:block">
      <Link
        ref={ref}
        href="/contact"
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={reset}
        className={cn(
          "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 font-display text-[12px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(29,78,216,0.55)] transition-shadow",
          "bg-linear-to-br from-blue-500 via-blue-600 to-blue-800 ring-1 ring-transparent hover:shadow-[0_10px_28px_-6px_rgba(249,115,22,0.35)] hover:ring-orange-300/40",
          light && "ring-white/20 hover:ring-orange-300/50",
        )}
      >
        <motion.span
          aria-hidden
          style={{ transform: sweep }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/30 to-transparent"
        />
        <motion.span style={{ rotateX, rotateY }} className="relative flex items-center gap-2">
          <span className="relative flex size-1.5 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-amber-300/80" />
            <span className="relative size-1.5 rounded-full bg-linear-to-br from-amber-300 to-orange-500" />
          </span>
          Request Consultation
        </motion.span>
      </Link>
    </motion.div>
  );
}