"use client";

import { useLanguage } from "@/context/LanguageContext";
import { site } from "@/data/content";
import Link from "next/link";

export function SideNav() {
  const { t } = useLanguage();

  const sideNavItems = [
    { num: "1.0", label: t.sideNav.studio, href: "/#about" },
    { num: "2.0", label: t.sideNav.projects, href: "/projeler" },
    { num: "3.0", label: t.sideNav.services, href: "/hizmetler" },
    { num: "4.0", label: t.sideNav.blog, href: "/blog" },
    { num: "5.0", label: t.sideNav.contact, href: "/iletisim" },
  ];

  return (
    <aside className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-6 xl:flex">
      <div className="mb-4 rotate-90 text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-900/30">
        {site.name}®
      </div>
      {sideNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex items-center gap-3 text-right"
        >
          <span className="text-[10px] text-neutral-900/30 transition-colors group-hover:text-kiwi-400">
            {item.num}
          </span>
          <span className="text-xs font-medium text-neutral-900/50 transition-colors group-hover:text-neutral-900">
            {item.label}
          </span>
        </Link>
      ))}
    </aside>
  );
}
