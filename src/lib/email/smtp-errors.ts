type NodemailerErrorLike = {
  code?: string;
  responseCode?: number;
  command?: string;
  message?: string;
};

export type SmtpFailure = {
  message: string;
  code: string;
  details: string;
};

export function classifySmtpError(error: unknown): SmtpFailure {
  const err = error as NodemailerErrorLike;
  const details =
    error instanceof Error
      ? `${error.name}: ${error.message}`
      : typeof error === "string"
        ? error
        : JSON.stringify(error);

  const combined = `${err.code ?? ""} ${err.message ?? details}`.toLowerCase();

  if (
    err.code === "EAUTH" ||
    err.responseCode === 535 ||
    combined.includes("authentication") ||
    combined.includes("username and password not accepted") ||
    combined.includes("invalid login")
  ) {
    return {
      message: "SMTP authentication failed — check EMAIL_USER and EMAIL_PASS (Google App Password required)",
      code: "SMTP_AUTH_FAILED",
      details,
    };
  }

  if (
    err.code === "ECONNECTION" ||
    err.code === "ETIMEDOUT" ||
    err.code === "ESOCKET" ||
    err.code === "ENOTFOUND" ||
    combined.includes("connect") ||
    combined.includes("timeout") ||
    combined.includes("getaddrinfo")
  ) {
    return {
      message: "Unable to connect to Gmail SMTP (smtp.gmail.com:587)",
      code: "SMTP_CONNECTION_FAILED",
      details,
    };
  }

  return {
    message: "Email delivery failed",
    code: "SMTP_SEND_FAILED",
    details,
  };
}

export function shouldExposeSmtpDetails(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function formatSmtpFailureForClient(failure: SmtpFailure): {
  message: string;
  reason: string;
  details?: string;
} {
  const reason = failure.message;
  if (shouldExposeSmtpDetails()) {
    return {
      message: `Rejected because: ${reason}`,
      reason,
      details: failure.details,
    };
  }
  return {
    message: `Rejected because: ${reason}`,
    reason,
  };
}
