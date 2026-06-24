"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  getSectionHref,
  navigateToSection,
  type NavSectionId,
} from "@/lib/navigation";

type SectionLinkProps = {
  sectionId: NavSectionId;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

/** Section navigation without active-state tracking (footer, CTAs). */
export function SectionLink({
  sectionId,
  label,
  className,
  onNavigate,
}: SectionLinkProps) {
  const pathname = usePathname();
  const href = getSectionHref(sectionId, pathname);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/" && href.startsWith("#")) {
      event.preventDefault();
      navigateToSection(sectionId);
      onNavigate?.();
      return;
    }

    if (sectionId === "home" && pathname === "/") {
      event.preventDefault();
      navigateToSection("home");
      onNavigate?.();
      return;
    }

    onNavigate?.();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "text-sm text-neutral-400 transition-colors hover:text-white",
        className
      )}
    >
      {label}
    </Link>
  );
}
