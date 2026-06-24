import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResumePage } from "@/components/resume-page/ResumePage";
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
