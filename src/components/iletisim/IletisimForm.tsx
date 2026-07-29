"use client";

import { useLanguage } from "@/context/LanguageContext";
import { iletisimPage } from "@/data/iletisim";
import { ClipReveal } from "@/components/blog/ui/ClipReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { CountryCodeSelect, COUNTRIES, DEFAULT_COUNTRY, type CountryOption } from "@/components/ui/CountryCodeSelect";
import { motion, AnimatePresence } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "submitting" | "success" | "error";

type DataLayerEvent = {
  event: string;
  form_id: string;
};

/** Push GTM conversion signal before redirecting. */
function pushContactFormSuccess() {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: DataLayerEvent[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "contact_form_success",
    form_id: "contact_form",
  });
}

export function IletisimForm() {
  const { lang, t } = useLanguage();
  const router = useRouter();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(DEFAULT_COUNTRY);
  const [localPhone, setLocalPhone] = useState("");

  const formT = t.contactForm;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: localPhone,
          countryDial: selectedCountry.dial,
          email: formData.get("email"),
          company: formData.get("company"),
          service: formData.get("service"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
        redirectUrl?: string;
      };

      if (!res.ok) {
        throw new Error(body.error || "Mesaj gönderilemedi.");
      }

      pushContactFormSuccess();
      setStatus("success");
      form.reset();
      setValues({});
      setLocalPhone("");

      // Immediate redirection to Thank You Page
      setTimeout(() => {
        router.push(body.redirectUrl || "/tesekkurler");
      }, 400);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : "Mesaj gönderilemedi. Lütfen tekrar deneyin."
      );
    }
  }

  return (
    <section id="form" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr,1.1fr]">
          <div>
            <TextReveal
              text={formT.title}
              className="text-[clamp(2rem,5vw,4rem)] font-light text-neutral-900"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 text-neutral-900/50"
            >
              {formT.response}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 space-y-4"
            >
              <p className="text-sm text-neutral-900/40">{iletisimPage.address}</p>
              <p className="text-sm text-neutral-900/40">{iletisimPage.hours}</p>
            </motion.div>
          </div>

          <ClipReveal direction="center">
            <motion.form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:p-8 md:p-12"
              noValidate
            >
              <motion.div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-kiwi-400/10 blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
              />

              {/* Honeypot — hidden from users */}
              <div
                aria-hidden
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="mb-8 text-sm text-neutral-900/50 font-medium">
                    {formT.subtitle}
                  </p>
                  <div className="space-y-6">
                    {/* Name */}
                    <motion.div
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <label
                        className={`pointer-events-none absolute left-4 text-xs uppercase tracking-wider transition-all ${
                          values.name || focused === "name"
                            ? "top-2 text-kiwi-500 font-semibold opacity-100"
                            : "top-[18px] text-neutral-900/40"
                        }`}
                      >
                        {formT.nameLabel} *
                      </label>
                      <input
                        required
                        name="name"
                        type="text"
                        value={values.name || ""}
                        onChange={(e) =>
                          setValues((v) => ({ ...v, name: e.target.value }))
                        }
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        autoComplete="name"
                        className="w-full rounded-xl border border-neutral-900/10 bg-neutral-900/5 px-4 pb-3 pt-8 text-neutral-900 focus:border-kiwi-400 focus:outline-none"
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <label
                        className={`pointer-events-none absolute left-4 text-xs uppercase tracking-wider transition-all ${
                          values.email || focused === "email"
                            ? "top-2 text-kiwi-500 font-semibold opacity-100"
                            : "top-[18px] text-neutral-900/40"
                        }`}
                      >
                        {formT.emailLabel} *
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        value={values.email || ""}
                        onChange={(e) =>
                          setValues((v) => ({ ...v, email: e.target.value }))
                        }
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        autoComplete="email"
                        className="w-full rounded-xl border border-neutral-900/10 bg-neutral-900/5 px-4 pb-3 pt-8 text-neutral-900 focus:border-kiwi-400 focus:outline-none"
                      />
                    </motion.div>

                    {/* Company */}
                    <motion.div
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <label
                        className={`pointer-events-none absolute left-4 text-xs uppercase tracking-wider transition-all ${
                          values.company || focused === "company"
                            ? "top-2 text-kiwi-500 font-semibold opacity-100"
                            : "top-[18px] text-neutral-900/40"
                        }`}
                      >
                        {formT.companyLabel}
                      </label>
                      <input
                        name="company"
                        type="text"
                        value={values.company || ""}
                        onChange={(e) =>
                          setValues((v) => ({ ...v, company: e.target.value }))
                        }
                        onFocus={() => setFocused("company")}
                        onBlur={() => setFocused(null)}
                        autoComplete="organization"
                        className="w-full rounded-xl border border-neutral-900/10 bg-neutral-900/5 px-4 pb-3 pt-8 text-neutral-900 focus:border-kiwi-400 focus:outline-none"
                      />
                    </motion.div>

                    {/* Phone + Country Selector */}
                    <motion.div
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="flex items-stretch">
                        <CountryCodeSelect
                          selected={selectedCountry}
                          onChange={setSelectedCountry}
                        />
                        <div className="relative flex-1">
                          <label
                            className={`pointer-events-none absolute left-4 text-xs uppercase tracking-wider transition-all ${
                              localPhone || focused === "phone"
                                ? "top-2 text-kiwi-500 font-semibold opacity-100"
                                : "top-[18px] text-neutral-900/40"
                            }`}
                          >
                            {formT.phoneLabel} *
                          </label>
                          <input
                            required
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            value={localPhone}
                            onChange={(e) => setLocalPhone(e.target.value)}
                            onFocus={() => setFocused("phone")}
                            onBlur={() => setFocused(null)}
                            autoComplete="tel-national"
                            placeholder={formT.phonePlaceholder}
                            className="w-full rounded-r-xl border border-neutral-900/10 bg-neutral-900/5 px-4 pb-3 pt-8 text-neutral-900 placeholder:text-neutral-900/20 focus:border-kiwi-400 focus:outline-none"
                          />
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-neutral-900/40">
                        {formT.phoneHint}
                      </p>
                    </motion.div>

                    {/* Service */}
                    <select
                      name="service"
                      className="w-full rounded-xl border border-neutral-900/10 bg-neutral-900/5 px-4 py-4 text-neutral-900/70 focus:border-kiwi-400 focus:outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {formT.serviceSelect}
                      </option>
                      {formT.services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    {/* Message */}
                    <textarea
                      name="message"
                      rows={4}
                      placeholder={formT.messagePlaceholder}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className="w-full resize-none rounded-xl border border-neutral-900/10 bg-neutral-900/5 px-4 py-4 text-neutral-900 placeholder:text-neutral-900/25 focus:border-kiwi-400 focus:outline-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={status === "submitting" ? undefined : { scale: 1.02 }}
                    whileTap={status === "submitting" ? undefined : { scale: 0.98 }}
                    className="relative mt-8 w-full overflow-hidden rounded-full bg-kiwi-400 py-4 text-sm font-semibold uppercase tracking-wider text-neutral-900 shadow-md transition-all hover:bg-kiwi-500 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span className="relative">
                      {status === "submitting" ? formT.submitting : formT.submitButton}
                    </span>
                  </motion.button>

                  {status === "error" && errorMsg && (
                    <p
                      role="alert"
                      className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-700"
                    >
                      {errorMsg}
                    </p>
                  )}
                  <p className="mt-4 text-center text-xs text-neutral-900/40">
                    {formT.termsPrefix}
                    <a href="/hizmet-sartlari" className="underline hover:text-neutral-900">
                      {formT.termsLink}
                    </a>
                    {formT.andWord}
                    <a href="/gizlilik-politikasi" className="underline hover:text-neutral-900">
                      {formT.privacyLink}
                    </a>
                    {formT.termsSuffix}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.form>
          </ClipReveal>
        </div>
      </div>
    </section>
  );
}
