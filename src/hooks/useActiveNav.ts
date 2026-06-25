"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  NAV_ITEMS,
  type NavSectionId,
} from "@/lib/navigation";

export function useActiveNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<NavSectionId>(() => {
    if (typeof window === "undefined") return "home";
    const hash = window.location.hash.replace("#", "");
    if (hash && NAV_ITEMS.some((item) => item.id === hash)) {
      return hash as NavSectionId;
    }
    return "home";
  });

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionElements = NAV_ITEMS.map(({ id }) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = intersecting[0]?.target.id;
        if (top && NAV_ITEMS.some((item) => item.id === top)) {
          setActiveSection(top as NavSectionId);
        }
      },
      {
        rootMargin: "-42% 0px -48% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (sectionId: NavSectionId): boolean => {
    if (sectionId === "portfolio" && pathname === "/portfolio") return true;
    if (pathname === "/") return activeSection === sectionId;
    return false;
  };

  return { activeSection, isActive, pathname };
}
