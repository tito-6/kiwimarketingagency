/**
 * Inspect + parse SEO blog markdown (14.08-14.09 batch).
 */
import fs from "node:fs";
import path from "node:path";

const SRC = "C:/Users/sheha/Downloads/SEO İÇERİKLERİ--14.08-14.09.md";
const EXISTING = path.join("D:/kiwi/src/data/seo-blogs.json");
const OUT = path.join("D:/kiwi/src/data/seo-blogs.json");

const text = fs.readFileSync(SRC, "utf8");

function slugifyHeading(h) {
  return h
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function toIsoDate(trDate) {
  if (!trDate) return "2026-08-15";
  const months = {
    ocak: "01",
    subat: "02",
    şubat: "02",
    mart: "03",
    nisan: "04",
    mayis: "05",
    mayıs: "05",
    haziran: "06",
    temmuz: "07",
    agustos: "08",
    ağustos: "08",
    eylul: "09",
    eylül: "09",
    ekim: "10",
    kasim: "11",
    kasım: "11",
    aralik: "12",
    aralık: "12",
  };
  const m = trDate
    .toLowerCase()
    .normalize("NFC")
    .match(/(\d{1,2})\s+([a-zçğıöşü]+)(?:\s+(\d{4}))?/i);
  if (!m) return "2026-08-15";
  const day = m[1].padStart(2, "0");
  const mon = months[m[2]] || "08";
  const year = m[3] || "2026";
  return `${year}-${mon}-${day}`;
}

const RELATED = {
  "istanbul-dijital-pazarlama-ajansi": {
    category: "Dijital Pazarlama",
    imageKey: "marketing",
    accent: "#a9cb18",
    services: [
      { href: "/dijital-pazarlama-ajansi", label: "Dijital Pazarlama Ajansı" },
      { href: "/dijital-pazarlama-ajansi/performans-pazarlamasi", label: "Performans Pazarlaması" },
      { href: "/dijital-pazarlama-ajansi/seo-geo-hizmetleri", label: "SEO & GEO Hizmetleri" },
    ],
    relatedSlugs: [
      "dijital-pazarlama-ajansi-ne-is-yapar",
      "kadikoy-sosyal-medya-ajansi",
      "atasehir-dijital-pazarlama-ajansi",
    ],
  },
  "kadikoy-sosyal-medya-ajansi": {
    category: "Sosyal Medya",
    imageKey: "social",
    accent: "#86efac",
    services: [
      { href: "/sosyal-medya-ajansi", label: "Sosyal Medya Ajansı" },
      { href: "/dijital-pazarlama-ajansi/sosyal-medya-yonetimi", label: "Sosyal Medya Yönetimi" },
      { href: "/sosyal-medya-ajansi/icerik-uretimi", label: "İçerik Üretimi" },
    ],
    relatedSlugs: [
      "istanbul-dijital-pazarlama-ajansi",
      "caddebostan-bagdat-caddesi-sosyal-medya",
      "sosyal-medya-yonetimi-nedir",
    ],
  },
  "sosyal-medya-yonetimi-fiyatlari-2026": {
    category: "Sosyal Medya",
    imageKey: "social",
    accent: "#f9a8d4",
    services: [
      { href: "/sosyal-medya-ajansi", label: "Sosyal Medya Ajansı" },
      { href: "/sosyal-medya-ajansi/sosyal-medya-stratejisi", label: "Sosyal Medya Stratejisi" },
      { href: "/iletisim", label: "Ücretsiz Keşif Görüşmesi" },
    ],
    relatedSlugs: [
      "sosyal-medya-ajansi-secerken",
      "sosyal-medya-yonetimi-nedir",
      "google-ads-yonetim-ucreti-2026",
    ],
  },
  "atasehir-dijital-pazarlama-ajansi": {
    category: "Dijital Pazarlama",
    imageKey: "marketing",
    accent: "#93c5fd",
    services: [
      { href: "/dijital-pazarlama-ajansi", label: "Dijital Pazarlama Ajansı" },
      { href: "/dijital-pazarlama-ajansi/google-ads-reklam-yonetimi", label: "Google Ads" },
      { href: "/dijital-pazarlama-ajansi/meta-reklam-yonetimi", label: "Meta Ads" },
    ],
    relatedSlugs: [
      "istanbul-dijital-pazarlama-ajansi",
      "kadikoy-sosyal-medya-ajansi",
      "maltepe-sosyal-medya-reklam-ajansi",
    ],
  },
  "instagram-reklami-satis-getirmiyor": {
    category: "Dijital Pazarlama",
    imageKey: "marketing",
    accent: "#c4b5fd",
    services: [
      { href: "/dijital-pazarlama-ajansi/meta-reklam-yonetimi", label: "Meta Reklam Yönetimi" },
      { href: "/dijital-pazarlama-ajansi/donusum-optimizasyonu", label: "Dönüşüm Optimizasyonu" },
      { href: "/kreatif-tasarim-ajansi/reklam-kreatifi-tasarimi", label: "Reklam Kreatifi" },
    ],
    relatedSlugs: [
      "google-ads-mi-meta-ads-mi",
      "sosyal-medya-yonetimi-nedir",
      "guzellik-merkezleri-instagram-reklamlari",
    ],
  },
  "caddebostan-bagdat-caddesi-sosyal-medya": {
    category: "Sosyal Medya",
    imageKey: "social",
    accent: "#fcd34d",
    services: [
      { href: "/sosyal-medya-ajansi", label: "Sosyal Medya Ajansı" },
      { href: "/sosyal-medya-ajansi/reel-video-icerik-uretimi", label: "Reel & Video" },
      { href: "/sosyal-medya-ajansi/icerik-uretimi", label: "İçerik Üretimi" },
    ],
    relatedSlugs: [
      "kadikoy-sosyal-medya-ajansi",
      "profesyonel-reel-cekimi",
      "sosyal-medya-yonetimi-nedir",
    ],
  },
  "google-ads-yonetim-ucreti-2026": {
    category: "Dijital Pazarlama",
    imageKey: "marketing",
    accent: "#a9cb18",
    services: [
      { href: "/dijital-pazarlama-ajansi/google-ads-reklam-yonetimi", label: "Google Ads Reklam Yönetimi" },
      { href: "/dijital-pazarlama-ajansi/performans-pazarlamasi", label: "Performans Pazarlaması" },
      { href: "/iletisim", label: "Ücretsiz Ön Değerlendirme" },
    ],
    relatedSlugs: [
      "google-ads-mi-meta-ads-mi",
      "sosyal-medya-yonetimi-fiyatlari-2026",
      "dijital-pazarlama-ajansi-ne-is-yapar",
    ],
  },
  "maltepe-sosyal-medya-reklam-ajansi": {
    category: "Sosyal Medya",
    imageKey: "social",
    accent: "#86efac",
    services: [
      { href: "/sosyal-medya-ajansi", label: "Sosyal Medya Ajansı" },
      { href: "/dijital-pazarlama-ajansi/meta-reklam-yonetimi", label: "Meta Reklam Yönetimi" },
      { href: "/dijital-pazarlama-ajansi", label: "Dijital Pazarlama Ajansı" },
    ],
    relatedSlugs: [
      "atasehir-dijital-pazarlama-ajansi",
      "kadikoy-sosyal-medya-ajansi",
      "istanbul-dijital-pazarlama-ajansi",
    ],
  },
  "seo-ne-kadar-surede-sonuc-verir": {
    category: "SEO",
    imageKey: "seo",
    accent: "#67e8f9",
    services: [
      { href: "/dijital-pazarlama-ajansi/seo-geo-hizmetleri", label: "SEO & GEO Hizmetleri" },
      { href: "/web-yazilim-ajansi/seo-geo-uyumlu-web-altyapisi", label: "SEO Uyumlu Web Altyapısı" },
      { href: "/dijital-pazarlama-ajansi/icerik-pazarlamasi", label: "İçerik Pazarlaması" },
    ],
    relatedSlugs: [
      "seo-ve-geo-arasindaki-fark",
      "yapay-zeka-aramalarinda-marka-gorunurlugu",
      "istanbul-dijital-pazarlama-ajansi",
    ],
  },
  "gayrimenkul-dijital-pazarlama": {
    category: "Dijital Pazarlama",
    imageKey: "marketing",
    accent: "#93c5fd",
    services: [
      { href: "/dijital-pazarlama-ajansi", label: "Dijital Pazarlama Ajansı" },
      { href: "/dijital-pazarlama-ajansi/meta-reklam-yonetimi", label: "Meta Reklam Yönetimi" },
      { href: "/web-yazilim-ajansi/gayrimenkul-stok-takip-yazilimi", label: "Gayrimenkul Stok Yazılımı" },
    ],
    relatedSlugs: [
      "istanbul-dijital-pazarlama-ajansi",
      "profesyonel-reel-cekimi",
      "google-ads-mi-meta-ads-mi",
    ],
  },
  "izmir-dijital-pazarlama-ajansi": {
    category: "Dijital Pazarlama",
    imageKey: "marketing",
    accent: "#a9cb18",
    services: [
      { href: "/dijital-pazarlama-ajansi", label: "Dijital Pazarlama Ajansı" },
      { href: "/sosyal-medya-ajansi", label: "Sosyal Medya Ajansı" },
      { href: "/dijital-pazarlama-ajansi/seo-geo-hizmetleri", label: "SEO & GEO" },
    ],
    relatedSlugs: [
      "alsancak-karsiyaka-bostanli-dijital-pazarlama",
      "istanbul-dijital-pazarlama-ajansi",
      "dijital-pazarlama-ajansi-ne-is-yapar",
    ],
  },
  "guzellik-merkezleri-instagram-reklamlari": {
    category: "Sosyal Medya",
    imageKey: "social",
    accent: "#f9a8d4",
    services: [
      { href: "/dijital-pazarlama-ajansi/meta-reklam-yonetimi", label: "Meta Reklam Yönetimi" },
      { href: "/sosyal-medya-ajansi", label: "Sosyal Medya Ajansı" },
      { href: "/sosyal-medya-ajansi/reel-video-icerik-uretimi", label: "Reel & Video" },
    ],
    relatedSlugs: [
      "instagram-reklami-satis-getirmiyor",
      "profesyonel-reel-cekimi",
      "sosyal-medya-yonetimi-nedir",
    ],
  },
  "reel-video-cekim-fiyatlari-2026": {
    category: "Tasarım",
    imageKey: "creative",
    accent: "#fcd34d",
    services: [
      { href: "/sosyal-medya-ajansi/reel-video-icerik-uretimi", label: "Reel & Video İçerik Üretimi" },
      { href: "/kreatif-tasarim-ajansi/motion-grafik-video-tasarimi", label: "Motion Grafik & Video" },
      { href: "/iletisim", label: "Çekim Planı Alın" },
    ],
    relatedSlugs: [
      "profesyonel-reel-cekimi",
      "produksiyon-ajansi-secerken",
      "sosyal-medya-yonetimi-fiyatlari-2026",
    ],
  },
  "alsancak-karsiyaka-bostanli-dijital-pazarlama": {
    category: "Dijital Pazarlama",
    imageKey: "marketing",
    accent: "#a9cb18",
    services: [
      { href: "/dijital-pazarlama-ajansi", label: "Dijital Pazarlama Ajansı" },
      { href: "/sosyal-medya-ajansi", label: "Sosyal Medya Ajansı" },
      { href: "/dijital-pazarlama-ajansi/performans-pazarlamasi", label: "Performans Pazarlaması" },
    ],
    relatedSlugs: [
      "izmir-dijital-pazarlama-ajansi",
      "istanbul-dijital-pazarlama-ajansi",
      "kadikoy-sosyal-medya-ajansi",
    ],
  },
};

/** Fallback mapping by keyword heuristics if slug not in RELATED */
function guessMeta(slug, title, keyword) {
  if (RELATED[slug]) return RELATED[slug];
  const k = `${slug} ${title} ${keyword}`.toLowerCase();
  if (k.includes("sosyal") || k.includes("reel") || k.includes("instagram")) {
    return {
      category: "Sosyal Medya",
      imageKey: "social",
      accent: "#86efac",
      services: [
        { href: "/sosyal-medya-ajansi", label: "Sosyal Medya Ajansı" },
        { href: "/dijital-pazarlama-ajansi/sosyal-medya-yonetimi", label: "Sosyal Medya Yönetimi" },
        { href: "/sosyal-medya-ajansi/icerik-uretimi", label: "İçerik Üretimi" },
      ],
      relatedSlugs: ["sosyal-medya-yonetimi-nedir", "anadolu-yakasi-sosyal-medya-ajansi", "sosyal-medya-ajansi-secerken"],
    };
  }
  if (k.includes("seo") || k.includes("geo") || k.includes("yapay")) {
    return {
      category: "SEO",
      imageKey: "seo",
      accent: "#67e8f9",
      services: [
        { href: "/dijital-pazarlama-ajansi/seo-geo-hizmetleri", label: "SEO & GEO Hizmetleri" },
        { href: "/web-yazilim-ajansi/seo-geo-uyumlu-web-altyapisi", label: "SEO Uyumlu Web" },
        { href: "/dijital-pazarlama-ajansi/icerik-pazarlamasi", label: "İçerik Pazarlaması" },
      ],
      relatedSlugs: ["seo-ve-geo-arasindaki-fark", "yapay-zeka-aramalarinda-marka-gorunurlugu", "istanbul-dijital-pazarlama-ajansi"],
    };
  }
  if (k.includes("web") || k.includes("yazilim") || k.includes("site")) {
    return {
      category: "Web Stratejisi",
      imageKey: "web",
      accent: "#a9cb18",
      services: [
        { href: "/web-yazilim-ajansi", label: "Web Yazılım Ajansı" },
        { href: "/web-yazilim-ajansi/kurumsal-web-sitesi", label: "Kurumsal Web Sitesi" },
        { href: "/web-yazilim-ajansi/landing-page-tasarimi", label: "Landing Page" },
      ],
      relatedSlugs: ["landing-page-vs-website", "web-performance", "istanbul-dijital-pazarlama-ajansi"],
    };
  }
  if (k.includes("reel") || k.includes("produksiyon") || k.includes("video") || k.includes("kreatif")) {
    return {
      category: "Tasarım",
      imageKey: "creative",
      accent: "#fcd34d",
      services: [
        { href: "/kreatif-tasarim-ajansi", label: "Kreatif Tasarım Ajansı" },
        { href: "/sosyal-medya-ajansi/reel-video-icerik-uretimi", label: "Reel & Video" },
        { href: "/kreatif-tasarim-ajansi/motion-grafik-video-tasarimi", label: "Motion Grafik" },
      ],
      relatedSlugs: ["profesyonel-reel-cekimi", "produksiyon-ajansi-secerken", "sosyal-medya-yonetimi-nedir"],
    };
  }
  return {
    category: "Dijital Pazarlama",
    imageKey: "marketing",
    accent: "#a9cb18",
    services: [
      { href: "/dijital-pazarlama-ajansi", label: "Dijital Pazarlama Ajansı" },
      { href: "/dijital-pazarlama-ajansi/performans-pazarlamasi", label: "Performans Pazarlaması" },
      { href: "/dijital-pazarlama-ajansi/google-ads-reklam-yonetimi", label: "Google Ads" },
    ],
    relatedSlugs: ["dijital-pazarlama-ajansi-ne-is-yapar", "istanbul-dijital-pazarlama-ajansi", "google-ads-mi-meta-ads-mi"],
  };
}

function injectLinks(paragraph, slug) {
  let p = paragraph;
  const rules = [
    [/\bİstanbul dijital pazarlama ajansı\b/i, "[İstanbul dijital pazarlama ajansı](/dijital-pazarlama-ajansi)"],
    [/\bdijital pazarlama ajansı\b/i, "[dijital pazarlama ajansı](/dijital-pazarlama-ajansi)"],
    [/\bsosyal medya ajansı\b/i, "[sosyal medya ajansı](/sosyal-medya-ajansi)"],
    [/\bsosyal medya yönetimi\b/i, "[sosyal medya yönetimi](/dijital-pazarlama-ajansi/sosyal-medya-yonetimi)"],
    [/\bGoogle Ads\b/, "[Google Ads](/dijital-pazarlama-ajansi/google-ads-reklam-yonetimi)"],
    [/\bMeta Ads\b/, "[Meta Ads](/dijital-pazarlama-ajansi/meta-reklam-yonetimi)"],
    [/\bSEO\s*[–-]\s*GEO\b|\bSEO ve GEO\b/i, "[SEO ve GEO](/dijital-pazarlama-ajansi/seo-geo-hizmetleri)"],
    [/\bSEO\b(?!\s*ve\s*GEO)/, "[SEO](/dijital-pazarlama-ajansi/seo-geo-hizmetleri)"],
    [/\breel\b/i, "[reel](/sosyal-medya-ajansi/reel-video-icerik-uretimi)"],
    [/\bperformans reklam/i, "[performans reklamları](/dijital-pazarlama-ajansi/performans-pazarlamasi)"],
    [/\bweb (sitesi|tasarım|yazılım)/i, (m) => `[${m}](/web-yazilim-ajansi)`],
    [/\bKadıköy\b/, "[Kadıköy](/dijital-pazarlama-ajansi)"],
    [/\bAtaşehir\b/, "[Ataşehir](/sosyal-medya-ajansi)"],
    [/\bÜsküdar\b/, "[Üsküdar](/dijital-pazarlama-ajansi)"],
    [/\bMaltepe\b/, "[Maltepe](/dijital-pazarlama-ajansi)"],
    [/\bKartal\b/, "[Kartal](/dijital-pazarlama-ajansi)"],
    [/\bPendik\b/, "[Pendik](/sosyal-medya-ajansi)"],
    [/\bAnadolu Yakası\b/i, "[Anadolu Yakası](/sosyal-medya-ajansi)"],
  ];
  const used = new Set();
  for (const [re, replacement] of rules) {
    if (typeof replacement === "function") {
      if (re.test(p) && !/\[[^\]]+\]\(/.test(p.match(re)?.[0] || "")) {
        p = p.replace(re, (m) => {
          const r = replacement(m);
          const href = r.match(/\(([^)]+)\)/)?.[1];
          if (href && used.has(href)) return m;
          if (href) used.add(href);
          return r;
        });
      }
      continue;
    }
    const key = replacement.match(/\(([^)]+)\)/)?.[1];
    if (key && used.has(key)) continue;
    if (re.test(p) && !p.includes(replacement)) {
      p = p.replace(re, (m) => {
        used.add(key);
        return `[${m}](${key})`;
      });
    }
  }
  return p;
}

