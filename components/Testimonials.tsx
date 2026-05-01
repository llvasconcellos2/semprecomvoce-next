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

export function Testimonials() {
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
                         ${
                           t.featured ? "bg-brand-navy" : "bg-brand-pink-light"
                         }`}
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
