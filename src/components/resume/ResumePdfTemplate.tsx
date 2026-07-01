import {
  resumeAchievements,
  resumeCertification,
  resumeEducation,
  resumeHero,
  resumeProfileInfo,
  resumeSkills,
  resumeSocialLinks,
  resumeSummary,
  resumeTimeline,
  resumeTools,
} from "@/data/resume";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import "@/components/resume/resume-pdf.css";

export const RESUME_PDF_TEMPLATE_ID = "resume-pdf-template";

const profileLine = resumeProfileInfo
  .filter((item) => item.label === "Company" || item.label === "Availability")
  .map((item) => item.value)
  .join(" · ");

const portfolioLinks = resumeSocialLinks.filter(
  (link) => !["Email", "Phone", "Location"].includes(link.label)
);

const featuredProjects = projects.filter((project) => project.featured);

export function ResumePdfTemplate() {
  return (
    <div
      id={RESUME_PDF_TEMPLATE_ID}
      className="resume-pdf-template"
      aria-hidden="true"
    >
      <div className="resume-pdf-template__page">
        <header>
          <h1 className="resume-pdf-template__name">{resumeHero.name}</h1>
          <p className="resume-pdf-template__title">{resumeHero.title}</p>
          <p className="resume-pdf-template__position">{resumeHero.position}</p>
          {profileLine ? (
            <p className="resume-pdf-template__profile-line">{profileLine}</p>
          ) : null}
          <p className="resume-pdf-template__contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {" | "}
            <a href={`tel:${site.phoneE164}`}>{site.phone}</a>
            {" | "}
            {site.address}
          </p>
        </header>

        <section className="resume-pdf-template__section">
          <h2 className="resume-pdf-template__heading">Professional Summary</h2>
          <p className="resume-pdf-template__paragraph">{resumeSummary.text}</p>
          <p className="resume-pdf-template__paragraph">{resumeSummary.text2}</p>
          <p className="resume-pdf-template__paragraph">
            Career Goal: {resumeSummary.goal}
          </p>
        </section>

        <section className="resume-pdf-template__section">
          <h2 className="resume-pdf-template__heading">Experience</h2>
          {resumeTimeline.map((item) => (
            <div key={item.year} className="resume-pdf-template__timeline-item">
              <div className="resume-pdf-template__timeline-header">
                <span className="resume-pdf-template__timeline-title">
                  {item.title}
                </span>
                <span className="resume-pdf-template__timeline-year">
                  {item.year}
                </span>
              </div>
              <p className="resume-pdf-template__timeline-desc">
                {item.description}
              </p>
            </div>
          ))}
        </section>

        <section className="resume-pdf-template__section">
          <h2 className="resume-pdf-template__heading">Skills & Expertise</h2>
          {resumeSkills.map((group) => (
            <div key={group.category} className="resume-pdf-template__skill-group">
              <p className="resume-pdf-template__skill-category">
                {group.category}
              </p>
              <p className="resume-pdf-template__skill-items">
                {group.items.join(" • ")}
              </p>
            </div>
          ))}
        </section>

        <section className="resume-pdf-template__section">
          <h2 className="resume-pdf-template__heading">Tools & Technologies</h2>
          <p className="resume-pdf-template__muted">
            {resumeTools.map((tool) => tool.name).join(" • ")}
          </p>
        </section>

        <section className="resume-pdf-template__section">
          <h2 className="resume-pdf-template__heading">Featured Projects</h2>
          <div className="resume-pdf-template__projects">
            {featuredProjects.map((project) => (
              <div key={project.id} className="resume-pdf-template__project">
                <p className="resume-pdf-template__project-name">
                  {project.title}
                </p>
                <p className="resume-pdf-template__project-category">
                  Category: {project.category}
                </p>
                <p className="resume-pdf-template__project-desc">
                  {project.summary || project.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="resume-pdf-template__section">
          <h2 className="resume-pdf-template__heading">Achievements</h2>
          <p className="resume-pdf-template__paragraph">
            {resumeAchievements
              .map((item) => `${item.value}${item.suffix} ${item.label}`)
              .join(" • ")}
          </p>
        </section>

        <section className="resume-pdf-template__section">
          <h2 className="resume-pdf-template__heading">Education</h2>
          <p className="resume-pdf-template__paragraph">
            {resumeEducation.institute}
          </p>
          {resumeEducation.credentials.map((credential) => (
            <div key={credential.title} className="resume-pdf-template__field">
              <span className="resume-pdf-template__label">
                {credential.title}:
              </span>
              <p className="resume-pdf-template__value">{credential.year}</p>
            </div>
          ))}
        </section>

        <section className="resume-pdf-template__section">
          <h2 className="resume-pdf-template__heading">Certifications</h2>
          <div className="resume-pdf-template__field">
            <span className="resume-pdf-template__label">
              {resumeCertification.title}:
            </span>
            <p className="resume-pdf-template__value">
              {resumeCertification.institute} — {resumeCertification.year}
            </p>
          </div>
        </section>

        <section className="resume-pdf-template__section">
          <h2 className="resume-pdf-template__heading">Portfolio & Social Links</h2>
          {portfolioLinks.map((link) => (
            <div key={link.label} className="resume-pdf-template__field">
              <span className="resume-pdf-template__label">{link.label}:</span>
              <p className="resume-pdf-template__value">
                {"href" in link && link.href ? (
                  <a href={link.href}>{link.value}</a>
                ) : (
                  link.value
                )}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
