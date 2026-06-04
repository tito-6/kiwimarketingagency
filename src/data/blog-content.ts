import type { BlogPost } from "./blog";
import { blogPosts } from "./blog";
import { images } from "./images";

export type ContentBlock =
  | { type: "lead"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "image"; src: string; caption?: string }
  | { type: "list"; items: string[] }
  | { type: "stats"; items: { label: string; value: string }[] };

export function getArticleContent(post: BlogPost): ContentBlock[] {
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
      type: "stats",
      items: [
        { label: "Ortalama ROI", value: "+142%" },
        { label: "Uygulama süresi", value: post.readTime },
        { label: "Sektör", value: post.category },
      ],
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
      type: "image",
      src: post.image,
      caption: `${post.title} — Kiwi Agency görsel çalışması`,
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
    {
      type: "p",
      text: "Markanızın dijital varlığını güçlendirmek için Kiwi ekibiyle çalışmak istiyorsanız, keşif görüşmesi ücretsiz. Birlikte yol haritanızı çizelim.",
    },
  ];
}

export function getSecondaryImage(post: BlogPost): string {
  const pool = [...images.projects, ...images.hero, images.services.creative];
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
