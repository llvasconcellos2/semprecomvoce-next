const helpOptions = [
  {
    icon: "💝",
    title: "Doe",
    description:
      "Sua contribuição, grande ou pequena, financia programas, materiais e profissionais dedicados a transformar vidas.",
    cta: "Fazer uma Doação",
    primary: true,
  },
  {
    icon: "🙌",
    title: "Voluntarie-se",
    description:
      "Dedique seu tempo e talento. Temos espaço para psicólogos, assistentes sociais, motoristas, comunicadores e muito mais.",
    cta: "Quero Voluntariar",
    primary: false,
  },
  {
    icon: "📢",
    title: "Compartilhe",
    description:
      "Espalhe nossa missão. Cada pessoa que nos conhece pode ser a ponte para alguém que precisa de apoio agora.",
    cta: "Compartilhar Agora",
    primary: false,
  },
];

export function DonateCTA() {
  return (
    <section
      id="doe"
      className="py-28 lg:py-36 bg-brand-navy relative overflow-hidden grain"
    >
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-150 h-150 rounded-full bg-brand-pink/12 blur-[130px]" />
        <div className="absolute -bottom-40 -right-40 w-150 h-150 rounded-full bg-brand-blue/10 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
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
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {helpOptions.map((item) => (
            <div
              key={item.title}
              className="bg-white/[0.07] backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center gap-4 text-center border border-white/8 hover:bg-white/12 transition-colors duration-300"
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="font-display font-bold text-xl text-white!">
                {item.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {item.description}
              </p>
              <a
                href="#"
                className={`mt-auto w-full py-3.5 rounded-full font-semibold font-display text-sm transition-all duration-200
                           hover:-translate-y-0.5 active:translate-y-0
                           ${
                             item.primary
                               ? "bg-brand-pink text-white hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/30"
                               : "border border-white/20 text-white hover:bg-white/10"
                           }`}
              >
                {item.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-white/25 text-xs tracking-wide">
          Instituto Sempre Com Você · ONG registrada · Todas as doações são
          revertidas integralmente para nossos programas.
        </p>
      </div>
    </section>
  );
}
