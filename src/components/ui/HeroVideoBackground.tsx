"use client";

import { images } from "@/data/images";
import { useLiteMotion } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";

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
 * On iOS/Safari (lite-motion): poster-first, deferred src, preload=none —
 * avoids multi‑MB auto download that freezes Safari.
 */
export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lite = useLiteMotion();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!lite) {
      setShouldLoad(true);
      return;
    }

    // Defer video network work on constrained engines (iOS/Safari).
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const enable = () => setShouldLoad(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 2800 });
    } else {
      timeoutId = setTimeout(enable, 1500);
    }

    return () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lite]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    // Attach src only when we intend to play (critical for iOS).
    if (!video.src) {
      video.src = VIDEO_SRC;
    }

    const play = unlockAndPlay(video);

    const onReady = () => play();
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);

    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onGesture = () => play();
    window.addEventListener("pointerdown", onGesture, { passive: true });
    window.addEventListener("touchstart", onGesture, { passive: true });

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
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      observer.disconnect();
    };
  }, [shouldLoad]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={showreel.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          decoding="async"
          fetchPriority="high"
        />

        {shouldLoad && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            poster={showreel.poster}
            autoPlay
            muted
            loop
            playsInline
            preload={lite ? "none" : "metadata"}
            disablePictureInPicture
            controls={false}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/50 via-[#1a1a1a]/10 to-[#1a1a1a]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/55 via-[#1a1a1a]/10 to-transparent" />
    </div>
  );
}
