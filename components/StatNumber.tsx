"use client";

import { useEffect, useRef, useState } from "react";

interface StatNumberProps {
  value: string;
  className?: string;
  duration?: number;
}

function parse(value: string): { target: number; suffix: string } {
  const suffix = value.endsWith("+") ? "+" : "";
  const numeric = value.replace(/\./g, "").replace(/\+$/, "");
  return { target: parseInt(numeric, 10) || 0, suffix };
}

function format(n: number): string {
  return n.toLocaleString("pt-BR");
}

export function StatNumber({ value, className, duration = 1400 }: StatNumberProps) {
  const { target, suffix } = parse(value);
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const startTime = performance.now();

        function tick(now: number) {
          const elapsed = now - startTime;
          const t = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = Math.round(eased * target);
          setDisplay(format(current));
          if (t < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  );
}
