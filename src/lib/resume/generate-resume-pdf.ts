import { jsPDF } from "jspdf";
import {
  PDF_COLORS,
  PDF_FILENAME,
  PDF_SPACING,
  PDF_TYPOGRAPHY,
} from "@/lib/resume/pdf-constants";
import { registerPdfFonts } from "@/lib/resume/pdf-font-loader";
import { PdfLayoutEngine } from "@/lib/resume/pdf-layout-engine";
import {
  PDF_CERTIFICATION,
  PDF_CONTACTS,
  PDF_EDUCATION,
  PDF_EXPERIENCE,
  PDF_FEATURED_PROJECTS,
  PDF_HERO,
  PDF_SKILL_GROUPS,
  PDF_SUMMARY_LINES,
  PDF_TOOLS_LINE,
} from "@/lib/resume/pdf-resume-content";

function renderResume(layout: PdfLayoutEngine) {
  layout.fillPageWhite();

  layout.renderHeader({
    name: PDF_HERO.name,
    role: PDF_HERO.title,
    contacts: PDF_CONTACTS,
  });

  layout.beginSection(
    "Professional Summary",
    layout.measureSummaryLinesHeight(PDF_SUMMARY_LINES),
    true
  );

  for (const [index, line] of PDF_SUMMARY_LINES.entries()) {
    const isLast = index === PDF_SUMMARY_LINES.length - 1;
    layout.renderText(
      line,
      {
        fontSize: PDF_TYPOGRAPHY.body,
        color: PDF_COLORS.darkGray,
        lineHeight: PDF_TYPOGRAPHY.lineHeight,
      },
      { spaceAfter: isLast ? PDF_SPACING.xs : PDF_SPACING.xs }
    );
  }

  const firstRole = PDF_EXPERIENCE[0];
  layout.beginSection(
    "Experience",
    layout.measureExperienceRoleHeight(firstRole.bullets, false)
  );

  PDF_EXPERIENCE.forEach((role, index) => {
    layout.renderExperienceRole(
      role.company,
      role.title,
      role.period,
      role.bullets,
      { isLast: index === PDF_EXPERIENCE.length - 1 }
    );
  });

  const firstProject = PDF_FEATURED_PROJECTS[0];
  layout.beginSection(
    "Featured Projects",
    layout.measureProjectHeight({
      title: firstProject.title,
      category: firstProject.category,
      description: firstProject.description,
      responsibilities: firstProject.responsibilities,
      caseStudyHref: firstProject.caseStudyHref,
    })
  );

  for (const project of PDF_FEATURED_PROJECTS) {
    layout.renderProject({
      title: project.title,
      category: project.category,
      description: project.description,
      responsibilities: project.responsibilities,
      caseStudyHref: project.caseStudyHref,
    });
  }

  layout.beginSection(
    "Skills",
    layout.measureSkillCategoryHeight(PDF_SKILL_GROUPS[0])
  );
  layout.renderSkillCategories(PDF_SKILL_GROUPS, PDF_TOOLS_LINE);

  layout.beginSection(
    "Education",
    layout.measureEducationBlockHeight(PDF_EDUCATION.credentials)
  );
  layout.renderEducationBlock(
    PDF_EDUCATION.credentials,
    PDF_EDUCATION.institute
  );

  const certificationItems = [
    {
      title: PDF_CERTIFICATION.title,
      institute: PDF_CERTIFICATION.institute,
      year: PDF_CERTIFICATION.year,
    },
  ];

  layout.beginSection(
    "Certifications",
    layout.measureCertificationListHeight(certificationItems)
  );
  layout.renderCertificationList(certificationItems);

  layout.renderFooters();
  layout.assertNoOverflow();
}

export async function generateResumePdf(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  await registerPdfFonts(doc);
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
