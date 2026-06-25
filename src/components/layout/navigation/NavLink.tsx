"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getSectionHref,
  navigateToSection,
  type NavSectionId,
} from "@/lib/navigation";
import { useActiveNavContext } from "@/components/layout/navigation/ActiveNavProvider";

type NavLinkProps = {
  sectionId?: NavSectionId;
  href?: string;
  activeOverride?: boolean;
  label: string;
  className?: string;
  onNavigate?: () => void;
  showIndicator?: boolean;
};

export function NavLink({
  sectionId,
  href,
  activeOverride,
  label,
  className,
  onNavigate,
  showIndicator = true,
}: NavLinkProps) {
  const { isActive, pathname } = useActiveNavContext();
  const resolvedHref =
    sectionId !== undefined ? getSectionHref(sectionId, pathname) : href ?? "#";
  const active =
    activeOverride ?? (sectionId !== undefined ? isActive(sectionId) : false);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (sectionId !== undefined && pathname === "/" && resolvedHref.startsWith("#")) {
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
      href={resolvedHref}
      onClick={handleClick}
      className={cn(
        "nav-link relative inline-flex flex-col items-center transition-colors duration-200",
        active
          ? showIndicator
            ? "nav-link--active text-white"
            : "font-medium text-accent"
          : "text-neutral-400 hover:text-white",
        className
      )}
      aria-current={active ? "page" : undefined}
    >
      <span className="relative z-10 text-sm font-medium transition-colors duration-200">
        {label}
      </span>
      {showIndicator && active ? (
        <motion.span
          layoutId="nav-active-indicator"
          className="absolute -bottom-1.5 left-0 right-0 mx-auto h-0.5 w-full max-w-[2rem] rounded-full bg-accent"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      ) : null}
    </Link>
  );
}
