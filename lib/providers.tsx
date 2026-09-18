"use client";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.1, smoothWheel: true }}>
      <ScrollToTop />
      {children}
    </ReactLenis>
  );
}
