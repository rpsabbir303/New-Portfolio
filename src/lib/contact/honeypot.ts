/** Random field name — not targeted by browser autofill heuristics. */
export const HONEYPOT_FIELD = "contact_security_check" as const;

/** Client-set timestamp (ms) when the form mounted — used for timing checks. */
export const FORM_STARTED_AT_FIELD = "_formStartedAt" as const;

/** Minimum time (ms) a human typically needs before submitting. */
export const MIN_FORM_DURATION_MS = 2000;

/** Legacy honeypot keys still read server-side during migration. */
export const LEGACY_HONEYPOT_FIELDS = [
  "_gotcha",
  "website",
  "url",
  "email",
  "name",
] as const;

export function extractHoneypotFromBody(
  record: Record<string, unknown>
): unknown {
  if (record[HONEYPOT_FIELD] != null && record[HONEYPOT_FIELD] !== "") {
    return record[HONEYPOT_FIELD];
  }

  for (const key of LEGACY_HONEYPOT_FIELDS) {
    const value = record[key];
    if (value != null && value !== "") return value;
  }

  return record[HONEYPOT_FIELD] ?? undefined;
}
