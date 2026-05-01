import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const programs = [
  {
    icon: "🧠",
    title: "Apoio Psicológico",
    description:
      "Atendimento individual e em grupo para pacientes e familiares, promovendo saúde mental e bem-estar emocional durante toda a jornada do tratamento.",
    accent: "pink" as const,
  },
  {
    icon: "🤝",
    title: "Assistência Social",
    description:
      "Orientação e suporte para acesso a benefícios sociais, transporte para consultas, medicamentos e outros recursos essenciais para quem mais precisa.",
    accent: "blue" as const,
  },
  {
    icon: "💬",
    title: "Grupos de Apoio",
    description:
      "Encontros regulares para compartilhar experiências, fortalecer vínculos e reduzir o isolamento através da escuta ativa e do acolhimento mútuo.",
    accent: "pink" as const,
  },
  {
    icon: "🏠",
    title: "Visitas Domiciliares",
    description:
      "Acompanhamento personalizado no domicílio para pacientes com mobilidade reduzida, garantindo cuidado contínuo, humanizado e próximo.",
    accent: "blue" as const,
  },
];

const testimonials = [
  {
    quote:
      "Quando recebi o diagnóstico, senti o chão desaparecer. O Instituto foi meu porto seguro — aprendi que não estava sozinha nessa batalha.",
    name: "Maria Aparecida",
    role: "Paciente em remissão",
    avatar: "https://placehold.co/80x80/FEE9F4/E8178A?text=MA",
    featured: false,
  },
  {
    quote:
      "Como marido de uma paciente, me sentir acolhido também foi fundamental. Os grupos de apoio me ensinaram a ser mais forte para cuidar de quem amo.",
    name: "Roberto Silva",
    role: "Familiar assistido",
    avatar: "https://placehold.co/80x80/1D2B4F/ffffff?text=RS",
    featured: true,
  },
  {
    quote:
      "A assistência social me ajudou a conseguir meus medicamentos gratuitamente e o transporte para o tratamento. Sem isso, não sei o que teria sido de mim.",
    name: "Beatriz Moura",
    role: "Paciente assistida",
    avatar: "https://placehold.co/80x80/FEE9F4/E8178A?text=BM",
    featured: false,
  },
];

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

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-navy/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        <a href="/" className="shrink-0">
          <Image
            src="/logo-semprecomvc.png"
            alt="Instituto Sempre Com Você"
            width={220}
            height={56}
            className="h-12 w-auto"
            priority
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Sobre", "Programas", "Depoimentos", "Contato"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium font-display text-brand-navy/55 hover:text-brand-navy transition-colors duration-200 tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#doe"
          className="shrink-0 bg-brand-pink text-white text-sm font-semibold font-display px-6 py-3 rounded-full
                     hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/30 hover:-translate-y-px
                     active:translate-y-0 active:shadow-none transition-all duration-200"
        >
          Doe Agora
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white grain">
      {/* Atmospheric gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[750px] h-[750px] rounded-full bg-brand-pink/[0.07] blur-[130px]" />
        <div className="absolute top-1/2 -left-56 w-[550px] h-[550px] rounded-full bg-brand-blue/[0.07] blur-[110px]" />
        <div className="absolute -bottom-24 right-1/3 w-[450px] h-[450px] rounded-full bg-brand-pink/[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
        {/* ── Left: Content ── */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-brand-pink/[0.09] text-brand-pink text-[11px] font-bold font-display px-4 py-2 rounded-full w-fit tracking-[0.12em] uppercase">
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
        <div className="relative flex items-center justify-center order-1 lg:order-2 min-h-[440px]">
          {/* Spinning ring */}
          <div
            className="absolute w-[430px] h-[430px] rounded-full border border-dashed border-brand-pink/20 animate-spin-slow"
          />
          {/* Gradient fill */}
          <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-br from-brand-pink-light to-brand-blue-light opacity-75" />

          {/* Logo drawing — floating */}
          <Image
            src="/logo-drawing.svg"
            alt=""
            width={300}
            height={300}
            className="relative z-10 drop-shadow-2xl animate-float"
            aria-hidden="true"
            priority
          />

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
        <div className="w-px h-10 bg-gradient-to-b from-brand-navy/20 to-transparent" />
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { number: "500+", label: "Pacientes Atendidos", icon: "👤" },
    { number: "1.200+", label: "Famílias Apoiadas", icon: "🏠" },
    { number: "15 Anos", label: "De Experiência", icon: "⭐" },
    { number: "120+", label: "Voluntários Ativos", icon: "🤝" },
  ];

  return (
    <section className="bg-brand-navy py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x lg:divide-white/[0.08]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center px-8 gap-2"
            >
              <span className="text-2xl">{stat.icon}</span>
              <span className="font-display font-extrabold text-[2.25rem] text-brand-pink leading-none">
                {stat.number}
              </span>
              <span className="text-white/50 text-sm font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Mission ──────────────────────────────────────────────────────────────────

function Mission() {
  return (
    <section id="sobre" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 xl:gap-28 items-center">
        {/* Image block */}
        <div className="relative order-2 lg:order-1">
          <div className="absolute -top-5 -left-5 w-full h-full rounded-3xl bg-brand-pink-light" />
          <div className="absolute -bottom-5 -right-5 w-full h-full rounded-3xl border-2 border-brand-blue/20" />
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-brand-navy/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://placehold.co/800x600/FEE9F4/E8178A?text=Instituto+Sempre+Com+Você"
              alt="Nossa equipe em ação"
              className="w-full h-full object-cover"
            />
            {/* Color treatment overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent mix-blend-multiply" />
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

// ─── Programs ─────────────────────────────────────────────────────────────────

function Programs() {
  return (
    <section id="programas" className="py-28 lg:py-36 bg-brand-pink-light relative grain overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-blue/[0.06] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-brand-pink text-[11px] font-bold font-display tracking-[0.18em] uppercase mb-4">
            Nossos Programas
          </div>
          <h2 className="font-display font-extrabold text-[2.5rem] xl:text-[3rem] text-brand-navy leading-[1.08] tracking-tight">
            Apoio que abraça todas
            <br />
            as dimensões da vida
          </h2>
          <p className="text-brand-navy/60 text-lg mt-5 leading-[1.75]">
            Cada programa é desenhado para atender às necessidades reais de
            pacientes e familiares, em todas as fases da jornada.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {programs.map((program) => (
            <div
              key={program.title}
              className={`bg-white rounded-3xl p-8 flex flex-col gap-5
                         hover:-translate-y-1.5 transition-all duration-300
                         ${program.accent === "pink"
                           ? "hover:shadow-2xl hover:shadow-brand-pink/[0.14]"
                           : "hover:shadow-2xl hover:shadow-brand-blue/[0.14]"}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0
                            ${program.accent === "pink" ? "bg-brand-pink-light" : "bg-brand-blue-light"}`}
              >
                {program.icon}
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-display font-bold text-[1.125rem] text-brand-navy leading-snug">
                  {program.title}
                </h3>
                <p className="text-brand-navy/58 text-sm leading-relaxed flex-1">
                  {program.description}
                </p>
              </div>
              <a
                href="#"
                className={`inline-flex items-center gap-1.5 text-sm font-semibold font-display
                           ${program.accent === "pink" ? "text-brand-pink" : "text-brand-blue"}
                           hover:gap-2.5 transition-all duration-200 mt-auto`}
              >
                Saiba mais
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section id="depoimentos" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="text-brand-pink text-[11px] font-bold font-display tracking-[0.18em] uppercase mb-4">
            Depoimentos
          </div>
          <h2 className="font-display font-extrabold text-[2.5rem] xl:text-[3rem] text-brand-navy leading-[1.08] tracking-tight">
            Histórias que
            <br />
            nos inspiram
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className={`rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1
                         ${t.featured
                           ? "bg-brand-navy"
                           : "bg-brand-pink-light"}`}
            >
              {/* Quote icon */}
              <svg
                width="36"
                height="28"
                viewBox="0 0 36 28"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 28V16.8C0 7.467 5.133 2.1 15.4 0L16.8 2.8C11.733 3.733 8.867 6.65 8.4 11.2H14V28H0ZM21 28V16.8C21 7.467 26.133 2.1 36.4 0L37.8 2.8C32.733 3.733 29.867 6.65 29.4 11.2H35V28H21Z"
                  fill={t.featured ? "#E8178A" : "#E8178A"}
                  opacity={t.featured ? "0.45" : "0.25"}
                />
              </svg>

              <p
                className={`text-base leading-[1.8] flex-1
                           ${t.featured ? "text-white/80" : "text-brand-navy/65"}`}
              >
                {t.quote}
              </p>

              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div>
                  <div
                    className={`font-semibold font-display text-sm
                               ${t.featured ? "text-white" : "text-brand-navy"}`}
                  >
                    {t.name}
                  </div>
                  <div
                    className={`text-xs mt-0.5
                               ${t.featured ? "text-white/40" : "text-brand-navy/45"}`}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Donate CTA ───────────────────────────────────────────────────────────────

function DonateCTA() {
  return (
    <section id="doe" className="py-28 lg:py-36 bg-brand-navy relative overflow-hidden grain">
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-pink/[0.12] blur-[130px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-blue/[0.10] blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/[0.08] text-white text-[11px] font-bold font-display px-4 py-2 rounded-full mb-8 tracking-[0.12em] uppercase">
          ❤️ &nbsp;Como Ajudar
        </div>

        <h2 className="font-display font-extrabold text-[2.75rem] xl:text-[4rem] text-white leading-[1.05] tracking-tight mb-5">
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
              className="bg-white/[0.07] backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center gap-4 text-center border border-white/[0.08] hover:bg-white/[0.12] transition-colors duration-300"
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="font-display font-bold text-xl text-white">
                {item.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {item.description}
              </p>
              <a
                href="#"
                className={`mt-auto w-full py-3.5 rounded-full font-semibold font-display text-sm transition-all duration-200
                           hover:-translate-y-0.5 active:translate-y-0
                           ${item.primary
                             ? "bg-brand-pink text-white hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/30"
                             : "border border-white/20 text-white hover:bg-white/10"}`}
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

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer id="contato" className="bg-brand-navy border-t border-white/[0.06] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Image
              src="/logo-semprecomvc.png"
              alt="Instituto Sempre Com Você"
              width={200}
              height={50}
              className="h-11 w-auto brightness-0 invert mb-5 opacity-90"
            />
            <p className="text-white/45 text-sm leading-relaxed max-w-sm">
              Nossa missão é melhorar a vida de pessoas com câncer e suas
              famílias, oferecendo apoio integral com amor, cuidado e dedicação
              desde 2009.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { label: "f", title: "Facebook" },
                { label: "in", title: "LinkedIn" },
                { label: "ig", title: "Instagram" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.title}
                  className="w-10 h-10 rounded-full bg-white/[0.08] flex items-center justify-center
                             text-white/50 text-xs font-bold font-display uppercase
                             hover:bg-brand-pink hover:text-white transition-all duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-white/90 text-sm mb-5 tracking-wide">
              Instituto
            </h4>
            <ul className="flex flex-col gap-3.5">
              {["Quem Somos", "Nossos Programas", "Como Ajudar", "Transparência", "Blog"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 text-sm hover:text-white/80 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="font-display font-semibold text-white/90 text-sm mb-5 tracking-wide">
              Contato
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm text-white/40">
              <li className="flex items-center gap-2.5">
                <span>📧</span> contato@semprecomvoce.org.br
              </li>
              <li className="flex items-center gap-2.5">
                <span>📞</span> (11) 3000-0000
              </li>
              <li className="flex items-center gap-2.5">
                <span>📍</span> São Paulo, SP
              </li>
            </ul>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-brand-pink font-semibold font-display text-sm mt-6
                         hover:gap-3 transition-all duration-200"
            >
              Fale Conosco
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

        <div className="border-t border-white/[0.07] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs">
            © 2025 Instituto Sempre Com Você. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Mission />
        <Programs />
        <Testimonials />
        <DonateCTA />
      </main>
      <Footer />
    </>
  );
}
