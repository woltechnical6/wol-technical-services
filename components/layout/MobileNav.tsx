"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin, Phone } from "lucide-react";
import { nav, site } from "@/content/site";
import { services } from "@/content/services";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Mobile / tablet navigation. Mirrors the desktop header + mega-menu language:
 * white glass panel, blue-100 hairlines, cool blue wash with one warm amber
 * bloom, indexed rows with a gliding active pill.
 */
export function MobileNav({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [servicesOpen, setServicesOpen] = useState(pathname.startsWith("/services"));

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
      className="fixed inset-0 z-40 flex flex-col bg-white/70 backdrop-blur-xl lg:hidden"
      data-lenis-prevent
    >
      {/* soft atmosphere — same balance as the header shell and mega menu */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-md rounded-full bg-linear-to-br from-blue-200/60 via-blue-100/25 to-transparent blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 top-24 h-64 w-80 rounded-full bg-linear-to-bl from-amber-300/35 via-orange-400/10 to-transparent blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-120 -translate-x-1/2 rounded-full bg-linear-to-t from-blue-100/50 to-transparent blur-3xl"
      />

      <div className="relative flex flex-1 flex-col overflow-y-auto px-3 pb-3 pt-[calc(var(--header-h)+0.75rem)] sm:px-4 sm:pb-4 sm:pt-[calc(var(--header-h)+1rem)]">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.985 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.99 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.05 }}
          className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-hidden rounded-3xl border border-blue-100/70 bg-white/95 shadow-[0_28px_70px_-24px_rgba(30,64,175,0.35)]"
        >
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-2.5 sm:p-3">
            <div className="flex items-center justify-between px-3 pb-2 pt-2">
              <span className="font-display text-[10px] font-medium uppercase tracking-[0.18em] text-ink-500">Menu</span>
              <span className="font-mono text-[10px] tracking-[0.14em] text-ink-500/70">OIL & GAS · {site.location.city.toUpperCase()}</span>
            </div>

            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.045, delayChildren: 0.18 } } }}
              className="space-y-1"
            >
              {nav.primary.map((item, i) => {
                const active = isActive(item.href);
                const index = String(i + 1).padStart(2, "0");

                return (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: reduce ? 0 : 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
                    }}
                    className="relative"
                  >
                    {active && !item.mega && (
                      <motion.span
                        layoutId="mobile-nav-pill"
                        transition={{ type: "spring", stiffness: 500, damping: 38 }}
                        className="absolute inset-0 z-0 rounded-2xl bg-linear-to-b from-blue-50 via-blue-50 to-orange-50/40 ring-1 ring-blue-100"
                      >
                        <span className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-linear-to-b from-amber-400 to-orange-500" />
                      </motion.span>
                    )}

                    {item.mega ? (
                      <>
                        <button
                          onClick={() => setServicesOpen((o) => !o)}
                          aria-expanded={servicesOpen}
                          aria-controls="mobile-services"
                          className={cn(
                            "relative z-10 flex w-full items-center gap-4 rounded-2xl px-3 py-3.5 text-left transition-colors",
                            servicesOpen || active ? "text-ink-900" : "text-ink-700",
                          )}
                        >
                          <span className={cn("font-mono text-[11px] tabular-nums", active || servicesOpen ? "text-orange-500" : "text-ink-500/70")}>{index}</span>
                          <span className="flex-1 font-display text-lg font-medium sm:text-xl">{item.label}</span>
                          <span
                            className={cn(
                              "grid size-8 place-items-center rounded-full border transition-all duration-300",
                              servicesOpen ? "border-blue-200 bg-blue-50 text-blue-600" : "border-blue-100 text-ink-500",
                            )}
                          >
                            <ChevronDown className={cn("size-4 transition-transform duration-300", servicesOpen && "rotate-180")} strokeWidth={1.75} />
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {servicesOpen && (
                            <motion.div
                              id="mobile-services"
                              key="services"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                              className="overflow-hidden"
                            >
                              <div className="mx-1 mb-2 rounded-2xl border border-blue-100/70 bg-linear-to-b from-blue-50/60 via-white to-orange-50/30 p-1.5">
                                <ul className="grid gap-0.5 sm:grid-cols-2">
                                  {services.map((s) => {
                                    const sActive = pathname === `/services/${s.slug}`;
                                    return (
                                      <li key={s.slug} className="min-w-0">
                                        <Link
                                          href={`/services/${s.slug}`}
                                          onClick={onClose}
                                          className={cn(
                                            "group flex items-start gap-3 rounded-xl px-2.5 py-2.5 transition-colors",
                                            sActive ? "bg-white ring-1 ring-blue-100" : "hover:bg-white/80",
                                          )}
                                        >
                                          <span
                                            className={cn(
                                              "grid size-9 shrink-0 place-items-center rounded-xl border transition-all duration-300",
                                              sActive
                                                ? "border-blue-200 bg-linear-to-br from-blue-500 to-blue-700 text-white shadow-[0_6px_16px_-6px_rgba(29,78,216,0.6)]"
                                                : "border-blue-100/80 bg-white text-ink-500 group-active:bg-blue-50",
                                            )}
                                          >
                                            <ServiceIcon name={s.icon} className="size-5" />
                                          </span>
                                          <span className="min-w-0 flex-1">
                                            <span className="flex min-w-0 items-center gap-2">
                                              <span className="font-mono text-[10px] tabular-nums text-ink-500/70">{s.index}</span>
                                              <span className={cn("min-w-0 truncate font-display text-sm font-medium", sActive ? "text-ink-900" : "text-ink-700")}>{s.title}</span>
                                            </span>
                                            <span className="mt-0.5 line-clamp-1 text-xs leading-snug text-ink-500">{s.menuDescription}</span>
                                          </span>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                                <Link
                                  href="/services"
                                  onClick={onClose}
                                  className="group mt-1 flex items-center justify-between rounded-xl border-t border-blue-100/70 px-3 py-2.5 font-display text-[11px] font-medium uppercase tracking-[0.14em] text-blue-600 transition-colors hover:text-orange-600"
                                >
                                  View all services
                                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group relative z-10 flex items-center gap-4 rounded-2xl px-3 py-3.5 transition-colors",
                          active ? "text-ink-900" : "text-ink-700 hover:text-ink-900",
                        )}
                      >
                        <span className={cn("font-mono text-[11px] tabular-nums", active ? "text-orange-500" : "text-ink-500/70")}>{index}</span>
                        <span className="flex-1 font-display text-lg font-medium sm:text-xl">{item.label}</span>
                        <ArrowUpRight
                          className={cn(
                            "size-4 transition-all duration-300",
                            active ? "text-blue-600 opacity-100" : "-translate-x-1 text-ink-500 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                          )}
                          strokeWidth={2}
                        />
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>

          {/* Footer — CTA + location, matching the mega-menu footer bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5, ease: EASE_OUT_EXPO }}
            className="relative border-t border-blue-100/70 bg-linear-to-b from-white/60 to-blue-50/40 p-3 sm:p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 px-1 font-mono text-[10px] tracking-[0.14em] text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-blue-500" strokeWidth={1.75} />
                  {site.location.city.toUpperCase()} · UAE
                </span>
                <a href="/contact" onClick={onClose} className="inline-flex items-center gap-1.5 transition-colors hover:text-ink-900">
                  <Phone className="size-3.5 text-orange-500" strokeWidth={1.75} />
                  CALL THE TEAM
                </a>
              </div>

              <Link
                href="/contact"
                onClick={onClose}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-linear-to-br from-blue-500 via-blue-600 to-blue-800 px-5 py-3 font-display text-[12px] font-medium uppercase tracking-[0.14em] text-white shadow-[0_8px_24px_-8px_rgba(29,78,216,0.55)] ring-1 ring-transparent transition-shadow hover:shadow-[0_10px_28px_-6px_rgba(249,115,22,0.35)] hover:ring-orange-300/40"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 translate-x-[-160%] bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out-expo group-hover:translate-x-[220%]"
                />
                <span className="relative flex size-1.5 items-center justify-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-amber-300/80" />
                  <span className="relative size-1.5 rounded-full bg-linear-to-br from-amber-300 to-orange-500" />
                </span>
                <span className="relative">Request Consultation</span>
                <ArrowRight className="relative size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
