"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { site } from "@/data/site";
import { HeroGShape } from "@/components/hero/HeroGShape";
import { HeroDecorations } from "@/components/hero/HeroDecorations";

type HeroVisualProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
};

export function HeroVisual({ sectionRef }: HeroVisualProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 38, damping: 26 });
  const springY = useSpring(mouseY, { stiffness: 38, damping: 26 });

  const bgGX = useTransform(springX, [0, 1], [-10, 10]);
  const bgGY = useTransform(springY, [0, 1], [-8, 8]);
  const nameX = useTransform(springX, [0, 1], [-6, 6]);
  const midX = useTransform(springX, [0, 1], [-14, 14]);
  const midY = useTransform(springY, [0, 1], [-10, 10]);
  const portraitX = useTransform(springX, [0, 1], [-8, 8]);
  const portraitY = useTransform(springY, [0, 1], [-6, 6]);
  const decoX = useTransform(springX, [0, 1], [-18, 18]);
  const decoY = useTransform(springY, [0, 1], [-14, 14]);
  const secGX = useTransform(springX, [0, 1], [-12, 12]);
  const secGY = useTransform(springY, [0, 1], [-10, 10]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, sectionRef]);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="hero-visual"
      aria-label="Designer portfolio artwork"
    >
      <div className="hero-visual__stage">
        {/* ── Background layer: G shapes + typography ── */}
        <div className="hero-visual__layer hero-visual__layer--bg">
          <motion.div className="hero-visual__g-bg-wrap" style={{ x: bgGX, y: bgGY }} aria-hidden>
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="hero-visual__g-bg-rotate">
                <HeroGShape variant="outline" strokeWidth={1.25} className="hero-visual__g-bg" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="hero-visual__name-wrap" style={{ x: nameX }} aria-hidden>
            <motion.p
              className="hero-visual__name-back font-display"
              animate={{ x: [-14, 14, -14] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            >
              {site.brandWatermark}
            </motion.p>
          </motion.div>
        </div>

        {/* ── Middle layer: glows + accents ── */}
        <div className="hero-visual__layer hero-visual__layer--mid">
          <motion.div
            className="hero-visual__portrait-glow"
            style={{ x: midX, y: midY }}
            animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.97, 1.03, 0.97] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />

          <motion.div
            className="hero-visual__g-secondary-wrap"
            style={{ x: secGX, y: secGY }}
            aria-hidden
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HeroGShape variant="pink-outline" strokeWidth={1} className="hero-visual__g-secondary" />
            </motion.div>
          </motion.div>

          <HeroDecorations parallaxX={decoX} parallaxY={decoY} />
        </div>

        {/* ── Foreground layer: portrait + outline type ── */}
        <div className="hero-visual__layer hero-visual__layer--fg">
          <p className="hero-visual__role-front font-display" aria-hidden>
            PRODUCT DESIGNER
          </p>

          <motion.figure className="hero-visual__figure" style={{ x: portraitX, y: portraitY }}>
            <div className="hero-visual__photo-wrap">
              <Image
                src="/hero-profile.png"
                alt={`${site.name}, ${site.role}`}
                width={620}
                height={760}
                className="hero-visual__photo"
                priority
              />
            </div>
          </motion.figure>
        </div>
      </div>
    </motion.aside>
  );
}
