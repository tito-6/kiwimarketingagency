"use client";

import { images } from "@/data/images";
import { useLiteMotion } from "@/lib/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const { showreel } = images.videos;

function tryPlayVideo(video: HTMLVideoElement | null) {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");

  const promise = video.play();
  if (promise !== undefined) {
    promise.catch(() => {
      // Retry playing on user interaction or scroll
      const retry = () => {
        video.play().catch(() => {});
        window.removeEventListener("touchstart", retry);
        window.removeEventListener("click", retry);
        window.removeEventListener("scroll", retry);
      };
      window.addEventListener("touchstart", retry, { once: true, passive: true });
      window.addEventListener("click", retry, { once: true, passive: true });
      window.addEventListener("scroll", retry, { once: true, passive: true });
    });
  }
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
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  const attemptPlay = useCallback(() => {
    tryPlayVideo(videoRef.current);
  }, []);

  useEffect(() => {
    if (lite) return;
    attemptPlay();

    const handleLoaded = () => {
      setVideoLoaded(true);
      attemptPlay();
    };

    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 2) {
        setVideoLoaded(true);
        attemptPlay();
      }
      video.addEventListener("loadeddata", handleLoaded);
      video.addEventListener("canplay", attemptPlay);
    }

    return () => {
      if (video) {
        video.removeEventListener("loadeddata", handleLoaded);
        video.removeEventListener("canplay", attemptPlay);
      }
    };
  }, [attemptPlay, lite]);

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
        {/* Background Poster Image — visible while video loads */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={showreel.poster}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoLoaded ? "opacity-30" : "opacity-90"
          }`}
          decoding="async"
          fetchPriority="high"
        />

        {/* Video Player */}
        <video
          ref={(node) => {
            videoRef.current = node;
            if (node) tryPlayVideo(node);
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-80" : "opacity-0"
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
          <source src={showreel.mp4} type="video/mp4" />
          <source src={showreel.webm} type="video/webm" />
          {showreel.mp4720 && <source src={showreel.mp4720} type="video/mp4" />}
        </video>
      </motion.div>

      {/* Dark overlay gradients for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/20 to-[#1a1a1a]/80"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/70 via-[#1a1a1a]/20 to-transparent"
        aria-hidden
      />
    </motion.div>
  );
}
