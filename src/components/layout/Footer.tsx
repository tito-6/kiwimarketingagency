import { nav, site } from "@/data/content";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#141414]">
      <div className="mx-auto max-w-[1440px] px-4 py-12 safe-bottom sm:px-6 sm:py-16 md:px-10">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              İletişim
            </p>
            <a
              href={`tel:${site.phoneTel}`}
              className="mt-4 block text-2xl font-light text-white hover:text-kiwi-400"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block text-lg text-white/70 hover:text-kiwi-400"
            >
              {site.email}
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Navigasyon
            </p>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Sosyal Medya
            </p>
            <ul className="mt-4 space-y-2">
              {["Instagram", "LinkedIn", "Twitter"].map((social) => (
                <li key={social}>
                  <a
                    href="#"
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <Logo className="h-10 w-auto text-white/10 sm:h-12 md:h-14" />
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/40 sm:mt-8 sm:gap-4">
              <Link href="/gizlilik-politikasi" className="hover:text-white">
                Gizlilik Politikası
              </Link>
              <Link href="/hizmet-sartlari" className="hover:text-white">
                Hizmet Şartları
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          <p>© {site.year} {site.fullName}. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
