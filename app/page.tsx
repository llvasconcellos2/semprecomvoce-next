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
      <Navbar />
      <main>
        <div className="relative h-screen">
          <RaysBackground
            reach={35}
            rays={45}
            alpha1={0.6}
            alpha2={0.6}
            intensity={30}
            speed={10}
            className="absolute inset-0"
          />
          <Hero />
        </div>
        <StatsBar />
        <Mission />
        <div className="relative">
          <GradientBackground />
          <Programs />
        </div>
        <Testimonials />
        <DonateCTA />
      </main>
      <Footer />
    </>
  );
}
