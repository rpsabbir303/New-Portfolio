"use client";

import { motion, type MotionValue } from "framer-motion";

const DECO_ITEMS = [
  { id: "c1", type: "circle" as const, top: "8%", right: "10%", size: 32, duration: 12, delay: 0 },
  { id: "c2", type: "circle" as const, bottom: "24%", left: "6%", size: 22, duration: 15, delay: 1 },
  { id: "r1", type: "ring" as const, top: "35%", left: "4%", size: 48, duration: 18, delay: 0.5 },
  { id: "s1", type: "square" as const, bottom: "12%", right: "8%", size: 16, duration: 14, delay: 1.5 },
  { id: "d1", type: "dot" as const, top: "22%", left: "18%", duration: 11, delay: 0.3 },
  { id: "d2", type: "dot" as const, bottom: "40%", right: "14%", duration: 16, delay: 2 },
];

type AboutBackgroundProps = {
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
};

export function AboutBackground({ parallaxX, parallaxY }: AboutBackgroundProps) {
  return (
    <div className="about-bg" aria-hidden>
      <span className="about-bg__watermark">ABOUT</span>
      <div className="about-bg__glow about-bg__glow--left" />
      <div className="about-bg__glow about-bg__glow--right" />
      <div className="about-bg__blur about-bg__blur--accent" />
      <div className="about-bg__blur about-bg__blur--muted" />

      <motion.div
        className="about-deco"
        style={parallaxX && parallaxY ? { x: parallaxX, y: parallaxY } : undefined}
      >
        {DECO_ITEMS.map((item) => (
          <motion.span
            key={item.id}
            className={
              item.type === "dot"
                ? "about-deco__dot"
                : `about-deco__${item.type}`
            }
            style={{
              top: item.top,
              right: item.right,
              bottom: item.bottom,
              left: item.left,
              ...(item.size ? { width: item.size, height: item.size } : {}),
            }}
            animate={{
              y: [0, item.type === "dot" ? -8 : -12, 0],
              x: [0, item.type === "square" ? 5 : 3, 0],
              opacity: [0.3, 0.55, 0.3],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
