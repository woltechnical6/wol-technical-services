"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

const SPLIT = Math.ceil(services.length / 2);

/**
 * Services mega-menu.
 * Visual language mirrors the header pill: white glass shell, blue-100 hairlines,
 * cool blue base with a single warm amber/orange accent. Left = indexed service
 * list (two columns), right = live preview pane.
 */
export function MegaMenu({ onClose }: { onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = services[activeIdx];
  const reduce = useReducedMotion();

  // Roving focus across both list columns.
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const focusItem = (i: number) => {
    const next = (i + services.length) % services.length;
    setActiveIdx(next);
    itemRefs.current[next]?.focus();
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusItem(activeIdx + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusItem(activeIdx - 1);
        break;
      case "ArrowRight":
        e.preventDefault();
        focusItem(activeIdx + SPLIT);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusItem(activeIdx - SPLIT);
        break;
      case "Home":
        e.preventDefault();
        focusItem(0);
        break;
      case "End":
        e.preventDefault();
        focusItem(services.length - 1);
        break;
    }
  };

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.985 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.99 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
      className="absolute inset-x-0 top-full z-40 mt-2 hidden origin-top lg:block"
    >
      <div className="relative overflow-hidden rounded-3xl border border-blue-100/70 bg-white/95 shadow-[0_28px_70px_-24px_rgba(30,64,175,0.35)] backdrop-blur-2xl">
        {/* cool wash from the top-left, one warm bloom top-right — same balance as the header shell */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-24 h-64 w-96 rounded-full bg-linear-to-br from-blue-200/45 via-blue-100/20 to-transparent blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-16 h-48 w-72 rounded-full bg-linear-to-bl from-amber-300/30 via-orange-400/10 to-transparent blur-3xl"
        />

        <div
          role="menu"
          aria-label="Services"
          onKeyDown={onListKeyDown}
          className="relative grid grid-cols-[1fr_1fr_0.95fr]"
        >
          {/* Column 1 — index list */}
          <div className="border-r border-blue-100/70 p-5">
            <ColumnHead label="Service index" />
            <ul role="none" className="space-y-1">
              {services.slice(0, SPLIT).map((s, i) => (
                <MenuRow
                  key={s.slug}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  service={s}
                  active={i === activeIdx}
                  onActivate={() => setActiveIdx(i)}
                  onClose={onClose}
                />
              ))}
            </ul>
          </div>

          {/* Column 2 — continued */}
          <div className="border-r border-blue-100/70 p-5">
            <ColumnHead label="Continued" />
            <ul role="none" className="space-y-1">
              {services.slice(SPLIT).map((s, i) => (
                <MenuRow
                  key={s.slug}
                  ref={(el) => {
                    itemRefs.current[i + SPLIT] = el;
                  }}
                  service={s}
                  active={i + SPLIT === activeIdx}
                  onActivate={() => setActiveIdx(i + SPLIT)}
                  onClose={onClose}
                />
              ))}
            </ul>
          </div>

          {/* Column 3 — preview pane */}
          <div className="relative bg-linear-to-b from-blue-50/50 via-white/0 to-orange-50/30 p-5">
            <ColumnHead label="Preview" />

            <div className="relative aspect-16/11 overflow-hidden rounded-2xl border border-blue-100/70 shadow-[0_18px_40px_-20px_rgba(30,64,175,0.45)]">
              {services.map((s, i) => (
                <Image
                  key={s.slug}
                  src={s.image.src}
                  alt=""
                  aria-hidden
                  fill
                  sizes="340px"
                  className={cn(
                    "object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    i === activeIdx ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                  )}
                  style={{ objectPosition: s.image.focal }}
                />
              ))}

              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-blue-950/85 via-blue-950/20 to-transparent"
              />

              <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
                <motion.span
                  key={active.slug}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  className="font-display text-base font-medium leading-tight text-white"
                >
                  {active.title}
                </motion.span>
              </div>

              {/* corner ticks, warmed to match the header accent */}
              <span aria-hidden className="pointer-events-none absolute left-2.5 top-2.5 size-3 rounded-tl-sm border-l border-t border-amber-300/80" />
              <span aria-hidden className="pointer-events-none absolute bottom-2.5 right-2.5 size-3 rounded-br-sm border-b border-r border-amber-300/80" />
            </div>

            <motion.p
              key={`${active.slug}-tagline`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.05 }}
              className="mt-4 text-sm leading-relaxed text-ink-500"
            >
              {active.tagline}
            </motion.p>

            <Link
              href={`/services/${active.slug}`}
              onClick={onClose}
              className="group mt-4 inline-flex items-center gap-1.5 font-display text-[12px] font-medium uppercase tracking-[0.14em] text-blue-600 transition-colors hover:text-orange-600"
            >
              Open service
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="relative flex items-center justify-end border-t border-blue-100/70 bg-white/60 px-5 py-3">
          <Link
            href="/services"
            onClick={onClose}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-br from-blue-500 via-blue-600 to-blue-800 px-4 py-2 font-display text-[11px] font-medium uppercase tracking-[0.14em] text-white shadow-[0_8px_24px_-8px_rgba(29,78,216,0.55)] ring-1 ring-transparent transition-shadow hover:shadow-[0_10px_28px_-6px_rgba(249,115,22,0.35)] hover:ring-orange-300/40"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 -translate-x-[160%] bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[220%]"
            />
            <span className="relative">View all services</span>
            <ArrowRight
              className="relative size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function ColumnHead({ label }: { label: string }) {
  return (
    <div className="mb-4">
      <span className="font-display text-[10px] font-medium uppercase tracking-[0.18em] text-ink-500">
        {label}
      </span>
    </div>
  );
}

type MenuRowProps = {
  service: (typeof services)[number];
  active: boolean;
  onActivate: () => void;
  onClose: () => void;
};

const MenuRow = function MenuRowInner({
  ref,
  service,
  active,
  onActivate,
  onClose,
}: MenuRowProps & { ref?: React.Ref<HTMLAnchorElement> }) {
  return (
    <li role="none" className="relative">
      {active && (
        <motion.span
          layoutId="mega-row-pill"
          transition={{ type: "spring", stiffness: 500, damping: 38 }}
          className="absolute inset-0 z-0 rounded-2xl bg-linear-to-b from-blue-50 via-blue-50 to-orange-50/40 ring-1 ring-blue-100"
        >
          <motion.span
            layoutId="mega-row-accent"
            transition={{ type: "spring", stiffness: 500, damping: 38 }}
            className="absolute inset-y-2 left-0 w-[2px] rounded-full bg-linear-to-b from-amber-400 to-orange-500"
          />
        </motion.span>
      )}

      <Link
        ref={ref}
        role="menuitem"
        tabIndex={active ? 0 : -1}
        href={`/services/${service.slug}`}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onClose}
        className="group relative z-10 flex items-start gap-3 rounded-2xl px-3 py-3 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400/60"
      >
        <span
          className={cn(
            "mt-1 font-mono text-[10px] tabular-nums transition-colors",
            active ? "text-orange-500" : "text-ink-500/70",
          )}
        >
          {service.index}
        </span>

        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-xl border transition-all duration-300",
            active
              ? "border-blue-200 bg-linear-to-br from-blue-500 to-blue-700 text-white shadow-[0_6px_16px_-6px_rgba(29,78,216,0.6)]"
              : "border-blue-100/80 bg-white/70 text-ink-500",
          )}
        >
          <ServiceIcon name={service.icon} className="size-5" />
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "block font-display text-sm font-medium transition-colors",
              active ? "text-ink-900" : "text-ink-700",
            )}
          >
            {service.title}
          </span>
          <span className="mt-0.5 block text-xs leading-snug text-ink-500">
            {service.menuDescription}
          </span>
        </span>

        <ArrowUpRight
          className={cn(
            "mt-1 size-3.5 shrink-0 transition-all duration-300",
            active ? "translate-x-0 text-blue-600 opacity-100" : "-translate-x-1 text-ink-500 opacity-0",
          )}
          strokeWidth={2}
        />
      </Link>
    </li>
  );
};