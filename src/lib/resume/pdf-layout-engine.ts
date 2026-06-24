import type { jsPDF } from "jspdf";
import {
  PDF_COLORS,
  PDF_CONTENT_WIDTH,
  PDF_LAYOUT,
  PDF_SPACING,
  PDF_TYPOGRAPHY,
  pdfLineHeightMm,
} from "@/lib/resume/pdf-constants";

type Rgb = readonly [number, number, number];

export type PdfTextStyle = {
  fontSize: number;
  fontStyle?: "normal" | "bold";
  color?: Rgb;
  lineHeight?: number;
};

type RenderOptions = {
  spaceAfter?: number;
  x?: number;
  maxWidth?: number;
};

const { margin, pageWidth, footerY, maxContentY } = PDF_LAYOUT;
const { accent, black, lightGray } = PDF_COLORS;

export class PdfLayoutEngine {
  private y = margin;

  constructor(private readonly doc: jsPDF) {}

  get cursorY() {
    return this.y;
  }

  private lineStep(fontSize: number, factor?: number) {
    return pdfLineHeightMm(fontSize, factor ?? PDF_TYPOGRAPHY.lineHeight);
  }

  private applyStyle(style: PdfTextStyle) {
    this.doc.setFont("helvetica", style.fontStyle ?? "normal");
    this.doc.setFontSize(style.fontSize);
    this.doc.setTextColor(...(style.color ?? black));
  }

  private measureLines(
    text: string,
    style: PdfTextStyle,
    maxWidth: number
  ): string[] {
    this.applyStyle(style);
    return this.doc.splitTextToSize(text, maxWidth);
  }

  ensureSpace(needed: number) {
    if (this.y + needed > maxContentY) {
      this.doc.addPage();
      this.y = margin;
    }
  }

  addSpace(mm: number) {
    this.y += mm;
  }

  renderText(text: string, style: PdfTextStyle, options: RenderOptions = {}) {
    const paragraphs = text.split("\n").filter((part) => part.length > 0);
    const parts = paragraphs.length > 0 ? paragraphs : [text];

    parts.forEach((paragraph, index) => {
      const isLast = index === parts.length - 1;
      const spaceAfter = isLast
        ? (options.spaceAfter ?? PDF_SPACING.paragraph)
        : PDF_SPACING.gap8;
      const x = options.x ?? margin;
      const maxWidth = options.maxWidth ?? PDF_CONTENT_WIDTH;
      const factor = style.lineHeight ?? PDF_TYPOGRAPHY.lineHeight;

      const lines = this.measureLines(paragraph, style, maxWidth);
      const step = this.lineStep(style.fontSize, factor);
      const totalHeight = lines.length * step + spaceAfter;

      this.ensureSpace(totalHeight);
      this.applyStyle(style);

      for (const line of lines) {
        this.doc.text(line, x, this.y);
        this.y += step;
      }

      this.y += spaceAfter;
    });
  }

  renderSectionHeading(text: string, isFirst = false) {
    if (!isFirst) {
      this.addSpace(PDF_SPACING.sectionPadding);
    }

    const headingStep = this.lineStep(PDF_TYPOGRAPHY.sectionHeading);
    const ruleGap = 1.5;
    const totalHeight =
      headingStep + ruleGap + PDF_SPACING.headingRule;

    this.ensureSpace(totalHeight);

    this.applyStyle({
      fontSize: PDF_TYPOGRAPHY.sectionHeading,
      fontStyle: "bold",
      color: accent,
    });
    this.doc.text(text.toUpperCase(), margin, this.y);
    this.y += headingStep + ruleGap;

    this.doc.setDrawColor(...accent);
    this.doc.setLineWidth(0.35);
    this.doc.line(margin, this.y, margin + PDF_CONTENT_WIDTH, this.y);
    this.y += PDF_SPACING.headingRule;
  }

  renderLabeledField(
    label: string,
    value: string,
    spaceAfter = PDF_SPACING.listItem
  ) {
    this.renderText(`${label}:`, {
      fontSize: PDF_TYPOGRAPHY.label,
      fontStyle: "bold",
      color: black,
    }, { spaceAfter: PDF_SPACING.gap8 });

    this.renderText(value, {
      fontSize: PDF_TYPOGRAPHY.bodySmall,
      color: PDF_COLORS.gray,
    }, { spaceAfter });
  }

  renderDivider() {
    this.ensureSpace(PDF_SPACING.divider);
    this.doc.setDrawColor(...PDF_COLORS.divider);
    this.doc.setLineWidth(0.2);
    this.doc.line(margin, this.y, margin + PDF_CONTENT_WIDTH, this.y);
    this.y += PDF_SPACING.divider;
  }

  renderProjectBlock(
    name: string,
    category: string,
    description: string,
    showDividerAfter: boolean
  ) {
    this.renderText(name, {
      fontSize: PDF_TYPOGRAPHY.projectTitle,
      fontStyle: "bold",
      color: black,
    }, { spaceAfter: PDF_SPACING.gap8 });

    this.renderText(`Category: ${category}`, {
      fontSize: PDF_TYPOGRAPHY.projectCategory,
      color: PDF_COLORS.accentPink,
    }, { spaceAfter: PDF_SPACING.gap8 });

    this.renderText(description, {
      fontSize: PDF_TYPOGRAPHY.projectDescription,
      color: PDF_COLORS.gray,
      lineHeight: PDF_TYPOGRAPHY.lineHeight,
    }, {
      spaceAfter: showDividerAfter ? PDF_SPACING.gap24 : PDF_SPACING.paragraph,
    });

    if (showDividerAfter) {
      this.renderDivider();
    }
  }

  renderFooters() {
    const totalPages = this.doc.getNumberOfPages();
    const generatedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    for (let page = 1; page <= totalPages; page += 1) {
      this.doc.setPage(page);
      this.applyStyle({
        fontSize: PDF_TYPOGRAPHY.footer,
        color: lightGray,
      });
      this.doc.text(`Generated ${generatedDate}`, margin, footerY);
      this.doc.text(`Page ${page} of ${totalPages}`, pageWidth - margin, footerY, {
        align: "right",
      });
    }
  }
}
