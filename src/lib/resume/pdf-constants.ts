export const PDF_FILENAME = "Sabbir_Ahmed_Resume.pdf";

export const PDF_COLORS = {
  accent: [255, 1, 79] as const,
  accentPink: [255, 0, 102] as const,
  black: [0, 0, 0] as const,
  gray: [60, 60, 60] as const,
  lightGray: [120, 120, 120] as const,
  divider: [220, 220, 220] as const,
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
