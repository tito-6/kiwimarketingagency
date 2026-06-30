# Kiwi sitesi — görsel boyut listesi

> not: bunu siteye bakarak elle çıkardım. dosya yolları `public/images/` altında.  
> piksel = gerçek dosya boyutu. ekranda responsive olduğu için küçülüp büyüyor, o ayrı mesele.

---

## Kısa özet (hepsi bir arada)

| Dosya | Piksel | Dosya ağırlığı |
|---|---|---|
| hero-1.jpg | 800 × 1000 | ~203 KB |
| hero-2.jpg | 800 × 1000 | ~101 KB |
| hero-3.jpg | 800 × 1000 | ~142 KB |
| project-1.jpg | 1200 × 900 | ~70 KB |
| project-2.jpg | 1200 × 900 | ~163 KB |
| project-3.jpg | 1200 × 900 | ~82 KB |
| project-4.jpg | 1200 × 900 | ~119 KB |
| service-creative.jpg | 1200 × 800 | ~86 KB |
| service-social.jpg | 1200 × 800 | ~269 KB |
| service-marketing.jpg | 1200 × 800 | ~93 KB |
| service-web.jpg | 1200 × 800 | ~193 KB |
| service-seo.jpg | 1200 × 800 | ~67 KB |
| Logo.svg | 755 × 150 | vektör |
| icon.svg (favicon) | 100 × 100 | vektör |

**toplam foto:** 12 adet jpg  
**hero seti:** dikey, 4:5 oran (800×1000)  
**proje seti:** yatay, 4:3 oran (1200×900)  
**hizmet seti:** yatay, 3:2 oran (1200×800)

---

## Ana sayfa `/`

### Hero bölümü (üst kısım)
Sağ tarafta uçuşan 3 foto — sadece büyük ekranda (lg+) görünüyor.

| Görsel adı | Piksel | Nerede |
|---|---|---|
| hero-1.jpg | 800 × 1000 | sağ üst kart |
| hero-2.jpg | 800 × 1000 | sağ orta kart |
| hero-3.jpg | 800 × 1000 | sağ alt kart |

Ekranda kabaca: ~192–256 px genişlik (mobilde hiç yok)

---

### Showreel şeridi (kaydırmalı foto bandı)
| Görsel adı | Piksel |
|---|---|
| hero-1.jpg | 800 × 1000 |
| service-creative.jpg | 1200 × 800 |
| project-1.jpg | 1200 × 900 |
| service-marketing.jpg | 1200 × 800 |
| project-2.jpg | 1200 × 900 |
| hero-3.jpg | 800 × 1000 |

Ekranda: yükseklik ~45–50vh, genişlik min 320px civarı

---

### Hakkımızda bölümü
| Görsel adı | Piksel |
|---|---|
| hero-2.jpg | 800 × 1000 |

4:5 oranında büyük kutu, sayfanın yarısını kaplıyor

---

### Görsel vitrin (Image Showcase)
| Görsel adı | Piksel | Grid |
|---|---|---|
| hero-1.jpg | 800 × 1000 | büyük kare (2×2) |
| service-creative.jpg | 1200 × 800 | küçük |
| service-web.jpg | 1200 × 800 | küçük |
| project-1.jpg | 1200 × 900 | geniş (2×1) |

---

### Hizmetler önizleme
| Görsel adı | Piksel | Hizmet |
|---|---|---|
| service-creative.jpg | 1200 × 800 | Kreatif Tasarım |
| service-social.jpg | 1200 × 800 | Sosyal Medya |
| service-marketing.jpg | 1200 × 800 | Dijital Pazarlama |
| service-web.jpg | 1200 × 800 | Web Yazılım |
| service-seo.jpg | 1200 × 800 | SEO |

---

### Sabitlenmiş projeler (Pinned Projects)
| Görsel adı | Piksel |
|---|---|
| project-1.jpg | 1200 × 900 |
| project-2.jpg | 1200 × 900 |
| project-3.jpg | 1200 × 900 |
| project-4.jpg | 1200 × 900 |

---

### Blog önizleme (ana sayfadaki blog kartları)
| Görsel adı | Piksel |
|---|---|
| project-1.jpg | 1200 × 900 |
| project-2.jpg | 1200 × 900 |
| project-3.jpg | 1200 × 900 |
| project-4.jpg | 1200 × 900 |

(döngüsel kullanılıyor, sırayla)

---

## Hizmetler sayfası `/hizmetler`

### Hero arka plan
| Görsel adı | Piksel |
|---|---|
| service-marketing.jpg | 1200 × 800 |

Tam ekran arka plan, %30 opaklık

---

