"use client";

import { useLanguage } from "@/context/LanguageContext";
import { site } from "@/data/content";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";

const socialLinks = [
  { label: "Instagram", href: site.social.instagram },
  { label: "LinkedIn", href: site.social.linkedin },
] as const;

export function Footer() {
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.services, href: "/hizmetler" },
    { label: t.nav.projects, href: "/projeler" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.contact, href: "/iletisim" },
  ];

  return (
    <footer className="border-t border-neutral-900/10 bg-neutral-50">
      <div className="mx-auto max-w-[1440px] px-4 py-12 safe-bottom sm:px-6 sm:py-16 md:px-10">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-900/40">
              {t.footer.contactHeader}
            </p>
            <a
              href={`tel:${site.phoneTel}`}
              className="mt-4 block text-2xl font-light text-neutral-900 hover:text-kiwi-400"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block text-lg text-neutral-900/70 hover:text-kiwi-400"
            >
              {site.email}
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-900/40">
              {t.footer.navHeader}
            </p>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-900/60 transition-colors hover:text-neutral-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-900/40">
              {t.footer.socialHeader}
            </p>
            <ul className="mt-4 space-y-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900/60 transition-colors hover:text-neutral-900"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <Logo className="h-10 w-auto text-neutral-900/10 sm:h-12 md:h-14" />
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-neutral-900/40 sm:mt-8 sm:gap-4">
              <Link href="/gizlilik-politikasi" className="hover:text-neutral-900">
                {t.footer.privacy}
              </Link>
              <Link href="/hizmet-sartlari" className="hover:text-neutral-900">
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-neutral-900/10 pt-8 text-center text-xs text-neutral-900/40">
          <p>© {site.year} {site.fullName}. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
