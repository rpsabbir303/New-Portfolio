"use client";

import { motion, type MotionValue } from "framer-motion";

const DECO_ITEMS = [
  { id: "c1", type: "circle" as const, top: "10%", right: "7%", size: 28, duration: 11, delay: 0 },
  { id: "c2", type: "circle" as const, bottom: "32%", left: "5%", size: 18, duration: 14, delay: 1.2 },
  { id: "s1", type: "square" as const, top: "42%", left: "9%", size: 14, duration: 13, delay: 0.6 },
  { id: "s2", type: "square" as const, bottom: "22%", right: "12%", size: 12, duration: 16, delay: 2 },
  { id: "p1", type: "plus" as const, top: "28%", right: "18%", duration: 12, delay: 0.8 },
  { id: "p2", type: "plus" as const, bottom: "38%", left: "14%", duration: 15, delay: 1.5 },
  { id: "d1", type: "dot" as const, top: "18%", left: "22%", duration: 10, delay: 0.3 },
  { id: "d2", type: "dot" as const, bottom: "48%", right: "6%", duration: 17, delay: 2.2 },
];

type HeroDecorationsProps = {
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
};

export function HeroDecorations({ parallaxX, parallaxY }: HeroDecorationsProps) {
  return (
    <motion.div
      className="hero-deco"
      style={parallaxX && parallaxY ? { x: parallaxX, y: parallaxY } : undefined}
      aria-hidden
    >
      {DECO_ITEMS.map((item) => (
        <motion.span
          key={item.id}
          className={`hero-deco__${item.type}`}
          style={{
            top: item.top,
            right: item.right,
            bottom: item.bottom,
            left: item.left,
            ...(item.size ? { width: item.size, height: item.size } : {}),
          }}
          animate={{
            y: [0, item.type === "dot" ? -10 : -14, 0],
            x: [0, item.type === "plus" ? 6 : 4, 0],
            opacity: [0.25, 0.5, 0.25],
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
  );
}
