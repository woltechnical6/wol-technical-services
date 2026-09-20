import { capabilityStrip } from "@/content/home";
import { DrawLine } from "@/components/motion/DrawLine";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * System index: a quiet register of the twelve disciplines set between two
 * drawn rails, followed by a single vertical line that carries a pulse down
 * into the next scene. This is the breath after the hero — not a marquee.
 */
export function CapabilityStrip() {
  const disciplines = capabilityStrip.slice(0, 12);
  return (
    <section aria-label="Capabilities" className="relative z-10 bg-white pt-8 md:pt-10">
      <div className="container-wol">
        <DrawLine tone="cyan" duration={1.6} />
        <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 sm:grid-cols-3 md:py-7 lg:grid-cols-6" delay={0.2} step={0.05}>
          {disciplines.map((item, i) => (
            <RevealItem key={item} className="flex items-start gap-3">
              <span className="font-mono text-[10px] leading-5 tracking-[0.16em] text-cyan-400">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[11px] font-medium uppercase leading-5 tracking-[0.16em] text-ink-700 md:text-xs">{item}</span>
            </RevealItem>
          ))}
        </RevealGroup>
        <DrawLine delay={0.2} duration={1.6} />
      </div>

      {/* Rail descending into About */}
      <div aria-hidden className="relative mx-auto mt-2 h-20 w-px overflow-hidden bg-line md:h-28">
        <span className="rail-pulse-y absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-transparent via-cyan-400 to-cyan-400" />
      </div>
    </section>
  );
}
