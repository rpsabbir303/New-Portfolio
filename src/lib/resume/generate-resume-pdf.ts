import { jsPDF } from "jspdf";
import { projects } from "@/data/projects";
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
import { site } from "@/data/site";
import {
  PDF_COLORS,
  PDF_FILENAME,
  PDF_SPACING,
  PDF_TYPOGRAPHY,
} from "@/lib/resume/pdf-constants";
import { PdfLayoutEngine } from "@/lib/resume/pdf-layout-engine";

const { accent, primary, secondary, muted } = PDF_COLORS;

const PDF_PROFILE_LINE = resumeProfileInfo
  .filter((item) => item.label === "Company" || item.label === "Availability")
  .map((item) => item.value)
  .join(" · ");

const PDF_LINKS = resumeSocialLinks.filter(
  (link) => !["Email", "Phone", "Location"].includes(link.label)
);

const PDF_FEATURED_PROJECTS = projects.filter((project) => project.featured);

function renderResume(layout: PdfLayoutEngine) {
  layout.fillPageWhite();

  let sectionIndex = 0;
  const nextSection = (title: string) => {
    layout.renderSectionHeading(title, sectionIndex === 0);
    sectionIndex += 1;
  };

  layout.renderText(resumeHero.name, {
    fontSize: PDF_TYPOGRAPHY.name,
    fontStyle: "bold",
    color: accent,
  }, { spaceAfter: PDF_SPACING.gap12 });

  layout.renderText(resumeHero.title, {
    fontSize: PDF_TYPOGRAPHY.role,
    color: accent,
  }, { spaceAfter: PDF_SPACING.gap8 });

  layout.renderText(resumeHero.position, {
    fontSize: PDF_TYPOGRAPHY.subtitle,
    color: muted,
  }, { spaceAfter: PDF_SPACING.gap8 });

  if (PDF_PROFILE_LINE) {
    layout.renderText(PDF_PROFILE_LINE, {
      fontSize: PDF_TYPOGRAPHY.subtitle,
      color: muted,
    }, { spaceAfter: PDF_SPACING.gap12 });
  }

  layout.renderContactLine([
    { text: site.email, href: `mailto:${site.email}` },
    { text: site.phone, href: `tel:${site.phoneE164}` },
    { text: site.address },
  ]);

  nextSection("Professional Summary");
  layout.renderText(resumeSummary.text, {
    fontSize: PDF_TYPOGRAPHY.body,
    color: secondary,
  });
  layout.renderText(resumeSummary.text2, {
    fontSize: PDF_TYPOGRAPHY.body,
    color: secondary,
  });
  layout.renderText(`Career Goal: ${resumeSummary.goal}`, {
    fontSize: PDF_TYPOGRAPHY.body,
    color: secondary,
  }, { spaceAfter: PDF_SPACING.gap16 });

  nextSection("Experience");
  resumeTimeline.forEach((item, index) => {
    layout.renderExperienceItem(
      item.year,
      item.title,
      item.description,
      index === resumeTimeline.length - 1
    );
  });

  nextSection("Skills & Expertise");
  resumeSkills.forEach((group, index) => {
    layout.renderSkillGroup(
      group.category,
      [...group.items],
      index === resumeSkills.length - 1
    );
  });

  nextSection("Tools & Technologies");
  layout.renderText(
    resumeTools.map((tool) => tool.name).join(" • "),
    { fontSize: PDF_TYPOGRAPHY.bodySmall, color: secondary },
    { spaceAfter: PDF_SPACING.gap16 }
  );

  nextSection("Featured Projects");
  PDF_FEATURED_PROJECTS.forEach((project, index) => {
    layout.renderProjectBlock(
      project.title,
      project.category,
      project.summary || project.description,
      index === PDF_FEATURED_PROJECTS.length - 1
    );
  });

  nextSection("Achievements");
  layout.renderText(
    resumeAchievements
      .map((item) => `${item.value}${item.suffix} ${item.label}`)
      .join("  •  "),
    { fontSize: PDF_TYPOGRAPHY.body, color: secondary },
    { spaceAfter: PDF_SPACING.gap16 }
  );

  nextSection("Education");
  layout.renderText(resumeEducation.institute, {
    fontSize: PDF_TYPOGRAPHY.body,
    fontStyle: "bold",
    color: primary,
  }, { spaceAfter: PDF_SPACING.gap12 });
  for (const credential of resumeEducation.credentials) {
    layout.renderLabeledField(credential.title, credential.year);
  }

  nextSection("Certifications");
  layout.renderLabeledField(
    resumeCertification.title,
    `${resumeCertification.institute} — ${resumeCertification.year}`,
    PDF_SPACING.gap16
  );

  nextSection("Portfolio & Social Links");
  for (const link of PDF_LINKS) {
    const href = "href" in link ? link.href : undefined;
    layout.renderLabeledField(link.label, link.value, PDF_SPACING.listItem, href);
  }

  layout.renderFooters();
  layout.assertNoOverflow();
}

export async function generateResumePdf(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const layout = new PdfLayoutEngine(doc);
  renderResume(layout);
  return doc;
}

export async function downloadResumePdf(): Promise<void> {
  const doc = await generateResumePdf();
  doc.save(PDF_FILENAME);
}

export async function previewResumePdf(): Promise<void> {
  const doc = await generateResumePdf();
  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  const previewWindow = window.open(url, "_blank", "noopener,noreferrer");

  if (!previewWindow) {
    URL.revokeObjectURL(url);
    throw new Error(
      "Unable to open preview. Please allow popups and try again."
    );
  }

  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
