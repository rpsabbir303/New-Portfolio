import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { shouldShowStoreBadges } from "@/lib/project-store-links";
import { Button } from "@/components/ui/Button";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ProjectThumbnail } from "@/components/projects/ProjectThumbnail";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isReversed = project.reversed;

  return (
    <SectionReveal delay={index * 0.05}>
      <article
        className="project-card group overflow-hidden rounded-3xl"
        style={{ "--card-glow": project.accentGlow } as React.CSSProperties}
      >
        <div
          className={cn(
            "grid items-center gap-8 p-6 md:gap-12 md:p-10 lg:grid-cols-2",
            isReversed && "lg:[&>*:first-child]:order-2"
          )}
        >
          <div className="space-y-6">
            <div>
              <span
                className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest"
                style={{ color: project.accent }}
              >
                {project.category}
              </span>
              <h3 className="font-display text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
                {project.title}
              </h3>
            </div>

            <p className="max-w-lg text-base leading-relaxed text-neutral-400">
              {project.description}
            </p>

            <Button href={project.caseStudyUrl} external showArrow>
              Check Full Case Study
            </Button>

            {shouldShowStoreBadges(project) ? (
              <StoreBadges
                appStoreUrl={project.appStoreUrl}
                playStoreUrl={project.playStoreUrl}
              />
            ) : null}
          </div>

          <ProjectThumbnail
            project={project}
            priority={index === 0}
          />
        </div>
      </article>
    </SectionReveal>
  );
}
