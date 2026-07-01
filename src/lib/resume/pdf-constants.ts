export const PDF_FILENAME = "Sabbir_Ahmed_Resume.pdf";

/** Brand accent — #FF005C */
export const PDF_COLORS = {
  accent: [255, 0, 92] as const,
  black: [17, 17, 17] as const,
  darkGray: [64, 64, 64] as const,
  gray: [115, 115, 115] as const,
  /** #E5E7EB — subtle section accent */
  divider: [229, 231, 235] as const,
  lightGray: [160, 160, 160] as const,
  white: [255, 255, 255] as const,
};

export const PDF_LAYOUT = {
  margin: 14,
  pageWidth: 210,
  pageHeight: 297,
  /** Last safe baseline before bottom margin. */
  maxContentY: 283,
  footerY: 288,
} as const;

export const PDF_CONTENT_WIDTH =
  PDF_LAYOUT.pageWidth - PDF_LAYOUT.margin * 2;

/**
 * Typography — section headings ~18–20px (15pt), body ~11pt.
 */
export const PDF_TYPOGRAPHY = {
  name: 31,
  section: 15,
  body: 10.5,
  small: 9.5,
  lineHeight: 1.5 as number,
  lineHeightTight: 1.32 as number,
} as const;

/** ~250px max at print scale → ~66mm */
export const PDF_SECTION_DIVIDER_MAX_MM = 66;

export const PDF_SPACING = {
  xs: 1,
  sm: 1.8,
  md: 3,
  lg: 4.5,
  sectionBefore: 6.5,
  headingAfter: 2,
  headingBelow: 4,
  role: 3,
  project: 2,
};

export function pdfLineHeightMm(
  fontSizePt: number,
  lineHeight: number = PDF_TYPOGRAPHY.lineHeight
): number {
  return fontSizePt * 0.352778 * lineHeight;
}
