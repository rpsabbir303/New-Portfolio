"use client";

import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { servicesContent } from "@/data/services";

export function ServicesIntro() {
  return (
    <div className="services-intro">
      <SectionReveal>
        <span className="section-label">{servicesContent.label}</span>
        <h2 className="services-intro__headline">{servicesContent.headline}</h2>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <p className="services-intro__description">{servicesContent.description}</p>
      </SectionReveal>

      <SectionReveal delay={0.18}>
        <div className="services-intro__stats">
          {servicesContent.stats.map((stat) => (
            <div key={stat.label}>
              <p className="services-intro__stat-value">{stat.value}</p>
              <p className="services-intro__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal delay={0.26}>
        <Button href={servicesContent.cta.href}>{servicesContent.cta.label}</Button>
      </SectionReveal>
    </div>
  );
}
