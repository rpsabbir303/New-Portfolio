export const servicesContent = {
  label: "Services",
  headline: "Design Services That Transform Products Into Experiences",
  description:
    "I help startups and businesses create user-centered digital products through strategic design, research, and visual storytelling.",
  stats: [
    { value: "2+", label: "Years of Experience" },
    { value: "50+", label: "Projects Completed" },
  ],
  cta: { label: "Start a Project", href: "#contact" },
} as const;

export const serviceItems = [
  {
    id: "ui-ux",
    number: "01",
    title: "UI/UX Design",
    description:
      "Interfaces that feel intuitive from the first tap — crafted with precision typography, thoughtful spacing, and interaction patterns users love.",
  },
  {
    id: "product",
    number: "02",
    title: "Product Design",
    description:
      "End-to-end product thinking from concept to launch — aligning user needs, business goals, and scalable design systems.",
  },
  {
    id: "ux-research",
    number: "03",
    title: "UX Research",
    description:
      "Deep user insights through interviews, testing, and behavioral analysis — turning data into design decisions that actually matter.",
  },
  {
    id: "brand",
    number: "04",
    title: "Brand Identity",
    description:
      "Cohesive visual identities that tell your story — logos, color systems, and brand guidelines built to scale across every touchpoint.",
  },
] as const;
