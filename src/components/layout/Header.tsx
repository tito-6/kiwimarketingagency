"use client";

import { useLanguage } from "@/context/LanguageContext";
import { site } from "@/data/content";
import { Logo } from "@/components/ui/Logo";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Determine if header should render dark text or light text.
  // Home page top has dark video hero; all inner pages (like /iletisim, /hizmetler) or scrolled header have light background.
  const isLightPage = pathname !== "/";
  const isDarkThemeHeader = !isLightPage && !scrolled && !menuOpen;

  const navItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.services, href: "/hizmetler" },
    { label: t.nav.projects, href: "/projeler" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.contact, href: "/iletisim" },
  ];

  return (
    <>
      <header
        className={cn(
          "site-header fixed top-0 z-50 h-20 w-full transition-all duration-500",
          scrolled || isLightPage
            ? "border-b border-neutral-900/10 bg-white/95 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="nav-wrapper mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-10">
          <Link
            href="/"
            aria-label={site.name}
            className="logo-link flex shrink-0 items-center"
          >
            <Logo
              className={cn(
                "block h-6 w-auto transition-colors hover:text-kiwi-400",
                isDarkThemeHeader ? "text-white" : "text-neutral-900"
              )}
            />
          </Link>

          <nav className="nav-menu hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "nav-link flex h-11 items-center justify-center rounded-lg px-5 text-[15px] font-bold uppercase leading-none tracking-[0.1em] transition-colors hover:bg-neutral-900/[0.05] hover:text-kiwi-400",
                  isDarkThemeHeader ? "text-white/85" : "text-neutral-900/85"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            {/* Language Switcher Toggle */}
            <div className={cn(
              "flex items-center gap-1 rounded-full border p-1 backdrop-blur-md transition-colors",
              isDarkThemeHeader
                ? "border-white/20 bg-white/10"
                : "border-neutral-900/15 bg-neutral-900/5"
            )}>
              <button
                type="button"
                onClick={() => setLang("tr")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all",
                  lang === "tr"
                    ? "bg-kiwi-400 text-neutral-900 shadow-sm"
                    : isDarkThemeHeader
                      ? "text-white/80 hover:text-white"
                      : "text-neutral-700 hover:text-neutral-900"
                )}
              >
                <FlagIcon code="TR" className="h-3 w-4 rounded-xs shrink-0" />
                <span>TR</span>
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all",
                  lang === "en"
                    ? "bg-kiwi-400 text-neutral-900 shadow-sm"
                    : isDarkThemeHeader
                      ? "text-white/80 hover:text-white"
                      : "text-neutral-700 hover:text-neutral-900"
                )}
              >
                <FlagIcon code="GB" className="h-3 w-4 rounded-xs shrink-0" />
                <span>EN</span>
              </button>
            </div>

            <Link
              href="/iletisim"
              className={cn(
                "contact-button flex h-11 shrink-0 items-center justify-center rounded-full border px-6 text-[15px] font-bold uppercase leading-none tracking-[0.1em] transition-all hover:border-kiwi-400 hover:bg-kiwi-400/10 hover:text-kiwi-400",
                isDarkThemeHeader
                  ? "border-white/25 text-white"
                  : "border-neutral-900/25 text-neutral-900"
              )}
            >
              {t.header.contactButton}
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile Language Selector Toggle */}
            <div className={cn(
              "flex items-center gap-0.5 rounded-full border p-0.5",
              isDarkThemeHeader ? "border-white/20 bg-white/10" : "border-neutral-900/15 bg-neutral-900/5"
            )}>
              <button
                type="button"
                onClick={() => setLang("tr")}
                className={cn(
                  "flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase transition-all",
                  lang === "tr"
                    ? "bg-kiwi-400 text-neutral-900"
                    : isDarkThemeHeader
                      ? "text-white"
                      : "text-neutral-800"
                )}
              >
                <FlagIcon code="TR" className="h-2.5 w-3.5 rounded-2xs shrink-0" />
                <span>TR</span>
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={cn(
                  "flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase transition-all",
                  lang === "en"
                    ? "bg-kiwi-400 text-neutral-900"
                    : isDarkThemeHeader
                      ? "text-white"
                      : "text-neutral-800"
                )}
              >
                <FlagIcon code="GB" className="h-2.5 w-3.5 rounded-2xs shrink-0" />
                <span>EN</span>
              </button>
            </div>

            <button
              type="button"
              aria-label={t.header.menuAria}
              className="menu-toggle flex size-10 shrink-0 flex-col items-center justify-center gap-1.5"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-white px-6 pb-10 safe-bottom sm:px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-5 sm:gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-light text-neutral-900 sm:text-4xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.08 }}
                className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-900/10 pt-6"
              >
                <Link
                  href="/iletisim"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex min-h-11 items-center rounded-full bg-kiwi-400 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-neutral-900"
                >
                  {t.header.contactButton}
                </Link>

                <div className="flex items-center rounded-full border border-neutral-900/10 bg-neutral-100 p-1">
                  <button
                    type="button"
                    onClick={() => setLang("tr")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase transition-all",
                      lang === "tr"
                        ? "bg-kiwi-400 text-neutral-900"
                        : "text-neutral-600"
                    )}
                  >
                    <FlagIcon code="TR" className="h-3 w-4 rounded-xs shrink-0" />
                    <span>Türkçe</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase transition-all",
                      lang === "en"
                        ? "bg-kiwi-400 text-neutral-900"
                        : "text-neutral-600"
                    )}
                  >
                    <FlagIcon code="GB" className="h-3 w-4 rounded-xs shrink-0" />
                    <span>English</span>
                  </button>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
