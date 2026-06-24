import { formatPhoneE164 } from "@/lib/contact/phone";
import {
  contactFieldSchemas,
  contactFormSchema,
  type ContactFieldName,
  type ContactFormValues,
} from "@/lib/validation/contact-schema";
export type FieldValidationSnapshot = {
  nameValid: boolean;
  emailValid: boolean;
  phoneValid: boolean;
  subjectValid: boolean;
  messageValid: boolean;
  captchaValid: boolean;
  formValid: boolean;
};

export function isFieldSchemaValid(
  field: ContactFieldName,
  value: string
): boolean {
  return contactFieldSchemas[field].safeParse(value).success;
}

export function getFieldErrorMessage(
  field: ContactFieldName,
  value: string
): string | null {
  const result = contactFieldSchemas[field].safeParse(value);
  if (result.success) return null;
  return result.error.issues[0]?.message ?? null;
}

export function getFieldValidationSnapshot(
  values: ContactFormValues
): FieldValidationSnapshot {
  const nameValid = isFieldSchemaValid("name", values.name ?? "");
  const emailValid = isFieldSchemaValid("email", values.email ?? "");
  const phoneValid = isFieldSchemaValid("phone", values.phone ?? "");
  const subjectValid = isFieldSchemaValid("subject", values.subject ?? "");
  const messageValid = isFieldSchemaValid("message", values.message ?? "");
  const captchaValid = true;
  const formValid = contactFormSchema.safeParse(values).success;

  return {
    nameValid,
    emailValid,
    phoneValid,
    subjectValid,
    messageValid,
    captchaValid,
    formValid,
  };
}

export function toApiPayload(values: ContactFormValues): ContactFormValues & {
  phone: string;
} {
  const parsed = contactFormSchema.parse(values);
  return {
    ...parsed,
    phone: formatPhoneE164(parsed.phone) ?? parsed.phone,
  };
}
