export const aboutStats = [
  { value: "3+", yearsLabel: "Years", label: "UI/UX Design" },
  { value: "2+", yearsLabel: "Years", label: "Graphic Design" },
] as const;

export const aboutSkills = [
  "UI/UX Design",
  "Product Design",
  "Design Systems",
  "Wireframing",
  "Prototyping",
  "User Research",
  "Figma",
  "Framer",
] as const;

export const aboutTools = [
  { id: "figma", name: "Figma", color: "#A259FF" },
  { id: "xd", name: "Adobe XD", color: "#FF61F6" },
  { id: "photoshop", name: "Photoshop", color: "#31A8FF" },
  { id: "illustrator", name: "Illustrator", color: "#FF9A00" },
  { id: "miro", name: "Miro", color: "#FFD02F" },
  { id: "framer", name: "Framer", color: "#0055FF" },
] as const;

export const aboutTimeline: ReadonlyArray<{
  year: string;
  text: string;
  detail?: string;
}> = [
  { year: "2022", text: "Started Graphic Design Journey" },
  {
    year: "2023",
    text: "Worked on Branding, Social Media & Marketing Design Projects",
  },
  {
    year: "2024",
    text: "Transitioned into UI/UX Design and Mobile Product Design",
  },
  {
    year: "2025",
    text: "Completed 50+ Client Projects across SaaS, HRM, Booking, Healthcare, Automotive & Mobile Apps",
  },
  {
    year: "2026",
    text: "Senior UI/UX Designer at SparkTech Agency",
    detail:
      "Leading UI/UX design for global clients and building scalable digital products.",
  },
];

export const aboutContent = {
  label: "About Me",
  headline: "Turning Ideas Into Meaningful Digital Experiences",
  description:
    "I'm MD Sabbir Ahmed, a UI/UX Designer and Product Designer based in Bangladesh with 3+ years of experience crafting intuitive digital products and 2+ years in graphic design. I help startups and businesses transform ideas into user-friendly mobile apps, SaaS platforms, dashboards, and web experiences through research-driven design and scalable design systems.",
};
