import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Brand lockup. Uses the supplied raster logo, sized for the header. */
export function Logo({ className, priority = false, light = false }: { className?: string; priority?: boolean; light?: boolean }) {
  return (
    <Link href="/" aria-label="WOL Technical Services — Home" className={cn("relative block", className)}>
      {/* Over a photo hero the raster lockup sits on a frosted plate so its dark type stays readable. */}
      <span
        className={cn(
          "pointer-events-none absolute -inset-x-2 -inset-y-1.5 bg-white/90 backdrop-blur-sm transition-opacity duration-500",
          light ? "opacity-100" : "opacity-0",
        )}
      />
      <Image src="/brand/logo.webp" alt="WOL Technical Services — Oil & Gas" width={800} height={452} priority={priority} className="relative h-full w-auto object-contain" />
    </Link>
  );
}

export function Emblem({ className }: { className?: string }) {
  return <Image src="/brand/emblem.webp" alt="" width={800} height={800} className={cn("object-contain", className)} aria-hidden />;
}
