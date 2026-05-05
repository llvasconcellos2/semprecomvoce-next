import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { Mission } from "@/components/Mission";
import { Programs } from "@/components/Programs";
import { Testimonials } from "@/components/Testimonials";
import { DonateCTA } from "@/components/DonateCTA";
import { Footer } from "@/components/Footer";
import { RaysBackground } from "@/components/backgrounds/RaysBackground";
import GradientBackground from "@/components/backgrounds/GradientBackground";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Mission />
      <Programs />
      <Testimonials />
      <DonateCTA />
    </>
  );
}