### Bento grid (hizmet kartları)
| Görsel adı | Piksel | Hizmet |
|---|---|---|
| service-creative.jpg | 1200 × 800 | Kreatif Tasarım |
| service-social.jpg | 1200 × 800 | Sosyal Medya |
| service-marketing.jpg | 1200 × 800 | Dijital Pazarlama |
| service-web.jpg | 1200 × 800 | Web Yazılım |
| service-seo.jpg | 1200 × 800 | SEO |

---

### Hizmet detay bölümleri (scroll ile gelen büyük görseller)
Aynı 5 hizmet görseli, her biri kendi detayında parallax olarak kullanılıyor.

| Görsel adı | Piksel |
|---|---|
| service-creative.jpg | 1200 × 800 |
| service-social.jpg | 1200 × 800 |
| service-marketing.jpg | 1200 × 800 |
| service-web.jpg | 1200 × 800 |
| service-seo.jpg | 1200 × 800 |

---

## Projeler sayfası `/projeler`

### Hero (arka planda dönen slideshow)
| Görsel adı | Piksel | Proje |
|---|---|---|
| project-1.jpg | 1200 × 900 | TrendLoop |
| project-2.jpg | 1200 × 900 | Lüma Skin |
| project-3.jpg | 1200 × 900 | Fabrica |
| project-4.jpg | 1200 × 900 | Redshift Motors |
| service-web.jpg | 1200 × 800 | Flowbit |
| service-creative.jpg | 1200 × 800 | Vanta System |

Tam ekran arka plan (100vw)

---

### Proje vitrin + arşiv
Yukarıdaki 6 görselin hepsi showcase ve archive bölümlerinde de geçiyor.

---

## Blog sayfası `/blog`

### Hero — öne çıkan yazı
| Görsel adı | Piksel | Yazı |
|---|---|---|
| project-1.jpg | 1200 × 900 | Landing page mi, web sitesi mi? |

---

### Scroll theater (tam ekran kaydırmalı)
Her blog yazısının kendi kapak görseli var:

| Görsel adı | Piksel | Yazı başlığı (kısa) |
|---|---|---|
| project-1.jpg | 1200 × 900 | Landing page vs website |
| project-2.jpg | 1200 × 900 | Tasarım zevk değil karardır |
| project-3.jpg | 1200 × 900 | 2025 trend raporu |
| service-marketing.jpg | 1200 × 800 | Meta Ads 2025 |
| service-seo.jpg | 1200 × 800 | SEO topical authority |
| service-creative.jpg | 1200 × 800 | Marka sesi rehberi |
| service-web.jpg | 1200 × 800 | CRO playbook |
| service-social.jpg | 1200 × 800 | Sosyal algoritma 2025 |
| hero-1.jpg | 800 × 1000 | Core Web Vitals rehberi |

---

### Blog günlüğü + şerit
Aynı 9 kapak görseli journal ve scroll strip'te de kullanılıyor.

---

## Blog detay sayfaları `/blog/[slug]`

Her yazının üstünde kapak + içerikte ikincil görsel var.

| Slug | Kapak görseli | Piksel |
|---|---|---|
| landing-page-vs-website | project-1.jpg | 1200 × 900 |
| design-is-decision | project-2.jpg | 1200 × 900 |
| digital-trends-2025 | project-3.jpg | 1200 × 900 |
| meta-ads-2025 | service-marketing.jpg | 1200 × 800 |
| seo-organic-growth | service-seo.jpg | 1200 × 800 |
| brand-voice-guide | service-creative.jpg | 1200 × 800 |
| cro-playbook | service-web.jpg | 1200 × 800 |
| social-algorithm | service-social.jpg | 1200 × 800 |
| web-performance | hero-1.jpg | 800 × 1000 |

---

## İletişim `/iletisim`

Bu sayfada foto yok. Sadece tipografi ve animasyon var.

---

## Tüm sitede ortak (header, footer, loader)

| Görsel adı | Piksel | Ne işe yarıyor |
|---|---|---|
| Logo.svg | 755 × 150 | üst menü logo, footer, yükleme ekranı |
| icon.svg | 100 × 100 | tarayıcı sekmesi favicon |

Logo vektör — ekranda genelde ~120–140 px genişlikte render ediliyor.

---

## Yeni görsel eklerken dikkat

- **Hero fotoğrafları:** 800×1000 veya aynı 4:5 oran. Dikey olsun.
- **Proje fotoğrafları:** 1200×900 (4:3). Yatay.
- **Hizmet fotoğrafları:** 1200×800 (3:2). Yatay.
- Hepsini jpg/webp tut, mümkünse 200 KB altı hedefle (service-social şu an 269 KB, biraz şişman).
- Dosyaları `public/images/hero/`, `projects/`, `services/` klasörlerine koy.
- Kod tarafında `src/data/images.ts` dosyasından çağrılıyor — yeni dosya eklersen oraya da yazman lazım.

---

*son güncelleme: haziran 2025 — kiwi repo içinden tarandı*
