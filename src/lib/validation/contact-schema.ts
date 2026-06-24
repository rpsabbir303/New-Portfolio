import { z } from "zod";
import { isDisposableEmail } from "@/lib/contact/disposable-domains";
import { getPhoneValidationError } from "@/lib/contact/phone";

export const CONTACT_VALIDATION = {
  nameMin: 3,
  subjectMin: 5,
  messageMin: 20,
  messageMax: 2000,
} as const;

const NAME_REGEX = /^[a-zA-ZÀ-ÿ]+(?:[ '\-][a-zA-ZÀ-ÿ]+)*$/;

const nameField = z.string().superRefine((value, ctx) => {
  const trimmed = value.trim();
  if (!trimmed) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Name is required." });
    return;
  }
  if (trimmed.length < CONTACT_VALIDATION.nameMin) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Name must be at least ${CONTACT_VALIDATION.nameMin} characters.`,
    });
    return;
  }
  if (trimmed.length > 100) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Name is too long." });
    return;
  }
  if (!NAME_REGEX.test(trimmed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please use only letters, spaces, hyphens, and apostrophes.",
    });
  }
});

const emailField = z.string().superRefine((value, ctx) => {
  const trimmed = value.trim();
  if (!trimmed) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please enter a valid email address.",
    });
    return;
  }
  const emailResult = z.string().email().safeParse(trimmed);
  if (!emailResult.success) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please enter a valid email address.",
    });
    return;
  }
  if (isDisposableEmail(trimmed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Temporary email addresses are not accepted.",
    });
  }
});

const phoneField = z.string().superRefine((value, ctx) => {
  const error = getPhoneValidationError(value);
  if (error) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: error });
  }
});

const subjectField = z.string().superRefine((value, ctx) => {
  const trimmed = value.trim();
  if (!trimmed) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Subject is required.",
    });
    return;
  }
  if (trimmed.length < CONTACT_VALIDATION.subjectMin) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Subject must be at least ${CONTACT_VALIDATION.subjectMin} characters.`,
    });
    return;
  }
  if (trimmed.length > 200) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Subject is too long." });
  }
});

const messageField = z.string().superRefine((value, ctx) => {
  const trimmed = value.trim();
  if (!trimmed) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Message is required.",
    });
    return;
  }
  if (trimmed.length < CONTACT_VALIDATION.messageMin) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Message must be at least ${CONTACT_VALIDATION.messageMin} characters.`,
    });
    return;
  }
  if (trimmed.length > CONTACT_VALIDATION.messageMax) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Message must not exceed ${CONTACT_VALIDATION.messageMax} characters.`,
    });
  }
});

/** Client form schema — no transforms (transforms break RHF isValid). */
export const contactFormSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  subject: subjectField,
  message: messageField,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFormWithHoneypot = ContactFormValues & {
  contact_security_check?: string;
  _formStartedAt?: number;
};

export const CONTACT_FORM_FIELD_KEYS = [
  "name",
  "email",
  "phone",
  "subject",
  "message",
] as const;

export const contactFieldSchemas = {
  name: nameField,
  email: emailField,
  phone: phoneField,
  subject: subjectField,
  message: messageField,
} as const;

export type ContactFieldName = keyof typeof contactFieldSchemas;

export const FIELD_LABELS: Record<ContactFieldName, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  subject: "Subject",
  message: "Message",
};

export const FIELD_SUCCESS_MESSAGES: Record<ContactFieldName, string> = {
  name: "Name looks good",
  email: "Valid email address",
  phone: "Phone number looks good",
  subject: "Subject looks good",
  message: "Message looks good",
};
