"use client";

import { useEffect, useRef, ReactNode } from "react";

export type Direction = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  delay?: number; // ms stagger offset
  duration?: number; // animation duration in ms
  distance?: number; // translateY start distance in px
  threshold?: number; // 0–1, how much of element must be visible
  className?: string;
  once?: boolean;
  blur?: boolean;
  blurAmount?: number; // ← optional blur strength in px (default 8)
  direction?: Direction;
}

function getTransform(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return `translateY(${distance}px)`;
    case "down":
      return `translateY(-${distance}px)`;
    case "left":
      return `translateX(${distance}px)`; // enters from right
    case "right":
      return `translateX(-${distance}px)`; // enters from left
  }
}

export function Reveal({
  children,
  delay = 0,
  duration = 700,
  distance = 24,
  threshold = 0.15,
  className = "",
  once = true,
  blur = false,
  blurAmount = 8,
  direction = "up",
  ...props
}: RevealProps & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translate(0, 0)";
          if (blur) el.style.filter = "blur(0px)";
          if (once) observer.disconnect();
        } else if (!once) {
          el.style.opacity = "0";
          el.style.transform = getTransform(direction, distance);
          if (blur) el.style.filter = `blur(${blurAmount}px)`;
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, distance, threshold, blur, blurAmount, direction]);

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
        transform: getTransform(direction, distance),
        filter: blur ? `blur(${blurAmount}px)` : undefined,
        transition,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
