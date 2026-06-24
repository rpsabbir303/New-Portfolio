"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isNavSectionId, navigateToSection, resolveHashHref } from "@/lib/navigation";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
  external,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const resolvedHref = external ? href : resolveHashHref(href, pathname);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      !external &&
      pathname === "/" &&
      href.startsWith("#") &&
      isNavSectionId(href.slice(1))
    ) {
      event.preventDefault();
      navigateToSection(href.slice(1));
    }
  };

  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      ref={ref}
      href={resolvedHref}
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "sp-magnetic-btn",
        variant === "primary" ? "sp-magnetic-btn--primary" : "sp-magnetic-btn--ghost",
        className
      )}
      {...linkProps}
    >
      <span>{children}</span>
      {variant === "primary" ? <ArrowRight size={16} aria-hidden /> : null}
    </Link>
  );
}
