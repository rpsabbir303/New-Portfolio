"use client";

import { motion } from "framer-motion";
import { HeroGShape } from "@/components/hero/HeroGShape";

const PARTICLES = [
  { id: "p1", top: "12%", left: "8%", duration: 14, delay: 0 },
  { id: "p2", top: "28%", right: "15%", duration: 18, delay: 1.2 },
  { id: "p3", bottom: "35%", left: "22%", duration: 16, delay: 0.6 },
  { id: "p4", top: "55%", right: "28%", duration: 20, delay: 2 },
  { id: "p5", bottom: "18%", right: "10%", duration: 15, delay: 1.8 },
  { id: "p6", top: "72%", left: "45%", duration: 17, delay: 0.9 },
];

export function ServicesBackground() {
  return (
    <div className="services-bg" aria-hidden>
      <div className="services-bg__grid" />
      <div className="services-bg__radial" />

      <HeroGShape
        variant="outline"
        className="services-bg__g-watermark"
        strokeWidth={1}
      />

      <div className="services-bg__particles">
        {PARTICLES.map((particle) => (
          <motion.span
            key={particle.id}
            className="services-bg__particle"
            style={{
              top: particle.top,
              left: particle.left,
              right: particle.right,
              bottom: particle.bottom,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.2, 0.55, 0.2],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
