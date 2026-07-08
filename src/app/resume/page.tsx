import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ResumePage } from "@/components/resume/ResumePage";
import { BreadcrumbJsonLd } from "@/components/layout/JsonLd";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/data/seo";

const title = "Resume";
const description =
  "Resume of MD Sabbir Ahmed — UI/UX Designer and Product Designer from Bangladesh. Experience, skills, certifications, education, and contact details.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "MD Sabbir Ahmed resume",
    "UX Designer Portfolio",
    "Product Designer Portfolio",
    "UI UX Designer Bangladesh",
    "rpsabbir303",
    "SparkTech Agency",
  ],
  alternates: buildAlternates("/resume"),
  openGraph: buildOpenGraph(`${title} | MD Sabbir Ahmed`, description, "/resume"),
  twitter: buildTwitter(`${title} | MD Sabbir Ahmed`, description),
};

export default function ResumeRoutePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Resume", path: "/resume" },
        ]}
      />
      <Header />
      <ResumePage />
      <Footer />
    </>
  );
}
