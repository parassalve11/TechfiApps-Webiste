import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  project?: string;
  website?: string;
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });

export async function POST(req: Request) {
  let payload: ContactPayload = {};

  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const project = (payload.project ?? "").trim();
  const website = (payload.website ?? "").trim();

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !project) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 0);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM || user;
  const to = process.env.EMAIL_TO || user;

  if (!host || !port || !user || !pass || !from || !to) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeProject = escapeHtml(project);

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `New contact request from ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\nProject:\n${project}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="margin: 0 0 12px;">New contact request</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Project:</strong></p>
          <p style="white-space: pre-wrap;">${safeProject}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json({ error: "Unable to send email right now." }, { status: 500 });
  }
}
