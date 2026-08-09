import type { BlogPost } from "./blog";
import { blogPosts } from "./blog";
import { images } from "./images";
import seoBlogs from "./seo-blogs.json";

export type ContentBlock =
  | { type: "lead"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "image"; src: string; caption?: string }
  | { type: "list"; items: string[] }
  | { type: "stats"; items: { label: string; value: string }[] };

const seoBlocksBySlug = new Map(
  seoBlogs.map((p) => [p.slug, p.blocks as ContentBlock[]])
);

function legacyArticleContent(post: BlogPost): ContentBlock[] {
  const serviceLinks = (post.relatedServices ?? [])
    .map((s) => `[${s.label}](${s.href})`)
    .join(", ");

  return [
    { type: "lead", text: post.excerpt },
    {
      type: "h2",
      id: "giris",
      text: "Neden bu konu şimdi önemli?",
    },
    {
      type: "p",
      text: `${post.category} alanında markalar artık sadece görünür olmakla yetinmiyor — ölçülebilir büyüme ve sürdürülebilir strateji arıyor. Kiwi Agency olarak yüzlerce projede gördüğümüz ortak desen: doğru araç, doğru mesaj ve doğru zamanda bir araya geldiğinde sonuçlar katlanarak artıyor.`,
    },
    {
      type: "h2",
      id: "strateji",
      text: "Stratejik çerçeve",
    },
    {
      type: "p",
      text: "Başarılı kampanyalar tesadüf değildir. Veri analitiği, kullanıcı araştırması ve yaratıcı testler birbirini beslediğinde markanız rakiplerinden ayrışır. Bu yazıda adım adım uygulanabilir bir çerçeve sunuyoruz.",
    },
    {
      type: "list",
      items: [
        "Hedef kitle segmentasyonu ve persona netliği",
        "Kanal seçimi: organik mi, ücretli mi, hibrit mi?",
        "Kreatif test döngüleri ve ölçüm KPI'ları",
        "Sürekli optimizasyon ve öğrenme kültürü",
      ],
    },
    {
      type: "quote",
      text: "Strateji olmadan tasarım süs, veri olmadan strateji tahmindir.",
      author: "Kiwi Studio",
    },
    {
      type: "h2",
      id: "uygulama",
      text: "Pratik uygulama adımları",
    },
    {
      type: "p",
      text: "Teoriyi sahaya indirmek için 48 saatlik sprint modeli kullanıyoruz: keşif, hipotez, üretim, test, ölçüm. Her döngüde bir varsayımı çürütüyor veya doğruluyoruz — böylece bütçe israfı minimize edilir.",
    },
    ...(serviceLinks
      ? ([
          {
            type: "h2" as const,
            id: "ilgili-hizmetler",
            text: "İlgili Kiwi hizmetleri",
          },
          {
            type: "p" as const,
            text: `Bu konuda derinlemesine destek için: ${serviceLinks}. Ücretsiz keşif için [iletişim](/iletisim) sayfamızı ziyaret edin.`,
          },
        ] as ContentBlock[])
      : []),
  ];
}

export function getArticleContent(post: BlogPost): ContentBlock[] {
  return seoBlocksBySlug.get(post.slug) ?? legacyArticleContent(post);
}

export function getSecondaryImage(post: BlogPost): string {
  const pool = [
    images.services.web,
    images.services.creative,
    images.services.marketing,
    images.services.social,
    images.services.seo,
  ];
  const idx = post.slug.length % pool.length;
  return pool[idx];
}

export function getAdjacentPosts(slug: string) {
  const idx = blogPosts.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? blogPosts[idx - 1] : null,
    next: idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null,
  };
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const bySlug = new Map(blogPosts.map((p) => [p.slug, p]));
  const preferred = (post.relatedSlugs ?? [])
    .map((s) => bySlug.get(s))
    .filter((p): p is BlogPost => Boolean(p));

  if (preferred.length >= limit) return preferred.slice(0, limit);

  const extras = blogPosts.filter(
    (p) =>
      p.slug !== post.slug &&
      !preferred.some((r) => r.slug === p.slug) &&
      (p.category === post.category || Boolean(p.relatedServices?.length))
  );

  return [...preferred, ...extras].slice(0, limit);
}
