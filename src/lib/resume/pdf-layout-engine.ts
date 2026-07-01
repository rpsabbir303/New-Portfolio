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

type ContactSegment = {
  text: string;
  href?: string;
};

const { margin, pageWidth, pageHeight, footerY, maxContentY } = PDF_LAYOUT;
const { accent, primary, secondary, muted, divider, white } = PDF_COLORS;

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
    this.doc.setTextColor(...(style.color ?? secondary));
  }

  private measureLines(
    text: string,
    style: PdfTextStyle,
    maxWidth: number
  ): string[] {
    this.applyStyle(style);
    return this.doc.splitTextToSize(text, maxWidth);
  }

  private linkRect(
    x: number,
    y: number,
    width: number,
    height: number,
    href?: string
  ) {
    if (!href || width <= 0 || height <= 0) return;
    this.doc.link(x, y, width, height, { url: href });
  }

  private remainingSpace() {
    return maxContentY - this.y;
  }

  fillPageWhite() {
    this.doc.setFillColor(...white);
    this.doc.rect(0, 0, pageWidth, pageHeight, "F");
  }

  private newPage() {
    this.doc.addPage();
    this.fillPageWhite();
    this.y = margin;
  }

  ensureSpace(needed: number) {
    if (needed > 0 && needed > this.remainingSpace()) {
      this.newPage();
    }
  }

  keepTogether(blockHeight: number) {
    if (blockHeight <= 0) return;

    const printableHeight = maxContentY - margin;
    if (blockHeight > printableHeight && this.y > margin) {
      this.newPage();
      return;
    }

    if (blockHeight > this.remainingSpace() && this.y > margin) {
      this.newPage();
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

  renderContactLine(
    segments: ContactSegment[],
    style: PdfTextStyle = {
      fontSize: PDF_TYPOGRAPHY.subtitle,
      color: muted,
    },
    spaceAfter = PDF_SPACING.sectionPadding
  ) {
    const separator = "  |  ";
    const step = this.lineStep(style.fontSize);
    const totalHeight = step + spaceAfter;

    this.ensureSpace(totalHeight);
    this.applyStyle(style);
    const separatorWidth = this.doc.getTextWidth(separator);

    let x = margin;
    const baselineY = this.y;

    segments.forEach((segment, index) => {
      if (index > 0) {
        this.applyStyle({ ...style, color: muted });
        this.doc.text(separator, x, baselineY);
        x += separatorWidth;
      }

      this.applyStyle({
        ...style,
        color: segment.href ? accent : muted,
      });
      this.doc.text(segment.text, x, baselineY);
      const segmentWidth = this.doc.getTextWidth(segment.text);
      this.linkRect(
        x,
        baselineY - step * 0.85,
        segmentWidth,
        step,
        segment.href
      );
      x += segmentWidth;
    });

    this.y += totalHeight;
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

    this.doc.setDrawColor(...divider);
    this.doc.setLineWidth(0.35);
    this.doc.line(margin, this.y, margin + PDF_CONTENT_WIDTH, this.y);
    this.y += PDF_SPACING.headingRule;
  }

  renderLabeledField(
    label: string,
    value: string,
    spaceAfter = PDF_SPACING.listItem,
    href?: string
  ) {
    this.renderText(`${label}:`, {
      fontSize: PDF_TYPOGRAPHY.label,
      fontStyle: "bold",
      color: primary,
    }, { spaceAfter: PDF_SPACING.gap8 });

    const lines = value.split("\n").filter(Boolean);
    const displayValue = lines.length > 0 ? lines[0] : value;
    const linkTarget = href ?? (lines[1]?.startsWith("http") ? lines[1] : undefined);

    this.renderLinkedText(
      displayValue,
      {
        fontSize: PDF_TYPOGRAPHY.bodySmall,
        color: linkTarget ? accent : muted,
      },
      linkTarget,
      { spaceAfter }
    );
  }

  renderLinkedText(
    text: string,
    style: PdfTextStyle,
    href?: string,
    options: RenderOptions = {}
  ) {
    const x = options.x ?? margin;
    const step = this.lineStep(style.fontSize, style.lineHeight);
    const spaceAfter = options.spaceAfter ?? PDF_SPACING.paragraph;
    const totalHeight = step + spaceAfter;

    this.ensureSpace(totalHeight);
    this.applyStyle(style);
    this.doc.text(text, x, this.y);
    const width = this.doc.getTextWidth(text);
    this.linkRect(x, this.y - step * 0.85, width, step, href);
    this.y += totalHeight;
  }

  measureExperienceItemHeight(description: string) {
    const titleStep = this.lineStep(PDF_TYPOGRAPHY.label);
    const descLines = this.measureLines(description, {
      fontSize: PDF_TYPOGRAPHY.bodySmall,
      color: muted,
    }, PDF_CONTENT_WIDTH);
    const descStep = this.lineStep(PDF_TYPOGRAPHY.bodySmall);
    return titleStep + PDF_SPACING.gap8 + descLines.length * descStep + PDF_SPACING.gap24;
  }

  renderExperienceItem(
    year: string,
    title: string,
    description: string,
    isLast = false
  ) {
    const blockHeight = this.measureExperienceItemHeight(description);
    this.keepTogether(blockHeight);

    const titleStep = this.lineStep(PDF_TYPOGRAPHY.label);
    this.ensureSpace(titleStep);
    this.applyStyle({
      fontSize: PDF_TYPOGRAPHY.label,
      fontStyle: "bold",
      color: primary,
    });
    this.doc.text(title, margin, this.y);

    this.applyStyle({
      fontSize: PDF_TYPOGRAPHY.label,
      fontStyle: "bold",
      color: accent,
    });
    this.doc.text(year, pageWidth - margin, this.y, { align: "right" });
    this.y += titleStep + PDF_SPACING.gap8;

    this.renderText(description, {
      fontSize: PDF_TYPOGRAPHY.bodySmall,
      color: muted,
      lineHeight: PDF_TYPOGRAPHY.lineHeight,
    }, {
      spaceAfter: isLast ? PDF_SPACING.paragraph : PDF_SPACING.gap24,
    });
  }

  renderSkillGroup(category: string, items: string[], isLast = false) {
    this.renderText(category, {
      fontSize: PDF_TYPOGRAPHY.label,
      fontStyle: "bold",
      color: primary,
    }, { spaceAfter: PDF_SPACING.gap8 });

    this.renderText(items.join(" • "), {
      fontSize: PDF_TYPOGRAPHY.bodySmall,
      color: secondary,
    }, {
      spaceAfter: isLast ? PDF_SPACING.paragraph : PDF_SPACING.gap16,
    });
  }

  measureProjectBlockHeight(description: string) {
    const titleStep = this.lineStep(PDF_TYPOGRAPHY.projectTitle) + PDF_SPACING.gap8;
    const categoryStep = this.lineStep(PDF_TYPOGRAPHY.projectCategory) + PDF_SPACING.gap8;
    const descLines = this.measureLines(description, {
      fontSize: PDF_TYPOGRAPHY.projectDescription,
      color: muted,
      lineHeight: PDF_TYPOGRAPHY.lineHeight,
    }, PDF_CONTENT_WIDTH);
    const descStep = this.lineStep(PDF_TYPOGRAPHY.projectDescription);
    return titleStep + categoryStep + descLines.length * descStep + PDF_SPACING.gap24;
  }

  renderProjectBlock(
    name: string,
    category: string,
    description: string,
    isLast = false
  ) {
    const blockHeight = this.measureProjectBlockHeight(description);
    this.keepTogether(blockHeight);

    this.renderText(name, {
      fontSize: PDF_TYPOGRAPHY.projectTitle,
      fontStyle: "bold",
      color: primary,
    }, { spaceAfter: PDF_SPACING.gap8 });

    this.renderText(`Category: ${category}`, {
      fontSize: PDF_TYPOGRAPHY.projectCategory,
      color: muted,
    }, { spaceAfter: PDF_SPACING.gap8 });

    this.renderText(description, {
      fontSize: PDF_TYPOGRAPHY.projectDescription,
      color: muted,
      lineHeight: PDF_TYPOGRAPHY.lineHeight,
    }, {
      spaceAfter: isLast ? PDF_SPACING.paragraph : PDF_SPACING.gap24,
    });
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
        color: muted,
      });
      this.doc.text(`Generated ${generatedDate}`, margin, footerY);
      this.doc.text(`Page ${page} of ${totalPages}`, pageWidth - margin, footerY, {
        align: "right",
      });
    }
  }

  assertNoOverflow() {
    if (this.y > maxContentY) {
      throw new Error("Resume content overflowed the printable page area.");
    }
  }
}
