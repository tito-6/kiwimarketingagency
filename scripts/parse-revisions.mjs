/**
 * Parses the cleaned Kiwi revision markdown into typed service content JSON.
 * Source: scripts/_revisions-clean.md (generated from client revision doc).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourcePath = path.join(__dirname, "_revisions-clean.md");
const outPath = path.join(root, "src", "data", "service-pages.json");

const text = fs.readFileSync(sourcePath, "utf8");

function stripMd(s) {
  return s
    .replace(/\*\*/g, "")
    .replace(/\\([.])/g, "$1")
    .replace(/\\/g, "")
    .trim();
}

function paragraphs(block) {
  return block
    .split(/\n\s*\n/)
    .map((p) =>
      p
        .split("\n")
        .map((l) => stripMd(l))
        .filter(Boolean)
        .join(" ")
        .trim()
    )
    .filter(Boolean)
    .filter((p) => !p.startsWith("---"));
}

const categoryDefs = [
  {
    id: "kreatif-tasarim",
    slug: "kreatif-tasarim-ajansi",
    navLabel: "Kreatif Tasarım",
    marker: "# **KREATİF TASARIM AJANSI**",
    nextMarker: "# **DİJİTAL PAZARLAMA AJANSI**",
  },
  {
    id: "dijital-pazarlama",
    slug: "dijital-pazarlama-ajansi",
    navLabel: "Dijital Pazarlama",
    marker: "# **DİJİTAL PAZARLAMA AJANSI**",
    nextMarker: "# **SOSYAL MEDYA AJANSI**",
  },
  {
    id: "sosyal-medya",
    slug: "sosyal-medya-ajansi",
    navLabel: "Sosyal Medya",
    marker: "# **SOSYAL MEDYA AJANSI**",
    nextMarker: "# **WEB YAZILIM AJANSI**",
  },
  {
    id: "web-yazilim",
    slug: "web-yazilim-ajansi",
    navLabel: "Yazılım",
    marker: "# **WEB YAZILIM AJANSI**",
    nextMarker: null,
  },
];

function parseField(block, label) {
  const re = new RegExp(
    `## \\*\\*${label}\\*\\*\\s*\\n+([\\s\\S]*?)(?=\\n## |\\n# |$)`,
    "i"
  );
  const m = block.match(re);
  return m ? stripMd(m[1].split("\n")[0]) : "";
}

function parseIntro(block) {
  const m = block.match(
    /## \*\*Ana Başlık Altı Metin\*\*\s*\n+([\s\S]*?)(?=\n---|\n# \*\*)/
  );
  return m ? paragraphs(m[1]) : [];
}

function parseServicesIntro(block) {
  const m = block.match(
    /# \*\*HİZMETLERİMİZ\*\*\s*\n+## \*\*([^*]+)\*\*\s*\n+([\s\S]*?)(?=\n---\n+\n## \*\*\d)/
  );
  if (!m) return { title: "", paragraphs: [] };
  return { title: stripMd(m[1]), paragraphs: paragraphs(m[2]) };
}

