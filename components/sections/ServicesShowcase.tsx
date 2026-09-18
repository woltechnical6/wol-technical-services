import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ServiceIcon } from "@/components/icons/ServiceIcon";

/**
 * Services — all eight disciplines as tilting, gradient-edged cards in a
 * four-column grid, matching the services index page.
 */
export function ServicesShowcase() {
  return (
    <section className="relative bg-slate-50 py-20 md:py-28" aria-labelledby="services-title">
      <div className="container-wol">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                <span className="wol-pulse-dot size-1.5 rounded-full bg-blue-600" />
                <span className="font-mono text-ink-400">02</span>
                Services
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="services-title" className="font-display mt-4 text-3xl font-bold leading-tight text-ink-900 md:text-4xl lg:text-[2.75rem]">
                Eight disciplines. One point of responsibility.
              </h2>
            </Reveal>
            <span className="wol-shimmer mt-4 block h-0.75 w-14 rounded-full bg-linear-to-r from-amber-500 via-amber-300 to-amber-500 bg-size-[200%_100%]" />
            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-ink-600 md:text-lg">
                Each service can be mobilised on its own or combined into a multi-discipline package — planned, supervised and closed out by the same team.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link href="/services" className="wol-chip inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink-900">
              All services
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" step={0.07}>
          {services.map((service) => (
            <RevealItem key={service.slug} className="h-full">
              <TiltCard
                className="wol-tilt wol-shine wol-color-card group flex h-full flex-col rounded-2xl border border-line bg-white shadow-[0_18px_36px_-26px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_28px_56px_-24px_rgba(15,23,42,0.3)]"
                intensity={5}
                lift={10}
              >
                <Link href={`/services/${service.slug}`} className="flex h-full flex-col p-6" aria-label={`${service.title} — read more`}>
                  <div className="relative mb-6 aspect-16/10 overflow-hidden rounded-xl bg-[#0a1330]">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(min-width:1280px) 22vw, (min-width:640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: service.image.focal }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a1330]/80 via-[#0a1330]/10 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-white backdrop-blur">
                      {service.index}
                    </span>
                    <div className="wol-icon-box absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-xl border border-white/10 text-white">
                      <ServiceIcon name={service.icon} className="size-5" />
                    </div>
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">{service.tagline}</p>
                  <h3 className="font-display mt-2 text-xl font-bold leading-snug text-ink-900 transition-colors duration-200 group-hover:text-blue-700">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{service.menuDescription}</p>

                  <ul className="mt-5 space-y-1.5 border-t border-line pt-4">
                    {service.capabilities.slice(0, 3).map((cap) => (
                      <li key={cap.title} className="flex items-start gap-2 text-sm text-ink-700">
                        <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-amber-500" />
                        <span>{cap.title}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ink-900 transition-colors duration-200 group-hover:text-blue-700">
                    View service
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
                  </span>
                </Link>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
