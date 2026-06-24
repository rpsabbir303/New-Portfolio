import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
  type CountryCode,
} from "libphonenumber-js";

export const PHONE_INVALID_DISPLAY_MESSAGE =
  "Please enter a valid phone number for the selected country.";

export function getNationalNumberLength(phone: string): number {
  const trimmed = phone?.trim() ?? "";
  if (!trimmed) return 0;

  try {
    const parsed = parsePhoneNumber(trimmed);
    return parsed?.nationalNumber?.length ?? 0;
  } catch {
    return 0;
  }
}

export function isPhoneEffectivelyEmpty(phone: string): boolean {
  return getNationalNumberLength(phone) === 0;
}

export function validateInternationalPhone(phone: string): boolean {
  return getPhoneValidationError(phone) === null;
}

/** Used by form schema — empty phone is invalid. */
export function getPhoneValidationError(phone: string): string | null {
  const trimmed = phone?.trim() ?? "";
  if (!trimmed || isPhoneEffectivelyEmpty(trimmed)) {
    return "Please enter a valid phone number.";
  }

  try {
    const parsed = parsePhoneNumber(trimmed);

    if (!parsed?.nationalNumber) {
      return "Please enter a valid phone number.";
    }

    if (!isPossiblePhoneNumber(trimmed) || !isValidPhoneNumber(trimmed)) {
      return "Please enter a valid phone number.";
    }

    return null;
  } catch {
    return "Please enter a valid phone number.";
  }
}

function hasDialCodeOnly(phone: string): boolean {
  const trimmed = phone?.trim() ?? "";
  if (!trimmed) return false;
  return isPhoneEffectivelyEmpty(trimmed) && trimmed.replace(/\D/g, "").length > 0;
}

/** Used by the UI — fully empty phone shows no error until submit. */
export function getPhoneDisplayError(phone: string): string | null {
  const trimmed = phone?.trim() ?? "";
  if (!trimmed) return null;
  if (hasDialCodeOnly(trimmed)) return PHONE_INVALID_DISPLAY_MESSAGE;
  if (isPhoneEffectivelyEmpty(trimmed)) return null;
  if (getPhoneValidationError(trimmed) === null) return null;
  return PHONE_INVALID_DISPLAY_MESSAGE;
}

export function formatPhoneE164(phone: string): string | null {
  try {
    const parsed = parsePhoneNumber(phone);
    if (!parsed?.isValid()) return null;
    return parsed.format("E.164");
  } catch {
    return null;
  }
}

export function getCountryNameFromPhone(phone: string): string {
  try {
    const parsed = parsePhoneNumber(phone);
    const country = parsed?.country as CountryCode | undefined;
    if (!country) return "Unknown";
    return new Intl.DisplayNames(["en"], { type: "region" }).of(country) ?? country;
  } catch {
    return "Unknown";
  }
}

export function detectDefaultCountry(): string {
  if (typeof navigator === "undefined") return "us";

  try {
    const locale = new Intl.Locale(navigator.language);
    if (locale.region) return locale.region.toLowerCase();
  } catch {
    const segment = navigator.language.split("-")[1];
    if (segment) return segment.toLowerCase();
  }

  return "us";
}
