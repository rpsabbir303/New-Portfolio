"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { servicesPageProcess } from "@/data/services-page";

export function ServicesProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".sp-process__header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 36,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".sp-process__step", {
        scrollTrigger: { trigger: ".sp-process__timeline", start: "top 85%" },
        opacity: 0,
        x: -24,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".sp-process__line", {
        scrollTrigger: { trigger: ".sp-process__timeline", start: "top 85%" },
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        ease: "power3.inOut",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="sp-process">
      <Container>
        <div className="sp-process__header">
          <p className="sp-section-label">Process</p>
          <h2 className="sp-section-title">How We Work</h2>
        </div>

        <div className="sp-process__timeline">
          <div className="sp-process__line" aria-hidden />
          {servicesPageProcess.map((step) => (
            <article key={step.step} className="sp-process__step sp-glass">
              <span className="sp-process__step-num">{step.step}</span>
              <div>
                <h3 className="sp-process__step-title">{step.title}</h3>
                <p className="sp-process__step-desc">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
