"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  isNavSectionId,
  navigateToSection,
  resolveHashHref,
} from "@/lib/navigation";

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  showArrow?: boolean;
};

type ButtonLinkProps = ButtonBaseProps & {
  href: string;
  external?: boolean;
  type?: never;
  onClick?: never;
  onNavigate?: () => void;
};

type ButtonSubmitProps = ButtonBaseProps & {
  type: "submit" | "button";
  href?: never;
  external?: never;
  onClick?: () => void;
  onNavigate?: never;
};

type ButtonProps = ButtonLinkProps | ButtonSubmitProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all";

const variants = {
  primary: "btn-primary text-white",
  ghost: "border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10",
  outline: "btn-outline bg-transparent",
};

function buttonClass(variant: ButtonProps["variant"], className?: string) {
  return cn(base, variants[variant ?? "primary"], className);
}

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className, showArrow = true } = props;
  const pathname = usePathname();

  if ("type" in props && props.type) {
    return (
      <button
        type={props.type}
        onClick={props.onClick}
        className={buttonClass(variant, className)}
      >
        {children}
        {variant === "primary" && showArrow && (
          <ArrowRight size={16} className="opacity-80" />
        )}
      </button>
    );
  }

  const linkProps = props.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const resolvedHref = resolveHashHref(props.href, pathname);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      pathname === "/" &&
      props.href.startsWith("#") &&
      isNavSectionId(props.href.slice(1))
    ) {
      event.preventDefault();
      navigateToSection(props.href.slice(1));
      props.onNavigate?.();
      return;
    }

    props.onNavigate?.();
  };

  return (
    <Link
      href={resolvedHref}
      className={buttonClass(variant, className)}
      onClick={handleClick}
      {...linkProps}
    >
      {children}
      {variant === "primary" && showArrow && (
        <ArrowRight size={16} className="opacity-80" />
      )}
    </Link>
  );
}
