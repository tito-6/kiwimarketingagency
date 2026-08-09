"use client";

import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_HREF, primaryNav } from "@/data/service-pages";
import { site } from "@/data/content";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isLightPage = pathname !== "/";
  // Only the homepage video hero uses a dark transparent header at the top.
  const isDarkThemeHeader = pathname === "/" && !scrolled && !menuOpen;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={cn(
          "site-header fixed top-0 z-50 h-20 w-full transition-all duration-500",
          scrolled || (isLightPage && !isDarkThemeHeader)
            ? "border-b border-neutral-900/10 bg-white/95 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="nav-wrapper mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-10">
          <Link
            href="/"
            aria-label={site.name}
            className="logo-link flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2"
          >
            <Logo
              className={cn(
                "block h-6 w-auto transition-colors hover:text-kiwi-400",
                isDarkThemeHeader ? "text-white" : "text-neutral-900"
              )}
            />
          </Link>

          <nav aria-label="Ana menü" className="nav-menu hidden items-center gap-1 xl:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "nav-link flex h-11 items-center justify-center rounded-lg px-3 text-[13px] font-bold uppercase leading-none tracking-[0.08em] transition-colors hover:bg-neutral-900/[0.05] hover:text-kiwi-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2 2xl:px-4 2xl:text-[15px] 2xl:tracking-[0.1em]",
                  isDarkThemeHeader ? "text-white/85" : "text-neutral-900/85",
                  isActive(item.href) && "text-kiwi-400"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 xl:flex">
            <Link
              href={CONTACT_HREF}
              className={cn(
                "contact-button flex h-11 shrink-0 items-center justify-center rounded-full border px-6 text-[15px] font-bold uppercase leading-none tracking-[0.1em] transition-all hover:border-kiwi-400 hover:bg-kiwi-400/10 hover:text-kiwi-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2",
                isDarkThemeHeader
                  ? "border-white/25 text-white"
                  : "border-neutral-900/25 text-neutral-900"
              )}
            >
              {t.header.contactButton}
            </Link>
          </div>

          <div className="flex items-center gap-3 xl:hidden">
            <button
              type="button"
              ref={closeRef}
              aria-label={t.header.menuAria}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              className="menu-toggle flex size-10 shrink-0 flex-col items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span
                className={cn(
                  "h-0.5 w-6 transition-all",
                  isDarkThemeHeader ? "bg-white" : "bg-neutral-900",
                  menuOpen && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-6 transition-all",
                  isDarkThemeHeader ? "bg-white" : "bg-neutral-900",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-6 transition-all",
                  isDarkThemeHeader ? "bg-white" : "bg-neutral-900",
                  menuOpen && "-translate-y-2 -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label={t.header.menuAria}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-white px-6 pb-10 safe-bottom sm:px-8 xl:hidden"
          >
            <nav aria-label="Mobil menü" className="flex flex-col gap-5 sm:gap-6">
              {primaryNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "text-3xl font-light text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2 sm:text-4xl",
                      isActive(item.href) && "text-kiwi-500"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: primaryNav.length * 0.08 }}
                className="mt-6 border-t border-neutral-900/10 pt-6"
              >
                <Link
                  href={CONTACT_HREF}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex min-h-11 items-center rounded-full bg-kiwi-400 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiwi-400 focus-visible:ring-offset-2"
                >
                  {t.header.contactButton}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
