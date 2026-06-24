import { escapeHtml } from "@/lib/email/escape-html";
import { site } from "@/data/site";

export type ContactEmailData = {
  name: string;
  email: string;
  country: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  time: string;
  ip: string;
  browser: string;
};

export type AutoReplyEmailData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function buildContactEmailSubject(subject: string): string {
  return `New Portfolio Inquiry — ${subject}`;
}

export function buildAutoReplySubject(): string {
  return "Thank you for contacting Sabbir Ahmed";
}

export function buildSubmittedTime(date: string, time: string): string {
  return `${date} at ${time}`;
}

export function buildContactEmailHtml(data: ContactEmailData): string {
  const { name, email, country, phone, subject, message, date, time } = data;
  const submittedTime = buildSubmittedTime(date, time);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Contact</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0a0a0a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:linear-gradient(165deg,#161616 0%,#0a0a0a 55%);border:1px solid rgba(255,255,255,0.09);border-radius:24px;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,0.45);">
          <tr>
            <td style="padding:36px 36px 28px;border-bottom:1px solid rgba(255,255,255,0.07);background:linear-gradient(135deg,rgba(255,0,110,0.14) 0%,transparent 60%);">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#ff006e;">${escapeHtml(site.name)}</p>
              <h1 style="margin:0;font-size:24px;font-weight:800;line-height:1.25;color:#ffffff;letter-spacing:0.02em;">New Contact Form Submission</h1>
              <p style="margin:12px 0 0;font-size:14px;line-height:1.5;color:#9ca3af;">A visitor submitted your portfolio contact form.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 36px 12px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${fieldRow("Full Name", name)}
                ${fieldRow("Email", email, "email")}
                ${fieldRow("Phone Number", phone, "phone")}
                ${fieldRow("Subject", subject)}
                ${fieldRow("Message", message, "multiline")}
                ${fieldRow("Country", country)}
                ${fieldRow("Submitted Time", submittedTime)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 36px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:rgba(255,0,110,0.07);border:1px solid rgba(255,0,110,0.22);border-radius:16px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#ff006e;">Reply-To</p>
                    <p style="margin:0;font-size:15px;line-height:1.6;color:#e5e7eb;">
                      Hit reply to respond directly to
                      <a href="mailto:${escapeHtml(email)}" style="color:#ff4d94;text-decoration:none;font-weight:600;">${escapeHtml(email)}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 32px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:20px 0 4px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">Technical metadata</p>
              <p style="margin:0 0 6px;font-size:12px;line-height:1.5;color:#9ca3af;">IP: ${escapeHtml(data.ip)}</p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:#9ca3af;">Browser: ${escapeHtml(data.browser)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildAutoReplyEmailHtml(data: AutoReplyEmailData): string {
  const { name, subject, message } = data;
  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank you for contacting Sabbir Ahmed</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0a0a0a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:linear-gradient(160deg,#141414 0%,#0a0a0a 100%);border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
          <tr>
            <td style="padding:32px 32px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#ff006e;">${escapeHtml(site.name)}</p>
              <h1 style="margin:0;font-size:22px;font-weight:800;line-height:1.3;color:#ffffff;">Thank you for reaching out</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#e5e7eb;">Hi ${safeName},</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#d1d5db;">Thank you for reaching out.</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#d1d5db;">I have received your message and will get back to you as soon as possible.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:14px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#6b7280;">Your submitted details</p>
                    <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#ffffff;"><strong style="color:#9ca3af;">Subject:</strong><br />${safeSubject}</p>
                    <p style="margin:0;font-size:14px;line-height:1.6;color:#ffffff;"><strong style="color:#9ca3af;">Message:</strong><br />${safeMessage}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;">
              <p style="margin:0 0 4px;font-size:14px;line-height:1.6;color:#d1d5db;">Best Regards,</p>
              <p style="margin:0;font-size:15px;font-weight:700;color:#ffffff;">${escapeHtml(site.name)}</p>
              <p style="margin:4px 0 0;font-size:13px;color:#9ca3af;">${escapeHtml(site.role)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function fieldRow(
  label: string,
  value: string,
  type: "text" | "email" | "phone" | "multiline" = "text"
): string {
  const safeValue = escapeHtml(value);
  const valueHtml =
    type === "email"
      ? `<a href="mailto:${safeValue}" style="color:#ff4d94;text-decoration:none;font-weight:600;">${safeValue}</a>`
      : type === "phone"
        ? `<a href="tel:${safeValue}" style="color:#ff4d94;text-decoration:none;font-weight:600;">${safeValue}</a>`
        : type === "multiline"
          ? safeValue.replace(/\n/g, "<br />")
          : safeValue;

  return `<tr>
    <td style="padding-bottom:20px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6b7280;">${label}</p>
      <p style="margin:0;font-size:16px;line-height:1.65;color:#ffffff;white-space:${type === "multiline" ? "pre-wrap" : "normal"};">${valueHtml}</p>
    </td>
  </tr>`;
}
