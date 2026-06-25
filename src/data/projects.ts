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

export const projects: Project[] = [
  {
    id: "duty-hour-app",
    slug: "duty-hour-app",
    dribbbleUrl: "https://dribbble.com/shots/26932125-Duty-Hour-App-Smart-HRM-Solution",
    title: "Duty Hour App",
    summary: "Total HRM Solution for all type of business",
    description:
      "A complete HRM solution that simplifies attendance, shift management, leave requests, payroll, employee monitoring, and workforce operations with real-time insights and an intuitive user experience.",
    category: "Mobile App",
    featured: true,
    thumbnail: "/projects/duty-hour/thumbnail.webp",
    appStoreUrl: "https://apps.apple.com/ca/app/duty-hour-app/id6753148379",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.duty.users&hl=en",
    accent: "#FF006E",
    accentGlow: "rgba(255, 0, 110, 0.35)",
    mockupType: "phones",
    caseStudy: {
      overview:
        "Duty Hour is a workforce product for businesses that need attendance, scheduling, payroll, and day-to-day staff operations in one reliable app.",
      problem:
        "HR teams were juggling attendance records, shift planning, leave requests, and payroll across disconnected tools, which caused delays and data inconsistencies.",
      solution:
        "We designed a mobile-first HRM experience that centralizes shift tracking, payroll actions, and employee requests into one clean workflow with role-aware access.",
      features: [
        "Attendance and shift tracking",
        "Leave and approval workflows",
        "Payroll and salary visibility",
        "Employee profile and records",
      ],
      techStack: ["Product Design", "UX Research", "Design System", "Prototyping"],
      screenshots: [
        "/projects/duty-hour/thumbnail.webp",
        "/projects/duty-hour/thumbnail.webp",
      ],
    },
  },
  {
    id: "yoga-jen",
    slug: "yoga-with-jen",
    dribbbleUrl: "https://dribbble.com/shots/26290525-Yoga-With-Jen-Application-Website",
    title: "Yoga With Jen Application",
    summary: "Guided wellness sessions with calm, mindful UX.",
    description:
      "A wellness app connecting users with guided yoga sessions, progress tracking, and a calming interface that encourages daily mindfulness practice.",
    category: "Mobile App",
    featured: true,
    thumbnail: "/projects/yoga-with-jen/thumbnail.webp",
    appStoreUrl: "https://apps.apple.com/us/app/yoga-with-jen/id6747931843",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.yoga.users",
    accent: "#7C3AED",
    accentGlow: "rgba(124, 58, 237, 0.35)",
    mockupType: "phone-pedestal",
    caseStudy: {
      overview:
        "Yoga With Jen helps users build a sustainable wellness routine through guided classes, progress checkpoints, and calming daily interactions.",
      problem:
        "Users were dropping off quickly in wellness apps because session discovery and progression felt overwhelming and inconsistent.",
      solution:
        "We restructured the core journey around guided plans, clear milestones, and low-friction session entry so users can continue practice without cognitive overload.",
      features: [
        "Guided yoga session catalog",
        "Progress and streak tracking",
        "Daily routine reminders",
        "Simple onboarding flow",
      ],
      techStack: ["Mobile UX", "Interaction Design", "Information Architecture", "UI Design"],
      screenshots: [
        "/projects/yoga-with-jen/thumbnail.webp",
        "/projects/yoga-with-jen/thumbnail.webp",
      ],
    },
    reversed: true,
  },
  {
    id: "doctor-platform",
    slug: "doctor-appointment-platform",
    dribbbleUrl: "https://dribbble.com/shots/26338375-HealthCare-Doctor-App-Website",
    title: "Doctor Appointment Platform",
    summary: "Website + Dashboard",
    description:
      "A modern healthcare platform that enables patients to search doctors, schedule appointments, manage bookings, and communicate with healthcare providers through a clean and intuitive interface.",
    category: "Healthcare Platform",
    featured: true,
    thumbnail: "/projects/doctor-appointment/thumbnail.webp",
    accent: "#22C55E",
    accentGlow: "rgba(34, 197, 94, 0.35)",
    mockupType: "laptop-light",
    caseStudy: {
      overview:
        "Doctor Appointment Platform is a healthcare booking experience connecting patients and doctors with transparent schedules and streamlined communication.",
      problem:
        "Patients struggled to find relevant doctors, compare availability, and complete booking steps without confusion.",
      solution:
        "We designed a task-driven experience with specialty filters, time-slot clarity, and reduced booking steps to improve completion and trust.",
      features: [
        "Doctor discovery and filtering",
        "Appointment booking workflow",
        "Patient booking management",
        "Communication-ready dashboard",
      ],
      techStack: ["Web UX", "Dashboard Design", "Accessibility", "Design QA"],
      screenshots: [
        "/projects/doctor-appointment/thumbnail.webp",
        "/projects/doctor-appointment/thumbnail.webp",
      ],
    },
  },
  {
    id: "autoworld",
    slug: "autoworld",
    dribbbleUrl:
      "https://dribbble.com/shots/25993310-Autoworld-Car-Sell-Application-Website-Design",
    title: "AutoWorld",
    summary: "Website & Mobile App",
    description:
      "A complete vehicle marketplace that allows users to explore, compare, finance, and purchase new or used vehicles with an intuitive browsing experience.",
    category: "Automotive Platform",
    featured: true,
    thumbnail: "/projects/autoworld/thumbnail.webp",
    accent: "#7C3AED",
    accentGlow: "rgba(124, 58, 237, 0.35)",
    mockupType: "laptop-light",
    caseStudy: {
      overview:
        "AutoWorld is a vehicle marketplace that combines browsing, comparison, and financing touchpoints for faster buyer decision-making.",
      problem:
        "Vehicle buyers had to switch between multiple sites for discovery, details, and financing, creating drop-offs across the journey.",
      solution:
        "We unified discovery, comparison, and purchase preparation into one coherent flow with rich vehicle detail hierarchy and clear call-to-actions.",
      features: [
        "Vehicle listing and comparison",
        "Financing and purchase paths",
        "Rich filter and search controls",
        "Mobile and desktop optimized browsing",
      ],
      techStack: ["Product UX", "Component Library", "Responsive Design", "Conversion UX"],
      screenshots: [
        "/projects/autoworld/thumbnail.webp",
        "/projects/autoworld/thumbnail.webp",
      ],
    },
    reversed: true,
  },
  {
    id: "cabwire-ride-sharing-app",
    slug: "cabwire-ride-sharing-app",
    dribbbleUrl: "",
    title: "Cabwire Ride Sharing App",
    summary: "Mobile Application",
    description:
      "A modern ride booking application focused on fast transportation, real-time tracking, and a clean user experience for passengers and drivers.",
    category: "Ride Sharing",
    featured: true,
    thumbnail: "/projects/cabwire/thumbnail.webp",
    accent: "#C9A227",
    accentGlow: "rgba(201, 162, 39, 0.35)",
    mockupType: "phones",
    caseStudy: {
      overview:
        "Cabwire is a ride-sharing product focused on reliable booking, real-time trip tracking, and intuitive passenger-driver coordination.",
      problem:
        "Users experienced uncertainty during booking and pickup, especially around status feedback and trip progress.",
      solution:
        "We designed a clean booking flow with progressive confirmation states and live tracking to reduce uncertainty from request to drop-off.",
      features: [
        "Fast ride request flow",
        "Live trip status and tracking",
        "Trip history and receipts",
        "Driver/passenger interaction states",
      ],
      techStack: ["Mobile Product Design", "Journey Mapping", "Microinteractions", "Usability Testing"],
      screenshots: ["/projects/cabwire/thumbnail.webp", "/projects/cabwire/thumbnail.webp"],
    },
  },
  {
    id: "mapc-ev-charging",
    slug: "mapc-ev-charging",
    dribbbleUrl: "https://dribbble.com/shots/26021946-MAPC-EV-CHARGING-APPLICATION",
    title: "MAPC EV Charging",
    summary: "Mobile Application",
    description:
      "An EV charging application that helps users locate charging stations, monitor charger availability, navigate to nearby stations, and manage charging sessions.",
    category: "Electric Vehicle",
    featured: true,
    thumbnail: "/projects/mapc/thumbnail.webp",
    accent: "#84CC16",
    accentGlow: "rgba(132, 204, 22, 0.35)",
    mockupType: "phone-blue",
    caseStudy: {
      overview:
        "MAPC EV Charging helps EV users discover nearby stations, verify charger availability, and manage charging sessions with confidence.",
      problem:
        "EV drivers often encountered charger uncertainty and fragmented station information, leading to route anxiety.",
      solution:
        "We created a location-first charging experience with clear availability visibility, guided navigation, and simplified session management.",
      features: [
        "Nearby charger discovery map",
        "Availability and status visibility",
        "Navigation to selected station",
        "Charging session management",
      ],
      techStack: ["Mobile UX", "Map Interaction Design", "Data Visualization", "Service Design"],
      screenshots: ["/projects/mapc/thumbnail.webp", "/projects/mapc/thumbnail.webp"],
    },
    reversed: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectCaseStudyHref(
  project: Pick<Project, "dribbbleUrl">
): string | null {
  const href = project.dribbbleUrl?.trim();
  return href ? href : null;
}

export function hasProjectCaseStudy(project: Pick<Project, "dribbbleUrl">): boolean {
  return Boolean(getProjectCaseStudyHref(project));
}
