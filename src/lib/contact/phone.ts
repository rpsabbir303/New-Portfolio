const PHONE_TEXT_PATTERN = /^\+?[0-9\s\-()]{8,20}$/;
const NON_DIGIT_PATTERN = /\D/g;

export const PHONE_INVALID_DISPLAY_MESSAGE =
  "Please enter a valid phone number.";

function getDigitCount(phone: string): number {
  return phone.replace(NON_DIGIT_PATTERN, "").length;
}

export function isPhoneEffectivelyEmpty(phone: string): boolean {
  return getDigitCount(phone?.trim() ?? "") === 0;
}

export function validateInternationalPhone(phone: string): boolean {
  return getPhoneValidationError(phone) === null;
}

/** Used by form schema — empty phone is invalid. */
export function getPhoneValidationError(phone: string): string | null {
  const trimmed = phone?.trim() ?? "";
  if (!trimmed) {
    return "Please enter a valid phone number.";
  }

  if (!PHONE_TEXT_PATTERN.test(trimmed)) {
    return "Please enter a valid phone number.";
  }

  return null;
}

/** Used by the UI — fully empty phone shows no error until submit. */
export function getPhoneDisplayError(phone: string): string | null {
  const trimmed = phone?.trim() ?? "";
  if (!trimmed) return null;
  return getPhoneValidationError(trimmed);
}

/**
 * Keep plain text phone input, but normalize by removing separators.
 * Returns null when the value is invalid.
 */
export function formatPhoneE164(phone: string): string | null {
  const trimmed = phone?.trim() ?? "";
  if (getPhoneValidationError(trimmed) !== null) return null;

  const digits = trimmed.replace(NON_DIGIT_PATTERN, "");
  if (trimmed.startsWith("+")) {
    return `+${digits}`;
  }

  return digits;
}

export function getCountryNameFromPhone(_phone: string): string {
  return "Unknown";
}
