"use client";
import { useEffect, useState } from "react";

export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)", true);
export const useIsTablet = () => useMediaQuery("(min-width: 768px)", true);
export const useCanHover = () => useMediaQuery("(hover: hover) and (pointer: fine)", true);
