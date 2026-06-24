import type { AboutToolIconId } from "@/components/about/ToolIcons";
import { site } from "@/data/site";

export const resumeHero = {
  name: "MD. Sabbir Ahmed",
  title: "Senior UI/UX Designer",
  position: "Senior UI/UX Designer at SparkTech Agency",
  intro:
    "Designing user-centered digital products, scalable design systems, and meaningful experiences that help businesses grow.",
  stats: [
    { value: "2+", label: "Years Experience" },
    { value: "50+", label: "Projects Delivered" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "Multiple", label: "Industries Served" },
  ],
} as const;

export const resumeSummary = {
  text: "I am a Senior UI/UX Designer with 2+ years of experience creating intuitive digital products across SaaS, E-commerce, Service Booking, Sports, HRM, and Mobile Applications.",
  text2:
    "I specialize in transforming business requirements into user-friendly experiences through research, wireframing, prototyping, design systems, and scalable product design.",
  goal: "Design products that users love and businesses grow from.",
} as const;

export const resumeProfileInfo = [
  { label: "Location", value: "Dhaka, Bangladesh" },
  { label: "Role", value: "Senior UI/UX Designer" },
  { label: "Company", value: "SparkTech Agency" },
  { label: "Availability", value: "Available for Freelance Projects" },
  { label: "Email", value: "rpsabbir.ahmed@gmail.com", href: "mailto:rpsabbir.ahmed@gmail.com" },
  {
    label: "Portfolio",
    value: "Portfolio Website",
    href: "https://rpsabbir303.framer.website",
  },
] as const;

export const resumeTimeline = [
  {
    year: "2022",
    title: "Started UI/UX Design Journey",
    description:
      "Learned Figma, User Experience Principles, and Product Thinking.",
  },
  {
    year: "2023",
    title: "Worked on Multiple Client Projects",
    description:
      "Delivered designs for startups, booking systems, dashboards, and mobile applications.",
  },
  {
    year: "2024",
    title: "50+ Projects Delivered",
    description:
      "Successfully completed projects across different industries while improving design quality and workflow efficiency.",
  },
  {
    year: "2025",
    title: "Building Premium Digital Products",
    description:
      "Focused on scalable design systems, user research, and advanced product design processes.",
  },
  {
    year: "2026",
    title: "Senior UI/UX Designer at SparkTech Agency",
    description:
      "Currently leading product design initiatives and delivering high-quality digital experiences for global clients.",
  },
] as const;

export const resumeSkills = [
  {
    category: "Design",
    items: [
      "UI Design",
      "UX Design",
      "Product Design",
      "Mobile App Design",
      "Dashboard Design",
    ],
  },
  {
    category: "Research",
    items: [
      "User Research",
      "Competitive Analysis",
      "User Journey Mapping",
      "Information Architecture",
    ],
  },
  {
    category: "Product",
    items: [
      "Design Systems",
      "Wireframing",
      "Prototyping",
      "Interaction Design",
    ],
  },
  {
    category: "Collaboration",
    items: [
      "Developer Handoff",
      "Agile Workflow",
      "Product Strategy",
      "Client Communication",
    ],
  },
] as const;

export const resumeTools: ReadonlyArray<{ id: AboutToolIconId; name: string }> = [
  { id: "figma", name: "Figma" },
  { id: "xd", name: "Adobe XD" },
  { id: "photoshop", name: "Photoshop" },
  { id: "illustrator", name: "Illustrator" },
  { id: "miro", name: "Miro" },
  { id: "framer", name: "Framer" },
];

export const resumeFeaturedProjects = [
  {
    name: "Food Delivery App",
    category: "Mobile App",
    description:
      "Instant ordering flow with real-time status and streamlined checkout.",
    mockupType: "phones",
    accent: "#ff006e",
  },
  {
    name: "Sports Booking Platform",
    category: "Booking Platform",
    description:
      "Court booking, event flows, and tournament engagement experiences.",
    mockupType: "phone-blue",
    accent: "#2563eb",
  },
  {
    name: "HRM SaaS Dashboard",
    category: "SaaS",
    description:
      "Employee self-service, attendance, and management experiences.",
    mockupType: "laptop-red",
    accent: "#dc2626",
  },
  {
    name: "Service Booking Platform",
    category: "Web App",
    description:
      "Flexible booking UX with high-conversion customer journeys.",
    mockupType: "laptop-light",
    accent: "#0ea5e9",
  },
  {
    name: "E-commerce Experience",
    category: "E-commerce",
    description:
      "Product discovery, personalization, and checkout built for conversion.",
    mockupType: "website-collage",
    accent: "#f59e0b",
  },
  {
    name: "Parking Booking System",
    category: "Utility App",
    description:
      "Location-first booking flow with clear availability and pricing.",
    mockupType: "phone-pedestal",
    accent: "#7c3aed",
  },
] as const;

export const resumeAchievements = [
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
] as const;

export const resumeTestimonials = [
  "Sabbir consistently delivered high-quality design work with attention to every detail.",
  "Great communication, excellent UX thinking, and strong collaboration skills.",
  "One of the most reliable designers we've worked with.",
] as const;

export const resumeEducation = {
  institute: "Jamia Husainia Islamia Arjabad Madrasa",
  credentials: [
    { title: "Dakhil (Secondary)", year: "2015" },
    { title: "Alim (Higher Secondary)", year: "2022" },
  ],
} as const;

export const resumeCertification = {
  title: "UI/UX Designer",
  institute: "Shikhbe Shobai",
  year: "2024",
} as const;

export const resumeSocialLinks = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: `tel:${site.phoneE164}` },
  { label: "Location", value: site.address },
  {
    label: "Portfolio",
    value: "rpsabbir303.framer.website",
    href: "https://rpsabbir303.framer.website",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rpsabbir303",
    href: site.social.linkedin,
  },
  {
    label: "Behance",
    value: "behance.net/rpsabbir303",
    href: site.social.behance,
  },
  {
    label: "Dribbble",
    value: "dribbble.com/rpsabbir303",
    href: site.social.dribbble,
  },
] as const;
