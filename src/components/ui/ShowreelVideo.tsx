"use client";

import { images } from "@/data/images";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const { showreel } = images.videos;

export function ShowreelVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: "200px 0px", once: true });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!isInView || !video) return;

    video.load();
    const play = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });

    return () => video.removeEventListener("canplay", play);
  }, [isInView]);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:rounded-3xl"
      >
        <div className="relative aspect-video w-full">
          {!ready && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${showreel.poster})` }}
            />
          )}

          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
            poster={showreel.poster}
            muted
            loop
            playsInline
            autoPlay={isInView}
            preload={isInView ? "auto" : "none"}
            disablePictureInPicture
            aria-label="Kiwi Agency showreel"
            onCanPlay={() => setReady(true)}
          >
            {isInView && (
              <>
                <source src={showreel.webm} type="video/webm" />
                <source src={showreel.mp4} type="video/mp4" />
              </>
            )}
          </video>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 via-transparent to-[#1a1a1a]/20" />
        </div>
      </motion.div>
    </div>
  );
}
