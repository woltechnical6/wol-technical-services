import type { ServiceIconKey } from "@/content/types";
import { cn } from "@/lib/utils";

const paths: Record<ServiceIconKey, React.ReactNode> = {
  // gear + shaft
  mechanical: (
    <>
      <circle cx="20" cy="20" r="6.5" />
      <circle cx="20" cy="20" r="2" />
      <path d="M20 5v4M20 31v4M5 20h4M31 20h4M9.4 9.4l2.8 2.8M27.8 27.8l2.8 2.8M9.4 30.6l2.8-2.8M27.8 12.2l2.8-2.8" />
      <circle cx="20" cy="20" r="11" strokeDasharray="2 3" />
    </>
  ),
  // pipe elbow with flanges
  piping: (
    <>
      <path d="M6 14h14a8 8 0 0 1 8 8v12" />
      <path d="M6 20h14a2 2 0 0 1 2 2v12" />
      <path d="M5 12v10M8 12v10M20 33h10M20 36h10" />
      <path d="M9 17h9" strokeDasharray="1.5 2.5" />
    </>
  ),
  // arc + electrode
  welding: (
    <>
      <path d="M8 32 20 20" />
      <path d="M17 17l6 6" />
      <path d="M22 12l5-5M26 16l7-3M24 22l3 7" strokeLinecap="round" />
      <path d="M6 34l3-3" />
      <circle cx="21" cy="19" r="1.2" fill="currentColor" stroke="none" />
      <path d="M30 30h5M32 34h3" strokeDasharray="1.5 2" />
    </>
  ),
  // circuit + gauge
  electrical: (
    <>
      <rect x="6" y="8" width="28" height="18" />
      <path d="M12 26v8M28 26v8M8 34h24" />
      <path d="M20 17a5 5 0 0 1 10 0" />
      <path d="M25 17l3-3" />
      <path d="M10 14h5l2 3 2-6 2 3h2" />
    </>
  ),
  // crane hook + base
  installation: (
    <>
      <path d="M8 34h24" />
      <path d="M12 34V14h16v20" />
      <path d="M20 14V6" />
      <path d="M14 6h12" />
      <path d="M20 10a3 3 0 1 0 0 6" />
      <path d="M12 22h16" strokeDasharray="2 2" />
    </>
  ),
  // wrench + clock
  maintenance: (
    <>
      <circle cx="16" cy="24" r="9" />
      <path d="M16 18v6l4 2" />
      <path d="M26 6l4 4-9 9-4-4z" />
      <path d="M21 15l-2 2" />
      <path d="M30 26v8M26 30h8" />
    </>
  ),
  // person + signal
  support: (
    <>
      <circle cx="20" cy="12" r="5" />
      <path d="M9 34c0-6 5-10 11-10s11 4 11 10" />
      <path d="M28 8a6 6 0 0 1 0 8M31 5a10 10 0 0 1 0 14" strokeLinecap="round" />
      <path d="M9 34h22" />
    </>
  ),
  // site plan
  site: (
    <>
      <rect x="6" y="6" width="28" height="28" />
      <path d="M6 16h12v10H6M18 16h16M26 16v18M18 26h8" />
      <circle cx="12" cy="21" r="1.5" />
      <path d="M10 10h6M28 10h2" />
    </>
  ),
};

export function ServiceIcon({ name, className }: { name: ServiceIconKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("size-10", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
