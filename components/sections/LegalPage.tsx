import { legalPages } from "@/content/pages";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TechLabel, TechRule } from "@/components/ui/primitives";
import { Crumbs } from "@/components/ui/Crumbs";

type Doc = (typeof legalPages)[keyof typeof legalPages];

/** Text-only document layout with an in-page contents rail. */
export function LegalPage({ doc, path }: { doc: Doc; path: string }) {
  return (
    <article className="relative pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_40%)]" />
      <div className="container-wol relative">
        <Crumbs crumbs={[{ label: "Home", href: "/" }, { label: doc.title }]} />
        <Reveal className="mt-8">
          <TechLabel tone="cyan">Legal</TechLabel>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1] text-ink-900">{doc.title}</h1>
          <p className="mt-4 font-mono text-xs tracking-[0.12em] text-ink-500">
            LAST UPDATED · {doc.updated} · {path.toUpperCase()}
          </p>
        </Reveal>
        <TechRule className="mt-10" />

        <div className="grid gap-12 py-16 lg:grid-cols-12 md:py-20">
          <nav aria-label="Contents" className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <TechLabel>Contents</TechLabel>
              <ol className="mt-4 space-y-2">
                {doc.sections.map((s, i) => (
                  <li key={s.h}>
                    <a href={`#s-${i + 1}`} className="flex items-baseline gap-3 text-sm text-ink-500 transition-colors hover:text-cyan-400">
                      <span className="font-mono text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                      {s.h}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <RevealGroup className="max-w-3xl lg:col-span-8 lg:col-start-5" step={0.06}>
            {doc.sections.map((s, i) => (
              <RevealItem key={s.h} className="scroll-mt-32 border-t border-line py-8 first:border-t-0 first:pt-0">
                <h2 id={`s-${i + 1}`} className="flex items-baseline gap-4 font-display text-xl font-medium text-ink-900 md:text-2xl">
                  <span className="font-mono text-xs text-cyan-400">{String(i + 1).padStart(2, "0")}</span>
                  {s.h}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink-500">
                  {s.p.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </article>
  );
}
