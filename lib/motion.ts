import type { Transition, Variants } from "motion/react";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_INDUSTRIAL = [0.65, 0, 0.15, 1] as const;

export const reveal: Transition = { duration: 0.9, ease: EASE_OUT_EXPO };
export const revealFast: Transition = { duration: 0.6, ease: EASE_OUT_EXPO };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: reveal },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: reveal },
};

export const maskUp: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.07): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;
