"use client";
import { useReducedMotion as useFmReducedMotion } from "motion/react";

/** Thin wrapper so the app has one import site for reduced-motion. */
export const useReducedMotion = () => useFmReducedMotion() ?? false;
