"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { servicesPageMetrics } from "@/data/services-page";

function animateCounter(
  el: HTMLElement,
  end: number,
  suffix: string,
  textValue?: string
) {
  if (textValue) {
    el.textContent = textValue;
    return;
  }

  const obj = { val: 0 };
  gsap.to(obj, {
    val: end,
    duration: 2,
    ease: "power2.out",
    snap: { val: 1 },
    onUpdate: () => {
      el.textContent = `${Math.round(obj.val)}${suffix}`;
    },
  });
}

export function ServicesWhyMe() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".sp-metrics__header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".sp-metrics__card", {
        scrollTrigger: { trigger: ".sp-metrics__grid", start: "top 85%" },
        opacity: 0,
        y: 32,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        onComplete: () => {
          document.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
            const end = Number(el.dataset.counterEnd ?? 0);
            const suffix = el.dataset.counterSuffix ?? "";
            const textValue = el.dataset.counterText;
            animateCounter(el, end, suffix, textValue);
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="sp-metrics">
      <Container>
        <div className="sp-metrics__header">
          <p className="sp-section-label">Why Work With Me</p>
          <h2 className="sp-section-title">
            A partner invested in your product&apos;s success
          </h2>
        </div>

        <div className="sp-metrics__grid">
          {servicesPageMetrics.map((metric) => (
            <div key={metric.label} className="sp-metrics__card sp-glass">
              <p
                className="sp-metrics__value"
                data-counter
                data-counter-end={"textValue" in metric ? 0 : metric.value}
                data-counter-suffix={"suffix" in metric ? metric.suffix : ""}
                data-counter-text={"textValue" in metric ? metric.textValue : undefined}
              >
                {"textValue" in metric ? metric.textValue : `0${metric.suffix}`}
              </p>
              <p className="sp-metrics__label">{metric.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
