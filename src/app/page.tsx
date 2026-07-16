import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { BreadcrumbJsonLd } from "@/components/layout/JsonLd";
import {
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_TITLE,
} from "@/data/seo";

const About = dynamic(() =>
  import("@/components/sections/About").then((m) => ({ default: m.About }))
);

const FeaturedProjects = dynamic(() =>
  import("@/components/sections/FeaturedProjects").then((m) => ({
    default: m.FeaturedProjects,
  }))
);

const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((m) => ({ default: m.Contact }))
);

const Footer = dynamic(() =>
  import("@/components/layout/Footer").then((m) => ({ default: m.Footer }))
);

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  alternates: buildAlternates("/"),
  openGraph: buildOpenGraph(SITE_TITLE, SITE_DESCRIPTION, "/"),
  twitter: buildTwitter(SITE_TITLE, SITE_DESCRIPTION),
};

export default function Home() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <FeaturedProjects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
