"use client";

import { nav, site } from "@/data/content";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
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

  return (
    <>
      <header
        className={cn(
          "site-header fixed top-0 z-50 h-20 w-full transition-all duration-500",
          scrolled
            ? "border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="nav-wrapper mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-10">
          <Link
            href="/"
            aria-label={site.name}
            className="logo-link flex shrink-0 items-center"
          >
            <Logo className="block h-6 w-auto text-white transition-colors hover:text-kiwi-400" />
          </Link>

          <nav className="nav-menu hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link flex h-11 items-center justify-center rounded-lg px-5 text-[15px] font-bold uppercase leading-none tracking-[0.1em] text-white/85 transition-colors hover:bg-white/[0.08] hover:text-kiwi-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/#contact"
            className="contact-button hidden h-11 shrink-0 items-center justify-center rounded-full border border-white/25 px-6 text-[15px] font-bold uppercase leading-none tracking-[0.1em] text-white transition-all hover:border-kiwi-400 hover:bg-kiwi-400/10 hover:text-kiwi-400 md:flex"
          >
            İletişim
          </Link>

          <button
            type="button"
            aria-label="Menü"
            className="menu-toggle flex size-10 shrink-0 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={cn(
                "h-0.5 w-6 bg-white transition-all",
                menuOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 bg-white transition-all",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 bg-white transition-all",
                menuOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#1a1a1a] px-6 pb-10 safe-bottom sm:px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-5 sm:gap-6">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-light text-white sm:text-4xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: nav.length * 0.08 }}
                className="mt-6 border-t border-white/10 pt-6"
              >
                <Link
                  href="/iletisim"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex min-h-11 items-center rounded-full bg-kiwi-400 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#1a1a1a]"
                >
                  İletişim
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
