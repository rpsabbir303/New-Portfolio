const imageCache = new Map<string, string | null>();

export type PdfImageAsset = {
  dataUrl: string;
  format: "PNG" | "JPEG" | "WEBP";
} | null;

function detectImageFormat(dataUrl: string): "PNG" | "JPEG" | "WEBP" {
  if (dataUrl.startsWith("data:image/jpeg")) return "JPEG";
  if (dataUrl.startsWith("data:image/webp")) return "WEBP";
  return "PNG";
}

export async function loadPdfImageDataUrl(
  path: string
): Promise<string | null> {
  const asset = await loadPdfImageAsset(path);
  return asset?.dataUrl ?? null;
}

export async function loadPdfImageAsset(path: string): Promise<PdfImageAsset> {
  if (imageCache.has(path)) {
    const cached = imageCache.get(path);
    if (!cached) return null;
    return { dataUrl: cached, format: detectImageFormat(cached) };
  }

  try {
    const response = await fetch(path);
    if (!response.ok) {
      imageCache.set(path, null);
      return null;
    }

    const blob = await response.blob();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    imageCache.set(path, dataUrl);
    return { dataUrl, format: detectImageFormat(dataUrl) };
  } catch {
    imageCache.set(path, null);
    return null;
  }
}
