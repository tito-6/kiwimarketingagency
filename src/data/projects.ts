import { images } from "./images";

export const projelerPage = {
  label: "Referanslarımız",
  title: "Seçilmiş",
  titleAccent: "işler.",
  description:
    "Her proje bir hikaye — strateji, tasarım ve teknolojinin kusursuz birleşimi. Scroll ile keşfedin.",
  stats: [
    { value: "100+", label: "Tamamlanan Proje" },
    { value: "48", label: "Aktif Marka" },
    { value: "12", label: "Sektör" },
    { value: "2x", label: "Ort. Büyüme" },
  ],
};

export type ProjectItem = {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  image: string;
  imageAlt?: string;
  gradient: string;
  accent: string;
  description: string;
  services: string[];
  results: { label: string; value: string }[];
};

export const projectItems: ProjectItem[] = [
  {
    slug: "trendloop",
    title: "TrendLoop",
    category: "E-Ticaret",
    year: "2025",
    client: "TrendLoop Inc.",
    image: images.projects[0],
    imageAlt: images.services.marketing,
    gradient: "from-emerald-600/50 to-lime-400/20",
    accent: "#a9cb18",
    description:
      "Tam kapsamlı e-ticaret dönüşümü: marka yenileme, UX optimizasyonu ve performans pazarlaması ile 6 ayda 3x gelir artışı.",
    services: ["Dijital Pazarlama", "Web Yazılım", "Kreatif Tasarım"],
    results: [
      { label: "Dönüşüm", value: "+186%" },
      { label: "ROAS", value: "4.2x" },
      { label: "Süre", value: "14 hf" },
    ],
  },
  {
    slug: "luma-skin",
    title: "Lüma Skin",
    category: "Güzellik / Tech",
    year: "2025",
    client: "Lüma Beauty",
    image: images.projects[1],
    imageAlt: images.hero[1],
    gradient: "from-rose-500/40 to-orange-400/20",
    accent: "#fda4af",
    description:
      "Premium skincare markası için duyusal bir dijital deneyim — sosyal strateji, influencer kampanyaları ve lansman sitesi.",
    services: ["Sosyal Medya", "Kreatif Tasarım", "SEO"],
    results: [
      { label: "Takipçi", value: "+240%" },
      { label: "Engagement", value: "8.4%" },
      { label: "Lansman", value: "3 hf" },
    ],
  },
  {
    slug: "fabrica",
    title: "Fabrica",
    category: "Moda Teknolojisi",
    year: "2024",
    client: "Fabrica Studio",
    image: images.projects[2],
    imageAlt: images.services.creative,
    gradient: "from-violet-600/45 to-fuchsia-400/25",
    accent: "#c4b5fd",
    description:
      "Moda-tech startup için editorial web deneyimi ve lookbook platformu. Minimal estetik, maksimum etki.",
    services: ["Web Yazılım", "Kreatif Tasarım", "Motion"],
    results: [
      { label: "Bounce", value: "-42%" },
      { label: "Session", value: "+95%" },
      { label: "Ödül", value: "3" },
    ],
  },
  {
    slug: "redshift-motors",
    title: "Redshift Motors",
    category: "Otomotiv / EV",
    year: "2025",
    client: "Redshift®",
    image: images.projects[3],
    imageAlt: images.hero[2],
    gradient: "from-cyan-600/45 to-blue-400/25",
    accent: "#67e8f9",
    description:
      "Elektrikli araç lansmanı için sinematik marka sitesi, 3D ürün vitrinleri ve global performans kampanyası.",
    services: ["Dijital Pazarlama", "Web Yazılım", "Video"],
    results: [
      { label: "Lead", value: "+320%" },
      { label: "CPL", value: "-38%" },
      { label: "Reach", value: "2.1M" },
    ],
  },
  {
    slug: "flowbit",
    title: "Flowbit",
    category: "SaaS / Fintech",
    year: "2025",
    client: "Flowbit",
    image: images.services.web,
    imageAlt: images.projects[0],
    gradient: "from-blue-600/40 to-indigo-400/20",
    accent: "#93c5fd",
    description:
      "B2B SaaS platformu için ürün odaklı landing sistemi, onboarding akışları ve AB test altyapısı.",
    services: ["UI/UX", "CRO", "Dijital Pazarlama"],
    results: [
      { label: "Trial", value: "+156%" },
      { label: "MRR", value: "+89%" },
      { label: "NPS", value: "72" },
    ],
  },
  {
    slug: "vanta-brand",
    title: "Vanta System",
    category: "Kurumsal Kimlik",
    year: "2024",
    client: "Vanta",
    image: images.services.creative,
    imageAlt: images.projects[2],
    gradient: "from-amber-500/35 to-yellow-400/15",
    accent: "#fcd34d",
    description:
      "Kurumsal kimlik sistemi, design token kütüphanesi ve tüm dijital touchpoint'lerde marka tutarlılığı.",
    services: ["Kreatif Tasarım", "Brand Strategy", "Guidelines"],
    results: [
      { label: "Varlık", value: "200+" },
      { label: "Tutarlılık", value: "100%" },
      { label: "Süre", value: "8 hf" },
    ],
  },
];
