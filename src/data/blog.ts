import { images } from "./images";

export const blogPage = {
  label: "Kiwi Journal",
  title: "İçgörüler, fikirler",
  titleAccent: "ve her şey arasında.",
  description:
    "Dijital büyüme, tasarım stratejisi ve pazarlama dünyasından en taze düşünceler. Okumaya değer.",
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  accent: string;
  gradient: string;
  featured?: boolean;
  author: string;
};

export const blogCategories = [
  "Tümü",
  "Web Stratejisi",
  "Tasarım",
  "Dijital Pazarlama",
  "SEO",
  "Trendler",
  "Sosyal Medya",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "landing-page-vs-website",
    title: "Landing page mi, web sitesi mi? Fark sandığınızdan büyük.",
    excerpt:
      "Web'e ciddi bir yatırım yaptınız ama beklenen dönüşüm gelmiyor. Çoğu zaman sorun kalite değil, doğru aracı seçme meselesi.",
    category: "Web Stratejisi",
    date: "12 Haziran 2025",
    readTime: "8 dk",
    image: images.projects[0],
    accent: "#a9cb18",
    gradient: "from-emerald-600/40 to-lime-400/10",
    featured: true,
    author: "Kiwi Editör",
  },
  {
    slug: "design-is-decision",
    title: "Tasarım zevk değil, karardır — premium markalar bunu biliyor.",
    excerpt:
      "Bir web sitesine bakıp 'bu marka kaliteli' dediğiniz oluyor mu? Bu his tesadüf değil; stratejik tasarımın sonucu.",
    category: "Tasarım",
    date: "4 Haziran 2025",
    readTime: "6 dk",
    image: images.projects[1],
    accent: "#fda4af",
    gradient: "from-rose-500/35 to-orange-400/10",
    author: "Selin Arslan",
  },
  {
    slug: "digital-trends-2025",
    title: "Dijitalde neler oluyor? 2025 trend raporu",
    excerpt:
      "Sektörel ipuçları, yeni trendler ve en iyi stratejiler için güncel dijital pazarlama öngörüleri.",
    category: "Trendler",
    date: "24 Mayıs 2025",
    readTime: "12 dk",
    image: images.projects[2],
    accent: "#c4b5fd",
    gradient: "from-violet-600/40 to-fuchsia-400/10",
    author: "Kiwi Research",
  },
  {
    slug: "meta-ads-2025",
    title: "Meta Ads 2025: algoritma değişti, stratejiniz de değişmeli",
    excerpt:
      "Andromeda sonrası kreatif test framework'ü ve ölçekleme mantığı — bütçenizi yakmadan büyüyün.",
    category: "Dijital Pazarlama",
    date: "18 Mayıs 2025",
    readTime: "9 dk",
    image: images.services.marketing,
    accent: "#93c5fd",
    gradient: "from-blue-600/35 to-indigo-400/10",
    author: "Emre Yıldız",
  },
  {
    slug: "seo-organic-growth",
    title: "SEO artık sadece anahtar kelime değil — topical authority çağı",
    excerpt:
      "Google'ın EEAT güncellemeleri sonrası organik büyüme için içerik kümesi stratejisi nasıl kurulur?",
    category: "SEO",
    date: "10 Mayıs 2025",
    readTime: "11 dk",
    image: images.services.seo,
    accent: "#67e8f9",
    gradient: "from-cyan-600/35 to-teal-400/10",
    author: "Deniz Korkmaz",
  },
  {
    slug: "brand-voice-guide",
    title: "Marka sesi rehberi: tutarlılık her platformda nasıl sağlanır?",
    excerpt:
      "Tone of voice dokümanından AI destekli içerik üretimine — markanızın konuşma biçimini sistemleştirin.",
    category: "Tasarım",
    date: "2 Mayıs 2025",
    readTime: "7 dk",
    image: images.services.creative,
    accent: "#fcd34d",
    gradient: "from-amber-500/30 to-yellow-400/10",
    author: "Ayşe Demir",
  },
  {
    slug: "cro-playbook",
    title: "CRO playbook: dönüşüm hunisindeki 5 sessiz katili",
    excerpt:
      "Trafiğiniz var ama satış yok mu? Form alanlarından hız optimizasyonuna kadar ölçülebilir düzeltmeler.",
    category: "Web Stratejisi",
    date: "28 Nisan 2025",
    readTime: "10 dk",
    image: images.services.web,
    accent: "#a78bfa",
    gradient: "from-purple-600/35 to-violet-400/10",
    author: "Kiwi Studio",
  },
  {
    slug: "social-algorithm",
    title: "Sosyal medya algoritması 2025: içerik mi, community mi?",
    excerpt:
      "Instagram ve TikTok'ta organik erişim düşerken markaların kazanmak için kullandığı yeni oyun planı.",
    category: "Sosyal Medya",
    date: "20 Nisan 2025",
    readTime: "5 dk",
    image: images.services.social,
    accent: "#f9a8d4",
    gradient: "from-pink-500/35 to-rose-400/10",
    author: "Zeynep Akın",
  },
  {
    slug: "web-performance",
    title: "Web performansı = SEO + dönüşüm: Core Web Vitals rehberi",
    excerpt:
      "LCP, INP ve CLS skorlarınız müşteri kaybettiriyor olabilir. Teknik checklist ve hızlı kazanımlar.",
    category: "SEO",
    date: "14 Nisan 2025",
    readTime: "8 dk",
    image: images.hero[0],
    accent: "#86efac",
    gradient: "from-green-600/30 to-emerald-400/10",
    author: "Can Öztürk",
  },
];

export const featuredPost = blogPosts.find((p) => p.featured) ?? blogPosts[0];
