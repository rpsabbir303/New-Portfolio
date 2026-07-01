import type { jsPDF } from "jspdf";

const INTER_REGULAR_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.2.5/files/inter-latin-400-normal.ttf";
const INTER_BOLD_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.2.5/files/inter-latin-700-normal.ttf";

const fontCache = new Map<string, string>();

async function fetchFontBase64(url: string): Promise<string> {
  const cached = fontCache.get(url);
  if (cached) return cached;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load font: ${url}`);
  }

  const buffer = await response.arrayBuffer();
  const base64 =
    typeof Buffer !== "undefined"
      ? Buffer.from(buffer).toString("base64")
      : btoa(
          Array.from(new Uint8Array(buffer), (byte) =>
            String.fromCharCode(byte)
          ).join("")
        );

  fontCache.set(url, base64);
  return base64;
}

export const PDF_FONT_FAMILY = "Inter";

export async function registerPdfFonts(doc: jsPDF): Promise<void> {
  try {
    const [regular, bold] = await Promise.all([
      fetchFontBase64(INTER_REGULAR_URL),
      fetchFontBase64(INTER_BOLD_URL),
    ]);

    doc.addFileToVFS("Inter-Regular.ttf", regular);
    doc.addFileToVFS("Inter-Bold.ttf", bold);
    doc.addFont("Inter-Regular.ttf", PDF_FONT_FAMILY, "normal");
    doc.addFont("Inter-Bold.ttf", PDF_FONT_FAMILY, "bold");
  } catch {
    // Helvetica fallback remains available if font fetch fails offline.
  }
}
