"use client";

import { Container } from "@/components/ui/Container";
import { serviceItems } from "@/data/services";
import { ServicesBackground } from "@/components/services/ServicesBackground";
import { ServicesIntro } from "@/components/services/ServicesIntro";
import { ServiceCard } from "@/components/services/ServiceCard";
import "@/components/services/services.css";

export function Services() {
  return (
    <section id="services" className="services-section scroll-mt-28">
      <ServicesBackground />

      <Container>
        <div className="services-grid">
          <ServicesIntro />

          <div className="services-cards">
            {serviceItems.map((service, index) => (
              <ServiceCard
                key={service.id}
                number={service.number}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
