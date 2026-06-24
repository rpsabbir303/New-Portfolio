import { isDisposableEmail } from "@/lib/contact/disposable-domains";
import {
  evaluateHoneypot,
  getFormStartedAtFromBody,
} from "@/lib/contact/evaluate-honeypot";
import {
  extractHoneypotFromBody,
  FORM_STARTED_AT_FIELD,
  HONEYPOT_FIELD,
  LEGACY_HONEYPOT_FIELDS,
} from "@/lib/contact/honeypot";
import { formatPhoneE164, getPhoneValidationError } from "@/lib/contact/phone";
import {
  CONTACT_FORM_FIELD_KEYS,
  CONTACT_VALIDATION,
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validation/contact-schema";
import type { ZodIssue } from "zod";

export type AntiSpamCheckResults = {
  honeypot: {
    passed: boolean;
    value: string;
    classification?: string;
    reason?: string;
    formDurationMs?: number;
  };
  rateLimit: { passed: boolean; reason?: string };
  captcha: { passed: boolean; reason: string };
  domainValidation: { passed: boolean; reason?: string };
  contentValidation: { passed: boolean; reason?: string };
  botDetection: { passed: boolean; reason?: string };
};

export type ContactRequestRejection = {
  ok: false;
  code: string;
  reason: string;
  message: string;
  checks: AntiSpamCheckResults;
  honeypotValue?: string;
  schemaIssues?: ZodIssue[];
  payloadSummary?: Record<string, unknown>;
};

export type ContactRequestSuccess = {
  ok: true;
  data: ContactFormValues;
  checks: AntiSpamCheckResults;
  payloadSummary: Record<string, unknown>;
};

export type ContactRequestValidationResult =
  | ContactRequestSuccess
  | ContactRequestRejection;

function reject(
  code: string,
  reason: string,
  checks: AntiSpamCheckResults,
  extra?: Pick<
    ContactRequestRejection,
    "schemaIssues" | "payloadSummary" | "honeypotValue"
  >
): ContactRequestRejection {
  const message = `Rejected because: ${reason}`;
  console.error("CONTACT FORM REJECTION:", reason);
  if (extra?.honeypotValue != null) {
    console.error("[contact][api] Honeypot debug value:", extra.honeypotValue);
  }
  if (extra?.schemaIssues?.length) {
    console.error("[contact][api] Schema issues:", extra.schemaIssues);
  }
  if (extra?.payloadSummary) {
    console.error("[contact][api] Payload summary:", extra.payloadSummary);
  }
  console.error("[contact][api] Anti-spam checks:", checks);
  return { ok: false, code, reason, message, checks, ...extra };
}

function summarizePayload(
  formFields: Record<string, unknown>,
  honeypotValue: string,
  formStartedAt: unknown
): Record<string, unknown> {
  const email =
    typeof formFields.email === "string" ? formFields.email.trim() : formFields.email;
  const subject =
    typeof formFields.subject === "string" ? formFields.subject : "";
  const message =
    typeof formFields.message === "string" ? formFields.message : "";

  return {
    keys: Object.keys(formFields),
    expectedKeys: [...CONTACT_FORM_FIELD_KEYS],
    name: formFields.name,
    email,
    phone: formFields.phone,
    subject,
    subjectLength: typeof subject === "string" ? subject.trim().length : null,
    subjectMin: CONTACT_VALIDATION.subjectMin,
    messageLength: typeof message === "string" ? message.trim().length : null,
    messageMin: CONTACT_VALIDATION.messageMin,
    messageMax: CONTACT_VALIDATION.messageMax,
    honeypotField: HONEYPOT_FIELD,
    honeypotValue,
    honeypotLength: honeypotValue.length,
    formStartedAt,
    formStartedAtField: FORM_STARTED_AT_FIELD,
    captchaToken: formFields.captchaToken ?? formFields.captcha ?? null,
  };
}

function extractFormPayload(body: unknown): {
  formFields: Record<string, unknown>;
  honeypotValue: string;
  formStartedAt: unknown;
  extraKeys: string[];
} {
  const record =
    body && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};

  const rawHoneypot = extractHoneypotFromBody(record);
  const honeypotValue =
    rawHoneypot == null ? "" : String(rawHoneypot);
  const formStartedAt = getFormStartedAtFromBody(record);

  const formFields: Record<string, unknown> = {};
  for (const key of CONTACT_FORM_FIELD_KEYS) {
    formFields[key] = record[key];
  }

  const knownKeys = new Set<string>([
    ...CONTACT_FORM_FIELD_KEYS,
    HONEYPOT_FIELD,
    FORM_STARTED_AT_FIELD,
    ...LEGACY_HONEYPOT_FIELDS,
    "captcha",
    "captchaToken",
  ]);
  const extraKeys = Object.keys(record).filter((key) => !knownKeys.has(key));

  return { formFields, honeypotValue, formStartedAt, extraKeys };
}

