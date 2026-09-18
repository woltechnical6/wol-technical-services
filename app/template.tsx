"use client";
import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

/** Route transition: page content lifts in under a brief technical wipe. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] origin-top bg-graphite-900"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 }}>
        {children}
      </motion.div>
    </>
  );
}
