export const site = {
  name: "Kiwi",
  tagline: "Marketing Agency",
  fullName: "Kiwi Agency",
  email: "info@kiwimarketingagency.com",
  phone: "+90 532 630 57 13",
  phoneTel: "+905326305713",
  year: new Date().getFullYear(),
  social: {
    instagram: "https://www.instagram.com/kiwimarketingagency/",
    linkedin: "https://www.linkedin.com/company/kiwi-marketingagency/",
  },
};

import { images } from "./images";

export const nav = [
  { label: "Anasayfa", href: "/" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Projeler", href: "/projeler" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export const sideNav = [
  { num: "1.0", label: "Studio", href: "/#about" },
  { num: "2.0", label: "Projeler", href: "/projeler" },
  { num: "3.0", label: "Hizmetler", href: "/hizmetler" },
  { num: "4.0", label: "Blog", href: "/blog" },
  { num: "5.0", label: "İletişim", href: "/iletisim" },
];

export const hizmetlerPage = {
  title: "Hizmetler",
  subtitle: "Çözümlerimiz",
  headline: "Geleceğe hazır dijital hizmetler.",
  headlineAccent: "Strateji ile güçlendirilmiş.",
  description:
    "Markanızın dijital dünyada güçlenmesi için uçtan uca yaratıcı ve ölçülebilir çözümler sunuyoruz.",
  process: [
    { step: "01", title: "Keşif", desc: "Markanızı, hedeflerinizi ve rakiplerinizi derinlemesine analiz ediyoruz." },
    { step: "02", title: "Strateji", desc: "Veri odaklı yol haritası ve KPI'larla net bir plan oluşturuyoruz." },
    { step: "03", title: "Üretim", desc: "Tasarım, içerik ve geliştirme — hızlı sprintlerle teslim ediyoruz." },
    { step: "04", title: "Optimizasyon", desc: "Performansı ölçüyor, test ediyor ve sürekli iyileştiriyoruz." },
  ],
};

export const hero = {
  eyebrow: "Dijital Pazarlama Ajansı",
  title: "KIWI",
  subtitle: "Marketing Agency®",
  description:
    "Dijital pazarlama, sosyal medya, kreatif tasarım, prodüksiyon ve web çözümlerini tek çatı altında sunuyoruz. Markaların dijital dünyada sadece var olması değil, doğru şekilde konumlanması gerektiğine inanıyoruz.",
  cta: "Tanışalım mı?",
};

export const about = {
  label: "HAKKIMIZDA",
  title: "Çünkü sizin başarınızı kendi başarımız gibi sahipleniyoruz.",
  paragraphs: [
    "2017 yılından bu yana dijital pazarlama sektöründe aktif olarak çalışmalar yürüten Kurucumuz Yasin Adıbelli, farklı sektörlerden birçok markanın dijital büyüme süreçlerinde görev almıştır.",
    "Medya Planlama, Performans Reklamcılığı, Marka Konumlandırma, Sosyal Medya Yönetimi ve Dijital Strateji alanlarında edindiği deneyimlerle; yüksek bütçeli dijital pazarlama yönetimi süreçlerinde aktif sorumluluk üstlenmiştir.",
    "Kariyeri boyunca Kanal D, Demirören, Misli.com, Mercedes-Benz, Lösev, Milli Piyango, Doğuş Oto, Katılım Emeklilik, Hupa-Lupa, Model Sanayi&Kuyum Merkezi ve DAP Yapı başta olmak üzere birçok markayla çalışma fırsatı bulmuştur.",
    "KIWI Marketing Agency'nin temel yaklaşımı da bu deneyimden beslenmektedir:",
    "Yaratıcılığı veriyle birleştiren, estetik kadar performansa da önem veren güçlü dijital çözümler üretmek.",
  ],
};

export const services = [
  {
    id: "001",
    slug: "kreatif-tasarim",
    title: "Kreatif Tasarım",
    image: images.services.creative,
    description:
      "Markanızın ruhunu yansıtan özgün ve etkili tasarımlar üreterek güçlü bir görsel kimlik oluşturuyoruz.",
    longDescription:
      "Logo'dan kurumsal kimliğe, kampanya görsellerinden motion design'a kadar markanızın her dokunuş noktasını tasarlıyoruz. AI destekli iterasyonlar ve insan sezgisi bir arada.",
    tags: [
      "Kurumsal Kimlik Tasarımı",
      "Web & Mobil Arayüz (UI/UX)",
      "Reklam ve Kampanya Tasarımları",
      "Sosyal Medya Tasarımları",
      "Sunum & Kurumsal Doküman",
      "Motion Design & Animasyon",
    ],
    count: "6+",
  },
  {
    id: "002",
    slug: "sosyal-medya",
    title: "Sosyal Medya Yönetimi",
    image: images.services.social,
    description:
      "Stratejik içerik planlaması ve yaratıcı üretimle markanızı sosyal medyada öne çıkarıyor, topluluğunuzla bağ kuruyoruz.",
    longDescription:
      "İçerik takvimi, influencer işbirlikleri ve topluluk yönetimi ile markanızı sosyal medyada büyütüyoruz.",
    tags: [
      "İçerik Üretimi",
      "Influencer İşbirlikleri",
      "Marka Strateji Planlaması",
    ],
    count: "3+",
  },
  {
    id: "003",
    slug: "dijital-pazarlama",
    title: "Dijital Pazarlama",
    image: images.services.marketing,
    description:
      "Hedeflerinize en hızlı ve ölçülebilir şekilde ulaşmanız için veri odaklı reklam stratejileri sunuyoruz.",
    longDescription:
      "Google Ads, Meta Ads ve CRO ile dönüşüm odaklı kampanyalar. Her kuruşun hesabını veriyoruz.",
    tags: [
      "Google Ads",
      "Meta Ads (Facebook & Instagram)",
      "CRO",
      "Veri Performans Analitiği",
      "Büyüme & Medya Stratejisi",
      "Hedef Kitle Segmentasyonu",
    ],
    count: "6+",
  },
  {
    id: "004",
    slug: "web-yazilim",
    title: "Web Yazılım",
    image: images.services.web,
    description:
      "Kullanıcı deneyimini ve dönüşüm oranlarını artıran, mobil uyumlu ve SEO destekli web siteleri geliştiriyoruz.",
    longDescription:
      "React, Next.js ve modern stack ile hızlı, SEO dostu ve dönüşüm odaklı web deneyimleri inşa ediyoruz.",
    tags: [
      "Özel Web Site Geliştirme",
      "Landing Page Tasarım",
      "E-Ticaret Entegrasyonları",
      "Bakım, Destek ve Performans",
    ],
    count: "4+",
  },
  {
    id: "005",
    slug: "seo",
    title: "SEO Optimizasyonu",
    image: images.services.seo,
    description:
      "Sitenizin arama motorlarında görünürlüğünü artırmak için SEO çalışmaları yürütüyoruz.",
    longDescription:
      "Teknik SEO, içerik stratejisi ve organik büyüme ile arama motorlarında kalıcı görünürlük sağlıyoruz.",
    tags: [
      "Arama Motoru Optimizasyonu",
      "Organik Büyüme Stratejileri",
      "Veri Odaklı SEO Çözümleri",
    ],
    count: "3+",
  },
];

export const whyChoose = {
  label: "Neden Kiwi?",
  title: "Netlik, Hız ve Ölçülebilirlik — Kiwi Yolu",
  items: [
    {
      title: "Sınırsız Yaratıcılık",
      description:
        "Her marka için özgün konseptler üretiyoruz. Hızlı taslaklar, yüksek netlik ve darboğazsız süreçler.",
      stat: "100+",
      statLabel: "tamamlanan proje",
    },
    {
      title: "Veri Odaklı Büyüme",
      description:
        "Tahminlere değil, analitiğe dayanan kampanyalarla hedeflerinize en hızlı şekilde ulaşmanızı sağlıyoruz.",
      stat: "80%",
      statLabel: "zaman tasarrufu",
    },
    {
      title: "Marka Tutarlılığı",
      description:
        "Tasarım sistemlerinden kreatif varlıklara, markanız her ekranda ve platformda tutarlı kalır.",
      stat: "100%",
      statLabel: "marka uyumu",
    },
    {
      title: "2x Daha Hızlı Lansman",
      description:
        "Hızlandırılmış sprint modelimiz zaman çizelgenizi aylardan haftalara indirir — geri bildirim döngüleri insani ve empatik kalır.",
      stat: "2x",
      statLabel: "daha hızlı",
    },
  ],
};

export const stack = {
  label: "Stack",
  title: "Akıllı Araçlar. Etkileyici Sonuçlar.",
  tools: [
    "Figma",
    "Adobe Creative",
    "Google Ads",
    "Meta Business",
    "React",
    "Next.js",
    "Webflow",
    "Framer",
    "Analytics",
    "Hotjar",
  ],
};

export const projects = {
  label: "Referanslarımız",
  title: "Dijitalde öne çıkan işlerimiz",
  items: [
    {
      title: "TrendLoop",
      category: "E-Ticaret",
      year: "2025",
      image: images.projects[0],
      gradient: "from-emerald-600/40 to-lime-400/20",
    },
    {
      title: "Lüma Skin",
      category: "Güzellik / Teknoloji",
      year: "2025",
      image: images.projects[1],
      gradient: "from-rose-500/30 to-orange-400/20",
    },
    {
      title: "Fabrica",
      category: "Moda Teknolojisi",
      year: "2024",
      image: images.projects[2],
      gradient: "from-violet-600/40 to-fuchsia-400/20",
    },
    {
      title: "Redshift Motors",
      category: "Otomotiv / EV",
      year: "2025",
      image: images.projects[3],
      gradient: "from-cyan-600/40 to-blue-400/20",
    },
  ],
};

export const testimonials = {
  label: "Referanslar",
  title: "Müşterilerimiz dijital büyümenin gücünden bahsediyor.",
  items: [
    {
      quote:
        "Kiwi Agency lansman süremizi yarıya indirdi. Çıktılar sadece hızlı değildi — inanılmaz derecede kaliteliydi.",
      author: "Ayşe Yılmaz",
      role: "Pazarlama Direktörü",
      company: "Flowbit",
      stat: "50%",
      statLabel: "daha kısa lansman süresi",
    },
    {
      quote:
        "Marka sistemimiz artık tüm varlıklarda tutarlılığı koruyor. Bu akıllı tutarlılık.",
      author: "Mehmet Kaya",
      role: "Marka Müdürü",
      company: "Vanta",
      stat: "3X",
      statLabel: "manuel süreçlere göre daha hızlı",
    },
  ],
};

export const blog = {
  label: "Kiwi Blog",
  title: "Dijital büyümenize yön verecek trendler ve stratejik içgörüler.",
  posts: [
    {
      title: "Landing page mi, web sitesi mi? Fark sandığınızdan büyük.",
      excerpt:
        "Web'e ciddi bir yatırım yaptınız ama beklenen dönüşüm gelmiyor. Çoğu zaman sorun kalite değil, doğru aracı seçme meselesi.",
      category: "Web Stratejisi",
      date: "12 Haziran 2025",
    },
    {
      title: "Tasarım Zevk Değil, Karardır ve Premium Markalar Bunu Biliyor",
      excerpt:
        "Bir web sitesine bakıp 'bu marka kaliteli' dediğiniz oluyor mu? Bu his tesadüf değil — stratejik tasarımın sonucu.",
      category: "Tasarım",
      date: "4 Haziran 2025",
    },
    {
      title: "Dijitalde Neler Oluyor? 2025 Trend Raporu",
      excerpt:
        "Sektörel ipuçları, yeni trendler ve en iyi stratejiler için güncel dijital pazarlama öngörüleri.",
      category: "Trendler",
      date: "24 Mayıs 2025",
    },
  ],
};

export const faqs = {
  label: "SSS",
  title: "Sorularınız mı var? Cevaplarımız hazır.",
  items: [
    {
      q: "Kiwi Agency'yi geleneksel ajanslardan ayıran nedir?",
      a: "Veri odaklı strateji ile yaratıcı üretimi birleştiriyoruz. Daha hızlı, ölçülebilir ve ölçeklenebilir dijital çözümler sunuyoruz — kaliteden ve vizyondan ödün vermeden.",
    },
    {
      q: "Özel paketler sunuyor musunuz?",
      a: "Evet. Her markanın ihtiyacına göre özelleştirilmiş paketler ve proje bazlı çalışma modelleri sunuyoruz.",
    },
    {
      q: "Hangi sektörlerle çalışıyorsunuz?",
      a: "E-ticaret, teknoloji, güzellik, moda, otomotiv ve daha fazlası — dijitalde büyümek isteyen tüm markalarla çalışıyoruz.",
    },
    {
      q: "Proje süreci nasıl işliyor?",
      a: "Keşif görüşmesi, strateji, üretim ve optimizasyon aşamalarından oluşan şeffaf bir sprint modeli kullanıyoruz. Her 48 saatte güncelleme alırsınız.",
    },
    {
      q: "SEO ve performans pazarlamayı birlikte yönetiyor musunuz?",
      a: "Evet. Organik büyüme ve ücretli medya stratejilerini entegre bir şekilde yöneterek maksimum ROI sağlıyoruz.",
    },
  ],
};

export const contact = {
  label: "İletişim",
  title: "Konuşalım.\nTasarlıyor, geliştiriyor ve büyütüyoruz.",
  subtitle: "Keşif Görüşmesi Ayarlayın",
  response: "24 saat içinde yanıt veriyoruz — genellikle daha hızlı.",
  services: [
    "Kreatif Tasarım",
    "Sosyal Medya Yönetimi",
    "Dijital Pazarlama",
    "Web Yazılım",
    "SEO Optimizasyonu",
  ],
};

export const marqueeItems = [
  "Performans Pazarlama",
  "Kreatif Tasarım",
  "Sosyal Medya",
  "Web Yazılım",
  "SEO",
  "UI/UX",
  "Google Ads",
  "Meta Ads",
  "Marka Stratejisi",
  "E-Ticaret",
];
