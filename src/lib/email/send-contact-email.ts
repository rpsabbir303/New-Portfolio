import { site } from "@/data/site";
import {
  buildAutoReplyEmailHtml,
  buildAutoReplySubject,
  buildContactEmailHtml,
  buildContactEmailSubject,
  type AutoReplyEmailData,
  type ContactEmailData,
} from "@/lib/email/contact-template";
import {
  CONTACT_RECIPIENT,
  createMailTransporter,
  getEmailEnvStatus,
  getMailFromAddress,
  getMissingEmailEnvMessage,
} from "@/lib/email/nodemailer";
import {
  classifySmtpError,
  formatSmtpFailureForClient,
  type SmtpFailure,
} from "@/lib/email/smtp-errors";

export type SendContactEmailResult =
  | { success: true; messageId: string }
  | ({ success: false } & SmtpFailure & { envIssue?: string });

function logEnvStatus(): void {
  const status = getEmailEnvStatus();
  console.info("[contact][smtp] Environment check:", {
    hasEmailUser: status.hasUser,
    hasEmailPass: status.hasPass,
    emailUser: status.userPreview,
    passLooksLikeAppPassword: status.passLooksLikeAppPassword,
    recipient: CONTACT_RECIPIENT,
    nodeEnv: process.env.NODE_ENV ?? "development",
  });
}

export async function verifySmtpConnection(): Promise<
  { ok: true } | ({ ok: false } & SmtpFailure)
> {
  const missingEnv = getMissingEmailEnvMessage();
  if (missingEnv) {
    console.error("[contact][smtp] verify skipped:", missingEnv);
    return {
      ok: false,
      message: missingEnv,
      code: "EMAIL_ENV_MISSING",
      details: missingEnv,
    };
  }

  try {
    const transporter = createMailTransporter();
    console.info("[contact][smtp] Verifying Gmail SMTP (smtp.gmail.com:587, secure: false)...");
    const verified = await transporter.verify();
    console.info("[contact][smtp] transporter.verify() succeeded:", verified);
    return { ok: true };
  } catch (error) {
    const failure = classifySmtpError(error);
    console.error("[contact][smtp] transporter.verify() failed:", failure);
    if (error instanceof Error && error.stack) {
      console.error("[contact][smtp] Stack trace:", error.stack);
    }
    return { ok: false, ...failure };
  }
}

export async function sendContactEmail(
  data: ContactEmailData
): Promise<SendContactEmailResult> {
  logEnvStatus();

  const missingEnv = getMissingEmailEnvMessage();
  if (missingEnv) {
    console.error("[contact][smtp] send aborted:", missingEnv);
    return {
      success: false,
      message: missingEnv,
      code: "EMAIL_ENV_MISSING",
      details: missingEnv,
      envIssue: missingEnv,
    };
  }

  const verifyResult = await verifySmtpConnection();
  if (!verifyResult.ok) {
    return { success: false, ...verifyResult };
  }

  const transporter = createMailTransporter();
  const recipient = CONTACT_RECIPIENT;
  const from = getMailFromAddress();

  console.info("[contact][smtp] Sending contact email:", {
    from,
    to: recipient,
    replyTo: data.email,
    subject: buildContactEmailSubject(data.subject),
  });

  try {
    const adminMail = await transporter.sendMail({
      from,
      to: recipient,
      replyTo: data.email,
      subject: buildContactEmailSubject(data.subject),
      html: buildContactEmailHtml(data),
    });

    console.info("[contact][smtp] sendMail success:", {
      messageId: adminMail.messageId,
      accepted: adminMail.accepted,
      rejected: adminMail.rejected,
      response: adminMail.response,
    });

    const autoReplyData: AutoReplyEmailData = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };

    try {
      console.info("[contact][smtp] Sending auto-reply to:", data.email);
      const autoReplyMail = await transporter.sendMail({
        from,
        to: data.email,
        replyTo: CONTACT_RECIPIENT,
        subject: buildAutoReplySubject(),
        html: buildAutoReplyEmailHtml(autoReplyData),
      });
      console.info("[contact][smtp] Auto-reply sent:", autoReplyMail.messageId);
    } catch (autoReplyError) {
      const failure = classifySmtpError(autoReplyError);
      console.error("[contact][smtp] Auto-reply failed (admin email already sent):", failure);
    }

    return { success: true, messageId: adminMail.messageId };
  } catch (error) {
    const failure = classifySmtpError(error);
    console.error("[contact][smtp] sendMail failed:", failure);
    if (error instanceof Error && error.stack) {
      console.error("[contact][smtp] Stack trace:", error.stack);
    }
    return { success: false, ...failure };
  }
}

export { formatSmtpFailureForClient };

/** Diagnostic helper — sends a minimal test email to the portfolio inbox. */
export async function sendHardcodedTestEmail(): Promise<SendContactEmailResult> {
  console.info("[contact][smtp] Running SMTP test email...");
  return sendContactEmail({
    name: "SMTP Test",
    email: "test@example.com",
    phone: "+8801798512255",
    subject: "SMTP Connection Test",
    message: "This is a test from the portfolio contact service.",
    country: "Bangladesh",
    date: new Date().toLocaleDateString("en-US", { timeZone: "Asia/Dhaka" }),
    time: new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Dhaka" }),
    ip: "127.0.0.1",
    browser: "SMTP Test Script",
  });
}
