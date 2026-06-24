"use client";

import { ServicesPageHero } from "@/components/services-page/ServicesPageHero";
import { ServicesWhyMe } from "@/components/services-page/ServicesWhyMe";
import { ServicesMainGrid } from "@/components/services-page/ServicesMainGrid";
import { ServicesProcess } from "@/components/services-page/ServicesProcess";
import { ServicesTechStack } from "@/components/services-page/ServicesTechStack";
import { ServicesFaq } from "@/components/services-page/ServicesFaq";
import { ServicesCta } from "@/components/services-page/ServicesCta";
import "@/components/services-page/services-page.css";

export function ServicesPage() {
  return (
    <main className="services-page">
      <ServicesPageHero />
      <ServicesWhyMe />
      <ServicesMainGrid />
      <ServicesProcess />
      <ServicesTechStack />
      <ServicesFaq />
      <ServicesCta />
    </main>
  );
}
