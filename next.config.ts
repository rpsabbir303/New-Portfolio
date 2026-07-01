import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["nodemailer"],
  images: {
    localPatterns: [
      {
        pathname: "/icons/**",
      },
      {
        pathname: "/projects/**",
      },
      {
        pathname: "/images/**",
      },
      {
        pathname: "/hero-profile.png",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
