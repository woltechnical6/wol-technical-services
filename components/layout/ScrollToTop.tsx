"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

/**
 * Resets scroll to the top of the page on every route change.
 *
 * Next's App Router only auto-scrolls to top for a "real" navigation, and
 * even then it moves the native scroll position — which Lenis (our smooth
 * scroll library) doesn't know about, since Lenis tracks its own virtual
 * position independently of the browser's. Left alone, that mismatch is
 * what causes the intermittent "lands mid-page" bug: Lenis just keeps
 * smoothing toward wherever it last thought the page was.
 *
 * We reset both the native scroll position and Lenis's own state together,
 * synchronously and without animating, every time the pathname changes.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the initial mount so a deep link (e.g. `/#contact`) or a
    // browser-restored scroll position on first load isn't yanked to top.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}
