import { Children, ReactNode } from "react";
import { Direction, Reveal } from "./Reveal";

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number; // ms between each child (RevealGroup-specific)
  // all Reveal props except delay (auto-computed) and className (applied to wrapper)
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  blur?: boolean;
  blurAmount?: number;
  direction?: Direction;
}

export function RevealGroup({
  children,
  className = "",
  stagger = 100,
  duration,
  distance,
  threshold,
  once,
  blur,
  blurAmount,
  direction,
}: RevealGroupProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <Reveal
          key={i}
          delay={i * stagger}
          duration={duration}
          distance={distance}
          threshold={threshold}
          once={once}
          blur={blur}
          blurAmount={blurAmount}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}
