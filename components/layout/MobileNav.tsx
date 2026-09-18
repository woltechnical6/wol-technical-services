"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { nav, site } from "@/content/site";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

/** Full-screen mobile navigation with staggered technical reveal. */
export function MobileNav({ onClose }: { onClose: () => void }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className="fixed inset-0 z-40 flex flex-col bg-graphite-950 pt-[calc(var(--header-h)+1rem)] lg:hidden"
      data-lenis-prevent
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute inset-0 light-pool-blue" />

      <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto px-6 pb-8">
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}
          className="divide-y divide-line border-y border-line"
        >
          {nav.primary.map((item, i) => (
            <motion.li key={item.href} variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } } }}>
              {item.mega ? (
                <>
                  <button
                    onClick={() => setServicesOpen((o) => !o)}
                    aria-expanded={servicesOpen}
                    className="flex w-full items-center justify-between py-5 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-cyan-400">0{i + 1}</span>
                      <span className="font-display text-3xl font-medium text-ink-900">{item.label}</span>
                    </span>
                    <ChevronDown className={cn("size-5 text-ink-500 transition-transform", servicesOpen && "rotate-180")} strokeWidth={1.5} />
                  </button>
                  <div className={cn("grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]", servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <ul className="overflow-hidden">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}`} onClick={onClose} className="flex items-center gap-3 py-3 pl-10 text-ink-500 hover:text-ink-900">
                            <span className="font-mono text-[10px] text-ink-500">{s.index}</span>
                            <span className="font-display text-base">{s.title}</span>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link href="/services" onClick={onClose} className="flex items-center gap-2 py-3 pl-10 pb-5 font-display text-sm uppercase tracking-[0.14em] text-cyan-400">
                          View all services <ArrowUpRight className="size-4" strokeWidth={1.5} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <Link href={item.href} onClick={onClose} className="flex items-baseline gap-4 py-5">
                  <span className="font-mono text-xs text-cyan-400">0{i + 1}</span>
                  <span className="font-display text-3xl font-medium text-ink-900">{item.label}</span>
                </Link>
              )}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 flex flex-col gap-4 font-mono text-[11px] tracking-[0.14em] text-ink-500"
        >
          <span>{site.location.city.toUpperCase()} · {site.location.country.toUpperCase()}</span>
          <Link href="/contact" onClick={onClose} className="mt-2 inline-flex w-fit items-center gap-2 bg-blue-500 px-5 py-3 font-display text-xs font-medium uppercase tracking-[0.14em] text-white">
            Request Consultation <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </nav>
    </motion.div>
  );
}
