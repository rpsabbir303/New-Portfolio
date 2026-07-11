import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BreadcrumbJsonLd, PortfolioJsonLd } from "@/components/layout/JsonLd";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/data/seo";

const title = "Portfolio";
const description =
  "UI/UX Portfolio and product design case studies by MD Sabbir Ahmed (rpsabbir303) — mobile apps, SaaS dashboards, and web platforms from Bangladesh.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "UI UX Portfolio",
    "UX Designer Portfolio",
    "Product Designer Portfolio",
    "Dashboard Designer",
    "SaaS Product Designer",
    "Mobile App Designer",
    "rpsabbir303",
    "MD Sabbir Ahmed",
  ],
  alternates: buildAlternates("/portfolio"),
  openGraph: buildOpenGraph(
    `${title} | MD Sabbir Ahmed`,
    description,
    "/portfolio"
  ),
  twitter: buildTwitter(`${title} | MD Sabbir Ahmed`, description),
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ]}
      />
      <Header />
      <main id="main-content">
        <section className="section-y relative pt-24 sm:pt-28 lg:pt-36">
          <Container>
            <SectionReveal>
              <div className="mb-10 max-w-2xl sm:mb-12 md:mb-16">
                <span className="section-label">Portfolio</span>
                <h1 className="section-heading">All Projects</h1>
                <p className="section-intro">
                  Full case studies, product details, and design process for every
                  project — from mobile apps to enterprise dashboards.
                </p>
              </div>
            </SectionReveal>

            <div className="space-y-8 lg:space-y-12">
              {projects.map((project, index) => (
                <div key={project.id} id={project.id} className="scroll-mt-28">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
