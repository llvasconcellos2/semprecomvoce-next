"use client";

import { useEffect, useRef, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
  blur?: boolean; // ← new
  blurAmount?: number; // ← optional blur strength in px (default 8)
}

export function Reveal({
  children,
  delay = 0,
  duration = 500,
  distance = 24,
  threshold = 0.15,
  className = "",
  once = true,
  blur = false,
  blurAmount = 8,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          if (blur) el.style.filter = "blur(0px)";
          if (once) observer.disconnect();
        } else if (!once) {
          el.style.opacity = "0";
          el.style.transform = `translateY(${distance}px)`;
          if (blur) el.style.filter = `blur(${blurAmount}px)`;
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, distance, threshold, blur, blurAmount]);

  const transition = [
    `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    `transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    blur && `filter ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: `translateY(${distance}px)`,
        filter: blur ? `blur(${blurAmount}px)` : undefined,
        transition,
      }}
    >
      {children}
    </div>
  );
}
