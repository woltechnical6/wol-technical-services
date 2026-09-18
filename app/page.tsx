import { HeroSlideshow } from "@/components/scenes/HeroSlideshow";
import { CapabilityStrip } from "@/components/sections/CapabilityStrip";
import { AboutWOL } from "@/components/sections/AboutWOL";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { IndustriesPanels } from "@/components/sections/IndustriesPanels";
import { FAQSection } from "@/components/sections/FAQSection";
import { CinematicCTA } from "@/components/scenes/CinematicCTA";
import { faq, process } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <HeroSlideshow />
      <CapabilityStrip />
      <AboutWOL />
      <ServicesShowcase />
      <ProcessTimeline
        steps={process}
        index="03"
        lede="A six-stage method applied to every scope, from a single equipment overhaul to a multi-discipline site package."
      />
      <IndustriesPanels />
      <FAQSection items={faq} index="05" lede="Straight answers on services, quotations, site work and operating in the UAE." />
      <CinematicCTA />
    </>
  );
}
