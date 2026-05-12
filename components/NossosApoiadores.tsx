import { YoutubeCarrousel, type VideoItem } from "./YoutubeCarrousel";
import { Reveal } from "./Reveal";
import { RevealGroup } from "./RevealGroup";
import { YoutubeIcon } from "./icons/YoutubeIcon";

const videos: VideoItem[] = [
  { id: "sHIgkn2PXGA", title: "Mensagem de Cid Moreira" },
  { id: "bAHntgjy7pY", title: "Mensagem de Sérgio Malandro" },
  { id: "wt7wsHyF74U", title: "Apoio de David Brazil" },
  { id: "scpeoXJXbAQ", title: "Mensagem de Ezequiel Jr" },
  { id: "yGGfj1PhzYU", title: "Apoio de Marcelo Serrado" },
  { id: "UzPmCH-GpZU", title: "Mensagem de Sula Miranda" },
];

export function NossosApoiadores() {
  return (
    <section
      id="apoiadores"
      className="py-20 lg:py-28 bg-brand-navy relative overflow-hidden grain"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-0 w-[500px] h-[500px] rounded-full bg-brand-pink/10 blur-[120px]" />
        <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-brand-blue/8 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-brand-pink/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <RevealGroup className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/8 text-white text-[11px] font-bold font-display px-4 py-2 rounded-full mb-6 tracking-[0.12em] uppercase">
            📺 &nbsp;Nossos Apoiadores
          </div>

          <h2 className="font-display font-extrabold text-3xl lg:text-[2.5rem] text-white! leading-tight tracking-tight mb-3">
            Celebridades que apoiam{" "}
            <span className="text-brand-pink">nossa causa</span>
          </h2>

          <p className="text-white/50 text-base max-w-2xl mx-auto leading-relaxed">
            Nomes como Cid Moreira, David Brazil, Sérgio Malandro, Sula Miranda,
            Marcelo Serrado e Ezequiel Jr emprestam sua voz para ampliar nossa
            missão de acolher quem enfrenta o câncer.
          </p>
        </RevealGroup>

        {/* Carousel — low threshold so it fades in before auto-play fires at 0.4 */}
        <Reveal threshold={0.1}>
          <YoutubeCarrousel videos={videos} />
        </Reveal>

        {/* Footer CTA */}
        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-white/40 text-sm font-sans">
            Gostou? Assista mais vídeos e se inscreva no nosso canal
          </p>
          <a
            href="https://www.youtube.com/@programasemprecomvocecoman5847"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-pink hover:bg-brand-pink/90 text-white font-semibold font-display text-sm px-7 py-3.5 rounded-full transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-pink/30 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
          >
            <YoutubeIcon width={24} height={24} />
            Acessar o Canal no YouTube
          </a>
        </Reveal>
      </div>
    </section>
  );
}
