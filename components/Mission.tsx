export function Mission() {
  return (
    <section id="sobre" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 xl:gap-28 items-center">
        {/* Image block */}
        <div className="relative order-2 lg:order-1">
          <div className="absolute -top-5 -left-5 w-full h-full rounded-3xl bg-brand-pink-light" />
          <div className="absolute -bottom-5 -right-5 w-full h-full rounded-3xl border-2 border-brand-blue/20" />
          <div className="relative rounded-3xl overflow-hidden aspect-4/3 shadow-2xl shadow-brand-navy/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://placehold.co/800x600/FEE9F4/E8178A?text=Instituto+Sempre+Com+Você"
              alt="Nossa equipe em ação"
              className="w-full h-full object-cover"
            />
            {/* Color treatment overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-brand-navy/30 via-transparent to-transparent mix-blend-multiply" />
          </div>
        </div>

        {/* Text block */}
        <div className="flex flex-col gap-6 order-1 lg:order-2">
          <div className="text-brand-pink text-[11px] font-bold font-display tracking-[0.18em] uppercase">
            Quem Somos
          </div>
          <h2 className="font-display font-extrabold text-[2.5rem] xl:text-[3rem] text-brand-navy leading-[1.08] tracking-tight">
            Cuidar vai além
            <br />
            do tratamento médico
          </h2>
          <p className="text-brand-navy/60 text-lg leading-[1.8]">
            Fundado em 2009, o Instituto Sempre Com Você nasceu da convicção de
            que o cuidado integral ao paciente com câncer precisa ir muito além
            da medicina — envolve o ser humano em sua totalidade: emoções,
            relações e condições de vida.
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
        </div>
      </div>
    </section>
  );
}
