const programs = [
  {
    icon: "🧠",
    title: "Apoio Psicológico",
    description:
      "Atendimento individual e em grupo para pacientes e familiares, promovendo saúde mental e bem-estar emocional durante toda a jornada do tratamento.",
    accent: "orange" as const,
  },
  {
    icon: "🤝",
    title: "Assistência Social",
    description:
      "Orientação e suporte para acesso a benefícios sociais, transporte para consultas, medicamentos e outros recursos essenciais para quem mais precisa.",
    accent: "green" as const,
  },
  {
    icon: "💬",
    title: "Grupos de Apoio",
    description:
      "Encontros regulares para compartilhar experiências, fortalecer vínculos e reduzir o isolamento através da escuta ativa e do acolhimento mútuo.",
    accent: "purple" as const,
  },
  {
    icon: "🏠",
    title: "Visitas Domiciliares",
    description:
      "Acompanhamento personalizado no domicílio para pacientes com mobilidade reduzida, garantindo cuidado contínuo, humanizado e próximo.",
    accent: "blue" as const,
  },
];

export function Programs() {
  return (
    <section
      id="programas"
      className="py-28 lg:py-36 relative z-10 grain overflow-hidden"
    >
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-125 h-125 rounded-full bg-brand-blue/6 blur-[120px] pointer-events-none" />

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
                         hover:-translate-y-1.5 transition-all duration-300 hover:shadow-2xl
                         ${program.accent === "blue" && " hover:shadow-brand-blue/[0.14] hover:border hover:border-brand-blue"}
                         ${program.accent === "orange" && " hover:shadow-brand-orange/[0.14] hover:border hover:border-brand-orange"}
                         ${program.accent === "purple" && " hover:shadow-brand-purple/[0.14] hover:border hover:border-brand-purple"}
                         ${program.accent === "green" && " hover:shadow-brand-green/[0.14] hover:border hover:border-brand-green"}
                         `}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0
                         ${program.accent === "blue" && " bg-brand-blue/40"}
                         ${program.accent === "orange" && "bg-brand-orange/40"}
                         ${program.accent === "purple" && "bg-brand-purple/40"}
                         ${program.accent === "green" && " bg-brand-green/40"}
                         `}
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
                        ${program.accent === "blue" && " text-brand-blue"}
                         ${program.accent === "orange" && "text-brand-orange"}
                         ${program.accent === "purple" && "text-brand-purple"}
                         ${program.accent === "green" && " text-brand-green"}
                           hover:gap-2.5 transition-all duration-200 mt-auto`}
              >
                Saiba mais
                <svg
                  width="14"
                  height="14"
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
          ))}
        </div>
      </div>
    </section>
  );
}