// Split by # **N\. Title** OR # **N. Title**
const parts = text.split(/^# \*\*\d+\\\.\s+/gm).slice(1);
console.log("parts", parts.length);

const posts = [];

for (const part of parts) {
  const titleMatch = part.match(/^(.+?)\*\*\s*\n/);
  if (!titleMatch) {
    console.warn("no title", part.slice(0, 80));
    continue;
  }
  const title = titleMatch[1].replace(/\\\./g, ".").trim();

  const urlMatch = part.match(/\*\*URL:\*\*\s*`?(\/blog\/[^\s`]+)/);
  const dateMatch = part.match(/\*\*Yayın(?: tarihi)?:\*\*\s*(.+)/);
  const kwMatch = part.match(/\*\*Ana anahtar kelime:\*\*\s*(.+)/);
  const metaMatch = part.match(/\*\*Meta(?: açıklama)?:\*\*\s*(.+)/);
  const sideKwMatch = part.match(/\*\*Yan (?:anahtar )?kelimeler:\*\*\s*(.+)/);

  if (!urlMatch) {
    console.warn("no url", title.slice(0, 50));
    continue;
  }

  const slug = urlMatch[1].replace("/blog/", "").replace(/[`/]/g, "").trim();

  // Body starts after meta line if present, else after URL line
  let bodyStartMarker = metaMatch?.[0] || urlMatch[0];
  const metaIdx = part.indexOf(bodyStartMarker);
  let body = part.slice(metaIdx + bodyStartMarker.length).trim();
  body = body.replace(/\n---\s*$/, "").trim();

  // Auto meta from first paragraph when missing
  const firstPara = body.split(/\n\n+/).find((p) => p.trim() && !p.trim().startsWith("#") && !p.trim().startsWith("**Yayın")) || "";
  const autoExcerpt = firstPara
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 155);
  const excerpt = (metaMatch?.[1] || autoExcerpt || title).trim();

  const keyword = (kwMatch?.[1] || title.split(/[:–—|]/)[0].trim()).trim();
  const meta = guessMeta(slug, title, keyword);

  const blocks = [];
  const paragraphs = body.split(/\n\n+/);
  let leadTaken = false;
  let currentList = null;

  function flushList() {
    if (currentList?.length) {
      blocks.push({ type: "list", items: currentList });
      currentList = null;
    }
  }

  for (const raw of paragraphs) {
    const chunk = raw.trim();
    if (!chunk) continue;

    const h2 = chunk.match(/^##\s+\*\*(.+?)\*\*$/) || chunk.match(/^##\s+(.+)$/);
    if (h2) {
      flushList();
      const textH = h2[1].replace(/\\\./g, ".").trim();
      blocks.push({ type: "h2", id: slugifyHeading(textH), text: textH });
      continue;
    }

    const h3 = chunk.match(/^###\s+\*\*(.+?)\*\*$/) || chunk.match(/^###\s+(.+)$/);
    if (h3) {
      flushList();
      blocks.push({ type: "p", text: `**${h3[1].replace(/\\\./g, ".").trim()}**` });
      continue;
    }

    if (/^\*\s+/.test(chunk) || chunk.split("\n").every((l) => /^\*\s+/.test(l.trim()) || !l.trim())) {
      const items = chunk
        .split("\n")
        .map((l) => l.replace(/^\*\s+/, "").trim())
        .filter(Boolean);
      if (!currentList) currentList = [];
      currentList.push(...items.map((i) => injectLinks(i, slug)));
      continue;
    }

    flushList();

    if (/^\*\*.+\*\*$/.test(chunk) && chunk.length < 200) {
      blocks.push({
        type: "quote",
        text: chunk.replace(/^\*\*|\*\*$/g, ""),
        author: "Kiwi Agency",
      });
      continue;
    }

    const linked = injectLinks(chunk.replace(/\*\*(.+?)\*\*/g, "$1"), slug);
    if (!leadTaken) {
      blocks.push({ type: "lead", text: linked });
      leadTaken = true;
    } else {
      blocks.push({ type: "p", text: linked });
    }
  }
  flushList();

  blocks.push({ type: "h2", id: "ilgili-hizmetler", text: "İlgili Kiwi hizmetleri" });
  blocks.push({
    type: "p",
    text: "Anadolu Yakası ve İstanbul genelinde bu konuda destek için ilgili hizmet sayfalarımıza göz atın:",
  });
  blocks.push({
    type: "list",
    items: meta.services.map((s) => `[${s.label}](${s.href})`),
  });
  blocks.push({
    type: "p",
    text: "Ücretsiz keşif görüşmesi için [iletişim sayfamızı](/iletisim) ziyaret edebilirsiniz. Kiwi Marketing Agency — İstanbul Anadolu Yakası dijital pazarlama ajansı.",
  });

  const wordCount = blocks
    .map((b) => b.text || (b.items || []).join(" ") || "")
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  const dateRaw = (dateMatch?.[1] || "").trim().replace(/\s+/g, " ");
  const dateIso = toIsoDate(dateRaw);

  posts.push({
    slug,
    title,
    excerpt,
    category: meta.category,
    date: dateRaw,
    dateIso,
    readTime: `${Math.max(5, Math.round(wordCount / 180))} dk`,
    imageKey: meta.imageKey,
    accent: meta.accent,
    gradient: "from-lime-600/30 to-emerald-400/10",
    featured: slug === "istanbul-dijital-pazarlama-ajansi",
    author: "Kiwi Editör",
    keyword,
    keywords: (sideKwMatch?.[1] || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    relatedServices: meta.services,
    relatedSlugs: meta.relatedSlugs,
    blocks,
  });
}

const existing = JSON.parse(fs.readFileSync(EXISTING, "utf8"));
const bySlug = new Map(existing.map((p) => [p.slug, p]));
// New batch first (newest), keep old featured false if new has featured
for (const p of posts) {
  bySlug.set(p.slug, p);
}
if (posts.some((p) => p.featured)) {
  for (const p of bySlug.values()) {
    if (p.slug !== "istanbul-dijital-pazarlama-ajansi") p.featured = false;
  }
}

// Order: new posts first (as in MD), then remaining older ones
const newSlugs = new Set(posts.map((p) => p.slug));
const merged = [
  ...posts,
  ...existing.filter((p) => !newSlugs.has(p.slug)),
];

fs.writeFileSync(OUT, JSON.stringify(merged, null, 2), "utf8");
console.log("NEW posts:", posts.length);
posts.forEach((p) => console.log("-", p.slug, p.date, p.blocks.length, "blocks", p.readTime));
console.log("TOTAL seo-blogs:", merged.length);
