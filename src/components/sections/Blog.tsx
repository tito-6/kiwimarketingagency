"use client";

import { blog } from "@/data/content";
import { images } from "@/data/images";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Blog() {
  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <ScrollReveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-kiwi-400">
              {blog.label}
            </p>
            <TextReveal
              text={blog.title}
              className="mt-6 max-w-2xl text-[clamp(1.75rem,4vw,3.5rem)] font-light leading-tight text-white"
            />
          </ScrollReveal>
          <motion.div whileHover={{ x: 8 }}>
            <Link
              href="/blog#journal"
              data-cursor="pointer"
              className="text-sm uppercase tracking-wider text-white/50 transition-colors hover:text-kiwi-400"
            >
              Hepsini İncele →
            </Link>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {blog.posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard>
                <article className="group">
                  <Link href="/blog" data-cursor="pointer" className="block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                      <Image
                        src={images.projects[i % images.projects.length]}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="400px"
                      />
                      <motion.div
                        className="absolute inset-0 bg-kiwi-400/0 transition-colors duration-500 group-hover:bg-kiwi-400/15"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 to-transparent" />
                    </div>
                    <motion.p
                      className="mt-4 text-xs uppercase tracking-wider text-kiwi-400"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      {post.category}
                    </motion.p>
                    <h3 className="mt-2 text-xl font-medium text-white transition-colors group-hover:text-kiwi-400">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/50">{post.excerpt}</p>
                    <time className="mt-4 block text-xs text-white/30">{post.date}</time>
                  </Link>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
