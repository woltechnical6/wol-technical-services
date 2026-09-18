import Link from "next/link";

export type Crumb = { label: string; href?: string };

/** Static (server) breadcrumb trail for text pages. */
export function Crumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-ink-500">
      {crumbs.map((c, i) => (
        <span key={`${c.label}-${i}`} className="inline-flex items-center gap-2">
          {i > 0 && <span className="text-ink-300">/</span>}
          {c.href ? (
            <Link href={c.href} className="uppercase transition-colors hover:text-cyan-400">
              {c.label}
            </Link>
          ) : (
            <span className="uppercase text-ink-700">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
