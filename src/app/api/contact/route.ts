import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
};

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@kiwimarketingagency.com";
// Until a custom domain is verified in Resend, the safe default sender is
// onboarding@resend.dev. Set CONTACT_FROM_EMAIL once the domain is verified.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Kiwi Website <onboarding@resend.dev>";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const name = (data.name ?? "").trim();
  const phone = (data.phone ?? "").replace(/\D/g, "");
  const email = (data.email ?? "").trim();
  const company = (data.company ?? "").trim();
  const service = (data.service ?? "").trim();
  const message = (data.message ?? "").trim();

  if (!name) {
    return NextResponse.json({ error: "İsim zorunludur." }, { status: 422 });
  }
  if (phone.length !== 10) {
    return NextResponse.json(
      { error: "Telefon numarası 10 haneli olmalıdır (başında 0 olmadan)." },
      { status: 422 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Geçerli bir e-posta adresi girin." },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No email provider configured yet. Log so the submission is not lost and
    // surface a clear error instead of pretending it was delivered.
    console.error("[contact] RESEND_API_KEY is not set. Submission:", {
      name,
      phone,
      email,
      company,
      service,
      message,
    });
    return NextResponse.json(
      { error: "E-posta servisi yapılandırılmamış. Lütfen doğrudan bize ulaşın." },
      { status: 503 }
    );
  }

  const html = `
    <h2>Yeni İletişim Formu</h2>
    <p><strong>İsim:</strong> ${escapeHtml(name)}</p>
    <p><strong>Telefon:</strong> 0${escapeHtml(phone)}</p>
    <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
    ${company ? `<p><strong>Şirket:</strong> ${escapeHtml(company)}</p>` : ""}
    ${service ? `<p><strong>Hizmet:</strong> ${escapeHtml(service)}</p>` : ""}
    ${message ? `<p><strong>Mesaj:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>` : ""}
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Yeni İletişim Formu — ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] Resend error:", res.status, detail);
      return NextResponse.json(
        { error: "Mesaj gönderilemedi. Lütfen tekrar deneyin." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Beklenmeyen bir hata oluştu." },
      { status: 500 }
    );
  }
}
