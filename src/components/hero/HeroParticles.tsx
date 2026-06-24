"use client";

import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${8 + ((i * 17) % 84)}%`,
  y: `${6 + ((i * 23) % 88)}%`,
  size: 2 + (i % 3),
  duration: 14 + (i % 6) * 2,
  delay: i * 0.4,
}));

export function HeroParticles() {
  return (
    <div className="hero-particles" aria-hidden>
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="hero-particles__dot"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.15, 0.45, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
