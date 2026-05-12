import type { Metadata } from "next";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Instituto do Câncer Sempre Com Você",
  description:
    "Nossa missão é melhorar a vida de pessoas com câncer e suas famílias. Conheça nosso trabalho e faça parte dessa corrente do bem.",
  openGraph: {
    title: "Instituto do Câncer Sempre Com Você",
    description:
      "Nossa missão é melhorar a vida de pessoas com câncer e suas famílias.",
    url: "/",
  },
  alternates: { canonical: "/" },
};
import { StatsBar } from "@/components/StatsBar";
import { Mission } from "@/components/Mission";
import { Programs } from "@/components/Programs";
import { Testimonials } from "@/components/Testimonials";
import { DonateCTA } from "@/components/DonateCTA";
import { Parceiros } from "@/components/Parceiros";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Mission />
      <Programs />
      <Parceiros />
      <Testimonials />
      <DonateCTA />
    </>
  );
}
