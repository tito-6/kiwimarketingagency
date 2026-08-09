"use client";

import { images } from "@/data/images";
import { useEffect, useRef } from "react";

const { showreel } = images.videos;

/** Prefer the lighter 720p file for reliable autoplay. */
const VIDEO_SRC = showreel.mp4720 || showreel.mp4;

function unlockAndPlay(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.playsInline = true;
  video.autoplay = true;
  video.loop = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");

  const run = () => {
    const p = video.play();
    if (p) void p.catch(() => {});
  };

  run();
  return run;
}

/**
 * Homepage hero background video.
 * Always mounts a real muted looping <video> so autoplay works across
 * Chrome, Safari, and iOS (muted + playsInline is required).
 */
export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = unlockAndPlay(video);

    const onReady = () => play();
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("canplaythrough", onReady);

    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onGesture = () => play();
    window.addEventListener("pointerdown", onGesture, { passive: true });
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("wheel", onGesture, { passive: true, once: true });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) play();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("canplaythrough", onReady);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("wheel", onGesture);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0">
        {/* Poster underlay while the first frames buffer */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={showreel.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          decoding="async"
          fetchPriority="high"
        />

        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          src={VIDEO_SRC}
          poster={showreel.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/50 via-[#1a1a1a]/10 to-[#1a1a1a]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/55 via-[#1a1a1a]/10 to-transparent" />
    </div>
  );
}
