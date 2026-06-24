/** Fixed header offset — matches scroll-mt-28 / scroll-padding-top (7rem). */
export const HEADER_SCROLL_OFFSET = 112;

export const SECTION_IDS = {
  home: "home",
  about: "about",
  services: "services",
  portfolio: "portfolio",
  contact: "contact",
} as const;

export type NavSectionId = keyof typeof SECTION_IDS;

export const NAV_ITEMS: ReadonlyArray<{ id: NavSectionId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export type HeaderNavItem =
  | { id: NavSectionId; label: string; type: "section" }
  | { id: "resume"; label: string; type: "route"; href: "/resume" };

export const HEADER_NAV_ITEMS: ReadonlyArray<HeaderNavItem> = [
  { id: "home", label: "Home", type: "section" },
  { id: "about", label: "About", type: "section" },
  { id: "portfolio", label: "Portfolio", type: "section" },
  { id: "resume", label: "Resume", type: "route", href: "/resume" },
  { id: "contact", label: "Contact", type: "section" },
];

export const FOOTER_NAV_ITEMS: ReadonlyArray<{ id: NavSectionId; label: string }> =
  [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

export function isNavSectionId(value: string): value is NavSectionId {
  return value in SECTION_IDS;
}

/**
 * Portfolio: scroll to #portfolio on homepage, open /portfolio elsewhere.
 * Other sections: in-page hash on /, /#section from other routes.
 */
export function getSectionHref(sectionId: NavSectionId, pathname: string): string {
  if (sectionId === "portfolio" && pathname !== "/") {
    return "/portfolio";
  }

  if (sectionId === "services") {
    return "/services";
  }

  const hash = `#${SECTION_IDS[sectionId]}`;
  return pathname === "/" ? hash : `/${hash}`;
}

export function scrollToSection(
  sectionId: string,
  behavior: ScrollBehavior = "smooth"
): boolean {
  const el = document.getElementById(sectionId);
  if (!el) return false;

  const top =
    el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET;

  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}

export function navigateToSection(sectionId: string): void {
  if (scrollToSection(sectionId)) {
    window.history.pushState(null, "", `#${sectionId}`);
  }
}

/** Resolve #section or /#section hrefs for the current route. */
export function resolveHashHref(href: string, pathname: string): string {
  if (!href.startsWith("#")) return href;

  const sectionId = href.slice(1);
  if (!isNavSectionId(sectionId)) return href;

  return getSectionHref(sectionId, pathname);
}
