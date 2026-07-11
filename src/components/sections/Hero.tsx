"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { HeroBackground } from "@/components/sections/hero/HeroBackground";
import { HeroVisual } from "@/components/sections/hero/HeroVisual";
import "@/components/sections/hero/hero.css";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 38, damping: 26 });
  const springY = useSpring(mouseY, { stiffness: 38, damping: 26 });
  const contentX = useTransform(springX, [0, 1], [-4, 4]);
  const contentY = useTransform(springY, [0, 1], [-3, 3]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-section scroll-mt-28 relative min-h-0 overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32"
    >
      <HeroBackground />

      <Container className="hero-grid relative z-10">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hero-content hero-content--fg"
          style={{ x: contentX, y: contentY }}
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-content__eyebrow"
          >
            {site.role}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="hero-content__headline font-display"
          >
            {site.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.26 }}
            className="hero-content__subtitle font-display"
          >
            {site.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.34 }}
            className="hero-content__description"
          >
            {site.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.42 }}
            className="hero-content__actions"
          >
            <Button href="#contact">Start a Project</Button>
            <SocialLinks variant="hero" />
          </motion.div>
        </motion.div>

        <HeroVisual sectionRef={sectionRef} />
      </Container>
    </section>
  );
}
