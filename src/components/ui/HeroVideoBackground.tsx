"use client";

import { images } from "@/data/images";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const { showreel } = images.videos;

export function HeroVideoBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });

    return () => video.removeEventListener("canplay", play);
  }, [reducedMotion]);

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: fade }}
    >
      {!ready && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${showreel.poster})` }}
          aria-hidden
        />
      )}

      {reducedMotion ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url(${showreel.poster})` }}
          aria-hidden
        />
      ) : (
        <motion.div className="absolute inset-[-8%] h-[116%] w-[116%]" style={{ scale }}>
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              ready ? "opacity-35" : "opacity-0"
            }`}
            poster={showreel.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            disablePictureInPicture
            aria-hidden
            onCanPlay={() => setReady(true)}
          >
            <source src={showreel.webm} type="video/webm" />
            <source src={showreel.mp4} type="video/mp4" />
          </video>
        </motion.div>
      )}

      <div className="absolute inset-0 bg-[#1a1a1a]/50" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-[#1a1a1a]/45 to-[#1a1a1a]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/95 via-[#1a1a1a]/55 to-[#1a1a1a]/20"
        aria-hidden
      />
    </motion.div>
  );
}
