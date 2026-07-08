export const SITE_URL = "https://sabbirahmeduiux.vercel.app";

export const SITE_NAME = "MD Sabbir Ahmed";

export const SITE_LANGUAGE = "en-US";

export const THEME_COLOR = "#000000";

export const BACKGROUND_COLOR = "#000000";

export const SITE_TITLE =
  "MD Sabbir Ahmed | UI/UX Designer & Product Designer Portfolio";

export const SITE_DESCRIPTION =
  "MD Sabbir Ahmed (rpsabbir303) is a UI/UX Designer and Product Designer from Bangladesh with 3+ years of experience creating modern mobile apps, SaaS platforms, dashboards, and web applications.";

export const SITE_KEYWORDS = [
  "rpsabbir303",
  "Sabbir Ahmed",
  "MD Sabbir Ahmed",
  "UI UX Designer",
  "Product Designer",
  "Bangladesh",
  "UI UX Portfolio",
  "Figma Designer",
  "Dashboard Designer",
  "SaaS Designer",
  "UX Research",
  "Mobile App Designer",
  "Sabbir UI UX Designer",
  "UI UX Designer Bangladesh",
  "Product Designer Bangladesh",
  "UX Designer Portfolio",
  "Product Designer Portfolio",
  "UI Designer Portfolio",
  "Figma Expert",
  "UX Researcher",
] as const;

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "MD Sabbir Ahmed — UI/UX Designer & Product Designer Portfolio",
} as const;

export const SITE_ALTERNATE_NAMES = [
  "sabbirahmeduiux",
  "Sabbir Ahmed Portfolio",
  "MD Sabbir Ahmed Portfolio",
];

export const PERSON_SCHEMA = {
  alternateName: [
    "Sabbir Ahmed",
    "MD. Sabbir Ahmed",
    "rpsabbir303",
    "sabbirahmeduiux",
  ],
  jobTitle: "UI/UX Designer & Product Designer",
  worksFor: {
    "@type": "Organization",
    name: "SparkTech Agency",
  },
  knowsAbout: [
    "UI Design",
    "UX Design",
    "Product Design",
    "Mobile App Design",
    "Dashboard Design",
    "SaaS Product Design",
    "UX Research",
    "Wireframing",
    "Prototyping",
    "Design Systems",
    "Figma",
  ],
} as const;

export const SITEMAP_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/resume", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
];

export function buildOpenGraph(
  title: string,
  description: string,
  path: string
) {
  return {
    title,
    description,
    url: path,
    siteName: SITE_NAME,
    type: "website" as const,
    locale: "en_US",
    images: [OG_IMAGE],
  };
}

export function buildTwitter(title: string, description: string) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [OG_IMAGE.url],
  };
}

export function buildAlternates(path: string) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    canonical: path,
    languages: {
      [SITE_LANGUAGE]: url,
      "x-default": url,
    },
  };
}
