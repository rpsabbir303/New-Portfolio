"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/services-page/MagneticButton";
import { servicesPageOfferings } from "@/data/services-page";

export function ServicesMainGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".sp-offerings__header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".sp-service-card", {
        scrollTrigger: { trigger: ".sp-service-grid", start: "top 85%" },
        opacity: 0,
        y: 48,
        stagger: 0.08,
        duration: 0.75,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="sp-offerings">
      <Container>
        <div className="sp-offerings__header">
          <p className="sp-section-label">What I Offer</p>
          <h2 className="sp-section-title">End-to-end capabilities for modern products</h2>
          <p className="sp-section-desc">
            From first sketch to production deployment — design, build, fix, scale, and support
            digital products for startups and enterprise teams.
          </p>
        </div>

        <div className="sp-service-grid">
          {servicesPageOfferings.map((service) => (
            <article key={service.number} className="sp-service-card sp-glass group">
              <div className="sp-service-card__top">
                <span className="sp-service-card__number">{service.number}</span>
                <ArrowUpRight
                  size={20}
                  className="sp-service-card__arrow text-neutral-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff014f]"
                  aria-hidden
                />
              </div>
              <h3 className="sp-service-card__title">{service.title}</h3>
              <p className="sp-service-card__desc">{service.description}</p>
              <ul className="sp-service-card__list">
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <MagneticButton href="#contact" variant="ghost" className="sp-service-card__cta">
                Discuss this service
              </MagneticButton>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
