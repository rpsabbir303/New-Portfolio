"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutStats } from "@/data/about";

const FLOAT_VARIANTS = [
  { y: [0, -10, 0], duration: 5.5, delay: 0 },
  { y: [0, -14, 0], duration: 6.5, delay: 0.8 },
  { y: [0, -8, 0], duration: 5, delay: 1.4 },
];

export function AboutVisual() {
  return (
    <div className="about-visual">
      <motion.div
        className="about-visual__frame"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/hero-profile.png"
          alt="Sabbir Ahmed — UI/UX Designer"
          fill
          sizes="(max-width: 1024px) 352px, 400px"
          className="about-visual__image"
        />
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
              <span className="about-stat-card__label">{stat.label}</span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
