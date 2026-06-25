export type ProjectCategory =
  | "Mobile App"
  | "Web App"
  | "SaaS"
  | "Dashboard"
  | "UX/UI"
  | "Healthcare Platform"
  | "Automotive Platform"
  | "Ride Sharing"
  | "Electric Vehicle";

export type Project = {
  id: string;
  slug: string;
  dribbbleUrl?: string;
  title: string;
  description: string;
  summary?: string;
  category: ProjectCategory;
  featured?: boolean;
  thumbnail: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  accent: string;
  accentGlow: string;
  mockupType:
    | "phones"
    | "phone-pedestal"
    | "laptop-red"
    | "laptop-light"
    | "phone-blue"
    | "website-collage";
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    features: string[];
    techStack: string[];
    screenshots: string[];
  };
  reversed?: boolean;
};
