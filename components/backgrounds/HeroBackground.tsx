"use client";

import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import GradientBackground from "./GradientBackground";
import { RaysBackground } from "./RaysBackground";

export default function HeroBackground() {
  const { width, height } = useWindowDimensions();
  if (width && width <= 766) return <GradientBackground />; // Fallback for mobile (no rays)
  return (
    <RaysBackground
      reach={35}
      rays={45}
      alpha1={0.6}
      alpha2={0.6}
      intensity={30}
      speed={10}
      className="absolute inset-0"
    />
  );
}
