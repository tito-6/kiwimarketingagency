"use client";

import { contact } from "@/data/content";
import { iletisimPage } from "@/data/iletisim";
import { ClipReveal } from "@/components/blog/ui/ClipReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion, AnimatePresence } from "framer-motion";
import { FormEvent, useState } from "react";

const fields = [
  { name: "name", label: "İsminiz", type: "text", required: true },
  { name: "phone", label: "Telefon", type: "tel", required: true },
  { name: "email", label: "E-posta", type: "email", required: true },
  { name: "company", label: "Şirket", type: "text", required: false },
];

export function IletisimForm() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="form" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr,1.1fr]">
          <div>
            <TextReveal
              text="Projenizi anlatın"
              className="text-[clamp(2rem,5vw,4rem)] font-light text-white"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 text-white/45"
            >
              {iletisimPage.response}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 space-y-4"
            >
              <p className="text-sm text-white/30">{iletisimPage.address}</p>
              <p className="text-sm text-white/30">{iletisimPage.hours}</p>
            </motion.div>
          </div>

          <ClipReveal direction="center">
            <motion.form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 md:p-12"
            >
              <motion.div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-kiwi-400/10 blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
              />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[400px] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-kiwi-400 text-3xl text-[#1a1a1a]"
                    >
                      ✓
                    </motion.div>
                    <h3 className="mt-8 text-2xl text-white">Mesajınız ulaştı!</h3>
                    <p className="mt-3 max-w-sm text-white/45">
                      Ekibimiz en kısa sürede size dönüş yapacak. Genellikle 4 saat içinde.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="mb-8 text-sm text-white/40">
                      Markanızın ihtiyaçlarını belirleyelim
                    </p>
                    <div className="space-y-6">
                      {fields.map((field, i) => (
                        <motion.div
                          key={field.name}
                          initial={{ opacity: 0, x: 24 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 }}
                          className="relative"
                        >
                          <motion.label
                            className="pointer-events-none absolute left-4 text-xs uppercase tracking-wider transition-all"
                            animate={{
                              top: values[field.name] || focused === field.name ? 8 : 18,
                              opacity: values[field.name] || focused === field.name ? 1 : 0.4,
                              color:
                                focused === field.name
                                  ? "#a9cb18"
                                  : "rgba(255,255,255,0.4)",
                            }}
                          >
                            {field.label}
                            {field.required && " *"}
                          </motion.label>
                          <input
                            required={field.required}
                            name={field.name}
                            type={field.type}
                            value={values[field.name] || ""}
                            onChange={(e) =>
                              setValues((v) => ({ ...v, [field.name]: e.target.value }))
                            }
                            onFocus={() => setFocused(field.name)}
                            onBlur={() => setFocused(null)}
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 pb-3 pt-8 text-white focus:border-kiwi-400 focus:outline-none"
                          />
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-kiwi-400"
                            initial={{ width: "0%" }}
                            animate={{
                              width: focused === field.name ? "100%" : "0%",
                            }}
                            transition={{ duration: 0.35 }}
                          />
                        </motion.div>
                      ))}

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        <select
                          name="service"
                          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-white/70 focus:border-kiwi-400 focus:outline-none"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Hizmet Seçin
                          </option>
                          {contact.services.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </motion.div>

                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Proje detayları..."
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-4 text-white placeholder:text-white/25 focus:border-kiwi-400 focus:outline-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      data-cursor="pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative mt-8 w-full overflow-hidden rounded-full bg-kiwi-400 py-4 text-sm font-semibold uppercase tracking-wider text-[#1a1a1a]"
                    >
                      <motion.span
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative">Mesaj Gönder</span>
                    </motion.button>
                    <p className="mt-4 text-center text-xs text-white/30">
                      Göndererek{" "}
                      <a href="/hizmet-sartlari" className="underline hover:text-white/50">
                        Hizmet Şartlarımızı
                      </a>{" "}
                      ve{" "}
                      <a href="/gizlilik-politikasi" className="underline hover:text-white/50">
                        Gizlilik Politikamızı
                      </a>{" "}
                      kabul etmiş olursunuz.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </ClipReveal>
        </div>
      </div>
    </section>
  );
}
