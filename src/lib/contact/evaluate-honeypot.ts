import {
  FORM_STARTED_AT_FIELD,
  HONEYPOT_FIELD,
  MIN_FORM_DURATION_MS,
} from "@/lib/contact/honeypot";

export type HoneypotClassification =
  | "empty"
  | "autofill_ignored"
  | "suspicious"
  | "too_fast";

export type HoneypotVerdict = {
  passed: boolean;
  reason?: string;
  classification: HoneypotClassification;
  honeypotValue: string;
  formDurationMs?: number;
};

export type HoneypotFormContext = {
  name?: string;
  email?: string;
};

const SPAM_KEYWORDS =
  /\b(viagra|cialis|casino|forex|seo service|buy followers|crypto airdrop)\b/i;

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

/** Values browsers/password managers commonly inject into misidentified fields. */
export function isLikelyAutofill(
  value: string,
  context?: HoneypotFormContext
): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  const lower = normalize(trimmed);

  if (context?.email && lower === normalize(context.email)) return true;
  if (context?.name && lower === normalize(context.name)) return true;

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return true;

  if (/^https?:\/\//i.test(trimmed) || /^www\./i.test(trimmed)) return true;

  if (/\.(com|net|org|io|co|dev|app|edu|gov)(\/|$)/i.test(trimmed)) return true;

  if (/^[\d\s().+-]{7,}$/.test(trimmed) && trimmed.replace(/\D/g, "").length >= 7) {
    return true;
  }

  if (trimmed.length <= 4 && /^[a-z0-9.+_-]+$/i.test(trimmed)) return true;

  if (
    /^(undefined|null|true|false|none|n\/a|na|test|admin|user|password)$/i.test(
      trimmed
    )
  ) {
    return true;
  }

  return false;
}

/** Content that indicates a bot deliberately filled the trap field. */
export function isSuspiciousBotContent(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  if (isLikelyAutofill(trimmed)) return false;

  if (trimmed.length >= 80) return true;

  if (trimmed.split(/\s+/).length >= 6) return true;

  if (SPAM_KEYWORDS.test(trimmed)) return true;

  if (/https?:\/\/|www\.\w/i.test(trimmed)) return true;

  if (/[<>]/.test(trimmed) || /script/i.test(trimmed)) return true;

  if (trimmed.length >= 20 && /[.!?].*[.!?]/.test(trimmed)) return true;

  return false;
}

export function evaluateHoneypot(
  honeypotValue: unknown,
  formStartedAt: unknown,
  context?: HoneypotFormContext,
  submittedAt: number = Date.now()
): HoneypotVerdict {
  const value = honeypotValue == null ? "" : String(honeypotValue);
  console.log("HONEYPOT VALUE:", value);

  const startedAt =
    typeof formStartedAt === "number"
      ? formStartedAt
      : Number(formStartedAt);
  const formDurationMs = Number.isFinite(startedAt)
    ? submittedAt - startedAt
    : undefined;

  if (formDurationMs != null && formDurationMs < MIN_FORM_DURATION_MS) {
    return {
      passed: false,
      reason: `Form submitted too quickly (${formDurationMs}ms, minimum ${MIN_FORM_DURATION_MS}ms)`,
      classification: "too_fast",
      honeypotValue: value,
      formDurationMs,
    };
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return {
      passed: true,
      classification: "empty",
      honeypotValue: value,
      formDurationMs,
    };
  }

  if (isLikelyAutofill(trimmed, context)) {
    console.log(
      `[contact][honeypot] Ignoring likely autofill in "${HONEYPOT_FIELD}":`,
      trimmed
    );
    return {
      passed: true,
      classification: "autofill_ignored",
      honeypotValue: value,
      formDurationMs,
    };
  }

  if (isSuspiciousBotContent(trimmed)) {
    return {
      passed: false,
      reason: `Honeypot contains suspicious bot content`,
      classification: "suspicious",
      honeypotValue: value,
      formDurationMs,
    };
  }

  console.log(
    `[contact][honeypot] Non-empty value allowed (not bot-classified):`,
    trimmed
  );
  return {
    passed: true,
    classification: "autofill_ignored",
    honeypotValue: value,
    formDurationMs,
  };
}

export function getFormStartedAtFromBody(
  record: Record<string, unknown>
): unknown {
  return record[FORM_STARTED_AT_FIELD];
}
