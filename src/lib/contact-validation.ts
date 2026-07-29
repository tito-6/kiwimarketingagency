import { createHash } from "crypto";

export type ContactInput = {
  name?: string;
  phone?: string;
  countryDial?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
  website?: string; // honeypot
};

export type ValidatedContact = {
  name: string;
  phoneE164: string;
  phoneDisplay: string;
  email: string;
  company: string;
  service: string;
  message: string;
  fingerprint: string;
};

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "10minutemail.com",
  "yopmail.com",
  "trashmail.com",
  "sharklasers.com",
  "dispostable.com",
  "getnada.com",
]);

const TRASH_NAME = /^(test|asdf|qwerty|xxx|aaa|bbb|admin|user|null|undefined|spam|asd|aaa aaa)$/i;
const URL_SPAM = /(https?:\/\/|www\.|\[url)/i;

/** SQL Injection payload signature detector. */
const SQLI_PATTERNS = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|UNION|TRUNCATE|DECLARE|WAITFOR|CAST|CONVERT)\b)|(--|\/\*|\*\/|;|'OR'|"OR")/i;

/** Strip header injection carriage returns and line feeds. */
export function sanitizeHeaderValue(val: string): string {
  return val.replace(/[\r\n]+/g, " ").trim();
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Normalize phone numbers supporting Turkish (+90) and international country codes.
 */
export function normalizePhone(
  raw: string,
  countryDial: string = "+90"
): { ok: true; e164: string; display: string } | { ok: false; error: string } {
  let trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, error: "Lütfen geçerli bir telefon numarası girin. / Please enter a valid phone number." };
  }

  const cleanDial = sanitizeHeaderValue(countryDial).startsWith("+")
    ? sanitizeHeaderValue(countryDial)
    : `+${onlyDigits(countryDial)}`;

  // If user entered full number starting with +
  let e164 = "";
  let display = "";

  if (trimmed.startsWith("+")) {
    const digits = onlyDigits(trimmed);
    if (digits.length < 8 || digits.length > 15) {
      return { ok: false, error: "Geçersiz telefon numarası uzunluğu. / Invalid phone number length." };
    }
    e164 = `+${digits}`;
    display = e164;
  } else {
    let digits = onlyDigits(trimmed);
    if (digits.startsWith("00")) digits = digits.slice(2);

    const dialDigits = onlyDigits(cleanDial); // e.g. "90"
    
    // Turkish national formatting logic (5XX XXX XX XX)
    if (dialDigits === "90") {
      if (digits.startsWith("0")) digits = digits.slice(1);
      if (digits.startsWith("90")) digits = digits.slice(2);

      if (digits.length !== 10 || !digits.startsWith("5")) {
        return {
          ok: false,
          error: "Türkiye cep numaraları 5 ile başlamalı ve 10 haneli olmalıdır (Örn: 532 630 57 13).",
        };
      }
      e164 = `+90${digits}`;
      display = `+90 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
    } else {
      // International formatting
      if (digits.startsWith(dialDigits)) {
        digits = digits.slice(dialDigits.length);
      }
      if (digits.length < 5 || digits.length > 14) {
        return {
          ok: false,
          error: "Uluslararası telefon numarası geçersiz. / International phone number is invalid.",
        };
      }
      e164 = `+${dialDigits}${digits}`;
      display = `${cleanDial} ${digits}`;
    }
  }

  return { ok: true, e164, display };
}

export function isValidEmail(value: string): boolean {
  const email = value.trim().toLowerCase();
  if (email.length > 254) return false;
  if (
    !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i.test(
      email
    )
  ) {
    return false;
  }
  const domain = email.split("@")[1] ?? "";
  if (DISPOSABLE_DOMAINS.has(domain)) return false;
  if (!domain.includes(".")) return false;
  return true;
}

export function validateContact(
  data: ContactInput
): { ok: true; value: ValidatedContact } | { ok: false; error: string } {
  // Honeypot — bot trap
  if ((data.website ?? "").trim()) {
    return { ok: false, error: "İstek reddedildi. / Request denied." };
  }

  // Security: sanitize CRLF and strip excessive space
  const name = sanitizeHeaderValue(data.name ?? "").replace(/\s+/g, " ");
  const email = sanitizeHeaderValue(data.email ?? "").toLowerCase();
  const company = sanitizeHeaderValue(data.company ?? "").slice(0, 120);
  const service = sanitizeHeaderValue(data.service ?? "").slice(0, 80);
  const message = (data.message ?? "").trim().slice(0, 2000);
  const countryDial = sanitizeHeaderValue(data.countryDial ?? "+90");

  // Check SQLi patterns in string fields
  if (
    SQLI_PATTERNS.test(name) ||
    SQLI_PATTERNS.test(email) ||
    SQLI_PATTERNS.test(company) ||
    SQLI_PATTERNS.test(service) ||
    SQLI_PATTERNS.test(message)
  ) {
    return { ok: false, error: "Geçersiz içerik algılandı. / Malicious input detected." };
  }

  if (name.length < 2) {
    return { ok: false, error: "Lütfen adınızı girin (en az 2 karakter)." };
  }
  if (name.length > 80) {
    return { ok: false, error: "İsim çok uzun." };
  }
  if (!/^[\p{L}\p{M}'’.\- ]+$/u.test(name)) {
    return { ok: false, error: "İsim yalnızca harf ve boşluk içermelidir." };
  }
  if (TRASH_NAME.test(name) || /^(.)\1+$/u.test(name.replace(/\s/g, ""))) {
    return { ok: false, error: "Lütfen gerçek adınızı girin." };
  }

  const phone = normalizePhone(data.phone ?? "", countryDial);
  if (!phone.ok) return phone;

  if (!isValidEmail(email)) {
    return { ok: false, error: "Geçerli bir e-posta adresi girin." };
  }

  if (message && message.length < 4) {
    return { ok: false, error: "Mesajınız çok kısa. Lütfen kısaca projenizi anlatın." };
  }
  if (message && URL_SPAM.test(message) && message.split(/\s+/).length < 4) {
    return { ok: false, error: "Mesaj spam olarak algılandı. Lütfen düzenleyin." };
  }

  const fingerprint = createHash("sha256")
    .update(`${email}|${phone.e164}`)
    .digest("hex");

  return {
    ok: true,
    value: {
      name,
      phoneE164: phone.e164,
      phoneDisplay: phone.display,
      email,
      company,
      service,
      message,
      fingerprint,
    },
  };
}

/** In-memory 2-hour duplicate guard */
const recentSubmissions = new Map<string, number>();
const DEDUPE_MS = 2 * 60 * 60 * 1000;

export function checkDuplicate(fingerprint: string): boolean {
  const now = Date.now();
  for (const [key, ts] of recentSubmissions) {
    if (now - ts > DEDUPE_MS) recentSubmissions.delete(key);
  }
  const prev = recentSubmissions.get(fingerprint);
  if (prev && now - prev < DEDUPE_MS) return true;
  return false;
}

export function markSubmitted(fingerprint: string) {
  recentSubmissions.set(fingerprint, Date.now());
}
