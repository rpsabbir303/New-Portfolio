"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Container } from "@/components/ui/Container";
import { NavLink } from "@/components/navigation/NavLink";
import { ActiveNavProvider } from "@/components/navigation/ActiveNavProvider";
import { HEADER_NAV_ITEMS, navigateToSection } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setOpen(false);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      event.preventDefault();
      navigateToSection("home");
    }
    closeMenu();
  };

  return (
    <ActiveNavProvider>
      <header className="glass-nav fixed top-0 left-0 right-0 z-50">
        <Container className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={handleLogoClick}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
              {site.name[0]}
            </div>
            <span className="font-display text-lg font-bold text-white">
              {site.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {HEADER_NAV_ITEMS.map((item) =>
              item.type === "section" ? (
                <NavLink key={item.id} sectionId={item.id} label={item.label} />
              ) : (
                <NavLink
                  key={item.id}
                  href={item.href}
                  label={item.label}
                  activeOverride={pathname === item.href}
                />
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <SocialLinks variant="header" />
            <Button href="#contact" className="!px-5 !py-2.5 text-xs">
              Hire Me
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </Container>

        <div
          className={cn(
            "overflow-hidden border-t border-white/5 bg-black/95 transition-all duration-300 lg:hidden",
            open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <Container className="py-4">
            <nav className="flex flex-col gap-1">
              {HEADER_NAV_ITEMS.map((item) =>
                item.type === "section" ? (
                  <NavLink
                    key={item.id}
                    sectionId={item.id}
                    label={item.label}
                    showIndicator={false}
                    onNavigate={closeMenu}
                    className={cn(
                      "w-full rounded-lg px-3 py-2.5 !items-start",
                      "hover:bg-white/5"
                    )}
                  />
                ) : (
                  <NavLink
                    key={item.id}
                    href={item.href}
                    label={item.label}
                    activeOverride={pathname === item.href}
                    showIndicator={false}
                    onNavigate={closeMenu}
                    className={cn(
                      "w-full rounded-lg px-3 py-2.5 !items-start",
                      "hover:bg-white/5"
                    )}
                  />
                )
              )}
              <div className="mt-4 border-t border-white/5 pt-4">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Contact
                </p>
                <ul className="space-y-2.5 px-3 text-sm text-neutral-400">
                  <li className="flex items-center gap-2.5">
                    <Phone size={14} className="shrink-0 text-accent" />
                    <a href={`tel:${site.phoneE164}`} className="hover:text-white">
                      {site.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Mail size={14} className="shrink-0 text-accent" />
                    <a href={`mailto:${site.email}`} className="hover:text-white">
                      {site.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
                    <span>{site.address}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 border-t border-white/5 pt-4">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Connect
                </p>
                <SocialLinks variant="header" className="px-3" />
              </div>
              <Button
                href="#contact"
                className="mt-4 w-full"
                onNavigate={closeMenu}
              >
                Hire Me
              </Button>
            </nav>
          </Container>
        </div>
      </header>
    </ActiveNavProvider>
  );
}
