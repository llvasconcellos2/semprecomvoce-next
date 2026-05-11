import Image from "next/image";
import { Reveal } from "./Reveal";

// TODO: preencha as URLs de cada parceiro
const partners = [
  {
    name: "Acredicoop",
    logo: "/parceiros/acredicoop.png",
    url: "https://www.acredi.coop.br/",
  },
  {
    name: "Enfael",
    logo: "/parceiros/enfael.png",
    url: "https://maps.app.goo.gl/1n84ApcSgipya6zv8",
  },
  {
    name: "Estacaville",
    logo: "/parceiros/estacaville.png",
    url: "http://www.estacaville.com.br/",
  },
  {
    name: "Haga Print",
    logo: "/parceiros/hagaprint.png",
    url: "https://www.facebook.com/p/Haga-Print-Comunica%C3%A7%C3%A3o-Visual-100065016253342/",
  },
  {
    name: "Implante Sorriso",
    logo: "/parceiros/implante-sorriso.png",
    url: "https://www.facebook.com/implantesorrisojoinville/",
  },
  {
    name: "Instituição Bethesda",
    logo: "/parceiros/instituicao-bethesda.png",
    url: "https://bethesda.org.br/",
  },
  {
    name: "Irineu Imóveis",
    logo: "/parceiros/irineu-imoveis.png",
    url: "https://irineuimoveis.com.br/",
  },
  {
    name: "Medeiros",
    logo: "/parceiros/medeiros.png",
    url: "https://www.instagram.com/societymedeiros/",
  },
  {
    name: "Nativa FM",
    logo: "/parceiros/nativa-fm.png",
    url: "https://nativajoinville.com.br/",
  },
  {
    name: "NR Postes",
    logo: "/parceiros/nr-postes.png",
    url: "https://nrpostes.com.br/",
  },
  {
    name: "RAC",
    logo: "/parceiros/ra.png",
    url: "https://www.facebook.com/rac1centroautomotivo/",
  },
  {
    name: "Hospital do Câncer",
    logo: "/parceiros/hospital-do-cancer.png",
    url: "https://www.facebook.com/hospitaldocancerJoinville/",
  },
  {
    name: "Sicoob",
    logo: "/parceiros/sicoob.png",
    url: "https://www.sicoob.com.br/",
  },
  {
    name: "TV da Cidade",
    logo: "/parceiros/tv-da-cidade.png",
    url: "https://www.instagram.com/tvdacidade/",
  },
];

function LogoCard({ partner }: { partner: (typeof partners)[0] }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={partner.name}
      className="shrink-0 mx-3 bg-white rounded-2xl flex items-center justify-center
        transition-[transform,box-shadow] duration-300
        hover:-translate-y-1 hover:shadow-[0_10px_35px_rgba(232,23,138,0.22)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy
        active:translate-y-0"
      style={{ width: 172, height: 86, padding: "14px 22px" }}
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        width={128}
        height={58}
        style={{ objectFit: "contain", width: "100%", height: "100%" }}
        unoptimized
      />
    </a>
  );
}

export function Parceiros() {
  const row1 = [...partners, ...partners];
  const row2 = [...partners, ...partners];

  return (
    <section
      id="parceiros"
      className="py-20 lg:py-28 bg-brand-navy relative overflow-hidden grain"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-brand-pink/10 blur-[120px]" />
        <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] rounded-full bg-brand-blue/8 blur-[120px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12 px-6">
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-white/8 text-white text-[11px] font-bold font-display px-4 py-2 rounded-full mb-6 tracking-[0.12em] uppercase">
            🤝 &nbsp;Parceiros
          </div>
          <h2 className="font-display font-extrabold text-3xl lg:text-[2.5rem] text-white! leading-tight tracking-tight mb-3">
            Quem caminha <span className="text-brand-pink">conosco</span>
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto leading-relaxed">
            Empresas e instituições que acreditam na nossa missão e tornam nosso
            trabalho possível.
          </p>
        </Reveal>
      </div>

      {/* Scrolling strip with edge fades */}
      <div
        className="marquee-wrapper relative z-10 overflow-hidden space-y-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {/* Row 1 — left */}
        <div className="flex">
          <div className="flex animate-marquee shrink-0">
            {row1.map((partner, i) => (
              <LogoCard key={`r1-${i}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="flex">
          <div className="flex animate-marquee-reverse shrink-0">
            {row2.map((partner, i) => (
              <LogoCard key={`r2-${i}`} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
