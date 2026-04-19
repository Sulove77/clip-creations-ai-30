import nodemailer from "nodemailer";
import { z } from "zod";

const ContactPayloadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long"),
  email: z.string().trim().email("Please provide a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters long"),
  website: z.string().optional(),
});

const EmailSchema = z.string().trim().email();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  __contactRateLimitStore?: Map<string, RateLimitEntry>;
};

const rateLimitStore =
  globalForRateLimit.__contactRateLimitStore ?? new Map<string, RateLimitEntry>();

globalForRateLimit.__contactRateLimitStore = rateLimitStore;

function getClientIp(req: { headers: Record<string, string | string[] | undefined> }): string {
  const forwardedFor = req.headers["x-forwarded-for"];
  const forwardedValue = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;

  if (forwardedValue) {
    return forwardedValue.split(",")[0]?.trim() || "unknown";
  }

  const realIp = req.headers["x-real-ip"];
  return (Array.isArray(realIp) ? realIp[0] : realIp) || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  existing.count += 1;
  rateLimitStore.set(ip, existing);

  return existing.count > RATE_LIMIT_MAX_REQUESTS;
}

function getRequiredEnv(name: string): string {
  const rawValue = process.env[name];

  if (!rawValue) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  const value = rawValue.trim().replace(/^"|"$/g, "").replace(/^'|'$/g, "");

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function normalizeSmtpPassword(value: string): string {
  // App passwords are often copied with spaces from Google UI.
  return value.replace(/\s+/g, "");
}

function buildPublicErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Contact service is not configured right now. Please try again later.";
  }

  if (error.message.startsWith("Missing required environment variable:")) {
    return "Contact service setup is incomplete. Set SMTP vars in Vercel (Preview and Production), then redeploy.";
  }

  const maybeCode = (error as { code?: string }).code;
  if (maybeCode === "EAUTH") {
    return "SMTP authentication failed. Verify SMTP_USER and Gmail App Password in Vercel env vars.";
  }

  return "Contact service is not configured right now. Please try again later.";
}

function sendJson(res: { status: (code: number) => { json: (body: unknown) => void } }, status: number, body: unknown) {
  res.status(status).json(body);
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { ok: false, error: "Method Not Allowed" });
  }

  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return sendJson(res, 429, {
      ok: false,
      error: "Too many requests. Please try again in a few minutes.",
    });
  }

  let payload: unknown = req.body;

  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      return sendJson(res, 400, { ok: false, error: "Invalid JSON payload." });
    }
  }

  const parsed = ContactPayloadSchema.safeParse(payload);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return sendJson(res, 400, {
      ok: false,
      error: firstIssue?.message ?? "Invalid contact form input.",
    });
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return sendJson(res, 200, { ok: true });
  }

  try {
    const host = getRequiredEnv("SMTP_HOST");
    const portRaw = getRequiredEnv("SMTP_PORT");
    const user = getRequiredEnv("SMTP_USER");
    const pass = normalizeSmtpPassword(getRequiredEnv("SMTP_PASS"));
    const senderName = process.env.SITE_NAME || "Portfolio";
    const contactToEmail = parsed.data.email;

    if (!EmailSchema.safeParse(contactToEmail).success) {
      throw new Error("Submitted email must be a valid email");
    }

    const port = Number(portRaw);

    if (!Number.isFinite(port) || port <= 0) {
      throw new Error("SMTP_PORT must be a valid positive number");
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `${senderName} <${user}>`,
      to: contactToEmail,
      subject: "Thank you for your message",
      text: [
        `Hello ${parsed.data.name},`,
        "",
        `Thank you for reaching out to ${senderName}.`,
        "I have received your query and will get back to you soon.",
        "",
        "Here is a copy of your message:",
        parsed.data.message,
        "",
        "Best regards,",
        senderName,
      ].join("\n"),
    });

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return sendJson(res, 500, {
      ok: false,
      error: buildPublicErrorMessage(error),
    });
  }
}
