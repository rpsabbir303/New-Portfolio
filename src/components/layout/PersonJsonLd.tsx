import { site } from "@/data/site";

export function PersonJsonLd() {
  const siteUrl = "https://sabbirahmed-seven.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: site.name,
    jobTitle: site.role,
    url: siteUrl,
    image: `${siteUrl}/og-image.png`,
    email: site.email,
    telephone: site.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: [site.social.linkedin, site.social.dribbble, site.social.behance],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: site.email,
      telephone: site.phoneE164,
      areaServed: "BD",
      availableLanguage: ["English", "Bengali"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
