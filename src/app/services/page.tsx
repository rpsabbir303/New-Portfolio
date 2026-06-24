import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServicesPage } from "@/components/services-page/ServicesPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Services — ${site.name}`,
  description:
    "Complete digital product solutions: UI/UX design, web & mobile development, backend systems, optimization, startup consulting, and DevOps — under one roof.",
};

export default function ServicesRoutePage() {
  return (
    <>
      <Header />
      <ServicesPage />
      <Footer />
    </>
  );
}
