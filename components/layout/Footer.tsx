import Link from "next/link";
import { ArrowUp, Building2, Clock, Factory, Mail, MapPin, Phone, Wrench } from "lucide-react";
import { nav, site } from "@/content/site";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { Logo } from "@/components/brand/Logo";
import { FooterCta } from "./FooterCta";

const columns = [
  { title: "Services", icon: Wrench, links: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })) },
  { title: "Industries", icon: Factory, links: industries.map((i) => ({ label: i.title, href: `/industries/${i.slug}` })) },
  { title: "Company", icon: Building2, links: nav.company },
];

/** Falls back to a plain "Coming soon" instead of showing raw placeholder brackets. */
const display = (value?: string) => (value && !value.trim().startsWith("[") ? value : "Coming soon");

/**
 * Final frame. Deep, unbroken register — no grid overlay, no route lines,
 * just a clean gradient with the tilt-responsive CTA band as the one
 * moment of motion before the sitemap settles into place.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep-900 text-steel-300">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-deep-900 via-deep-900 to-deep-950" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-deep-line-strong to-transparent" />

      <div className="container-wol relative">
        <FooterCta />

        {/* Sitemap */}
        <div className="grid gap-12 py-16 md:grid-cols-[1.3fr_repeat(2,1fr)] lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8 lg:py-20">
          <div className="max-w-xs">
            <div className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]">
              <Logo className="h-14 w-auto" />
            </div>
            <p className="mt-7 text-sm leading-relaxed text-steel-300">{site.description}</p>

            <ul className="mt-8 space-y-2.5">
              <li className="flex items-center gap-2.5 font-mono text-[11px] tracking-widest text-steel-400">
                <MapPin className="size-3.5 shrink-0 text-cyan-300/70" strokeWidth={1.75} />
                {site.location.city.toUpperCase()}, {site.location.country.toUpperCase()}
              </li>
              <li className="flex items-center gap-2.5 font-mono text-[11px] tracking-widest text-steel-400">
                <Clock className="size-3.5 shrink-0 text-cyan-300/70" strokeWidth={1.75} />
                {site.contact.hours.toUpperCase()}
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-400">
                <col.icon className="size-3.5 text-cyan-300/70" strokeWidth={1.75} />
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group inline-flex items-center gap-1.5 text-sm text-steel-200 transition-colors duration-200 hover:text-orange-400">
                      <span className="relative">
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-orange-400 transition-all duration-300 ease-out group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3 lg:col-span-1">
            <h3 className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-400">
              <Phone className="size-3.5 text-cyan-300/70" strokeWidth={1.75} />
              Contact
            </h3>
            <dl className="space-y-4 text-sm">
              <div className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-3.5 shrink-0 text-steel-500" strokeWidth={1.75} />
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.14em] text-steel-400">PHONE</dt>
                  <dd className="mt-1 text-steel-200">
                    {site.contact.phone && !site.contact.phone.trim().startsWith("[") ? (
                      <a href={`tel:${site.contact.phone}`} className="transition-colors duration-200 hover:text-orange-400">{site.contact.phone}</a>
                    ) : (
                      display(site.contact.phone)
                    )}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-3.5 shrink-0 text-steel-500" strokeWidth={1.75} />
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.14em] text-steel-400">EMAIL</dt>
                  <dd className="mt-1 text-steel-200">
                    {site.contact.email && !site.contact.email.trim().startsWith("[") ? (
                      <a href={`mailto:${site.contact.email}`} className="transition-colors duration-200 hover:text-orange-400">{site.contact.email}</a>
                    ) : (
                      display(site.contact.email)
                    )}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-steel-500" strokeWidth={1.75} />
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.14em] text-steel-400">ADDRESS</dt>
                  <dd className="mt-1 text-steel-200">{display(site.location.address)}</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="container-wol relative">
        <div className="flex flex-col gap-4 border-t border-deep-line py-6 font-mono text-[11px] tracking-[0.12em] text-steel-400 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <span className="size-1.5 animate-pulse bg-amber-500" /> {site.tagline.toUpperCase()}
            </span>
            <a href="#" aria-label="Back to top" className="group inline-flex items-center gap-1.5 text-steel-400 transition-colors duration-200 hover:text-orange-400">
              Top
              <span className="grid size-5 place-items-center rounded-full border border-steel-600/60 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-orange-400/60 group-hover:bg-orange-400/10">
                <ArrowUp className="size-3 transition-transform duration-300 ease-out group-hover:-translate-y-0.5" strokeWidth={2} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}