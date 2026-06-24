"use client";

import { motion } from "framer-motion";
import { HeroParticles } from "@/components/hero/HeroParticles";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-bg__burgundy" />
      <div className="hero-bg__mesh" />
      <HeroParticles />

      <motion.div
        className="hero-bg__radial hero-bg__radial--headline"
        animate={{ opacity: [0.45, 0.7, 0.45], scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-bg__radial hero-bg__radial--right"
        animate={{ opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}
