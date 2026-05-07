import { Children, ReactNode } from "react";
import { Reveal } from "./Reveal";

interface RevealGroupProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
  blur?: boolean; // ← new
  blurAmount?: number; // ← new
}

export function RevealGroup({
  children,
  stagger = 100,
  className = "",
  blur = false,
  blurAmount = 8,
}: RevealGroupProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <Reveal key={i} delay={i * stagger} blur={blur} blurAmount={blurAmount}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
