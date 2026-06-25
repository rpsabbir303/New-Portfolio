import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/contact/get-client-ip";
import { formatPhoneE164, getCountryNameFromPhone } from "@/lib/contact/phone";
import { checkContactRateLimit } from "@/lib/contact/rate-limit";
import { sanitizeContactPayload } from "@/lib/contact/sanitize";
import { validateContactRequestBody } from "@/lib/contact/validate-contact-request";
import { sendContactEmail, formatSmtpFailureForClient } from "@/lib/email/send-contact-email";

export const runtime = "nodejs";

function rejectionResponse(
  result: Extract<
    ReturnType<typeof validateContactRequestBody>,
    { ok: false }
  >,
  status: number
) {
  return NextResponse.json(
    {
      success: false,
      message: result.message,
      reason: result.reason,
      code: result.code,
      checks: result.checks,
      ...(result.honeypotValue != null
        ? { honeypotValue: result.honeypotValue }
        : {}),
      ...(result.schemaIssues ? { schemaIssues: result.schemaIssues } : {}),
      ...(result.payloadSummary ? { payloadSummary: result.payloadSummary } : {}),
    },
    { status }
  );
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    const rateLimit = checkContactRateLimit(ip);

    if (!rateLimit.allowed) {
      const reason = `Too many submissions from this IP. Retry after ${rateLimit.retryAfterSeconds ?? 3600} seconds.`;
      console.error("CONTACT FORM REJECTION:", reason);
      return NextResponse.json(
        {
          success: false,
          message: `Rejected because: ${reason}`,
          reason,
          code: "RATE_LIMIT",
          retryAfterSeconds: rateLimit.retryAfterSeconds,
          checks: {
            rateLimit: { passed: false, reason },
          },
        },
        {
          status: 429,
          headers: rateLimit.retryAfterSeconds
            ? { "Retry-After": String(rateLimit.retryAfterSeconds) }
            : undefined,
        }
      );
    }

    const body = await request.json();

    const validation = validateContactRequestBody(body, {
      rateLimitPassed: true,
    });

    if (!validation.ok) {
      const status =
        validation.code === "SPAM_DETECTED"
          ? 400
          : validation.code === "VALIDATION_ERROR"
            ? 400
            : 400;
      return rejectionResponse(validation, status);
    }

    const sanitized = sanitizeContactPayload(validation.data);
    const phoneE164 = formatPhoneE164(sanitized.phone) ?? sanitized.phone;
    const country = getCountryNameFromPhone(phoneE164);

    const browser = request.headers.get("user-agent") ?? "Unknown";
    const now = new Date();
    const date = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeZone: "Asia/Dhaka",
    }).format(now);
    const time = new Intl.DateTimeFormat("en-US", {
      timeStyle: "long",
      timeZone: "Asia/Dhaka",
    }).format(now);

    const emailResult = await sendContactEmail({
      ...sanitized,
      phone: phoneE164,
      country,
      date,
      time,
      ip,
      browser,
    });

    if (!emailResult.success) {
      const formatted = formatSmtpFailureForClient(emailResult);
      console.error("CONTACT FORM REJECTION:", formatted.reason);
      console.error("[contact][smtp] Details:", emailResult.details);
      if (emailResult.code === "EMAIL_ENV_MISSING") {
        console.error(
          "[contact][smtp] Create .env.local with EMAIL_USER and EMAIL_PASS (Google App Password)."
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: formatted.message,
          reason: formatted.reason,
          code: emailResult.code,
          ...(formatted.details ? { details: formatted.details } : {}),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
      messageId: emailResult.messageId,
    });
  } catch (error) {
    const details =
      error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("CONTACT FORM REJECTION:", details);
    console.error("[contact][api] Stack trace:", stack ?? "No stack available");
    console.error("[contact][api] Unhandled error object:", error);

    return NextResponse.json(
      {
        success: false,
        message: `Rejected because: ${details}`,
        reason: details,
        code: "SERVER_ERROR",
        details,
        stack: process.env.NODE_ENV === "development" ? stack : undefined,
      },
      { status: 500 }
    );
  }
}
