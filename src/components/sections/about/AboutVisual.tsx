"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { aboutStats } from "@/data/about";

const FLOAT_VARIANTS = [
  { y: [0, -10, 0], duration: 5.5, delay: 0 },
  { y: [0, -14, 0], duration: 6.5, delay: 0.8 },
  { y: [0, -8, 0], duration: 5, delay: 1.4 },
];

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: `${6 + ((i * 19) % 88)}%`,
  y: `${4 + ((i * 27) % 92)}%`,
  size: 2 + (i % 3),
  duration: 12 + (i % 5) * 2,
  delay: i * 0.35,
}));

const ACCENT_DOTS = [
  { id: "a1", top: "14%", left: "12%", size: 4 },
  { id: "a2", top: "62%", right: "10%", size: 3 },
  { id: "a3", bottom: "22%", left: "8%", size: 5 },
];

type AboutVisualProps = {
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
};

export function AboutVisual({ parallaxX, parallaxY }: AboutVisualProps) {
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  const px = parallaxX ?? fallbackX;
  const py = parallaxY ?? fallbackY;
  const portraitX = useTransform(px, (v) => v * 0.35);
  const portraitY = useTransform(py, (v) => v * 0.28);
  const ambientX = useTransform(px, (v) => v * 0.55);
  const ambientY = useTransform(py, (v) => v * 0.45);

  return (
    <div className="about-visual">
      <motion.div
        className="about-visual__stage"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background — ABOUT watermark (same role as SABBIR in Hero) */}
        <div className="about-visual__layer about-visual__layer--bg">
          <div className="about-visual__name-wrap" aria-hidden>
            <p className="about-visual__name-back font-display">ABOUT</p>
          </div>
        </div>

        {/* Middle — glow, particles, decorations */}
        <motion.div
          className="about-visual__layer about-visual__layer--mid"
          style={{ x: ambientX, y: ambientY }}
          aria-hidden
        >
          <div className="about-visual__mesh" />
          <motion.div
            className="about-visual__glow about-visual__glow--primary"
            animate={{ opacity: [0.5, 0.82, 0.5], scale: [0.94, 1.06, 0.94] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="about-visual__glow about-visual__glow--secondary"
            animate={{ opacity: [0.35, 0.6, 0.35], scale: [1.02, 0.96, 1.02] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          />
          <motion.div
            className="about-visual__ring"
            animate={{ scale: [1, 1.025, 1], opacity: [0.45, 0.65, 0.45] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="about-visual__ring about-visual__ring--inner"
            animate={{ scale: [1.02, 0.98, 1.02], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
          <div className="about-visual__particles">
            {PARTICLES.map((p) => (
              <motion.span
                key={p.id}
                className="about-visual__particle"
                style={{
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                }}
                animate={{
                  y: [0, -16, 0],
                  opacity: [0.12, 0.42, 0.12],
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
          {ACCENT_DOTS.map((dot, i) => (
            <motion.span
              key={dot.id}
              className="about-visual__accent-dot"
              style={{
                top: dot.top,
                left: dot.left,
                right: dot.right,
                bottom: dot.bottom,
                width: dot.size,
                height: dot.size,
              }}
              animate={{ opacity: [0.35, 0.75, 0.35], scale: [1, 1.2, 1] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>

        {/* Foreground — outline type + portrait (Hero overlap pattern) */}
        <div className="about-visual__layer about-visual__layer--fg">
          <p className="about-visual__role-front font-display" aria-hidden>
            UI/UX DESIGNER
          </p>

          <motion.figure
            className="about-visual__figure"
            style={{ x: portraitX, y: portraitY }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-visual__photo-wrap">
              <Image
                src="/hero-profile.png"
                alt="MD Sabbir Ahmed — UI/UX Designer and Product Designer from Bangladesh"
                width={620}
                height={760}
                sizes="(max-width: 1024px) 95vw, 52vw"
                className="about-visual__photo"
                priority={false}
              />
            </div>
          </motion.figure>
        </div>
      </motion.div>

      {aboutStats.map((stat, index) => {
        const float = FLOAT_VARIANTS[index];
        return (
          <motion.div
            key={stat.label}
            className={`about-stat-card about-stat-card--${index + 1}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{
              y: -5,
              scale: 1.03,
              transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{
              duration: 0.65,
              delay: 0.2 + index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              animate={{ y: float.y }}
              transition={{
                duration: float.duration,
                delay: float.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="about-stat-card__value">{stat.value}</span>
              <span className="about-stat-card__years">{stat.yearsLabel}</span>
              <span className="about-stat-card__label">{stat.label}</span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
