export type Language = "tr" | "en";

export interface TranslationDictionary {
  nav: {
    home: string;
    services: string;
    projects: string;
    blog: string;
    contact: string;
  };
  header: {
    contactButton: string;
    menuAria: string;
  };
  sideNav: {
    studio: string;
    projects: string;
    services: string;
    blog: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    cta: string;
  };
  contactForm: {
    title: string;
    response: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    companyLabel: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneHint: string;
    serviceSelect: string;
    messagePlaceholder: string;
    submitButton: string;
    submitting: string;
    newMsg: string;
    termsPrefix: string;
    termsLink: string;
    andWord: string;
    privacyLink: string;
    termsSuffix: string;
    successTitle: string;
    successDesc: string;
    callBtn: string;
    selectCountry: string;
    searchCountry: string;
    services: string[];
  };
  thankYouPage: {
    metaTitle: string;
    metaDesc: string;
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    timeframeTitle: string;
    timeframeSub: string;
    steps: Array<{
      num: string;
      title: string;
      desc: string;
    }>;
    quickContactTitle: string;
    callUs: string;
    whatsapp: string;
    backToHome: string;
    exploreServices: string;
  };
  footer: {
    contactHeader: string;
    navHeader: string;
    socialHeader: string;
    privacy: string;
    terms: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  tr: {
    nav: {
      home: "Anasayfa",
      services: "Hizmetler",
      projects: "Projeler",
      blog: "Blog",
      contact: "İletişim",
    },
    header: {
      contactButton: "İletişim",
      menuAria: "Menü",
    },
    sideNav: {
      studio: "Studio",
      projects: "Projeler",
      services: "Hizmetler",
      blog: "Blog",
      contact: "İletişim",
    },
    hero: {
      eyebrow: "Dijital Pazarlama Ajansı",
      title: "KIWI",
      subtitle: "Marketing Agency®",
      description:
        "Dijital pazarlama, sosyal medya, kreatif tasarım, prodüksiyon ve web çözümlerini tek çatı altında sunuyoruz. Markaların dijital dünyada sadece var olması değil, doğru şekilde konumlanması gerektiğine inanıyoruz.",
      cta: "Tanışalım mı?",
    },
    contactForm: {
      title: "Projenizi anlatın",
      response: "24 saat içinde yanıt veriyoruz — genellikle daha hızlı.",
      subtitle: "Markanızın ihtiyaçlarını belirleyelim",
      nameLabel: "İsminiz",
      emailLabel: "E-posta",
      companyLabel: "Şirket (İsteğe bağlı)",
      phoneLabel: "Telefon",
      phonePlaceholder: "532 630 57 13",
      phoneHint: "Türkiye: 5XX XXX XX XX · Uluslararası: Ülke kodu seçin ve numarayı girin",
      serviceSelect: "Hizmet Seçin",
      messagePlaceholder: "Proje detayları (isteğe bağlı)…",
      submitButton: "Mesaj Gönder",
      submitting: "Gönderiliyor...",
      newMsg: "Yeni mesaj gönder",
      termsPrefix: "Göndererek ",
      termsLink: "Hizmet Şartlarımızı",
      andWord: " ve ",
      privacyLink: "Gizlilik Politikamızı",
      termsSuffix: " kabul etmiş olursunuz.",
      successTitle: "Teşekkürler — mesajınız bize ulaştı",
      successDesc:
        "Kiwi ekibi talebinizi aldı. Genellikle 4 saat içinde dönüş yapıyoruz. Acilse bizi doğrudan arayabilirsiniz.",
      callBtn: "+90 532 630 57 13",
      selectCountry: "Ülke Kodu",
      searchCountry: "Ülke ara...",
      services: [
        "Kreatif Tasarım",
        "Sosyal Medya Yönetimi",
        "Dijital Pazarlama",
        "Web Yazılım",
        "SEO Optimizasyonu",
      ],
    },
    thankYouPage: {
      metaTitle: "Teşekkür Ederiz — Kiwi Agency",
      metaDesc: "Talebiniz başarıyla bize ulaştı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.",
      badge: "Talebiniz Alındı",
      title: "Teşekkür Ederiz!",
      subtitle: "Mesajınız bize başarıyla ulaştı.",
      description:
        "Kiwi Marketing Agency ekibi talebinizi incelemeye aldı. Dijital dünyadaki büyüme yolculuğunuzda size özel çözümler sunmak için sabırsızlanıyoruz.",
      timeframeTitle: "Süreç Nasıl İşleyecek?",
      timeframeSub: "Genellikle 4 saat içinde doğrudan sizinle iletişime geçiyoruz.",
      steps: [
        {
          num: "01",
          title: "İnceleme",
          desc: "Proje detaylarınız uzman ekibimiz tarafından incelenir.",
        },
        {
          num: "02",
          title: "Strateji",
          desc: "Sektörünüze özel verimlilik ve reklam stratejisi hazırlanır.",
        },
        {
          num: "03",
          title: "Dönüş",
          desc: "Telefon veya e-posta ile detaylı görüşme planlanır.",
        },
      ],
      quickContactTitle: "Acil bir projeniz mi var?",
      callUs: "Bizi Arayın",
      whatsapp: "WhatsApp'tan Yazın",
      backToHome: "Anasayfaya Dön",
      exploreServices: "Hizmetleri İncele",
    },
    footer: {
      contactHeader: "İletişim",
      navHeader: "Navigasyon",
      socialHeader: "Sosyal Medya",
      privacy: "Gizlilik Politikası",
      terms: "Hizmet Şartları",
      rights: "Tüm hakları saklıdır.",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
    },
    header: {
      contactButton: "Contact",
      menuAria: "Menu",
    },
    sideNav: {
      studio: "Studio",
      projects: "Projects",
      services: "Services",
      blog: "Blog",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Digital Marketing Agency",
      title: "KIWI",
      subtitle: "Marketing Agency®",
      description:
        "We deliver digital marketing, social media, creative design, production, and web solutions under one roof. We believe brands shouldn't just exist in the digital realm—they should lead it.",
      cta: "Let's Talk",
    },
    contactForm: {
      title: "Tell us about your project",
      response: "We respond within 24 hours — usually much faster.",
      subtitle: "Let's define your brand's growth path",
      nameLabel: "Your Name",
      emailLabel: "Email Address",
      companyLabel: "Company (Optional)",
      phoneLabel: "Phone Number",
      phonePlaceholder: "532 630 57 13",
      phoneHint: "Turkey: 5XX XXX XX XX · International: Select country code & enter phone",
      serviceSelect: "Select Service",
      messagePlaceholder: "Project details (optional)…",
      submitButton: "Send Message",
      submitting: "Sending...",
      newMsg: "Send another message",
      termsPrefix: "By submitting, you agree to our ",
      termsLink: "Terms of Service",
      andWord: " and ",
      privacyLink: "Privacy Policy",
      termsSuffix: ".",
      successTitle: "Thank you — your message has been received",
      successDesc:
        "The Kiwi team received your inquiry. We typically reply within 4 hours. For urgent matters, call us directly.",
      callBtn: "+90 532 630 57 13",
      selectCountry: "Country Code",
      searchCountry: "Search country...",
      services: [
        "Creative Design",
        "Social Media Management",
        "Digital Marketing",
        "Web Development",
        "SEO Optimization",
      ],
    },
    thankYouPage: {
      metaTitle: "Thank You — Kiwi Agency",
      metaDesc: "Your request has been successfully received. Our team will contact you shortly.",
      badge: "Request Received",
      title: "Thank You!",
      subtitle: "Your message has reached our team.",
      description:
        "Kiwi Marketing Agency is currently reviewing your inquiry. We look forward to delivering tailored solutions for your brand's digital growth.",
      timeframeTitle: "What Happens Next?",
      timeframeSub: "We usually contact you directly within 4 hours.",
      steps: [
        {
          num: "01",
          title: "Review",
          desc: "Your project details are reviewed by our specialist team.",
        },
        {
          num: "02",
          title: "Strategy",
          desc: "A tailored performance & marketing roadmap is crafted.",
        },
        {
          num: "03",
          title: "Follow-up",
          desc: "We reach out via phone or email to outline next steps.",
        },
      ],
      quickContactTitle: "Have an urgent project?",
      callUs: "Call Us Now",
      whatsapp: "Chat on WhatsApp",
      backToHome: "Back to Home",
      exploreServices: "Explore Services",
    },
    footer: {
      contactHeader: "Contact",
      navHeader: "Navigation",
      socialHeader: "Social Media",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "All rights reserved.",
    },
  },
};
