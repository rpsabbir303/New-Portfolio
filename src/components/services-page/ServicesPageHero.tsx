"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/services-page/MagneticButton";
import { servicesPageHero } from "@/data/services-page";

export function ServicesPageHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sp-hero__label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(
        ".sp-hero__line",
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        }
      );
      gsap.fromTo(
        ".sp-hero__desc, .sp-hero__actions",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.55 }
      );
      gsap.to(".sp-hero__orb--1", {
        x: 30,
        y: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".sp-hero__orb--2", {
        x: -24,
        y: 16,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="sp-hero">
      <div className="sp-hero__bg" aria-hidden>
        <div className="sp-hero__grid" />
        <div className="sp-hero__orb sp-hero__orb--1" />
        <div className="sp-hero__orb sp-hero__orb--2" />
      </div>

      <Container className="sp-hero__inner">
        <p className="sp-hero__label sp-section-label">{servicesPageHero.label}</p>
        <h1 className="sp-hero__title">
          {servicesPageHero.headline.map((line) => (
            <span key={line} className="sp-hero__line block">
              {line}
            </span>
          ))}
        </h1>
        <p className="sp-hero__desc">{servicesPageHero.description}</p>
        <div className="sp-hero__actions">
          {servicesPageHero.ctas.map((cta) => (
            <MagneticButton
              key={cta.label}
              href={cta.href}
              variant={cta.primary ? "primary" : "ghost"}
              external={cta.href.startsWith("mailto:")}
            >
              {cta.label}
            </MagneticButton>
          ))}
        </div>
      </Container>
    </section>
  );
}
