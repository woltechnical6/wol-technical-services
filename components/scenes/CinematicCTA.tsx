import { finalCta } from "@/content/home";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { TechLabel } from "@/components/ui/primitives";

type CtaLink = { label: string; href: string };

type Props = {
  eyebrow?: string;
  title?: string[];
  body?: string;
  image?: { src: string; alt: string };
  primary?: CtaLink;
  secondary?: CtaLink;
};

/**
 * Final scene. Daylight closes to the deep register over a single
 * atmospheric plate; the copy sits in the darkening lower third and the
 * scene hands off directly into the footer without a seam.
 */
export function CinematicCTA({
  eyebrow = finalCta.eyebrow,
  title = finalCta.title,
  body = finalCta.body,
  image = finalCta.image,
  primary = finalCta.primary,
  secondary = finalCta.secondary,
}: Props) {
  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-deep-900 md:min-h-[100vh]" aria-labelledby="cta-title">
      <ParallaxImage src={image.src} alt={image.alt} className="absolute inset-0 h-full w-full" strength={14} mask="none" grade={false} sizes="100vw" />
      {/* Light → image → deep */}
      <div className="absolute inset-x-0 top-0 h-[38%] bg-linear-to-b from-graphite-950 via-graphite-950/70 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-deep-900 via-deep-900/70 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_75%_65%,rgba(245,162,31,0.18),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid-deep opacity-40 [mask-image:linear-gradient(to_top,black,transparent_60%)]" />

      <div className="container-wol relative pb-24 pt-40 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <TechLabel tone="amber">{eyebrow}</TechLabel>
            </Reveal>
            <SplitText
              as="h2"
              lines={title}
              delay={0.1}
              className="mt-6 font-display text-[clamp(2.6rem,7.6vw,7rem)] font-medium leading-[0.96] text-white"
              lastLineClassName="text-steel-300"
            />
            <span id="cta-title" className="sr-only">
              {title.join(" ")}
            </span>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <Reveal delay={0.3}>
              <p className="max-w-sm text-base leading-relaxed text-steel-200 md:text-lg">{body}</p>
            </Reveal>
            <Reveal delay={0.4} className="mt-8 flex flex-wrap gap-4">
              <Button href={primary.href}>{primary.label}</Button>
              <Button href={secondary.href} variant="secondary" onDeep>
                {secondary.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
