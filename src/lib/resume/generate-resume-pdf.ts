import { jsPDF } from "jspdf";
import {
  resumeAchievements,
  resumeCertification,
  resumeEducation,
  resumeFeaturedProjects,
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

const { accent, black, gray } = PDF_COLORS;

export async function generateResumePdf(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const layout = new PdfLayoutEngine(doc);
  let sectionIndex = 0;

  const nextSection = (title: string) => {
    layout.renderSectionHeading(title, sectionIndex === 0);
    sectionIndex += 1;
  };

  layout.renderText(resumeHero.name, {
    fontSize: PDF_TYPOGRAPHY.name,
    fontStyle: "bold",
    color: black,
  }, { spaceAfter: PDF_SPACING.gap12 });

  layout.renderText(resumeHero.title, {
    fontSize: PDF_TYPOGRAPHY.role,
    color: accent,
  }, { spaceAfter: PDF_SPACING.gap8 });

  layout.renderText(resumeHero.position, {
    fontSize: PDF_TYPOGRAPHY.subtitle,
    color: gray,
  }, { spaceAfter: PDF_SPACING.gap12 });

  layout.renderText(
    `${site.email}  |  ${site.phone}  |  ${site.address}`,
    { fontSize: PDF_TYPOGRAPHY.subtitle, color: gray },
    { spaceAfter: PDF_SPACING.sectionPadding }
  );

  nextSection("Professional Summary");
  layout.renderText(resumeSummary.text, { fontSize: PDF_TYPOGRAPHY.body, color: black });
  layout.renderText(resumeSummary.text2, { fontSize: PDF_TYPOGRAPHY.body, color: black });
  layout.renderText(`Career Goal: ${resumeSummary.goal}`, {
    fontSize: PDF_TYPOGRAPHY.body,
    color: black,
  }, { spaceAfter: PDF_SPACING.gap16 });

  nextSection("Contact Information");
  for (const item of resumeProfileInfo) {
    layout.renderLabeledField(item.label, item.value);
  }

  nextSection("Experience");
  for (const item of resumeTimeline) {
    layout.renderText(item.year, {
      fontSize: PDF_TYPOGRAPHY.label,
      fontStyle: "bold",
      color: accent,
    }, { spaceAfter: PDF_SPACING.gap8 });
    layout.renderText(item.title, {
      fontSize: PDF_TYPOGRAPHY.label,
      fontStyle: "bold",
      color: black,
    }, { spaceAfter: PDF_SPACING.gap8 });
    layout.renderText(item.description, {
      fontSize: PDF_TYPOGRAPHY.bodySmall,
      color: gray,
    }, { spaceAfter: PDF_SPACING.gap24 });
  }

  nextSection("Skills & Expertise");
  for (const group of resumeSkills) {
    layout.renderText(group.category, {
      fontSize: PDF_TYPOGRAPHY.label,
      fontStyle: "bold",
      color: black,
    }, { spaceAfter: PDF_SPACING.gap8 });
    layout.renderText(group.items.join(" • "), {
      fontSize: PDF_TYPOGRAPHY.bodySmall,
      color: gray,
    }, { spaceAfter: PDF_SPACING.gap16 });
  }

  nextSection("Tools & Technologies");
  layout.renderText(
    resumeTools.map((tool) => tool.name).join(" • "),
    { fontSize: PDF_TYPOGRAPHY.bodySmall, color: gray },
    { spaceAfter: PDF_SPACING.gap16 }
  );

  nextSection("Featured Projects");
  resumeFeaturedProjects.forEach((project, index) => {
    layout.renderProjectBlock(
      project.name,
      project.category,
      project.description,
      index < resumeFeaturedProjects.length - 1
    );
  });

  nextSection("Achievements");
  layout.renderText(
    resumeAchievements
      .map((item) => `${item.value}${item.suffix} ${item.label}`)
      .join("  •  "),
    { fontSize: PDF_TYPOGRAPHY.body, color: black },
    { spaceAfter: PDF_SPACING.gap16 }
  );

  nextSection("Education");
  layout.renderText(resumeEducation.institute, {
    fontSize: PDF_TYPOGRAPHY.body,
    fontStyle: "bold",
    color: black,
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
  for (const link of resumeSocialLinks) {
    const display =
      "href" in link && link.href
        ? `${link.value}\n${link.href}`
        : link.value;
    layout.renderLabeledField(link.label, display);
  }

  layout.renderFooters();
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