function parseChildServices(block) {
  const services = [];
  const re =
    /## \*\*(\d+)\\\.? (.+?)\*\*\s*\n+([\s\S]*?)(?=\n---\n+\n## \*\*\d|\n---\n+\n# \*\*NASIL)/g;
  let match;
  while ((match = re.exec(block)) !== null) {
    const title = stripMd(match[2]);
    const body = match[3];
    const descEnd = body.search(/\n### \*\*Hizmet Kapsamı\*\*/);
    const description = paragraphs(
      descEnd === -1 ? body : body.slice(0, descEnd)
    );
    const scope = stripMd(
      (body.match(
        /### \*\*Hizmet Kapsamı\*\*\s*\n+([\s\S]*?)(?=\n### |\n---|$)/
      ) || [, ""])[1]
    );
    const url = stripMd(
      (body.match(/### \*\*Önerilen URL\*\*\s*\n+([^\n]+)/) || [, ""])[1]
    );
    const shortUrl = stripMd(
      (body.match(/### \*\*Alternatif Kısa URL\*\*\s*\n+([^\n]+)/) || [, ""])[1]
    );
    const cardTags = stripMd(
      (body.match(/### \*\*Kart Üzeri Kısa Etiket\*\*\s*\n+([^\n]+)/) || [
        ,
        "",
      ])[1]
    );
    const slug = url.split("/").filter(Boolean).pop() || "";
    services.push({
      title,
      slug,
      url,
      shortUrl,
      description,
      scope,
      cardTags,
    });
  }
  return services;
}

function parseProcess(block) {
  const m = block.match(
    /# \*\*NASIL ÇALIŞIYORUZ\?\*\*\s*\n+## \*\*([^*]+)\*\*\s*\n+([\s\S]*?)(?=\n# \*\*NEDEN)/
  );
  if (!m) return { title: "", intro: [], steps: [] };
  const title = stripMd(m[1]);
  const body = m[2];
  const stepRe =
    /## \*\*(\d+)\s*—\s*(.+?)\*\*\s*\n+([\s\S]*?)(?=\n## \*\*\d|\n---\s*\n\s*# |\n# \*\*|$)/g;
  const steps = [];
  let introEnd = body.search(/\n## \*\*\d+/);
  const intro = paragraphs(introEnd === -1 ? body : body.slice(0, introEnd));
  let sm;
  while ((sm = stepRe.exec(body)) !== null) {
    steps.push({
      number: sm[1],
      title: stripMd(sm[2]),
      paragraphs: paragraphs(sm[3]),
    });
  }
  return { title, intro, steps };
}

function parseWhy(block) {
  const m = block.match(
    /# \*\*NEDEN KIWI MARKETING AGENCY\?\*\*\s*\n+([\s\S]*?)(?=\n# \*\*ALT CTA)/
  );
  if (!m) return { items: [] };
  const items = [];
  const itemRe =
    /## \*\*([^*]+)\*\*\s*\n+([\s\S]*?)(?=\n## \*\*|\n---\s*\n\s*# |\n# \*\*|$)/g;
  let im;
  while ((im = itemRe.exec(m[1])) !== null) {
    items.push({
      title: stripMd(im[1]),
      paragraphs: paragraphs(im[2]),
    });
  }
  return { items };
}

function parseCta(block) {
  const m = block.match(
    /# \*\*ALT CTA ALANI\*\*\s*\n+## \*\*([^*]+)\*\*\s*\n+([\s\S]*?)(?=\n# \*\*SAYFA)/
  );
  if (!m) return { title: "", paragraphs: [], primary: "", secondary: "" };
  const title = stripMd(m[1]);
  const body = m[2];
  const primary = stripMd(
    (body.match(/## \*\*Ana Buton\*\*\s*\n+([^\n]+)/) || [, ""])[1]
  );
  const secondary = stripMd(
    (body.match(/## \*\*İkinci Buton\*\*\s*\n+([^\n]+)/) || [, ""])[1]
  );
  const paraBlock = body.split(/\n## \*\*Ana Buton/)[0];
  return {
    title,
    paragraphs: paragraphs(paraBlock),
    primary,
    secondary,
  };
}

function parseSeo(block) {
  const m = block.match(
    /# \*\*SAYFA İÇİ SEO METNİ\*\*\s*\n+## \*\*([^*]+)\*\*\s*\n+([\s\S]*?)(?=\n# \*\*ÖNERİLEN|\n# \*\*[A-ZİŞĞÜÖÇ])/
  );
  if (!m) return { title: "", paragraphs: [] };
  return { title: stripMd(m[1]), paragraphs: paragraphs(m[2]) };
}

const categories = [];

for (const def of categoryDefs) {
  const start = text.indexOf(def.marker);
  if (start === -1) throw new Error(`Missing marker ${def.marker}`);
  const end = def.nextMarker ? text.indexOf(def.nextMarker, start) : text.length;
  const block = text.slice(start, end === -1 ? text.length : end);

  const seoTitle = parseField(block, "SEO Title");
  const metaDescription = parseField(block, "Meta Description");
  const h1 = parseField(block, "H1");
  const url = parseField(block, "URL");
  const intro = parseIntro(block);
  const servicesIntro = parseServicesIntro(block);
  const services = parseChildServices(block);
  const process = parseProcess(block);
  const why = parseWhy(block);
  const cta = parseCta(block);
  const seoContent = parseSeo(block);

  categories.push({
    id: def.id,
    slug: def.slug,
    navLabel: def.navLabel,
    url: url || `/${def.slug}`,
    seoTitle,
    metaDescription,
    h1,
    intro,
    servicesIntro,
    services,
    process,
    why,
    cta,
    seoContent,
  });
}

const homeSolutions = categories.map((c) => ({
  id: c.id,
  title: c.navLabel === "Yazılım" ? "Web Yazılım" : c.navLabel,
  href: c.url,
  description: c.intro[0] || c.metaDescription,
  tags: c.services.slice(0, 4).map((s) => s.title.split(" ")[0]),
  cardTags: c.services.slice(0, 3).flatMap((s) =>
    s.cardTags
      .split("·")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 1)
  ),
}));

const heroServices = [
  "Performans Pazarlama",
  "Kreatif Tasarım",
  "Prodüksiyon",
  "Sosyal Medya Yönetimi",
  "Web Tasarım Hizmetleri",
  "SEO & GEO Yönetimi",
];

const shortRedirects = [];
const seenShort = new Set();
for (const c of categories) {
  for (const s of c.services) {
    if (s.shortUrl && s.shortUrl !== s.url) {
      if (seenShort.has(s.shortUrl)) continue;
      seenShort.add(s.shortUrl);
      shortRedirects.push({ source: s.shortUrl, destination: s.url });
    }
  }
}

const output = {
  heroServices,
  homeSolutions,
  categories,
  shortRedirects,
};

fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");

for (const c of categories) {
  console.log(
    `${c.slug}: h1=${c.h1 ? "ok" : "MISSING"}, services=${c.services.length}, process=${c.process.steps.length}, why=${c.why.items.length}, cta=${c.cta.primary ? "ok" : "MISSING"}, seo=${c.seoContent.paragraphs.length}`
  );
  for (const s of c.services) {
    if (!s.slug || !s.scope) console.log("  WARN", s.title, s.slug, !!s.scope);
  }
}
console.log("redirects", shortRedirects.length);
console.log("wrote", outPath);
