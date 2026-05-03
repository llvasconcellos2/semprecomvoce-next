import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { Mission } from "@/components/Mission";
import { Programs } from "@/components/Programs";
import { Testimonials } from "@/components/Testimonials";
import { DonateCTA } from "@/components/DonateCTA";
import { Footer } from "@/components/Footer";
import { StackedCardsInteractionDemo } from "@/components/ui/demo";
import { ImageSwiper } from "@/components/ui/image-swiper";
import { PolaroidSwiper } from "@/components/PolaroidSwiper";

const NGO_IMAGES = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80",
].join(",");

const POLAROIDS = [
  {
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80",
    title: "Card 1",
    description: "This is the first card",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80",
    title: "Card 2",
    description: "This is the second card",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop&q=80",
    title: "Card 3",
    description: "This is the third card",
  },
  {
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80",
    title: "Card 5",
    description: "This is the fifth card",
  },
  {
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80",
    title: "Card 6",
    description: "This is the sixth card",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80",
    title: "Card 7",
    description: "This is the seventh card",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop&q=80",
    title: "Card 8",
    description: "This is the eighth card",
  },
  {
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80",
    title: "Card 9",
    description: "This is the ninth card",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Mission />
        <StackedCardsInteractionDemo />
        <section className="py-16 flex flex-col items-center gap-6 bg-brand-pink-light">
          <PolaroidSwiper
            polaroids={POLAROIDS}
            cardWidth={350}
            cardHeight={400}
          />
        </section>
        <section className="py-16 flex flex-col items-center gap-6 bg-brand-pink-light">
          <h2 className="font-display text-3xl font-bold text-brand-navy">
            Nossa Galeria
          </h2>
          <p className="text-brand-navy/60 text-sm">
            Arraste para ver mais momentos
          </p>
          <ImageSwiper images={NGO_IMAGES} cardWidth={280} cardHeight={380} />
        </section>
        <Programs />
        <Testimonials />
        <DonateCTA />
      </main>
      <Footer />
    </>
  );
}
