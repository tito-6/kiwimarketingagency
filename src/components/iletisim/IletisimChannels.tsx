"use client";

import { iletisimPage } from "@/data/iletisim";
import { ClipReveal } from "@/components/blog/ui/ClipReveal";
import { motion } from "framer-motion";
import Link from "next/link";

const icons: Record<string, string> = {
  phone: "☎",
  email: "✉",
  whatsapp: "◉",
};

export function IletisimChannels() {
  return (
    <section className="border-y border-white/10 py-20">
      <div className="mx-auto grid max-w-[1440px] gap-6 px-6 md:grid-cols-3 md:px-10">
        {iletisimPage.channels.map((channel, i) => (
          <ClipReveal key={channel.id} delay={i * 0.1} direction={i === 0 ? "up" : i === 2 ? "right" : "left"}>
            <Link
              href={channel.href}
              data-cursor="pointer"
              target={channel.id === "whatsapp" ? "_blank" : undefined}
              rel={channel.id === "whatsapp" ? "noopener noreferrer" : undefined}
              className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-8 transition-colors hover:border-kiwi-400/40"
            >
              <motion.div
                className="pointer-events-none absolute inset-0 bg-kiwi-400/0 transition-colors group-hover:bg-kiwi-400/5"
              />
              <motion.span
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-2xl"
                whileHover={{ rotate: 10, scale: 1.1, borderColor: "rgba(169,203,24,0.5)" }}
              >
                {icons[channel.id]}
              </motion.span>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-kiwi-400">
                {channel.label}
              </p>
              <p className="mt-2 text-xl font-medium text-white group-hover:text-kiwi-400">
                {channel.value}
              </p>
              <p className="mt-3 text-sm text-white/40">{channel.description}</p>
              <motion.span
                className="mt-6 inline-flex items-center gap-2 text-sm text-white/50"
                whileHover={{ x: 6 }}
              >
                Bağlan <span>→</span>
              </motion.span>
            </Link>
          </ClipReveal>
        ))}
      </div>
    </section>
  );
}
