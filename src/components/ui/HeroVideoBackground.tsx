"use client";

import { images } from "@/data/images";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const { showreel } = images.videos;

function tryPlay(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("webkit-playsinline", "true");
  return video.play().catch(() => {});
}

export function HeroVideoBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void tryPlay(video);
  }, []);

  const setVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      if (node) void tryPlay(node);
    },
    []
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    play();

    const onPageLoaded = () => play();
    const onInteract = () => play();
    const onVisible = () => {
      if (document.visibilityState === "visible") play();
    };

    window.addEventListener("kiwi:pageloaded", onPageLoaded);
    window.addEventListener("load", onPageLoaded);
    document.addEventListener("visibilitychange", onVisible);
    document.addEventListener("pointerdown", onInteract, { once: true });

    const retries = window.setInterval(play, 2000);
    const stopRetries = window.setTimeout(() => window.clearInterval(retries), 20000);

    return () => {
      window.removeEventListener("kiwi:pageloaded", onPageLoaded);
      window.removeEventListener("load", onPageLoaded);
      document.removeEventListener("visibilitychange", onVisible);
      document.removeEventListener("pointerdown", onInteract);
      window.clearInterval(retries);
      window.clearTimeout(stopRetries);
    };
  }, [play, reducedMotion]);

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ opacity: fade }}
    >
      {reducedMotion ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${showreel.poster})` }}
          aria-hidden
        />
      ) : (
        <motion.div
          className="absolute inset-[-6%] h-[112%] w-[112%]"
          style={{ scale }}
          aria-hidden
        >
          <video
            ref={setVideoRef}
            src={showreel.mp4}
            className="absolute inset-0 h-full w-full object-cover opacity-55"
            poster={showreel.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            disablePictureInPicture
            aria-hidden
          />
        </motion.div>
      )}

      <div className="absolute inset-0 bg-[#1a1a1a]/25" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/30 to-[#1a1a1a]/80"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/75 via-[#1a1a1a]/25 to-transparent"
        aria-hidden
      />
    </motion.div>
  );
}
