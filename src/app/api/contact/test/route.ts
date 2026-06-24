import { NextResponse } from "next/server";
import { getEmailEnvStatus } from "@/lib/email/nodemailer";
import { sendHardcodedTestEmail } from "@/lib/email/send-contact-email";
import { shouldExposeSmtpDetails } from "@/lib/email/smtp-errors";

export const runtime = "nodejs";

/**
 * Development/diagnostic route — GET /api/contact/test
 * Sends a hardcoded test email to rpsabbir.ahmed@gmail.com
 */
export async function GET() {
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_SMTP_TEST !== "true") {
    return NextResponse.json(
      { success: false, message: "SMTP test route is disabled in production." },
      { status: 403 }
    );
  }

  console.info("[contact][test] GET /api/contact/test — hardcoded SMTP test");
  const envStatus = getEmailEnvStatus();
  console.info("[contact][test] Email env status:", envStatus);

  const result = await sendHardcodedTestEmail();

  if (!result.success) {
    const payload: Record<string, unknown> = {
      success: false,
      message: result.message,
      code: result.code,
      envStatus,
    };
    if (shouldExposeSmtpDetails()) {
      payload.details = result.details;
    }
    return NextResponse.json(payload, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: "Hardcoded test email sent successfully.",
    messageId: result.messageId,
    envStatus,
  });
}
