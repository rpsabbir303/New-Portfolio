import { site } from "@/data/site";
import { projects, getProjectCaseStudyHref } from "@/data/projects";
import {
  OG_IMAGE,
  PERSON_SCHEMA,
  SITE_ALTERNATE_NAMES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/data/seo";

const sameAs = [
  site.social.linkedin,
  site.social.dribbble,
  site.social.behance,
  "https://rpsabbir303.framer.website",
];

export function JsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE_NAME,
    alternateName: [...PERSON_SCHEMA.alternateName],
    jobTitle: PERSON_SCHEMA.jobTitle,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}${OG_IMAGE.url}`,
    email: site.email,
    telephone: site.phoneE164,
    worksFor: PERSON_SCHEMA.worksFor,
    knowsAbout: [...PERSON_SCHEMA.knowsAbout],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressRegion: "Dhaka",
      addressCountry: "BD",
    },
    sameAs,
  };

  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAMES,
    url: SITE_URL,
    logo: `${SITE_URL}${OG_IMAGE.url}`,
    image: `${SITE_URL}${OG_IMAGE.url}`,
    description: SITE_DESCRIPTION,
    founder: { "@id": `${SITE_URL}/#person` },
    sameAs,
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_TITLE,
    alternateName: SITE_ALTERNATE_NAMES,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
    author: { "@id": `${SITE_URL}/#person` },
    about: { "@id": `${SITE_URL}/#person` },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, organization, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function PortfolioJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio Projects by MD Sabbir Ahmed",
    itemListElement: projects.map((project, index) => {
      const caseStudyHref = getProjectCaseStudyHref(project);
      const item: Record<string, unknown> = {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: caseStudyHref ?? `${SITE_URL}/portfolio#${project.id}`,
        creator: { "@id": `${SITE_URL}/#person` },
        genre: project.category,
      };

      if (project.thumbnail) {
        item.image = `${SITE_URL}${project.thumbnail}`;
      }

      return {
        "@type": "ListItem",
        position: index + 1,
        item,
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
