export const aboutStats = [
  { value: "2+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "100%", label: "Client Satisfaction" },
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
  { year: "2022", text: "Started UI/UX Journey" },
  { year: "2023", text: "Worked on Multiple Client Projects" },
  { year: "2024", text: "50+ Projects Delivered" },
  { year: "2025", text: "Building Premium Digital Products" },
  {
    year: "2026",
    text: "Senior UI/UX Designer at SparkTech Agency",
    detail:
      "Currently leading product design initiatives and delivering high-quality digital experiences for global clients.",
  },
];

export const aboutContent = {
  label: "About Me",
  headline: "Turning Ideas Into Meaningful Digital Experiences",
  description:
    "I'm Sabbir Ahmed — a UI/UX designer who lives at the intersection of aesthetics and usability. Every pixel I place is intentional: shaped by user research, refined through iteration, and built to make digital products feel effortless. I don't just design screens — I craft experiences people remember.",
};
