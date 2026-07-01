import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { FeaturedProjectCard } from "@/components/portfolio/FeaturedProjectCard";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function FeaturedProjects() {
  return (
    <section id="portfolio" className="section-y scroll-mt-28 relative">
      <Container>
        <SectionReveal>
          <div className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="section-label">Work</span>
              <h2 className="section-heading">Featured Projects</h2>
              <p className="section-intro">
                A selection of my recent design and development work.
              </p>
            </div>

            <Link href="/portfolio" className="featured-projects-cta group">
              View All Projects
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </SectionReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, index) => (
            <FeaturedProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
