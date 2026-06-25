"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { AboutBackground } from "@/components/sections/about/AboutBackground";
import { AboutVisual } from "@/components/sections/about/AboutVisual";
import { AboutContent } from "@/components/sections/about/AboutContent";
import "@/components/sections/about/about.css";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 32, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 32, damping: 28 });
  const decoX = useTransform(springX, [0, 1], [-12, 12]);
  const decoY = useTransform(springY, [0, 1], [-10, 10]);

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
    <section ref={sectionRef} id="about" className="about-section scroll-mt-28">
      <AboutBackground parallaxX={decoX} parallaxY={decoY} />

      <Container>
        <div className="about-grid">
          <AboutVisual parallaxX={decoX} parallaxY={decoY} />
          <AboutContent />
        </div>
      </Container>
    </section>
  );
}
