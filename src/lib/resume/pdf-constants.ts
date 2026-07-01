export const PDF_FILENAME = "Sabbir_Ahmed_Resume.pdf";

/** Corporate resume palette — single accent #2F5496 on white. */
export const PDF_COLORS = {
  accent: [47, 84, 150] as const,
  primary: [17, 24, 39] as const,
  secondary: [75, 85, 99] as const,
  muted: [107, 114, 128] as const,
  divider: [229, 231, 235] as const,
  white: [255, 255, 255] as const,
};

export const PDF_LAYOUT = {
  margin: 20,
  pageWidth: 210,
  pageHeight: 297,
  footerY: 284,
  maxContentY: 272,
} as const;

export const PDF_CONTENT_WIDTH =
  PDF_LAYOUT.pageWidth - PDF_LAYOUT.margin * 2;

/** Typography in pt (px × 0.75 at 96dpi). */
export const PDF_TYPOGRAPHY = {
  name: 22,
  role: 13,
  subtitle: 10,
  sectionHeading: 12,
  body: 10,
  bodySmall: 9,
  label: 10,
  projectTitle: 13,
  projectCategory: 10,
  projectDescription: 9,
  footer: 8,
  lineHeight: 1.5 as number,
} as const;

/** Spacing in mm (~px / 3.78 at 96dpi). */
export const PDF_SPACING = {
  gap8: 2.1,
  gap12: 3.2,
  gap16: 4.2,
  gap24: 6.4,
  sectionPadding: 8.5,
  headingRule: 4,
  paragraph: 3.2,
  listItem: 2.6,
  divider: 4,
};

export function pdfLineHeightMm(
  fontSizePt: number,
  lineHeight: number = PDF_TYPOGRAPHY.lineHeight
): number {
  return fontSizePt * 0.352778 * lineHeight;
}
