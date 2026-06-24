/** Common disposable / temporary email providers blocked at submission time. */
export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "temp-mail.org",
  "guerrillamail.com",
  "yopmail.com",
  "10minutemail.com",
  "fakemail.net",
  "trashmail.com",
  "tempmail.com",
  "sharklasers.com",
  "throwawaymail.com",
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}
