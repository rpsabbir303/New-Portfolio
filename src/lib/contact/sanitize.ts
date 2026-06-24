/** Strip HTML tags and normalize whitespace for safe storage and email rendering. */
export function sanitizeText(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}

export function sanitizeContactPayload<T extends Record<string, string>>(payload: T): T {
  const sanitized = { ...payload };
  for (const key of Object.keys(sanitized) as (keyof T)[]) {
    if (typeof sanitized[key] === "string") {
      sanitized[key] = sanitizeText(sanitized[key]) as T[keyof T];
    }
  }
  return sanitized;
}
