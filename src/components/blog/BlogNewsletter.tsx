"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="border-y border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-white/10 p-10 md:p-16"
        >
          <motion.div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-kiwi-400/15 blur-[80px]"
            animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-kiwi-400">Bülten</p>
              <h2 className="mt-4 text-3xl font-light text-white md:text-4xl">
                Dijital başarıya giden yolu kaçırmayın.
              </h2>
              <p className="mt-4 text-white/45">
                Sektörel ipuçları, yeni trendler ve stratejik içgörüler — ayda iki kez, spam yok.
              </p>
            </div>

            {done ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-3 rounded-2xl border border-kiwi-400/30 bg-kiwi-400/10 py-8"
              >
                <span className="text-2xl">✓</span>
                <p className="text-white">Abone oldunuz — teşekkürler!</p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="flex-1 rounded-full border border-white/15 bg-black/30 px-6 py-4 text-white placeholder:text-white/30 focus:border-kiwi-400 focus:outline-none"
                />
                <motion.button
                  type="submit"
                  data-cursor="pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-kiwi-400 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[#1a1a1a]"
                >
                  Abone Ol
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
