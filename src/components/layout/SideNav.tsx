"use client";

import { primaryNav, CONTACT_HREF } from "@/data/service-pages";
import { site } from "@/data/content";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SideNav() {
  const pathname = usePathname();

  const sideNavItems = [
    ...primaryNav.map((item, index) => ({
      num: `${index + 1}.0`,
      label: item.label,
      href: item.href,
    })),
    {
      num: `${primaryNav.length + 1}.0`,
      label: "İletişim",
      href: CONTACT_HREF,
    },
  ];

  return (
    <aside className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-6 xl:flex">
      <div className="mb-4 rotate-90 text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-900/30">
        {site.name}®
      </div>
      {sideNavItems.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className="group flex items-center gap-3 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2"
          >
            <span
              className={cn(
                "text-[10px] transition-colors group-hover:text-kiwi-400",
                active ? "text-kiwi-400" : "text-neutral-900/30"
              )}
            >
              {item.num}
            </span>
            <span
              className={cn(
                "text-xs font-medium transition-colors group-hover:text-neutral-900",
                active ? "text-neutral-900" : "text-neutral-900/50"
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </aside>
  );
}
