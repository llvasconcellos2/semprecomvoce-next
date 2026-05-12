import { PolaroidSwiper } from "./PolaroidSwiper";
import { Reveal } from "./Reveal";

export function Mission() {
  const POLAROIDS = [
    {
      image:
        "/blog/palavras-amigas-das-freiras-fe-e-esperanca-que-chegam-de-maos-dadas/img-001.jpg",
      description:
        "Alceu, Andrea e duas freiras em conversa amiga de fé e esperança",
    },
    {
      image:
        "/blog/margarete-uma-historia-de-coragem-que-merece-ser-contada/img-001.jpg",
      description:
        "Paciente Margarete em acompanhamento pelo Instituto do Câncer Sempre Com Você",
    },
    {
      image:
        "/blog/mesa-posta-para-oito-cuidado-que-tambem-alimenta-a-alma/img-001.jpg",
      description:
        "Senhor Paulo, de 76 anos, com o aparelho auditivo conquistado com apoio do Instituto",
    },
    {
      image:
        "/blog/alceu-roque-com-muita-fe-um-tratamento-bem-sucedido/img-002.jpg",
      description:
        "Alceu Roque celebrando sua recuperação com muita fé e alegria",
    },
    {
      image:
        "/blog/luto-que-vira-amor-samuel-e-juvelino-transformam-a-dor-em-voluntariado/img-001.jpg",
      description: "Samuel e Juvelino: familiares que se tornaram voluntários",
    },
    {
      image:
        "/blog/com-o-prefeito-de-joinville-apresentando-nossa-missao-no-farol-do-saber/img-001.jpg",
      description:
        "Andrea com o Prefeito de Joinville, Adriano Silva, no Farol do Saber",
    },
    {
      image:
        "/blog/o-instituto-recebe-o-apoio-do-vereador-brandel-junior/img-001.jpg",
      description:
        "Andrea com o Vereador Brandel Junior: apoio ao Instituto na Câmara de Joinville",
    },
    {
      image:
        "/blog/reconhecidos-pelos-deputados-estaduais-uma-honra-que-nos-fortalece/img-001.jpg",
      description:
        "Instituto com o Deputado Estadual Maurício Peixer e o Deputado Fernando Krellig",
    },
  ];

  return (
    <section id="sobre" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 xl:gap-28 items-center justify-center overflow-y-hidden">
        {/* Image block */}
        <Reveal
          direction="right"
          duration={700}
          distance={150}
          className="relative order-2 lg:order-1 flex items-center justify-center"
        >
          <PolaroidSwiper polaroids={POLAROIDS} />
        </Reveal>
        {/* Text block */}
        <Reveal
          direction="left"
          duration={700}
          distance={150}
          className="flex flex-col gap-6 order-1 lg:order-2"
        >
          <div className="text-brand-pink text-[11px] font-bold font-display tracking-[0.18em] uppercase">
            Quem Somos
          </div>
          <h2 className="font-display font-extrabold text-[2.5rem] xl:text-[3rem] text-brand-navy leading-[1.08] tracking-tight">
            Cuidar vai além
            <br />
            do tratamento médico
          </h2>
          <p className="text-brand-navy/60 text-lg leading-[1.8]">
            Fundado em 2009, o Instituto do Câncer Sempre Com Você nasceu da
            convicção de que o cuidado integral ao paciente com câncer precisa
            ir muito além da medicina — envolve o ser humano em sua totalidade:
            emoções, relações e condições de vida.
          </p>
          <blockquote className="border-l-4 border-brand-pink pl-6 py-1 my-2">
            <p className="text-brand-navy font-semibold text-xl leading-relaxed font-display italic">
              "Estar sempre ao lado de quem mais precisa — essa é nossa missão."
            </p>
          </blockquote>
          <p className="text-brand-navy/60 text-lg leading-[1.8]">
            Trabalhamos com uma equipe multidisciplinar de psicólogos,
            assistentes sociais e voluntários dedicados, formando redes de
            cuidado que transformam vidas.
          </p>
          <a
            href="#programas"
            className="inline-flex items-center gap-2 text-brand-pink font-semibold font-display text-sm hover:gap-3 transition-all duration-200 w-fit mt-2"
          >
            Conheça nossos programas
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
