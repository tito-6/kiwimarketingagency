"use client";

import { images } from "@/data/images";
import { useLiteMotion } from "@/lib/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const { showreel } = images.videos;

function prepareVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.loop = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
}

function tryPlayVideo(video: HTMLVideoElement | null) {
  if (!video) return;
  prepareVideo(video);

  const promise = video.play();
  if (promise === undefined) return;

  promise.catch(() => {
    const retry = () => {
      prepareVideo(video);
      void video.play().catch(() => {});
      window.removeEventListener("touchstart", retry);
      window.removeEventListener("pointerdown", retry);
      window.removeEventListener("scroll", retry);
    };
    window.addEventListener("touchstart", retry, { once: true, passive: true });
    window.addEventListener("pointerdown", retry, { once: true, passive: true });
    window.addEventListener("scroll", retry, { once: true, passive: true });
  });
}

function PosterFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={showreel.poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/55 via-[#1a1a1a]/20 to-[#1a1a1a]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/70 via-[#1a1a1a]/20 to-transparent" />
    </div>
  );
}

export function HeroVideoBackground() {
  const lite = useLiteMotion();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  const markActive = useCallback(() => setIsActive(true), []);
  const attemptPlay = useCallback(() => tryPlayVideo(videoRef.current), []);

  useEffect(() => {
    if (lite) return;

    const video = videoRef.current;
    if (!video) return;

    prepareVideo(video);

    const onReady = () => {
      markActive();
      attemptPlay();
    };

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("playing", markActive);

    if (video.readyState >= 2) onReady();
    attemptPlay();

    const onVisibility = () => {
      if (document.visibilityState === "visible") attemptPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("playing", markActive);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [attemptPlay, lite, markActive]);

  if (lite) {
    return <PosterFallback />;
  }

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ opacity: fade }}
    >
      <motion.div
        className="absolute inset-[-4%] h-[108%] w-[108%]"
        style={{ scale }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={showreel.poster}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            isActive ? "opacity-20" : "opacity-90"
          }`}
          decoding="async"
          fetchPriority="high"
        />

        <video
          ref={(node) => {
            videoRef.current = node;
            if (node) tryPlayVideo(node);
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            isActive ? "opacity-90" : "opacity-0"
          }`}
          poster={showreel.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden
        >
          {/* Lighter sources first so autoplay starts quickly */}
          {showreel.mp4720 ? (
            <source src={showreel.mp4720} type="video/mp4" />
          ) : null}
          {showreel.mp4480 ? (
            <source src={showreel.mp4480} type="video/mp4" />
          ) : null}
          <source src={showreel.mp4} type="video/mp4" />
          <source src={showreel.webm} type="video/webm" />
        </video>
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/55 via-[#1a1a1a]/15 to-[#1a1a1a]/75"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/60 via-[#1a1a1a]/15 to-transparent"
        aria-hidden
      />
    </motion.div>
  );
}
