"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const LITE_CLASS = "lite-motion";

export function detectLiteMotion() {
  if (typeof window === "undefined") return false;

  const ua = navigator.userAgent;
  const isSafari =
    /Safari/i.test(ua) &&
    !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS/i.test(ua);
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData =
    "connection" in navigator &&
    Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const lowCores =
    typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;

  return isSafari || isIOS || prefersReduced || saveData || lowCores;
}

export function detectIOSSafari() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isSafari =
    /Safari/i.test(ua) &&
    !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS/i.test(ua);
  return isIOS || isSafari;
}

function readLiteFlag() {
  if (typeof document === "undefined") return false;
  return (
    document.documentElement.classList.contains(LITE_CLASS) || detectLiteMotion()
  );
}

function subscribeLite(cb: () => void) {
  if (typeof document === "undefined") return () => undefined;
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => obs.disconnect();
}

/** True on Safari / iOS / reduced-motion — prefer this over useState(false) so we never mount the heavy path first. */
export function useLiteMotion() {
  return useSyncExternalStore(subscribeLite, readLiteFlag, () => false);
}

export function isLiteMotionClient() {
  return readLiteFlag();
}

/** Call once on the client to stamp html.lite-motion as early as possible. */
export function applyLiteMotionClass() {
  if (typeof document === "undefined") return;
  if (detectLiteMotion()) {
    document.documentElement.classList.add(LITE_CLASS);
  }
}

export function useIOSSafari() {
  const [ios, setIOS] = useState(false);
  useEffect(() => {
    setIOS(detectIOSSafari());
  }, []);
  return ios;
}
