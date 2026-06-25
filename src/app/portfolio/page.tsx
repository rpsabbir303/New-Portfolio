import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28">
          <Container>
            <SectionReveal>
              <div className="mb-16 max-w-2xl">
                <span className="section-label">Portfolio</span>
                <h1 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  All Projects
                </h1>
                <p className="mt-4 text-lg text-neutral-400">
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
