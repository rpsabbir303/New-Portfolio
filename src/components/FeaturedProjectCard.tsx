import { ArrowUpRight } from "lucide-react";
import {
  getProjectCaseStudyHref,
  hasProjectCaseStudy,
  type Project,
} from "@/data/projects";
import { ProjectThumbnailMedia } from "@/components/projects/ProjectThumbnail";
import { SectionReveal } from "@/components/ui/SectionReveal";

type FeaturedProjectCardProps = {
  project: Project;
  index: number;
};

export function FeaturedProjectCard({ project, index }: FeaturedProjectCardProps) {
  const caseStudyHref = getProjectCaseStudyHref(project);
  const hasCaseStudy = hasProjectCaseStudy(project);

  const cardContent = (
    <article>
      <div className="featured-project-card__visual">
        <ProjectThumbnailMedia
          project={project}
          priority={index === 0}
          sizes="(max-width:768px) 100vw, 33vw"
          showOverlay={false}
          className="project-thumbnail--featured"
        />
      </div>

      <div className="featured-project-card__body">
        <div className="featured-project-card__meta">
          <span className="featured-project-card__category">{project.category}</span>
          <span className="featured-project-card__arrow" aria-hidden>
            <ArrowUpRight size={18} />
          </span>
        </div>

        <h3 className="featured-project-card__title font-display">{project.title}</h3>

        {project.summary ? (
          <p className="featured-project-card__summary">{project.summary}</p>
        ) : null}
      </div>
    </article>
  );

  return (
    <SectionReveal delay={index * 0.08}>
      {hasCaseStudy && caseStudyHref ? (
        <a
          href={caseStudyHref}
          target="_blank"
          rel="noopener noreferrer"
          className="featured-project-card group block"
          style={{ "--card-accent": project.accent } as React.CSSProperties}
        >
          {cardContent}
        </a>
      ) : (
        <div
          className="featured-project-card group block"
          style={{ "--card-accent": project.accent } as React.CSSProperties}
        >
          {cardContent}
        </div>
      )}
    </SectionReveal>
  );
}
