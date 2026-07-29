import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  checkDuplicate,
  escapeHtml,
  markSubmitted,
  sanitizeHeaderValue,
  validateContact,
  type ContactInput,
} from "@/lib/contact-validation";

export const runtime = "nodejs";

const TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? "yasin@kiwimarketingagency.com";
const SMTP_USER =
  process.env.SMTP_USER ?? "ahmadalkhalid533@gmail.com";
const SMTP_PASS = (process.env.SMTP_PASS ?? "").replace(/\s+/g, "");
const FROM_NAME = process.env.CONTACT_FROM_NAME ?? "Kiwi Website";

function createTransport() {
  if (!SMTP_PASS) {
    throw new Error("SMTP_PASS is not configured");
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export async function POST(request: Request) {
  // Origin verification
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (
        originHost !== host &&
        !originHost.endsWith("kiwimarketingagency.com") &&
        !originHost.includes("localhost") &&
        !originHost.includes("127.0.0.1")
      ) {
        return NextResponse.json({ error: "Yetkisiz istek / Unauthorized request" }, { status: 403 });
      }
    } catch {
      // Ignore URL parse error
    }
  }

  let data: ContactInput;
  try {
    data = (await request.json()) as ContactInput;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek / Invalid payload." }, { status: 400 });
  }

  const validated = validateContact(data);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 422 });
  }

  const lead = validated.value;

  if (checkDuplicate(lead.fingerprint)) {
    return NextResponse.json(
      {
        error:
          "Bu bilgilerle son 2 saat içinde zaten bir talep gönderildi. Lütfen biraz bekleyin veya bizi doğrudan arayın.",
      },
      { status: 429 }
    );
  }

  if (!SMTP_PASS) {
    console.error("[contact] SMTP_PASS missing. Lead:", {
      name: lead.name,
      email: lead.email,
      phone: lead.phoneE164,
    });
    return NextResponse.json(
      {
        error:
          "E-posta servisi yapılandırılmamış. Lütfen +90 532 630 57 13 numarasından bize ulaşın.",
      },
      { status: 503 }
    );
  }

  const safeName = sanitizeHeaderValue(lead.name);
  const safeEmail = sanitizeHeaderValue(lead.email);
  const safeService = sanitizeHeaderValue(lead.service);

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
      <h2 style="margin:0 0 8px;font-weight:600">Yeni web sitesi lead’i</h2>
      <p style="margin:0 0 20px;color:#666;font-size:14px">kiwimarketingagency.com/iletisim</p>
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        <tr><td style="padding:8px 0;color:#666;width:120px">İsim</td><td style="padding:8px 0"><strong>${escapeHtml(safeName)}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Telefon</td><td style="padding:8px 0"><a href="tel:${escapeHtml(lead.phoneE164)}">${escapeHtml(lead.phoneDisplay)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#666">E-posta</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(safeEmail)}">${escapeHtml(safeEmail)}</a></td></tr>
        ${lead.company ? `<tr><td style="padding:8px 0;color:#666">Şirket</td><td style="padding:8px 0">${escapeHtml(lead.company)}</td></tr>` : ""}
        ${lead.service ? `<tr><td style="padding:8px 0;color:#666">Hizmet</td><td style="padding:8px 0">${escapeHtml(lead.service)}</td></tr>` : ""}
      </table>
      ${
        lead.message
          ? `<div style="margin-top:20px;padding:16px;background:#f6f7f2;border-radius:12px"><p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#888">Mesaj</p><p style="margin:0;line-height:1.6">${escapeHtml(lead.message).replace(/\n/g, "<br/>")}</p></div>`
          : ""
      }
    </div>
  `;

  const text = [
    `Yeni lead — ${safeName}`,
    `Telefon: ${lead.phoneDisplay}`,
    `E-posta: ${safeEmail}`,
    lead.company ? `Şirket: ${lead.company}` : "",
    lead.service ? `Hizmet: ${safeService}` : "",
    lead.message ? `Mesaj: ${lead.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const transporter = createTransport();
    await transporter.sendMail({
      from: `"${FROM_NAME}" <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: `${safeName} <${safeEmail}>`,
      subject: `Yeni Lead — ${safeName}${safeService ? ` · ${safeService}` : ""}`,
      text,
      html,
    });

    markSubmitted(lead.fingerprint);

    return NextResponse.json({
      ok: true,
      message:
        "Teşekkürler! Mesajınız bize ulaştı. Ekibimiz en kısa sürede sizinle iletişime geçecek.",
      redirectUrl: "/tesekkurler",
    });
  } catch (err) {
    console.error("[contact] Nodemailer error:", err);
    return NextResponse.json(
      { error: "Mesaj gönderilemedi. Lütfen tekrar deneyin veya bizi arayın." },
      { status: 502 }
    );
  }
}
