import type { Metadata } from "next";
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

const siteTitle = "Sabbir Ahmed — UI/UX Designer & Creative Developer";
const siteDescription =
  "Portfolio of Sabbir Ahmed, a UI/UX designer and creative developer crafting user-centered digital solutions for mobile apps, web platforms, and brands.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: site.name, url: `mailto:${site.email}` }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "en_US",
    emails: [site.email],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
        <PersonJsonLd />
        <HashScrollHandler />
        {children}
      </body>
    </html>
  );
}
