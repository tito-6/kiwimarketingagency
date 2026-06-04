"use client";

import { sideNav, site } from "@/data/content";
import Link from "next/link";

export function SideNav() {
  return (
    <aside className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-6 xl:flex">
      <div className="mb-4 rotate-90 text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
        {site.name}®
      </div>
      {sideNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex items-center gap-3 text-right"
        >
          <span className="text-[10px] text-white/30 transition-colors group-hover:text-kiwi-400">
            {item.num}
          </span>
          <span className="text-xs font-medium text-white/50 transition-colors group-hover:text-white">
            {item.label}
          </span>
        </Link>
      ))}
    </aside>
  );
}