export function validateContactRequestBody(
  body: unknown,
  options: { rateLimitPassed: boolean; rateLimitReason?: string }
): ContactRequestValidationResult {
  console.log("REQUEST BODY", body);
  console.log("[contact][api] Expected form schema keys:", CONTACT_FORM_FIELD_KEYS);
  console.log("[contact][api] Expected Zod schema:", contactFormSchema.shape);

  const checks: AntiSpamCheckResults = {
    honeypot: { passed: true, value: "" },
    rateLimit: {
      passed: options.rateLimitPassed,
      reason: options.rateLimitReason,
    },
    captcha: {
      passed: true,
      reason: "Captcha not configured — skipped",
    },
    domainValidation: { passed: true },
    contentValidation: { passed: true },
    botDetection: { passed: true },
  };

  console.log("[contact][api] Checking rate limit:", checks.rateLimit);
  if (!options.rateLimitPassed) {
    return reject(
      "RATE_LIMIT",
      options.rateLimitReason ?? "Too many submissions from this IP",
      checks
    );
  }

  const { formFields, honeypotValue, formStartedAt, extraKeys } =
    extractFormPayload(body);
  const payloadSummary = summarizePayload(
    formFields,
    honeypotValue,
    formStartedAt
  );

  console.log("[contact][api] Extracted form fields:", formFields);
  console.log("[contact][api] Payload vs schema:", payloadSummary);

  if (extraKeys.length > 0) {
    console.warn("[contact][api] Unexpected extra keys (ignored):", extraKeys);
  }

  const honeypotVerdict = evaluateHoneypot(honeypotValue, formStartedAt, {
    name: typeof formFields.name === "string" ? formFields.name : undefined,
    email: typeof formFields.email === "string" ? formFields.email : undefined,
  });

  checks.honeypot = {
    passed: honeypotVerdict.passed,
    value: honeypotVerdict.honeypotValue,
    classification: honeypotVerdict.classification,
    reason: honeypotVerdict.reason,
    formDurationMs: honeypotVerdict.formDurationMs,
  };
  checks.botDetection = {
    passed: honeypotVerdict.passed,
    reason: honeypotVerdict.reason,
  };

  console.log("[contact][api] Checking honeypot:", checks.honeypot);
  if (!honeypotVerdict.passed) {
    const reason =
      honeypotVerdict.reason ??
      "Honeypot anti-spam check failed";
    const debugReason = `${reason} (honeypot value: "${honeypotVerdict.honeypotValue}")`;
    return reject("SPAM_DETECTED", debugReason, checks, {
      honeypotValue: honeypotVerdict.honeypotValue,
      payloadSummary,
    });
  }

  console.log("[contact][api] Checking captcha:", checks.captcha);

  const email =
    typeof formFields.email === "string" ? formFields.email.trim() : "";
  if (email) {
    const disposable = isDisposableEmail(email);
    checks.domainValidation = {
      passed: !disposable,
      reason: disposable
        ? `Disposable email domain blocked: ${email.split("@")[1]}`
        : undefined,
    };
    console.log("[contact][api] Checking email domain:", checks.domainValidation);
    if (disposable) {
      return reject("VALIDATION_ERROR", checks.domainValidation.reason!, checks, {
        payloadSummary,
      });
    }
  }

  const phone =
    typeof formFields.phone === "string" ? formFields.phone : "";
  const phoneError = phone ? getPhoneValidationError(phone) : "Phone is required";
  const phoneE164 = phone ? formatPhoneE164(phone) : null;
  console.log("[contact][api] Checking phone format:", {
    phone,
    phoneError: phoneError ?? null,
    phoneE164,
  });

  const parsed = contactFormSchema.safeParse(formFields);
  if (!parsed.success) {
    const issues = parsed.error.issues;
    const firstIssue = issues[0];
    const reason =
      firstIssue?.message ??
      "Form data did not match the expected schema";

    checks.contentValidation = { passed: false, reason };
    console.log("[contact][api] Checking content validation:", checks.contentValidation);
    console.log("[contact][api] Zod validation issues:", issues);

    return reject("VALIDATION_ERROR", reason, checks, {
      schemaIssues: issues,
      payloadSummary,
    });
  }

  checks.contentValidation = { passed: true };
  console.log("[contact][api] All validation checks passed:", checks);

  return {
    ok: true,
    data: parsed.data,
    checks,
    payloadSummary,
  };
}
