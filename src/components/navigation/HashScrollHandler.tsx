"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/navigation";

/**
 * Scrolls to hash targets after route changes (e.g. /portfolio → /#about).
 * Also handles deep links on /portfolio#project-id.
 */
export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const timer = window.setTimeout(() => {
      scrollToSection(hash);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
