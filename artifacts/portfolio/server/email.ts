import { Resend } from "resend";

let cachedResend: Resend | null = null;

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getAdminEmail(): string {
  return getRequiredEnv("ADMIN_EMAIL");
}

function getResendClient(): Resend {
  if (!cachedResend) {
    cachedResend = new Resend(getRequiredEnv("RESEND_API_KEY"));
  }

  return cachedResend;
}

function getFromAddress(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || "Narovana Portfolio <onboarding@resend.dev>";
}

export async function sendAdminEmail(subject: string, html: string, replyTo?: string): Promise<void> {
  const { error } = await getResendClient().emails.send({
    from: getFromAddress(),
    to: getAdminEmail(),
    subject,
    html,
    replyTo,
  });

  if (error) {
    throw new Error(error.message || "Resend email delivery failed.");
  }
}
