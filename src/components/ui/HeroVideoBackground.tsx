"use client";

import { images } from "@/data/images";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const { showreel } = images.videos;

export function HeroVideoBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);

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

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");

    const play = async () => {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        // Retry once after a short delay (some browsers defer autoplay)
        window.setTimeout(() => {
          video.play().then(() => setPlaying(true)).catch(() => {});
        }, 400);
      }
    };

    const onReady = () => {
      void play();
    };

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("playing", () => setPlaying(true));

    video.load();

    if (video.readyState >= 2) {
      void play();
    }

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
    };
  }, [reducedMotion]);

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ opacity: fade }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${showreel.poster})` }}
        aria-hidden
      />

      {!reducedMotion && (
        <motion.div
          className="absolute inset-[-6%] h-[112%] w-[112%]"
          style={{ scale }}
          aria-hidden
        >
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              playing ? "opacity-60" : "opacity-0"
            }`}
            poster={showreel.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            disablePictureInPicture
            aria-hidden
          >
            <source src={showreel.mp4} type="video/mp4" />
            <source src={showreel.webm} type="video/webm" />
          </video>
        </motion.div>
      )}

      <div className="absolute inset-0 bg-[#1a1a1a]/30" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/65 via-[#1a1a1a]/35 to-[#1a1a1a]/85"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/80 via-[#1a1a1a]/30 to-transparent"
        aria-hidden
      />
    </motion.div>
  );
}
