import { Button } from "@/components/ui/Button";
import { TechLabel, Readout } from "@/components/ui/primitives";
import { DrawLine } from "@/components/motion/DrawLine";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pt-[var(--header-h)]">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 light-pool-blue" />
      <div className="container-wol relative">
        <TechLabel tone="amber">Signal lost</TechLabel>
        <h1 className="mt-6 font-display text-[clamp(4rem,18vw,14rem)] font-medium leading-none text-ink-900">404</h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ink-500 md:text-lg">The page you requested is not on the drawing. Check the address or return to a known reference.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/services" variant="ghost">
            View services
          </Button>
        </div>
        <div className="mt-16 max-w-xs">
          <DrawLine tone="cyan" />
        </div>
        <Readout items={["ERR · 404", "ROUTE · NOT FOUND", "DUBAI · UAE"]} className="mt-4" />
      </div>
    </section>
  );
}
