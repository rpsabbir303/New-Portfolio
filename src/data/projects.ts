export type ProjectCategory =
  | "Mobile App"
  | "Web App"
  | "SaaS"
  | "Dashboard"
  | "UX/UI";

export type Project = {
  id: string;
  title: string;
  description: string;
  summary?: string;
  category: ProjectCategory;
  featured?: boolean;
  caseStudyUrl: string;
  livesOn?: ("app-store" | "google-play")[];
  accent: string;
  accentGlow: string;
  mockupType:
    | "phones"
    | "phone-pedestal"
    | "laptop-red"
    | "laptop-light"
    | "phone-blue"
    | "website-collage";
  reversed?: boolean;
};

export const projects: Project[] = [
  {
    id: "food-delivery",
    title: "Food Delivery & Pickup Application",
    summary: "Real-time food ordering with smart recommendations.",
    description:
      "A seamless food ordering experience with real-time tracking, smart recommendations, and intuitive checkout — designed to reduce friction from browse to doorstep.",
    category: "Mobile App",
    featured: true,
    caseStudyUrl: "#",
    livesOn: ["app-store", "google-play"],
    accent: "#FF006E",
    accentGlow: "rgba(255, 0, 110, 0.35)",
    mockupType: "phones",
  },
  {
    id: "yoga-jen",
    title: "Yoga With Jen Application",
    summary: "Guided wellness sessions with calm, mindful UX.",
    description:
      "A wellness app connecting users with guided yoga sessions, progress tracking, and a calming interface that encourages daily mindfulness practice.",
    category: "Mobile App",
    featured: true,
    caseStudyUrl: "#",
    livesOn: ["app-store", "google-play"],
    accent: "#7C3AED",
    accentGlow: "rgba(124, 58, 237, 0.35)",
    mockupType: "phone-pedestal",
    reversed: true,
  },
  {
    id: "anew-fitness",
    title: "Anew Fitness CRM Dashboard",
    summary: "Fitness management for trainers and gym owners.",
    description:
      "A comprehensive fitness management dashboard for trainers and gym owners — streamlining client management, scheduling, and analytics in one powerful interface.",
    category: "Dashboard",
    featured: true,
    caseStudyUrl: "#",
    accent: "#DC2626",
    accentGlow: "rgba(220, 38, 38, 0.35)",
    mockupType: "laptop-red",
  },
  {
    id: "autoworld",
    title: "AutoWorld Car Selling Platform",
    summary: "Modern automotive marketplace with advanced search.",
    description:
      "A modern automotive marketplace with advanced search filters, detailed vehicle listings, and a streamlined buying experience for car enthusiasts.",
    category: "Web App",
    caseStudyUrl: "#",
    accent: "#0EA5E9",
    accentGlow: "rgba(14, 165, 233, 0.35)",
    mockupType: "laptop-light",
    reversed: true,
  },
  {
    id: "padel-now",
    title: "Padel Now Application",
    summary: "Court booking and player matching for padel sports.",
    description:
      "A sports booking platform for padel enthusiasts — find courts, book sessions, and connect with players through an engaging, game-ready interface.",
    category: "Mobile App",
    caseStudyUrl: "#",
    livesOn: ["app-store", "google-play"],
    accent: "#2563EB",
    accentGlow: "rgba(37, 99, 235, 0.35)",
    mockupType: "phone-blue",
  },
  {
    id: "woof-spot",
    title: "Woof Spot Website",
    summary: "Pet services with warm visuals and clear CTAs.",
    description:
      "A delightful pet services website featuring grooming, boarding, and adoption — warm visuals and clear CTAs that put furry friends first.",
    category: "Web App",
    caseStudyUrl: "#",
    accent: "#F59E0B",
    accentGlow: "rgba(245, 158, 11, 0.35)",
    mockupType: "website-collage",
    reversed: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
