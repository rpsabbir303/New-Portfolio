import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { Transporter } from "nodemailer";
import { site } from "@/data/site";

export const CONTACT_RECIPIENT = site.email;

export type EmailEnvStatus = {
  hasUser: boolean;
  hasPass: boolean;
  userPreview: string | null;
  passLooksLikeAppPassword: boolean;
};

let emailConfigValidated = false;

export function assertEmailConfig(): void {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email configuration missing");
  }
  emailConfigValidated = true;
}

/** Called once when the Node.js server starts. */
export function validateEmailConfigOnStartup(): void {
  if (emailConfigValidated) return;

  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();

  if (!user || !pass) {
    throw new Error("Email configuration missing");
  }

  emailConfigValidated = true;
  void maskEmail(user);
}

export function getEmailEnvStatus(): EmailEnvStatus {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();
  const normalizedPass = pass?.replace(/\s/g, "") ?? "";

  return {
    hasUser: Boolean(user),
    hasPass: Boolean(pass),
    userPreview: user ? maskEmail(user) : null,
    passLooksLikeAppPassword: normalizedPass.length === 16,
  };
}

export function getMissingEmailEnvMessage(): string | null {
  const { hasUser, hasPass } = getEmailEnvStatus();
  if (!hasUser && !hasPass) {
    return "EMAIL_USER and EMAIL_PASS are missing. Add them to .env.local (use a Google App Password for EMAIL_PASS).";
  }
  if (!hasUser) {
    return "EMAIL_USER is missing. Set it to your Gmail address in .env.local.";
  }
  if (!hasPass) {
    return "EMAIL_PASS is missing. Set it to a Google App Password in .env.local.";
  }
  return null;
}

export function createMailTransporter(): Transporter<SMTPTransport.SentMessageInfo> {
  const missing = getMissingEmailEnvMessage();
  if (missing) {
    throw new Error(missing);
  }

  const user = process.env.EMAIL_USER!.trim();
  const pass = process.env.EMAIL_PASS!.trim().replace(/\s/g, "");

  const envStatus = getEmailEnvStatus();
  void envStatus.passLooksLikeAppPassword;

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user,
      pass,
    },
    tls: {
      minVersion: "TLSv1.2",
    },
  });
}

export function getMailFromAddress(): string {
  const user = process.env.EMAIL_USER?.trim();
  if (!user) return `Sabbir Ahmed <${CONTACT_RECIPIENT}>`;
  return `Sabbir Ahmed <${user}>`;
}

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "***";
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}
