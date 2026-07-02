"use client";

import { useState } from "react";
import Image from "next/image";
import { LayoutGrid, Smartphone } from "lucide-react";
import { getProjectCaseStudyHref } from "@/data/projects";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import "@/components/portfolio/project-thumbnail.css";

export type ProjectThumbnailProject = Pick<
  Project,
  | "thumbnail"
  | "title"
  | "accent"
  | "category"
  | "slug"
  | "dribbbleUrl"
>;

type ProjectThumbnailMediaProps = {
  project: ProjectThumbnailProject;
  priority?: boolean;
  sizes?: string;
  showOverlay?: boolean;
  className?: string;
};

type ProjectThumbnailProps = ProjectThumbnailMediaProps & {
  linkable?: boolean;
};

function ProjectThumbnailFallback({
  title,
  accent,
  category,
}: Pick<ProjectThumbnailProject, "title" | "accent" | "category">) {
  const Icon =
    category === "Mobile App" ||
    category === "Ride Sharing" ||
    category === "Electric Vehicle"
      ? Smartphone
      : LayoutGrid;

  return (
    <div
      className="project-thumbnail__fallback"
      style={{
        background: `linear-gradient(160deg, ${accent}33 0%, #0a0a0a 45%, ${accent}18 100%)`,
      }}
    >
      <div
        className="project-thumbnail__fallback-icon"
        style={{ color: accent, boxShadow: `0 0 40px ${accent}40` }}
      >
        <Icon size={28} strokeWidth={1.75} aria-hidden />
      </div>
      <p className="project-thumbnail__fallback-label">Preview Coming Soon</p>
      <p className="project-thumbnail__fallback-title">{title}</p>
    </div>
  );
}

export function ProjectThumbnailMedia({
  project,
  priority = false,
  sizes = "(max-width:768px) 100vw, 50vw",
  showOverlay = true,
  className,
}: ProjectThumbnailMediaProps) {
  const [hasError, setHasError] = useState(false);
  const thumbnail = project.thumbnail?.trim() ?? "";
  const showFallback = hasError || !thumbnail;

  return (
    <div className={cn("project-thumbnail", className)}>
      {showFallback ? (
        <ProjectThumbnailFallback
          title={project.title}
          accent={project.accent}
          category={project.category}
        />
      ) : (
        <>
          <Image
            src={thumbnail}
            alt={`${project.title} — ${project.category} UI/UX design by MD Sabbir Ahmed`}
            fill
            quality={100}
            sizes={sizes}
            priority={priority}
            className="project-thumbnail__image object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onLoad={() => setHasError(false)}
            onError={() => setHasError(true)}
          />
          {showOverlay ? (
            <div className="project-thumbnail__overlay" aria-hidden />
          ) : null}
        </>
      )}
    </div>
  );
}

export function ProjectThumbnail({
  project,
  priority = false,
  sizes = "(max-width:768px) 100vw, 50vw",
  showOverlay = true,
  className,
  linkable = true,
}: ProjectThumbnailProps) {
  const href = getProjectCaseStudyHref(project);

  const media = (
    <ProjectThumbnailMedia
      project={project}
      priority={priority}
      sizes={sizes}
      showOverlay={showOverlay}
      className={className}
    />
  );

  if (!linkable) {
    return media;
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="project-thumbnail__link block"
        aria-label={`View case study for ${project.title}`}
      >
        {media}
      </a>
    );
  }
  return media;
}
