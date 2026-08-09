/**
 * Parse SEO blog markdown into structured JSON for the Next.js blog system.
 */
import fs from "node:fs";
import path from "node:path";

const SRC =
  "C:/Users/sheha/Downloads/SEO İÇERİKLERİ--23.07-06.08 (1).md";
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

function estimateReadTime(body) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(4, Math.round(words / 200))} dk`;
}

// Split by top-level # **N\. Title**
const parts = text.split(/^# \*\*\d+\\\.\s+/gm).slice(1);

const RELATED = {
  "sosyal-medya-yonetimi-nedir": {
    category: "Sosyal Medya",
    imageKey: "social",
    accent: "#a9cb18",
    services: [
      {
        href: "/sosyal-medya-ajansi",
        label: "Sosyal Medya Ajansı",
      },
      {
        href: "/dijital-pazarlama-ajansi/sosyal-medya-yonetimi",
        label: "Sosyal Medya Yönetimi",
      },
      {
        href: "/sosyal-medya-ajansi/sosyal-medya-stratejisi",
        label: "Sosyal Medya Stratejisi",
      },
    ],
    relatedSlugs: [
      "sosyal-medya-ajansi-secerken",
      "profesyonel-reel-cekimi",
      "google-ads-mi-meta-ads-mi",
    ],
  },
  "sosyal-medya-ajansi-secerken": {
    category: "Sosyal Medya",
    imageKey: "social",
    accent: "#86efac",
    services: [
      { href: "/sosyal-medya-ajansi", label: "Sosyal Medya Ajansı" },
      {
        href: "/sosyal-medya-ajansi/icerik-uretimi",
        label: "İçerik Üretimi",
      },
      {
        href: "/dijital-pazarlama-ajansi/meta-reklam-yonetimi",
        label: "Meta Reklam Yönetimi",
      },
    ],
    relatedSlugs: [
      "sosyal-medya-yonetimi-nedir",
      "dijital-pazarlama-ajansi-ne-is-yapar",
      "profesyonel-reel-cekimi",
    ],
  },
  "dijital-pazarlama-ajansi-ne-is-yapar": {
    category: "Dijital Pazarlama",
    imageKey: "marketing",
    accent: "#a9cb18",
    services: [
      {
        href: "/dijital-pazarlama-ajansi",
        label: "Dijital Pazarlama Ajansı",
      },
      {
        href: "/dijital-pazarlama-ajansi/performans-pazarlamasi",
        label: "Performans Pazarlaması",
      },
      {
        href: "/dijital-pazarlama-ajansi/seo-geo-hizmetleri",
        label: "SEO & GEO Hizmetleri",
      },
    ],
    relatedSlugs: [
      "google-ads-mi-meta-ads-mi",
      "seo-ve-geo-arasindaki-fark",
      "sosyal-medya-yonetimi-nedir",
    ],
  },
  "google-ads-mi-meta-ads-mi": {
    category: "Dijital Pazarlama",
    imageKey: "marketing",
    accent: "#93c5fd",
    services: [
      {
        href: "/dijital-pazarlama-ajansi/google-ads-reklam-yonetimi",
        label: "Google Ads Reklam Yönetimi",
      },
      {
        href: "/dijital-pazarlama-ajansi/meta-reklam-yonetimi",
        label: "Meta Reklam Yönetimi",
      },
      {
        href: "/dijital-pazarlama-ajansi/performans-pazarlamasi",
        label: "Performans Pazarlaması",
      },
    ],
    relatedSlugs: [
      "dijital-pazarlama-ajansi-ne-is-yapar",
      "sosyal-medya-yonetimi-nedir",
      "seo-ve-geo-arasindaki-fark",
    ],
  },
  "seo-ve-geo-arasindaki-fark": {
    category: "SEO",
    imageKey: "seo",
    accent: "#67e8f9",
    services: [
      {
        href: "/dijital-pazarlama-ajansi/seo-geo-hizmetleri",
        label: "SEO & GEO Hizmetleri",
      },
      {
        href: "/web-yazilim-ajansi/seo-geo-uyumlu-web-altyapisi",
        label: "SEO & GEO Uyumlu Web Altyapısı",
      },
      {
        href: "/dijital-pazarlama-ajansi/icerik-pazarlamasi",
        label: "İçerik Pazarlaması",
      },
    ],
    relatedSlugs: [
      "yapay-zeka-aramalarinda-marka-gorunurlugu",
      "dijital-pazarlama-ajansi-ne-is-yapar",
      "google-ads-mi-meta-ads-mi",
    ],
  },
  "yapay-zeka-aramalarinda-marka-gorunurlugu": {
    category: "SEO",
    imageKey: "seo",
    accent: "#a9cb18",
    services: [
      {
        href: "/dijital-pazarlama-ajansi/seo-geo-hizmetleri",
        label: "SEO & GEO Hizmetleri",
      },
      {
        href: "/web-yazilim-ajansi/seo-geo-uyumlu-web-altyapisi",
        label: "SEO Uyumlu Web Altyapısı",
      },
      {
        href: "/dijital-pazarlama-ajansi/icerik-pazarlamasi",
        label: "İçerik Pazarlaması",
      },
    ],
    relatedSlugs: [
      "seo-ve-geo-arasindaki-fark",
      "dijital-pazarlama-ajansi-ne-is-yapar",
      "sosyal-medya-ajansi-secerken",
    ],
  },
  "profesyonel-reel-cekimi": {
    category: "Sosyal Medya",
    imageKey: "social",
    accent: "#f9a8d4",
    services: [
      {
        href: "/sosyal-medya-ajansi/reel-video-icerik-uretimi",
        label: "Reel & Video İçerik Üretimi",
      },
      {
        href: "/kreatif-tasarim-ajansi/motion-grafik-video-tasarimi",
        label: "Motion Grafik & Video",
      },
      {
        href: "/sosyal-medya-ajansi/icerik-uretimi",
        label: "İçerik Üretimi",
      },
    ],
    relatedSlugs: [
      "produksiyon-ajansi-secerken",
      "sosyal-medya-yonetimi-nedir",
      "google-ads-mi-meta-ads-mi",
    ],
  },
  "produksiyon-ajansi-secerken": {
    category: "Tasarım",
    imageKey: "creative",
    accent: "#fcd34d",
    services: [
      {
        href: "/sosyal-medya-ajansi/reel-video-icerik-uretimi",
        label: "Reel & Video İçerik Üretimi",
      },
      {
        href: "/kreatif-tasarim-ajansi/motion-grafik-video-tasarimi",
        label: "Motion Grafik & Video Tasarımı",
      },
      {
        href: "/kreatif-tasarim-ajansi/reklam-kreatifi-tasarimi",
        label: "Reklam Kreatifi Tasarımı",
      },
    ],
    relatedSlugs: [
      "profesyonel-reel-cekimi",
      "sosyal-medya-ajansi-secerken",
      "dijital-pazarlama-ajansi-ne-is-yapar",
    ],
  },
};

/** Inject contextual internal links into paragraph text (markdown links). */
function injectLinks(paragraph, slug) {
  const meta = RELATED[slug];
  if (!meta) return paragraph;
  let p = paragraph;

  const rules = [
    [
      /\bsosyal medya yönetimi\b/i,
      "[sosyal medya yönetimi](/dijital-pazarlama-ajansi/sosyal-medya-yonetimi)",
    ],
    [
      /\bsosyal medya ajansı\b/i,
      "[sosyal medya ajansı](/sosyal-medya-ajansi)",
    ],
    [
      /\bdijital pazarlama ajansı\b/i,
      "[dijital pazarlama ajansı](/dijital-pazarlama-ajansi)",
    ],
    [
      /\bGoogle Ads\b/,
      "[Google Ads](/dijital-pazarlama-ajansi/google-ads-reklam-yonetimi)",
    ],
    [
      /\bMeta Ads\b/,
      "[Meta Ads](/dijital-pazarlama-ajansi/meta-reklam-yonetimi)",
    ],
    [
      /\bSEO\b(?!\s*ve\s*GEO)/,
      "[SEO](/dijital-pazarlama-ajansi/seo-geo-hizmetleri)",
    ],
    [
      /\bSEO\s*[–-]\s*GEO\b|\bSEO ve GEO\b/i,
      "[SEO ve GEO](/dijital-pazarlama-ajansi/seo-geo-hizmetleri)",
    ],
    [
      /\breel\b/i,
      "[reel](/sosyal-medya-ajansi/reel-video-icerik-uretimi)",
    ],
    [
      /\bprodüksiyon\b/i,
      "[prodüksiyon](/kreatif-tasarim-ajansi/motion-grafik-video-tasarimi)",
    ],
    [
      /\bperformans reklam/i,
      "[performans reklamları](/dijital-pazarlama-ajansi/performans-pazarlamasi)",
    ],
  ];

  // Only one auto-link per unique target per paragraph to avoid spam
  const used = new Set();
  for (const [re, replacement] of rules) {
    const key = replacement.match(/\(([^)]+)\)/)?.[1];
    if (key && used.has(key)) continue;
    if (re.test(p) && !p.includes(replacement)) {
      p = p.replace(re, (m) => {
        // Preserve original casing by wrapping matched text
        const href = replacement.match(/\(([^)]+)\)/)[1];
        used.add(href);
        return `[${m}](${href})`;
      });
    }
  }
  return p;
}

const posts = [];

for (const part of parts) {
  // After split, heading remainder is: Title text?**
  const titleMatch = part.match(/^(.+?)\*\*\s*\n/);
  if (!titleMatch) continue;
  const title = titleMatch[1].replace(/\\\./g, ".").trim();

  const urlMatch = part.match(/\*\*URL:\*\*\s*(\/blog\/[^\s]+)/);
  const dateMatch = part.match(/\*\*Yayın tarihi:\*\*\s*(.+)/);
  const kwMatch = part.match(/\*\*Ana anahtar kelime:\*\*\s*(.+)/);
  const metaMatch = part.match(/\*\*Meta açıklama:\*\*\s*(.+)/);
  const sideKwMatch = part.match(/\*\*Yan anahtar kelimeler:\*\*\s*(.+)/);

  if (!urlMatch || !metaMatch) {
    console.warn("skip incomplete part starting:", part.slice(0, 60));
    continue;
  }
  const slug = urlMatch[1].replace("/blog/", "").trim();
  const metaIdx = part.indexOf(metaMatch[0]);
  let body = part.slice(metaIdx + metaMatch[0].length).trim();
  // cut trailing ---
  body = body.replace(/\n---\s*$/, "").trim();

  const meta = RELATED[slug] || {
    category: "Dijital Pazarlama",
    imageKey: "marketing",
    accent: "#a9cb18",
    services: [{ href: "/dijital-pazarlama-ajansi", label: "Dijital Pazarlama" }],
    relatedSlugs: [],
  };

  const blocks = [];
  // lead = first paragraph
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

    // h2 ## **Title** or ## Title
    const h2 = chunk.match(/^##\s+\*\*(.+?)\*\*$/) || chunk.match(/^##\s+(.+)$/);
    if (h2) {
      flushList();
      const text = h2[1].replace(/\\\./g, ".").trim();
      blocks.push({ type: "h2", id: slugifyHeading(text), text });
      continue;
    }

    // h3
    const h3 = chunk.match(/^###\s+\*\*(.+?)\*\*$/) || chunk.match(/^###\s+(.+)$/);
    if (h3) {
      flushList();
      const text = h3[1].replace(/\\\./g, ".").trim();
      // treat h3 as bold paragraph lead-in for simpler renderer
      blocks.push({
        type: "p",
        text: `**${text}**`,
      });
      continue;
    }

    // list items
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

    // bold-only short quote-like
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

  // Related services CTA block
  blocks.push({
    type: "h2",
    id: "ilgili-hizmetler",
    text: "İlgili Kiwi hizmetleri",
  });
  blocks.push({
    type: "p",
    text: "Bu konuda derinlemesine destek için ilgili hizmet sayfalarımıza göz atabilirsiniz:",
  });
  blocks.push({
    type: "list",
    items: meta.services.map((s) => `[${s.label}](${s.href})`),
  });
  blocks.push({
    type: "p",
    text: "Markanız için ücretsiz keşif görüşmesi ayarlamak üzere [iletişim sayfamızı](/iletisim) ziyaret edebilirsiniz.",
  });

  posts.push({
    slug,
    title,
    excerpt: (metaMatch?.[1] || "").trim(),
    category: meta.category,
    date: (dateMatch?.[1] || "").trim().replace(/\s+/g, " "),
    readTime: estimateReadTime(body),
    imageKey: meta.imageKey,
    accent: meta.accent,
    gradient: "from-lime-600/30 to-emerald-400/10",
    featured: slug === "sosyal-medya-yonetimi-nedir",
    author: "Kiwi Editör",
    keyword: (kwMatch?.[1] || "").trim(),
    keywords: (sideKwMatch?.[1] || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    relatedServices: meta.services,
    relatedSlugs: meta.relatedSlugs,
    blocks,
  });
}

fs.writeFileSync(OUT, JSON.stringify(posts, null, 2), "utf8");
console.log("wrote", posts.length, "posts →", OUT);
posts.forEach((p) => console.log("-", p.slug, p.blocks.length, "blocks"));
