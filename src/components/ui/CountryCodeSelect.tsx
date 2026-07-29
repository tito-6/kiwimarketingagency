"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export type CountryOption = {
  code: string; // ISO 2-letter
  dial: string; // Dial code e.g. +90
  flag: string; // Emoji flag
  nameTr: string;
  nameEn: string;
};

export const COUNTRIES: CountryOption[] = [
  { code: "TR", dial: "+90", flag: "🇹🇷", nameTr: "Türkiye", nameEn: "Turkey" },
  { code: "US", dial: "+1", flag: "🇺🇸", nameTr: "Amerika Birleşik Devletleri", nameEn: "United States" },
  { code: "GB", dial: "+44", flag: "🇬🇧", nameTr: "Birleşik Krallık", nameEn: "United Kingdom" },
  { code: "DE", dial: "+49", flag: "🇩🇪", nameTr: "Almanya", nameEn: "Germany" },
  { code: "NL", dial: "+31", flag: "🇳🇱", nameTr: "Hollanda", nameEn: "Netherlands" },
  { code: "FR", dial: "+33", flag: "🇫🇷", nameTr: "Fransa", nameEn: "France" },
  { code: "AE", dial: "+971", flag: "🇦🇪", nameTr: "Birleşik Arap Emirlikleri", nameEn: "United Arab Emirates" },
  { code: "SA", dial: "+966", flag: "🇸🇦", nameTr: "Suudi Arabistan", nameEn: "Saudi Arabia" },
  { code: "QA", dial: "+974", flag: "🇶🇦", nameTr: "Katar", nameEn: "Qatar" },
  { code: "AZ", dial: "+994", flag: "🇦🇿", nameTr: "Azerbaycan", nameEn: "Azerbaijan" },
  { code: "CH", dial: "+41", flag: "🇨🇭", nameTr: "İsviçre", nameEn: "Switzerland" },
  { code: "AT", dial: "+43", flag: "🇦🇹", nameTr: "Avusturya", nameEn: "Austria" },
  { code: "BE", dial: "+32", flag: "🇧🇪", nameTr: "Belçika", nameEn: "Belgium" },
  { code: "IT", dial: "+39", flag: "🇮🇹", nameTr: "İtalya", nameEn: "Italy" },
  { code: "ES", dial: "+34", flag: "🇪🇸", nameTr: "İspanya", nameEn: "Spain" },
  { code: "SE", dial: "+46", flag: "🇸🇪", nameTr: "İsveç", nameEn: "Sweden" },
  { code: "NO", dial: "+47", flag: "🇳🇴", nameTr: "Norveç", nameEn: "Norway" },
  { code: "DK", dial: "+45", flag: "🇩🇰", nameTr: "Danimarka", nameEn: "Denmark" },
  { code: "AU", dial: "+61", flag: "🇦🇺", nameTr: "Avustralya", nameEn: "Australia" },
  { code: "CA", dial: "+1", flag: "🇨🇦", nameTr: "Kanada", nameEn: "Canada" },
  { code: "RU", dial: "+7", flag: "🇷🇺", nameTr: "Rusya", nameEn: "Russia" },
  { code: "IR", dial: "+98", flag: "🇮🇷", nameTr: "İran", nameEn: "Iran" },
  { code: "IQ", dial: "+964", flag: "🇮🇶", nameTr: "Irak", nameEn: "Iraq" },
  { code: "EG", dial: "+20", flag: "🇪🇬", nameTr: "Mısır", nameEn: "Egypt" },
  { code: "KW", dial: "+965", flag: "🇰🇼", nameTr: "Kuveyt", nameEn: "Kuwait" },
  { code: "OM", dial: "+968", flag: "🇴🇲", nameTr: "Umman", nameEn: "Oman" },
  { code: "BH", dial: "+973", flag: "🇧🇭", nameTr: "Bahreyn", nameEn: "Bahrain" },
  { code: "CY", dial: "+357", flag: "🇨🇾", nameTr: "Kıbrıs", nameEn: "Cyprus" },
  { code: "GE", dial: "+995", flag: "🇬🇪", nameTr: "Gürcistan", nameEn: "Georgia" },
  { code: "KZ", dial: "+7", flag: "🇰🇿", nameTr: "Kazakistan", nameEn: "Kazakhstan" },
  { code: "UZ", dial: "+998", flag: "🇺🇿", nameTr: "Özbekistan", nameEn: "Uzbekistan" },
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // +90 Türkiye

type Props = {
  selected: CountryOption;
  onChange: (country: CountryOption) => void;
};

export function CountryCodeSelect({ selected, onChange }: Props) {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open]);

  const filtered = COUNTRIES.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const name = lang === "tr" ? c.nameTr : c.nameEn;
    return (
      name.toLowerCase().includes(q) ||
      c.dial.includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        aria-label={t.contactForm.selectCountry}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-full items-center gap-2 rounded-l-xl border border-r-0 border-neutral-900/10 bg-neutral-900/5 px-3 py-4.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900/10 focus:outline-none focus:ring-1 focus:ring-kiwi-400"
      >
        <span className="text-base sm:text-lg">{selected.flag}</span>
        <span className="font-semibold text-neutral-900">{selected.dial}</span>
        <svg
          className={`h-4 w-4 text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-72 w-72 overflow-hidden rounded-2xl border border-neutral-900/10 bg-white p-2 shadow-2xl backdrop-blur-xl sm:w-80">
          <div className="p-1">
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.contactForm.searchCountry}
              className="w-full rounded-lg border border-neutral-900/10 bg-neutral-100 px-3 py-2 text-xs text-neutral-900 focus:border-kiwi-400 focus:outline-none"
            />
          </div>

          <div className="mt-1 max-h-56 overflow-y-auto space-y-0.5">
            {filtered.length === 0 ? (
              <div className="p-3 text-center text-xs text-neutral-500">
                Ülke bulunamadı / No country found
              </div>
            ) : (
              filtered.map((country) => {
                const name = lang === "tr" ? country.nameTr : country.nameEn;
                const isSelected = country.code === selected.code && country.dial === selected.dial;
                return (
                  <button
                    key={`${country.code}-${country.dial}`}
                    type="button"
                    onClick={() => {
                      onChange(country);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-kiwi-400/20 font-semibold text-neutral-900"
                        : "hover:bg-neutral-100 text-neutral-800"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base">{country.flag}</span>
                      <span className="truncate">{name}</span>
                    </div>
                    <span className="ml-2 shrink-0 font-mono font-medium text-neutral-600">
                      {country.dial}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
