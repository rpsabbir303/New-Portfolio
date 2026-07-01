import { Container } from "@/components/ui/Container";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ContactForm } from "@/components/contact/ContactForm";

export function Contact() {
  return (
    <section id="contact" className="section-y scroll-mt-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionReveal>
            <div className="space-y-8">
              <div>
                <span className="section-label">Contact</span>
                <h2 className="section-heading">
                  Let&apos;s Build Something Exceptional
                </h2>
                <p className="section-intro">
                  Have a project in mind? Share your details and I&apos;ll get
                  back to you with thoughtful next steps.
                </p>
              </div>

              <ul className="space-y-5">
                <li className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Phone</p>
                    <a
                      href={`tel:${site.phoneE164}`}
                      className="font-medium text-white hover:text-accent"
                    >
                      {site.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Email</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="font-medium text-white hover:text-accent"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Location</p>
                    <p className="font-medium text-white">{site.address}</p>
                  </div>
                </li>
              </ul>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Follow Me
                </p>
                <SocialLinks variant="contact" iconSize={18} />
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="surface-card rounded-3xl p-6 md:p-8">
              <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Get In Touch
              </h3>
              <ContactForm />
            </div>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
