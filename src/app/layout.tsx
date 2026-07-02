import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { PersonJsonLd } from "@/components/layout/PersonJsonLd";
import { HashScrollHandler } from "@/components/layout/navigation/HashScrollHandler";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const siteUrl = "https://sabbirahmed-seven.vercel.app";

const siteTitle = "Sabbir Ahmed — UI/UX Designer & Creative Developer";
const siteDescription =
  "Portfolio of Sabbir Ahmed, a UI/UX designer and creative developer crafting user-centered digital solutions for mobile apps, web platforms, and brands.";

const siteKeywords = [
  "Sabbir Ahmed",
  "UI/UX designer",
  "UX designer",
  "product designer",
  "creative developer",
  "portfolio",
  "user-centered design",
  "mobile app design",
  "web design",
  "Dhaka Bangladesh",
  "Figma",
  "interface design",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: site.name, url: `mailto:${site.email}` }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: site.name,
    type: "website",
    locale: "en_US",
    emails: [site.email],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sabbir Ahmed Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/hero-profile.png", type: "image/png" }],
    apple: [{ url: "/hero-profile.png", type: "image/png" }],
  },
  other: {
    "contact:email": site.email,
    "contact:phone_number": site.phoneE164,
    "contact:locality": site.address,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-ambient font-sans text-foreground">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <PersonJsonLd />
        <HashScrollHandler />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
