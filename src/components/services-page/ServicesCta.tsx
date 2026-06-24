"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/services-page/MagneticButton";
import { servicesPageCta } from "@/data/services-page";

export function ServicesCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".sp-cta__inner > *", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 36,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="sp-cta">
      <Container>
        <div className="sp-cta__inner sp-glass">
          <h2 className="sp-cta__title">
            {servicesPageCta.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="sp-cta__desc">{servicesPageCta.description}</p>
          <div className="sp-cta__actions">
            {servicesPageCta.ctas.map((cta) => (
              <MagneticButton
                key={cta.label}
                href={cta.href}
                variant={cta.primary ? "primary" : "ghost"}
              >
                {cta.label}
              </MagneticButton>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
