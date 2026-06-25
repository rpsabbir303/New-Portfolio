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
  title: string;
  description: string;
  summary?: string;
  category: ProjectCategory;
  featured?: boolean;
  caseStudyUrl: string;
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
  reversed?: boolean;
};

export const projects: Project[] = [
  {
    id: "duty-hour-app",
    title: "Duty Hour App",
    summary: "Total HRM Solution for all type of business",
    description:
      "A complete HRM solution that simplifies attendance, shift management, leave requests, payroll, employee monitoring, and workforce operations with real-time insights and an intuitive user experience.",
    category: "Mobile App",
    featured: true,
    caseStudyUrl: "#",
    thumbnail: "/projects/duty-hour/thumbnail.webp",
    appStoreUrl: "https://apps.apple.com/ca/app/duty-hour-app/id6753148379",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.duty.users&hl=en",
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
    thumbnail: "/projects/yoga-with-jen/thumbnail.webp",
    appStoreUrl: "https://apps.apple.com/us/app/yoga-with-jen/id6747931843",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.yoga.users",
    accent: "#7C3AED",
    accentGlow: "rgba(124, 58, 237, 0.35)",
    mockupType: "phone-pedestal",
    reversed: true,
  },
  {
    id: "doctor-platform",
    title: "Doctor Appointment Platform",
    summary: "Website + Dashboard",
    description:
      "A modern healthcare platform that enables patients to search doctors, schedule appointments, manage bookings, and communicate with healthcare providers through a clean and intuitive interface.",
    category: "Healthcare Platform",
    featured: true,
    caseStudyUrl: "#",
    thumbnail: "/projects/doctor-appointment/thumbnail.webp",
    accent: "#22C55E",
    accentGlow: "rgba(34, 197, 94, 0.35)",
    mockupType: "laptop-light",
  },
  {
    id: "autoworld",
    title: "AutoWorld",
    summary: "Website & Mobile App",
    description:
      "A complete vehicle marketplace that allows users to explore, compare, finance, and purchase new or used vehicles with an intuitive browsing experience.",
    category: "Automotive Platform",
    featured: true,
    caseStudyUrl: "#",
    thumbnail: "/projects/autoworld/thumbnail.webp",
    accent: "#7C3AED",
    accentGlow: "rgba(124, 58, 237, 0.35)",
    mockupType: "laptop-light",
    reversed: true,
  },
  {
    id: "cabwire",
    title: "Cabwire",
    summary: "Mobile Application",
    description:
      "A modern ride booking application focused on fast transportation, real-time tracking, and a clean user experience for passengers and drivers.",
    category: "Ride Sharing",
    featured: true,
    caseStudyUrl: "#",
    thumbnail: "/projects/cabwire/thumbnail.webp",
    accent: "#C9A227",
    accentGlow: "rgba(201, 162, 39, 0.35)",
    mockupType: "phones",
  },
  {
    id: "mapc-ev-charging",
    title: "MAPC EV Charging",
    summary: "Mobile Application",
    description:
      "An EV charging application that helps users locate charging stations, monitor charger availability, navigate to nearby stations, and manage charging sessions.",
    category: "Electric Vehicle",
    featured: true,
    caseStudyUrl: "#",
    thumbnail: "/projects/mapc/thumbnail.webp",
    accent: "#84CC16",
    accentGlow: "rgba(132, 204, 22, 0.35)",
    mockupType: "phone-blue",
    reversed: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
