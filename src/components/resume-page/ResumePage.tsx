"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { MockupVisual } from "@/components/MockupVisual";
import { AboutToolIcon } from "@/components/about/ToolIcons";
import { ResumeActions } from "@/components/resume-page/ResumeActions";
import { ResumePdfTemplate } from "@/components/resume-page/ResumePdfTemplate";
import {
  resumeAchievements,
  resumeFeaturedProjects,
  resumeHero,
  resumeProfileInfo,
  resumeSkills,
  resumeSummary,
  resumeTestimonials,
  resumeTimeline,
  resumeTools,
} from "@/data/resume";
import "@/components/resume-page/resume-page.css";

function AnimatedCounter({
  end,
  suffix,
}: {
  end: number;
  suffix: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let mounted = true;
    let frame = 0;
    const durationMs = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(end * eased);
      if (mounted) setValue(next);
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      mounted = false;
      window.cancelAnimationFrame(frame);
    };
  }, [end]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export function ResumePage() {
  return (
    <main className="resume-page">
      <section className="resume-hero">
        <Container>
          <SectionReveal>
            <span className="section-label">Premium Resume</span>
            <h1 className="resume-hero__name">{resumeHero.name}</h1>
            <p className="resume-hero__title">{resumeHero.title}</p>
            <p className="resume-hero__position">{resumeHero.position}</p>
            <p className="resume-hero__intro">{resumeHero.intro}</p>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <div className="resume-hero__stats">
              {resumeHero.stats.map((item) => (
                <article key={item.label} className="resume-stat-card">
                  <p className="resume-stat-card__value">{item.value}</p>
                  <p className="resume-stat-card__label">{item.label}</p>
                </article>
              ))}
            </div>
            <ResumeActions mode="hero" className="resume-hero__actions-wrap" />
          </SectionReveal>
        </Container>
      </section>

      <section className="resume-section">
        <Container>
          <SectionReveal>
            <span className="section-label">Professional Summary</span>
            <div className="resume-summary-card">
              <p>{resumeSummary.text}</p>
              <p>{resumeSummary.text2}</p>
              <p className="resume-summary-card__goal">My goal is simple: {resumeSummary.goal}</p>
            </div>
          </SectionReveal>
        </Container>
      </section>

      <section className="resume-section">
        <Container>
          <SectionReveal>
            <span className="section-label">Quick Profile</span>
            <div className="resume-profile-grid">
              {resumeProfileInfo.map((item) => (
                <article key={item.label} className="resume-profile-card">
                  <p className="resume-profile-card__label">{item.label}</p>
                  {"href" in item ? (
                    <a href={item.href} className="resume-profile-card__value">
                      {item.value}
                    </a>
                  ) : (
                    <p className="resume-profile-card__value">{item.value}</p>
                  )}
                </article>
              ))}
            </div>
          </SectionReveal>
        </Container>
      </section>

      <section className="resume-section">
        <Container>
          <SectionReveal>
            <span className="section-label">Experience Timeline</span>
            <div className="resume-timeline">
              {resumeTimeline.map((item, index) => (
                <article key={item.year} className="resume-timeline__item">
                  <span className="resume-timeline__dot" aria-hidden />
                  <div className="resume-timeline__content">
                    <p className="resume-timeline__year">{item.year}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  {index < resumeTimeline.length - 1 ? (
                    <span className="resume-timeline__line" aria-hidden />
                  ) : null}
                </article>
              ))}
            </div>
          </SectionReveal>
        </Container>
      </section>

      <section className="resume-section">
        <Container>
          <SectionReveal>
            <span className="section-label">Skills & Expertise</span>
            <div className="resume-skill-cards">
              {resumeSkills.map((group) => (
                <article key={group.category} className="resume-card resume-card--skill">
                  <h3>{group.category}</h3>
                  <ul className="resume-highlights">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </SectionReveal>
        </Container>
      </section>

      <section className="resume-section">
        <Container>
          <SectionReveal>
            <span className="section-label">Tools & Software</span>
            <div className="resume-tools-grid">
              {resumeTools.map((tool) => (
                <article key={tool.name} className="resume-tool-card">
                  <span className="resume-tool-card__icon">
                    <AboutToolIcon id={tool.id} size={36} />
                  </span>
                  <p>{tool.name}</p>
                </article>
              ))}
            </div>
          </SectionReveal>
        </Container>
      </section>

      <section className="resume-section">
        <Container>
          <SectionReveal>
            <span className="section-label">Featured Projects</span>
            <div className="resume-featured-grid">
              {resumeFeaturedProjects.map((project) => (
                <article key={project.name} className="resume-featured-card">
                  <div className="resume-featured-card__media">
                    <MockupVisual type={project.mockupType} accent={project.accent} />
                  </div>
                  <div className="resume-featured-card__body">
                    <p className="resume-featured-card__category">{project.category}</p>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <a href="/portfolio" className="resume-featured-card__link">
                      View Case Study
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </SectionReveal>
        </Container>
      </section>

      <section className="resume-section">
        <Container>
          <SectionReveal>
            <span className="section-label">Achievements</span>
            <div className="resume-achievements-grid">
              {resumeAchievements.map((item) => (
                <motion.article
                  key={item.label}
                  className="resume-achievement-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45 }}
                >
                  <p className="resume-achievement-card__value">
                    <AnimatedCounter end={item.value} suffix={item.suffix} />
                  </p>
                  <p className="resume-achievement-card__label">{item.label}</p>
                </motion.article>
              ))}
            </div>
          </SectionReveal>
        </Container>
      </section>

      <section className="resume-section">
        <Container>
          <SectionReveal>
            <span className="section-label">Testimonials</span>
            <div className="resume-testimonials-grid">
              {resumeTestimonials.map((quote) => (
                <article key={quote} className="resume-testimonial-card">
                  <p>&quot;{quote}&quot;</p>
                </article>
              ))}
            </div>
          </SectionReveal>
        </Container>
      </section>

      <section className="resume-section">
        <Container>
          <SectionReveal>
            <div className="resume-download-panel">
              <h2>Download My Resume</h2>
              <p>
                Get a complete overview of my experience, skills, projects, and
                achievements.
              </p>
              <ResumeActions mode="download" className="resume-download-panel__actions" />
              <p className="resume-download-panel__meta">Updated June 2026</p>
            </div>
          </SectionReveal>
        </Container>
      </section>

      <section className="resume-cta">
        <Container>
          <SectionReveal>
            <div className="resume-cta__inner">
              <h2>Let&apos;s Build Something Amazing Together</h2>
              <p>
                Available for UI/UX Design, Product Design, Design Systems,
                Mobile Applications, SaaS Platforms, and Startup Product
                Development.
              </p>
              <ResumeActions mode="cta" className="resume-cta__actions" />
            </div>
          </SectionReveal>
        </Container>
      </section>
      <ResumePdfTemplate />
    </main>
  );
}
