import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ResumePage } from "@/components/resume/ResumePage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Resume — ${site.name}`,
  description:
    "Professional resume of MD. Sabbir Ahmed, UX/Product Designer. Experience, live products, skills, certifications, education, and contact details.",
  keywords: [
    "MD Sabbir Ahmed resume",
    "UX designer resume",
    "Product designer portfolio",
    "UI UX Bangladesh",
    "Sparktech Agency",
  ],
};

export default function ResumeRoutePage() {
  return (
    <>
      <Header />
      <ResumePage />
      <Footer />
    </>
  );
}
