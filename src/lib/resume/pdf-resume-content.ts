import {
  resumeCertification,
  resumeEducation,
  resumeHero,
  resumeSkills,
  resumeSummary,
  resumeTimeline,
  resumeTools,
} from "@/data/resume";
import { projects, getProjectCaseStudyHref } from "@/data/projects";
import { site } from "@/data/site";
import type { Project } from "@/types/project";

export type PdfContactItem = {
  label: string;
  value: string;
  href?: string;
};

export type PdfSkillGroup = {
  category: string;
  items: string[];
};

export type PdfExperienceRole = {
  company: string;
  title: string;
  period: string;
  bullets: string[];
};

export type PdfProjectEntry = {
  title: string;
  category: string;
  description: string;
  responsibilities: string[];
  caseStudyHref: string | null;
};

/** Professional summary — existing copy only. */
export const PDF_SUMMARY_LINES = [
  resumeSummary.text,
  resumeSummary.text2,
  resumeHero.intro,
  `Career goal: ${resumeSummary.goal}`,
] as const;

export const PDF_CONTACTS: PdfContactItem[] = [
  { label: "Phone", value: site.phone, href: `tel:${site.phoneE164}` },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    label: "Portfolio",
    value: "rpsabbir303.framer.website",
    href: "https://rpsabbir303.framer.website",
  },
  { label: "LinkedIn", value: "LinkedIn", href: site.social.linkedin },
  { label: "Behance", value: "Behance", href: site.social.behance },
  { label: "Dribbble", value: "Dribbble", href: site.social.dribbble },
  { label: "Location", value: site.address },
];

export const PDF_EXPERIENCE: PdfExperienceRole[] = [
  {
    company: "SparkTech Agency",
    title: "Senior UI/UX Designer",
    period: "2026 – Present",
    bullets: [resumeTimeline[4].description],
  },
  {
    company: "Freelance & Client Projects",
    title: "UI/UX Designer",
    period: "2023 – 2025",
    bullets: [
      resumeTimeline[1].description,
      resumeTimeline[2].description,
      resumeTimeline[3].description,
    ],
  },
  {
    company: "Professional Development",
    title: "UI/UX Design Foundation",
    period: "2022",
    bullets: [resumeTimeline[0].description],
  },
];

const FEATURED_PROJECT_IDS = [
  "duty-hour-app",
  "yoga-jen",
  "doctor-platform",
  "autoworld",
  "mapc-ev-charging",
] as const;

function buildProjectResponsibilities(project: Project): string[] {
  return [...project.caseStudy.techStack, ...project.caseStudy.features].slice(
    0,
    3
  );
}

export const PDF_FEATURED_PROJECTS: PdfProjectEntry[] = FEATURED_PROJECT_IDS.map(
  (id) => {
    const project = projects.find((entry) => entry.id === id);
    if (!project) {
      throw new Error(`Missing project: ${id}`);
    }
    return {
      title: project.title,
      category: project.category,
      description: project.summary || project.description,
      responsibilities: buildProjectResponsibilities(project),
      caseStudyHref: getProjectCaseStudyHref(project),
    };
  }
);

/** Categorized skills — Design merges design + product skills from existing data. */
export const PDF_SKILL_GROUPS: PdfSkillGroup[] = [
  {
    category: "Design",
    items: [
      "UI Design",
      "UX Design",
      "Mobile App Design",
      "Dashboard Design",
      "Wireframing",
      "Prototyping",
      "Design Systems",
    ],
  },
  {
    category: "Research",
    items: [...resumeSkills[1].items],
  },
  {
    category: "Collaboration",
    items: [...resumeSkills[3].items],
  },
];

export const PDF_TOOLS_LINE = resumeTools.map((tool) => tool.name).join(" • ");

export const PDF_EDUCATION = resumeEducation;
export const PDF_CERTIFICATION = resumeCertification;
export const PDF_HERO = resumeHero;
