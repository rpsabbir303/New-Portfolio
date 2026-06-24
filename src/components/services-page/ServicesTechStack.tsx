"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { servicesPageTech } from "@/data/services-page";

export function ServicesTechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".sp-tech__block", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 32,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="sp-tech">
      <Container>
        <div className="sp-tech__header">
          <p className="sp-section-label">Tech Stack</p>
          <h2 className="sp-section-title">Built with modern, proven technology</h2>
        </div>

        <div className="sp-tech__grid">
          {servicesPageTech.map((group) => (
            <div key={group.category} className="sp-tech__block sp-glass">
              <h3 className="sp-tech__category">{group.category}</h3>
              <div className="sp-tech__items">
                {group.items.map((item) => (
                  <span key={item} className="sp-tech__pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
