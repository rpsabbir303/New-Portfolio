"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { resumeHero } from "@/data/resume";
import { Container } from "@/components/ui/Container";
import { ContactToast } from "@/components/contact/ContactToast";
import {
  BehanceIcon,
  DribbbleIcon,
  LinkedInIcon,
} from "@/components/ui/SocialIcons";
import { useResumePdfDownload } from "@/hooks/useResumePdfDownload";
import { getSectionHref } from "@/lib/navigation";
import "@/components/footer/footer.css";

const FOOTER_SOCIAL = [
  {
    label: "LinkedIn",
    href: site.social.linkedin,
    Icon: LinkedInIcon,
  },
  {
    label: "Behance",
    href: site.social.behance,
    Icon: BehanceIcon,
  },
  {
    label: "Dribbble",
    href: site.social.dribbble,
    Icon: DribbbleIcon,
  },
] as const;

const CONTACT_CARDS = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    Icon: Mail,
  },
  {
    label: "Location",
    value: site.address,
    Icon: MapPin,
  },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phoneE164}`,
    Icon: Phone,
  },
] as const;

export function Footer() {
  const pathname = usePathname();
  const contactHref = getSectionHref("contact", pathname);
  const { loading, toast, dismissToast, handleDownload } = useResumePdfDownload();

  return (
    <footer className="site-footer">
      <div className="site-footer__bg" aria-hidden="true">
        <div className="site-footer__grid" />
        <div className="site-footer__glow site-footer__glow--top" />
        <div className="site-footer__glow site-footer__glow--left" />
        <div className="site-footer__glow site-footer__glow--right" />
      </div>

      <Container className="site-footer__inner">
        <section className="site-footer__section site-footer__split">
          <div className="site-footer__split-grid">
            <div className="site-footer__split-cta">
              <p className="site-footer__eyebrow">Let&apos;s collaborate</p>
              <h2 className="site-footer__headline">
                Let&apos;s Build Something Amazing Together
              </h2>
              <p className="site-footer__description">
                Whether you&apos;re launching a startup, redesigning a product,
                improving user experience, or building a digital platform,
                I&apos;d love to help bring your vision to life.
              </p>
              <div className="site-footer__actions">
                <Link
                  href={contactHref}
                  className="site-footer__btn site-footer__btn--primary"
                >
                  Hire Me
                </Link>
                <button
                  type="button"
                  className="site-footer__btn site-footer__btn--ghost"
                  onClick={handleDownload}
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <Loader2
                      size={16}
                      className="site-footer__btn-spinner"
                      aria-hidden
                    />
                  ) : (
                    <Download size={16} aria-hidden />
                  )}
                  <span>
                    {loading ? "Generating PDF..." : "Download Resume"}
                  </span>
                </button>
              </div>
            </div>

            <div className="site-footer__split-divider" aria-hidden="true" />

            <div
              className="site-footer__split-contact"
              aria-label="Contact information"
            >
              <div className="site-footer__cards">
                {CONTACT_CARDS.map((card) => {
                  const content = (
                    <>
                      <div className="site-footer__card-header">
                        <div className="site-footer__card-icon">
                          <card.Icon size={18} aria-hidden />
                        </div>
                        <p className="site-footer__card-label">{card.label}</p>
                      </div>
                      <p className="site-footer__card-value">{card.value}</p>
                    </>
                  );

                  if ("href" in card && card.href) {
                    return (
                      <a
                        key={card.label}
                        href={card.href}
                        className="site-footer__card"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <div key={card.label} className="site-footer__card">
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="site-footer__section" aria-label="Social links">
          <p className="site-footer__social-label">Connect with me</p>
          <div className="site-footer__social-grid">
            {FOOTER_SOCIAL.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__social-btn"
                aria-label={label}
              >
                <span className="site-footer__social-icon">
                  <Icon size={16} />
                </span>
                <span>{label}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="site-footer__section site-footer__signature">
          <h3 className="site-footer__signature-name">{resumeHero.name}</h3>
          <p className="site-footer__signature-role">{resumeHero.title}</p>
          <p className="site-footer__signature-tagline">
            Designing experiences that users love and businesses grow with.
          </p>
        </section>

        <div className="site-footer__bar">
          <p className="site-footer__copyright">
            &copy; {new Date().getFullYear()} {site.name} &bull; All Rights
            Reserved
          </p>
        </div>
      </Container>

      {toast ? (
        <ContactToast
          type={toast.type}
          title={toast.title}
          description={toast.description}
          visible
          onDismiss={dismissToast}
        />
      ) : null}
    </footer>
  );
}
