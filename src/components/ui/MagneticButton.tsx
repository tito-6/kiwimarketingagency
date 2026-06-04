"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
};

// Pill link that gently follows the cursor while hovered (the "magnetic"
// effect) using a spring so it eases back to centre on leave.
export function MagneticButton({
  children,
  href,
  className,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const variants = {
    primary: "bg-kiwi-400 text-[#1a1a1a] hover:shadow-[0_0_40px_rgba(169,203,24,0.4)]",
    outline:
      "border border-white/20 text-white hover:border-kiwi-400 hover:bg-kiwi-400/10",
    ghost: "text-white/70 hover:text-white",
  };

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Link
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "group relative inline-flex min-h-11 items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors sm:gap-3 sm:px-8 sm:py-4 sm:text-sm",
          variants[variant],
          className
        )}
      >
        <span className="relative z-10">{children}</span>
        {variant === "primary" && (
          <motion.span
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
        )}
        <span className="relative z-10 transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>
    </motion.div>
  );
}
