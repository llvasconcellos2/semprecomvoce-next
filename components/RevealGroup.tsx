import { Children, ReactNode } from "react";
import { Reveal } from "./Reveal";

interface RevealGroupProps {
  children: ReactNode;
  stagger?: number; // ms between each child
  className?: string; // applied to the wrapper div
}

export function RevealGroup({
  children,
  stagger = 100,
  className = "",
}: RevealGroupProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <Reveal key={i} delay={i * stagger}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
