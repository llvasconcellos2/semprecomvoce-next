import ActionButton from "./ActionButton";
import { GlowCard, GlowCardContent, GlowCardWrapper } from "./GlowCard";
import { HandsPrayingIcon } from "./icons/HandsPrayingIcon";
import { HeartIcon } from "./icons/HeartIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { RevealGroup } from "./RevealGroup";
import { ShareButton } from "./ShareButton";

const helpOptions = [
  {
    icon: "💝",
    title: "Doe",
    description:
      "Sua contribuição, grande ou pequena, financia programas, materiais e profissionais dedicados a transformar vidas.",
    cta: "Fazer uma Doação",
    primary: true,
    share: false,
  },
  {
    icon: "🙌",
    title: "Voluntarie-se",
    description:
      "Dedique seu tempo e talento. Temos espaço para psicólogos, assistentes sociais, motoristas, comunicadores e muito mais.",
    cta: "Quero Voluntariar",
    primary: false,
    share: false,
  },
  {
    icon: "📢",
    title: "Compartilhe",
    description:
      "Espalhe nossa missão. Cada pessoa que nos conhece pode ser a ponte para alguém que precisa de apoio agora.",
    cta: "Compartilhar Agora",
    primary: false,
    share: true,
  },
];

export function DonateCTA() {
  return (
    <section
      id="ajudar"
      className="py-28 lg:py-36 bg-brand-navy relative overflow-hidden grain"
    >
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-150 h-150 rounded-full bg-brand-pink/12 blur-[130px]" />
        <div className="absolute -bottom-40 -right-40 w-150 h-150 rounded-full bg-brand-blue/10 blur-[130px]" />
      </div>

      <RevealGroup className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/8 text-white text-[11px] font-bold font-display px-4 py-2 rounded-full mb-8 tracking-[0.12em] uppercase">
          ❤️ &nbsp;Como Ajudar
        </div>

        <h2 className="font-display font-extrabold text-[2.75rem] xl:text-[4rem] text-white! leading-[1.05] tracking-tight mb-5">
          Faça parte dessa
          <br />
          <span className="text-brand-pink">história de amor</span>
        </h2>

        <p className="text-white/55 text-xl leading-[1.75] mb-14 max-w-2xl mx-auto">
          Cada contribuição transforma vidas. Escolha como você quer fazer a
          diferença hoje.
        </p>

        {/* Action cards */}
        <GlowCardWrapper className="w-full grid md:grid-cols-3 gap-5 mb-12">
          {helpOptions.map((item) => (
            <GlowCard key={item.title} className="rounded-3xl">
              <GlowCardContent className="p-8 flex flex-col items-center gap-4 text-center bg-[#2f3b5c]">
                <span className="text-4xl">{item.icon}</span>
                <h3 className="font-display font-bold text-xl text-white!">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">
                  {item.description}
                </p>
                {item.primary ? (
                  <ActionButton
                    href={"/apoie"}
                    boxClassName="w-full"
                    className="mt-auto w-full flex gap-3 items-center justify-center"
                  >
                    <HeartIcon /> {item.cta}
                  </ActionButton>
                ) : item.share ? (
                  <ShareButton className="cursor-pointer mt-auto w-full py-3.5 rounded-full font-semibold font-display text-sm transition-[transform,background-color] duration-200 hover:-translate-y-0.5 active:translate-y-0 border border-white/20 text-white hover:bg-white/10 flex items-center justify-center gap-3">
                    <ShareIcon /> Compartilhar Agora
                  </ShareButton>
                ) : (
                  <a
                    href="#"
                    className="flex items-center justify-center gap-3 mt-auto w-full py-3.5 rounded-full font-semibold font-display text-sm transition-[transform,background-color] duration-200 hover:-translate-y-0.5 active:translate-y-0 border border-white/20 text-white hover:bg-white/10"
                  >
                    <HandsPrayingIcon width={28} height={28} /> {item.cta}
                  </a>
                )}
              </GlowCardContent>
            </GlowCard>
          ))}
        </GlowCardWrapper>

        <p className="text-white/25 text-xs tracking-wide">
          Instituto Sempre Com Você · ONG registrada · Todas as doações são
          revertidas integralmente para nossos programas.
        </p>
      </RevealGroup>
    </section>
  );
}
