"use client";

import { images } from "@/data/images";
import { useLiteMotion } from "@/lib/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const { showreel } = images.videos;

function tryPlay(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
  return video.play().catch(() => undefined);
}

function pickSource() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const effectiveWidth = window.innerWidth * dpr;
  if (effectiveWidth <= 1100) return showreel.mp4480;
  if (effectiveWidth <= 1800) return showreel.mp4720;
  return showreel.mp4;
}

function PosterOnly() {
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
  // Safari/iOS: never decode video on first paint — static poster only.
  // Video decode + GPU upload is the #1 Safari homepage stall.
  if (lite) return <PosterOnly />;

  return <HeroVideoFull />;
}

function HeroVideoFull() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setVideoSrc(pickSource());
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (video) void tryPlay(video);
  }, []);

  const setVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node) void tryPlay(node);
  }, []);

  useEffect(() => {
    if (!videoSrc) return;
    play();
    const onPageLoaded = () => play();
    const onInteract = () => play();
    window.addEventListener("kiwi:pageloaded", onPageLoaded);
    document.addEventListener("pointerdown", onInteract, { once: true });
    return () => {
      window.removeEventListener("kiwi:pageloaded", onPageLoaded);
      document.removeEventListener("pointerdown", onInteract);
    };
  }, [play, videoSrc]);

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
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          fetchPriority="high"
        />
        {videoSrc && (
          <video
            key={videoSrc}
            ref={setVideoRef}
            src={videoSrc}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              ready ? "opacity-75" : "opacity-0"
            }`}
            poster={showreel.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            disablePictureInPicture
            onLoadedData={() => {
              setReady(true);
              play();
            }}
            onCanPlay={play}
            aria-hidden
          />
        )}
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/55 via-[#1a1a1a]/15 to-[#1a1a1a]/75"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/65 via-[#1a1a1a]/15 to-transparent"
        aria-hidden
      />
    </motion.div>
  );
}
