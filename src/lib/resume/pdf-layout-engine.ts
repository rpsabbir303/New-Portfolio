import type { jsPDF } from "jspdf";
import {
  PDF_COLORS,
  PDF_CONTENT_WIDTH,
  PDF_LAYOUT,
  PDF_SECTION_DIVIDER_MAX_MM,
  PDF_SPACING,
  PDF_TYPOGRAPHY,
  pdfLineHeightMm,
} from "@/lib/resume/pdf-constants";
import { PDF_FONT_FAMILY } from "@/lib/resume/pdf-font-loader";
import type { PdfContactItem } from "@/lib/resume/pdf-resume-content";

type Rgb = readonly [number, number, number];

type PdfTextStyle = {
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

type ProjectParams = {
  title: string;
  category: string;
  description: string;
  responsibilities: string[];
  caseStudyHref?: string | null;
};

const { margin, pageWidth, pageHeight, maxContentY, footerY } = PDF_LAYOUT;
const { accent, black, darkGray, gray, divider, lightGray, white } =
  PDF_COLORS;
const { name: nameSize, section: sectionSize, body: bodySize, small } =
  PDF_TYPOGRAPHY;

const DIVIDER_LINE_MM = 0.25;

export class PdfLayoutEngine {
  private y: number = margin;
  private fontFamily = PDF_FONT_FAMILY;

  constructor(private readonly doc: jsPDF) {
    if (!doc.getFontList()[PDF_FONT_FAMILY]) {
      this.fontFamily = "helvetica";
    }
  }

  get cursorY() {
    return this.y;
  }

  private lineStep(fontSize: number, factor?: number) {
    return pdfLineHeightMm(fontSize, factor ?? PDF_TYPOGRAPHY.lineHeight);
  }

  private applyStyle(style: PdfTextStyle) {
    this.doc.setFont(this.fontFamily, style.fontStyle ?? "normal");
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

  private linkText(
    text: string,
    x: number,
    baselineY: number,
    href?: string
  ) {
    if (!href) return;
    const width = this.doc.getTextWidth(text);
    const height = this.doc.getFontSize() * 0.352778;
    this.linkRect(x, baselineY - height * 0.85, width, height, href);
  }

  private remainingSpace() {
    return maxContentY - this.y;
  }

  private newPage() {
    this.doc.addPage();
    this.fillPageWhite();
    this.y = margin;
  }

  /** Add a page when the next content would cross the bottom margin. */
  ensureSpace(needed: number) {
    if (needed > 0 && needed > this.remainingSpace()) {
      this.newPage();
    }
  }

  /**
   * Keep atomic blocks intact (project, role, skills block, etc.).
   * Starts a new page when the full block cannot fit on the current page.
   */
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

  fillPageWhite() {
    this.doc.setFillColor(...white);
    this.doc.rect(0, 0, pageWidth, pageHeight, "F");
  }

  measureSummaryLinesHeight(lines: readonly string[]) {
    let height = 0;
    lines.forEach((line, index) => {
      height += this.measureTextHeight(
        line,
        {
          fontSize: bodySize,
          color: darkGray,
          lineHeight: PDF_TYPOGRAPHY.lineHeight,
        },
        PDF_CONTENT_WIDTH,
        index === lines.length - 1 ? PDF_SPACING.xs : PDF_SPACING.xs
      );
    });
    return height;
  }

  private measureTextHeight(
    text: string,
    style: PdfTextStyle,
    maxWidth: number,
    spaceAfter = PDF_SPACING.sm
  ) {
    const lines = this.measureLines(text, style, maxWidth);
    const step = this.lineStep(style.fontSize, style.lineHeight);
    return lines.length * step + spaceAfter;
  }

  private measureBulletListHeight(
    bullets: string[],
    fontSize: number,
    maxWidth: number,
    spaceAfter = 0
  ) {
    const bulletStep = this.lineStep(fontSize, PDF_TYPOGRAPHY.lineHeight);
    let height = 0;
    for (const bullet of bullets) {
      const lines = this.measureLines(
        bullet,
        { fontSize, color: darkGray },
        maxWidth
      );
      height += lines.length * bulletStep;
    }
    return height + spaceAfter;
  }

  private measureSectionTitleHeight(isFirst: boolean) {
    const step = this.lineStep(sectionSize, PDF_TYPOGRAPHY.lineHeightTight);
    return (
      (isFirst ? 0 : PDF_SPACING.sectionBefore) +
      step +
      PDF_SPACING.headingAfter +
      DIVIDER_LINE_MM +
      PDF_SPACING.headingBelow
    );
  }

  measureHeaderHeight(contacts: PdfContactItem[]) {
    const nameStep = this.lineStep(nameSize, PDF_TYPOGRAPHY.lineHeightTight);
    const roleStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    return (
      nameStep +
      PDF_SPACING.xs +
      roleStep +
      PDF_SPACING.sm +
      this.measureContactLinesHeight(contacts) +
      PDF_SPACING.lg
    );
  }

  private measureContactLinesHeight(contacts: PdfContactItem[]) {
    const rowStep = this.lineStep(small, PDF_TYPOGRAPHY.lineHeightTight);
    const rows = [contacts.slice(0, 4), contacts.slice(4)];
    let height = 0;
    for (const row of rows) {
      if (row.length === 0) continue;
      height += rowStep + PDF_SPACING.xs;
    }
    return height;
  }

  measureExperienceRoleHeight(
    bullets: string[],
    includeTrailingSpace = true
  ) {
    const titleStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    const companyStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    const bulletWidth = PDF_CONTENT_WIDTH - 5;

    return (
      titleStep +
      companyStep +
      PDF_SPACING.xs +
      this.measureBulletListHeight(bullets, bodySize, bulletWidth) +
      (includeTrailingSpace ? PDF_SPACING.role : 0)
    );
  }

  measureProjectHeight(params: ProjectParams) {
    const titleStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    const metaStep = this.lineStep(small, PDF_TYPOGRAPHY.lineHeightTight);
    const bodyStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeight);
    const bulletStep = this.lineStep(small, PDF_TYPOGRAPHY.lineHeight);
    const bulletWidth = PDF_CONTENT_WIDTH - 6;

    const descLines = this.measureLines(
      params.description,
      { fontSize: bodySize, color: darkGray },
      PDF_CONTENT_WIDTH
    ).slice(0, 1);

    let height =
      titleStep +
      metaStep +
      PDF_SPACING.xs +
      descLines.length * bodyStep;

    for (const item of params.responsibilities.slice(0, 3)) {
      const lines = this.measureLines(
        item,
        { fontSize: small, color: darkGray },
        bulletWidth
      );
      height += lines.length * bulletStep;
    }

    if (params.caseStudyHref) {
      height += metaStep;
    }

    return height + PDF_SPACING.project;
  }

  measureSkillCategoryHeight(group: { category: string; items: string[] }) {
    const categoryStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    const itemStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    return (
      categoryStep +
      PDF_SPACING.xs +
      group.items.length * itemStep +
      PDF_SPACING.sm
    );
  }

  measureSkillCategoriesHeight(
    groups: ReadonlyArray<{ category: string; items: string[] }>,
    toolsLine: string
  ) {
    const categoryStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    const itemStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    const toolsStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);

    let height = 0;
    for (const [index, group] of groups.entries()) {
      height += categoryStep + PDF_SPACING.xs;
      height += group.items.length * itemStep;
      height += index < groups.length - 1 ? PDF_SPACING.sm : PDF_SPACING.xs;
    }

    height += categoryStep + PDF_SPACING.xs + toolsStep + PDF_SPACING.sm;
    return height;
  }

  measureToolsLineHeight() {
    return (
      this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight) + PDF_SPACING.sm
    );
  }

  measureEducationBlockHeight(
    credentials: ReadonlyArray<{ title: string; year: string }>
  ) {
    const lineStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    let height = 0;
    credentials.forEach((_, index) => {
      height += lineStep * 3;
      height += index < credentials.length - 1 ? PDF_SPACING.sm : PDF_SPACING.xs;
    });
    return height;
  }

  measureCertificationListHeight(
    items: ReadonlyArray<{ title: string; institute: string; year: string }>
  ) {
    const lineStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    let height = 0;
    items.forEach((_, index) => {
      height += lineStep * 2;
      height += index < items.length - 1 ? PDF_SPACING.sm : 0;
    });
    return height;
  }

  /** Short accent line under section titles — never full page width. */
  private renderShortSectionDivider(title: string) {
    this.applyStyle({ fontSize: sectionSize, fontStyle: "bold", color: black });
    this.y += PDF_SPACING.headingAfter;

    const titleWidth = this.doc.getTextWidth(title);
    const lineWidth = Math.min(
      titleWidth + 6,
      PDF_SECTION_DIVIDER_MAX_MM
    );

    this.doc.setDrawColor(...divider);
    this.doc.setLineWidth(DIVIDER_LINE_MM);
    this.doc.line(margin, this.y, margin + lineWidth, this.y);
    this.y += DIVIDER_LINE_MM + PDF_SPACING.headingBelow;
  }

  renderText(text: string, style: PdfTextStyle, options: RenderOptions = {}) {
    const x = options.x ?? margin;
    const maxWidth = options.maxWidth ?? PDF_CONTENT_WIDTH;
    const factor = style.lineHeight ?? PDF_TYPOGRAPHY.lineHeight;
    const lines = this.measureLines(text, style, maxWidth);
    const step = this.lineStep(style.fontSize, factor);
    const spaceAfter = options.spaceAfter ?? PDF_SPACING.sm;
    const totalHeight = lines.length * step + spaceAfter;

    this.ensureSpace(totalHeight);
    this.applyStyle(style);

    for (const line of lines) {
      this.doc.text(line, x, this.y);
      this.y += step;
    }

    this.y += spaceAfter;
  }

  renderSectionTitle(
    title: string,
    isFirst = false,
    options: { managePageBreak?: boolean } = {}
  ) {
    const managePageBreak = options.managePageBreak ?? true;
    const totalHeight = this.measureSectionTitleHeight(isFirst);

    if (managePageBreak) {
      this.keepTogether(totalHeight);
    }

    this.ensureSpace(totalHeight);

    if (!isFirst) {
      this.addSpace(PDF_SPACING.sectionBefore);
    }

    const step = this.lineStep(sectionSize, PDF_TYPOGRAPHY.lineHeightTight);
    this.applyStyle({ fontSize: sectionSize, fontStyle: "bold", color: black });
    this.doc.text(title, margin, this.y);
    this.y += step;
    this.renderShortSectionDivider(title);
  }

  /**
   * Keeps a section heading with its first content block on the same page
   * when possible (page-break-inside: avoid for section openings).
   */
  beginSection(title: string, firstBlockHeight: number, isFirst = false) {
    const titleHeight = this.measureSectionTitleHeight(isFirst);
    this.keepTogether(titleHeight + firstBlockHeight);
    this.renderSectionTitle(title, isFirst, { managePageBreak: false });
  }

  renderHeader(params: {
    name: string;
    role: string;
    contacts: PdfContactItem[];
  }) {
    const totalHeight = this.measureHeaderHeight(params.contacts);
    this.keepTogether(totalHeight);

    const nameStep = this.lineStep(nameSize, PDF_TYPOGRAPHY.lineHeightTight);
    const roleStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);

    this.applyStyle({ fontSize: nameSize, fontStyle: "bold", color: black });
    this.doc.text(params.name, margin, this.y);
    this.y += nameStep + PDF_SPACING.xs;

    this.applyStyle({ fontSize: bodySize, color: darkGray });
    this.doc.text(params.role, margin, this.y);
    this.y += roleStep + PDF_SPACING.sm;

    this.renderContactLines(params.contacts);
    this.addSpace(PDF_SPACING.lg);
  }

  private renderContactLines(contacts: PdfContactItem[]) {
    const rowStep = this.lineStep(small, PDF_TYPOGRAPHY.lineHeightTight);
    const sep = "   ·   ";
    const maxX = margin + PDF_CONTENT_WIDTH;

    const rows: PdfContactItem[][] = [
      contacts.slice(0, 4),
      contacts.slice(4),
    ];

    for (const row of rows) {
      if (row.length === 0) continue;

      this.ensureSpace(rowStep + PDF_SPACING.xs);
      let cursorX = margin;
      let rowY = this.y;

      row.forEach((contact, index) => {
        if (index > 0) {
          this.applyStyle({ fontSize: small, color: gray });
          const sepW = this.doc.getTextWidth(sep);
          if (cursorX + sepW > maxX) {
            cursorX = margin;
            rowY += rowStep;
          }
          this.doc.text(sep, cursorX, rowY);
          cursorX += sepW;
        }

        const isLink = Boolean(contact.href);
        const display = contact.value;

        this.applyStyle({
          fontSize: small,
          fontStyle: isLink ? "bold" : "normal",
          color: isLink ? accent : darkGray,
        });

        const textWidth = this.doc.getTextWidth(display);
        if (cursorX + textWidth > maxX && cursorX > margin) {
          cursorX = margin;
          rowY += rowStep;
        }

        this.doc.text(display, cursorX, rowY);
        this.linkText(display, cursorX, rowY, contact.href);
        cursorX += textWidth;
      });

      this.y = rowY + rowStep + PDF_SPACING.xs;
    }
  }

  renderExperienceRole(
    company: string,
    title: string,
    period: string,
    bullets: string[],
    options: { isLast?: boolean } = {}
  ) {
    const isLast = options.isLast ?? false;
    const blockHeight = this.measureExperienceRoleHeight(bullets, !isLast);
    this.keepTogether(blockHeight);

    const titleStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    const companyStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    const bulletStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    const bulletWidth = PDF_CONTENT_WIDTH - 5;

    this.applyStyle({ fontSize: bodySize, fontStyle: "bold", color: black });
    this.doc.text(title, margin, this.y);

    this.applyStyle({ fontSize: bodySize, color: gray });
    this.doc.text(period, margin + PDF_CONTENT_WIDTH, this.y, {
      align: "right",
    });
    this.y += titleStep;

    this.applyStyle({ fontSize: bodySize, color: darkGray });
    this.doc.text(company, margin, this.y);
    this.y += companyStep + PDF_SPACING.xs;

    for (const bullet of bullets) {
      const lines = this.measureLines(
        bullet,
        { fontSize: bodySize, color: darkGray },
        bulletWidth
      );
      this.applyStyle({ fontSize: bodySize, color: darkGray });
      lines.forEach((line, index) => {
        const prefix = index === 0 ? "• " : "  ";
        this.doc.text(`${prefix}${line}`, margin + 1, this.y);
        this.y += bulletStep;
      });
    }

    if (!isLast) {
      this.y += PDF_SPACING.xs;
    }
  }

  renderProject(params: ProjectParams) {
    const blockHeight = this.measureProjectHeight(params);
    this.keepTogether(blockHeight);

    const titleStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    const metaStep = this.lineStep(small, PDF_TYPOGRAPHY.lineHeightTight);
    const bodyStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeight);
    const bulletStep = this.lineStep(small, PDF_TYPOGRAPHY.lineHeight);
    const bulletWidth = PDF_CONTENT_WIDTH - 6;

    this.applyStyle({ fontSize: bodySize, fontStyle: "bold", color: black });
    this.doc.text(params.title, margin, this.y);
    this.y += titleStep;

    this.applyStyle({ fontSize: small, color: gray });
    this.doc.text(params.category, margin, this.y);
    this.y += metaStep + PDF_SPACING.xs;

    const descLines = this.measureLines(
      params.description,
      { fontSize: bodySize, color: darkGray },
      PDF_CONTENT_WIDTH
    ).slice(0, 1);

    this.applyStyle({ fontSize: bodySize, color: darkGray });
    for (const line of descLines) {
      this.doc.text(line, margin, this.y);
      this.y += bodyStep;
    }

    for (const item of params.responsibilities.slice(0, 3)) {
      const lines = this.measureLines(
        item,
        { fontSize: small, color: darkGray },
        bulletWidth
      );
      this.applyStyle({ fontSize: small, color: darkGray });
      lines.forEach((line, index) => {
        const prefix = index === 0 ? "• " : "  ";
        this.doc.text(`${prefix}${line}`, margin + 1, this.y);
        this.y += bulletStep;
      });
    }

    if (params.caseStudyHref) {
      const label = "Dribbble Case Study";
      this.applyStyle({ fontSize: small, fontStyle: "bold", color: accent });
      this.doc.text(label, margin, this.y);
      this.linkText(label, margin, this.y, params.caseStudyHref);
      this.y += metaStep;
    }

    this.y += PDF_SPACING.project;
  }

  renderSkillCategories(
    groups: ReadonlyArray<{ category: string; items: string[] }>,
    toolsLine: string
  ) {
    const categoryStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    const itemStep = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    const toolsHeight =
      categoryStep +
      PDF_SPACING.xs +
      itemStep +
      PDF_SPACING.sm;

    for (const group of groups) {
      const blockHeight = this.measureSkillCategoryHeight(group);
      this.keepTogether(blockHeight);

      this.applyStyle({ fontSize: bodySize, fontStyle: "bold", color: black });
      this.doc.text(group.category, margin, this.y);
      this.y += categoryStep + PDF_SPACING.xs;

      for (const item of group.items) {
        this.applyStyle({ fontSize: bodySize, color: darkGray });
        this.doc.text(`• ${item}`, margin + 1, this.y);
        this.y += itemStep;
      }

      this.y += PDF_SPACING.xs;
    }

    this.keepTogether(toolsHeight);
    this.applyStyle({ fontSize: bodySize, fontStyle: "bold", color: black });
    this.doc.text("Tools", margin, this.y);
    this.y += categoryStep + PDF_SPACING.xs;

    this.applyStyle({ fontSize: bodySize, color: darkGray });
    this.doc.text(toolsLine, margin, this.y);
    this.y += itemStep + PDF_SPACING.sm;
  }

  renderToolsLine(text: string) {
    const blockHeight = this.measureToolsLineHeight();
    this.keepTogether(blockHeight);

    const step = this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);
    this.applyStyle({ fontSize: bodySize, color: darkGray });
    this.doc.text(text, margin, this.y);
    this.y += step + PDF_SPACING.sm;
  }

  renderEducationBlock(
    credentials: ReadonlyArray<{ title: string; year: string }>,
    institute: string
  ) {
    const blockHeight = this.measureEducationBlockHeight(credentials);
    this.keepTogether(blockHeight);

    for (const [index, credential] of credentials.entries()) {
      this.applyStyle({ fontSize: bodySize, fontStyle: "bold", color: black });
      this.doc.text(credential.title, margin, this.y);
      this.y += this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);

      this.applyStyle({ fontSize: bodySize, color: darkGray });
      this.doc.text(institute, margin, this.y);
      this.y += this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);

      this.applyStyle({ fontSize: bodySize, color: gray });
      this.doc.text(credential.year, margin, this.y);
      this.y +=
        this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight) +
        (index < credentials.length - 1 ? PDF_SPACING.sm : PDF_SPACING.xs);
    }
  }

  renderCertificationList(
    items: ReadonlyArray<{ title: string; institute: string; year: string }>
  ) {
    const blockHeight = this.measureCertificationListHeight(items);
    this.keepTogether(blockHeight);

    for (const [index, item] of items.entries()) {
      this.applyStyle({ fontSize: bodySize, fontStyle: "bold", color: black });
      this.doc.text(item.title, margin, this.y);
      this.y += this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight);

      this.applyStyle({ fontSize: bodySize, color: darkGray });
      this.doc.text(`${item.institute} · ${item.year}`, margin, this.y);
      this.y +=
        this.lineStep(bodySize, PDF_TYPOGRAPHY.lineHeightTight) +
        (index < items.length - 1 ? PDF_SPACING.sm : 0);
    }
  }

  renderFooters() {
    const totalPages = this.doc.getNumberOfPages();

    for (let page = 1; page <= totalPages; page += 1) {
      this.doc.setPage(page);
      this.applyStyle({ fontSize: small, color: lightGray });
      this.doc.text(`${page} / ${totalPages}`, pageWidth - margin, footerY, {
        align: "right",
      });
    }
  }

  /** Validates that no content baseline exceeds the printable area. */
  assertNoOverflow() {
    if (this.y > maxContentY + 1) {
      throw new Error(
        `Resume content overflow: y=${this.y.toFixed(1)}mm exceeds max=${maxContentY}mm`
      );
    }
  }
}
