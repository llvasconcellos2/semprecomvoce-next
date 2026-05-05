"use client";

import {
  useRef,
  useCallback,
  MouseEvent,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import "./GlowCard.css";

export function GlowCardWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    cardRefs.current.forEach((card) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.background = `radial-gradient(960px circle at ${x}px ${y}px, rgba(59, 248, 251, 0.6), transparent 15%)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    cardRefs.current.forEach((card) => {
      if (!card) return;
      card.style.background = "rgb(17, 17, 27)";
    });
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glow-card-wrapper ${className || ""}`}
      {...props}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        return cloneElement(child, {
          ref: (el: HTMLDivElement | null) => {
            cardRefs.current[index] = el;
          },
          customprop: "value",
        } as any);
      })}
    </div>
  );
}

export function GlowCard({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={`glow-card ${className || ""}`} {...props} />;
}

export function GlowCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={`glow-card-content ${className || ""}`} {...props} />;
}
