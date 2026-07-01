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

function readSmtpEmail(): string | undefined {
  return process.env.SMTP_EMAIL?.trim();
}

function readSmtpPassword(): string | undefined {
  return process.env.SMTP_PASSWORD?.trim();
}

export function assertEmailConfig(): void {
  if (!readSmtpEmail() || !readSmtpPassword()) {
    throw new Error("Email configuration missing");
  }
  emailConfigValidated = true;
}

/** Called once when the Node.js server starts. */
export function validateEmailConfigOnStartup(): void {
  if (emailConfigValidated) return;

  const user = readSmtpEmail();
  const pass = readSmtpPassword();

  if (!user || !pass) {
    console.warn(
      "[contact][smtp] SMTP_EMAIL and SMTP_PASSWORD are not set. Contact form email delivery will fail until they are configured."
    );
    return;
  }

  emailConfigValidated = true;
  void maskEmail(user);
}

export function getEmailEnvStatus(): EmailEnvStatus {
  const user = readSmtpEmail();
  const pass = readSmtpPassword();
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
    return "SMTP_EMAIL and SMTP_PASSWORD are missing. Add them to your environment (use a Google App Password for SMTP_PASSWORD).";
  }
  if (!hasUser) {
    return "SMTP_EMAIL is missing. Set it to your Gmail address.";
  }
  if (!hasPass) {
    return "SMTP_PASSWORD is missing. Set it to a Google App Password.";
  }
  return null;
}

export function createMailTransporter(): Transporter<SMTPTransport.SentMessageInfo> {
  const missing = getMissingEmailEnvMessage();
  if (missing) {
    throw new Error(missing);
  }

  const user = readSmtpEmail()!;
  const pass = readSmtpPassword()!.replace(/\s/g, "");

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
  const user = readSmtpEmail();
  if (!user) return `Sabbir Ahmed <${CONTACT_RECIPIENT}>`;
  return `Sabbir Ahmed <${user}>`;
}

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "***";
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}
