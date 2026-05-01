import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white grain">
      {/* Atmospheric gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-187.5 h-187.5 rounded-full bg-brand-pink/[0.07] blur-[130px]" />
        <div className="absolute top-1/2 -left-56 w-137.5 h-137.5 rounded-full bg-brand-blue/[0.07] blur-[110px]" />
        <div className="absolute -bottom-24 right-1/3 w-112.5 h-112.5 rounded-full bg-brand-pink/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-0 w-full grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
        {/* ── Left: Content ── */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-brand-pink/9 text-brand-pink text-[11px] font-bold font-display px-4 py-2 rounded-full w-fit tracking-[0.12em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse-dot" />
            ONG sem fins lucrativos · Desde 2009
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-[52px] xl:text-[66px] text-brand-navy leading-[1.02] tracking-[-0.02em]">
            Ninguém precisa
            <br />
            enfrentar o{" "}
            <span className="relative inline-block text-brand-pink">
              câncer
              <svg
                className="absolute -bottom-1 left-0 w-full overflow-visible"
                viewBox="0 0 210 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7.5 Q52.5 2 105 6 Q157.5 10 208 4"
                  stroke="#E8178A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.45"
                />
              </svg>
            </span>{" "}
            sozinho.
          </h1>

          {/* Description */}
          <p className="text-brand-navy/60 text-xl leading-[1.75] max-w-lg">
            Oferecemos apoio integral — emocional, social e prático — para
            pacientes com câncer e suas famílias, do diagnóstico à recuperação.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#programas"
              className="bg-brand-pink text-white font-semibold font-display text-sm px-8 py-4 rounded-full
                         hover:bg-brand-pink/90 hover:shadow-xl hover:shadow-brand-pink/30 hover:-translate-y-0.5
                         active:translate-y-0 transition-all duration-200"
            >
              Conheça Nosso Trabalho
            </a>
            <a
              href="#doe"
              className="border-2 border-brand-navy/15 text-brand-navy font-semibold font-display text-sm px-8 py-4 rounded-full
                         hover:border-brand-navy hover:bg-brand-navy hover:text-white hover:-translate-y-0.5
                         active:translate-y-0 transition-all duration-200"
            >
              Como Ajudar
            </a>
          </div>

          {/* Quick stats */}
          <div className="flex gap-8 pt-6 border-t border-brand-navy/[0.07]">
            {[
              { number: "500+", label: "Pacientes atendidos" },
              { number: "15 anos", label: "De serviço" },
              { number: "120+", label: "Voluntários" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="font-display font-extrabold text-2xl text-brand-pink leading-none">
                  {stat.number}
                </span>
                <span className="text-xs text-brand-navy/50 font-medium mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Visual ── */}
        <div className="relative flex items-center justify-center order-1 lg:order-2 min-h-110">
          {/* Spinning ring */}
          <div className="absolute w-107.5 h-107.5 rounded-full border border-dashed border-brand-pink/20 animate-spin-slow" />
          {/* Gradient fill */}
          <div className="absolute w-87.5 h-87.5 rounded-full bg-linear-to-br from-brand-pink-light to-brand-blue-light opacity-75" />

          {/* Logo drawing — floating */}
          <div className="flex flex-col">
            <Image
              src="/logo-drawing.svg"
              alt=""
              width={300}
              height={300}
              className="relative z-10 drop-shadow-2xl animate-float"
              aria-hidden="true"
              priority
            />

            <Image
              src="/logo-text.svg"
              alt=""
              width={300}
              height={300}
              className="relative z-10 drop-shadow-2xl animate-float"
              aria-hidden="true"
              priority
            />
          </div>
          {/* Floating card — top right */}
          <div className="absolute top-6 -right-2 xl:right-4 bg-white rounded-2xl shadow-xl shadow-brand-navy/10 px-4 py-3 flex items-center gap-3 z-20">
            <div className="w-10 h-10 rounded-xl bg-brand-pink-light flex items-center justify-center text-xl shrink-0">
              ❤️
            </div>
            <div>
              <div className="font-display font-bold text-brand-navy text-sm leading-tight">
                1.200+
              </div>
              <div className="text-[11px] text-brand-navy/50 mt-0.5">
                famílias apoiadas
              </div>
            </div>
          </div>

          {/* Floating card — bottom left */}
          <div className="absolute bottom-6 -left-2 xl:left-4 bg-white rounded-2xl shadow-xl shadow-brand-navy/10 px-4 py-3 flex items-center gap-3 z-20">
            <div className="w-10 h-10 rounded-xl bg-brand-blue-light flex items-center justify-center text-xl shrink-0">
              🤝
            </div>
            <div>
              <div className="font-display font-bold text-brand-navy text-sm leading-tight">
                40+
              </div>
              <div className="text-[11px] text-brand-navy/50 mt-0.5">
                parcerias ativas
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] font-semibold font-display tracking-[0.15em] uppercase text-brand-navy/25">
          Role para baixo
        </span>
        <div className="w-px h-10 bg-linear-to-b from-brand-navy/20 to-transparent" />
      </div>
    </section>
  );
}
