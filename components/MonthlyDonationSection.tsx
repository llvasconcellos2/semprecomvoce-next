"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

// CONFIGURE: Replace with real monthly subscription links from MercadoPago
const MP_MONTHLY_LINKS: Record<string, string> = {
  "25": "https://mpago.la/17gjCoA",
  "50": "https://mpago.la/17gjCoA",
  "100": "https://mpago.la/17gjCoA",
  "200": "https://mpago.la/17gjCoA",
};

const plans = [
  {
    value: "25",
    label: "Amigo",
    price: 25,
    daily: "menos de R$ 1",
    impact: "Contribui com materiais de cuidado e apoio básico a um paciente.",
    color: "brand-blue",
    emoji: "💙",
    popular: false,
  },
  {
    value: "50",
    label: "Protetor",
    price: 50,
    daily: "menos de R$ 2",
    impact: "Cobre o transporte de um paciente para tratamentos durante o mês.",
    color: "brand-pink",
    emoji: "🎗️",
    popular: false,
  },
  {
    value: "100",
    label: "Guardião",
    price: 100,
    daily: "pouco mais de R$ 3",
    impact:
      "Garante apoio psicológico e logístico completo para uma família inteira.",
    color: "brand-navy",
    emoji: "🏠",
    popular: true,
  },
  {
    value: "200",
    label: "Herói",
    price: 200,
    daily: "menos de R$ 7",
    impact:
      "Transforma profundamente a jornada de múltiplos pacientes durante o tratamento.",
    color: "brand-pink",
    emoji: "⭐",
    popular: false,
  },
] as const;

export function MonthlyDonationSection() {
  const [selected, setSelected] = useState<string>("100");

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-pink/6 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-brand-blue/7 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-pink/4 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <Reveal direction="up" duration={700} blur blurAmount={10}>
          <div className="mb-14 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-pink/10 px-4 py-2 text-xs font-bold font-display uppercase tracking-widest text-brand-pink">
              <span className="inline-block h-2 w-2 animate-pulse-dot rounded-full bg-brand-pink" />
              Impacto duradouro
            </span>
            <h2 className="mt-4 font-display font-extrabold leading-tight text-[2rem] text-brand-navy lg:text-[2.75rem]">
              Faça uma <span className="text-brand-pink">doação mensal</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brand-navy/60 lg:text-lg">
              Uma doação recorrente garante que o Instituto possa planejar e
              ampliar seus programas de apoio. Com sua contribuição mensal,
              pacientes com câncer e suas famílias contam com suporte contínuo —
              psicológico, logístico e humano — durante toda a jornada do
              tratamento.
            </p>
          </div>
        </Reveal>

        {/* Plan Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5 lg:items-end min-h-70">
          {plans.map((plan, i) => {
            const isSelected = selected === plan.value;

            return (
              <Reveal
                key={plan.value}
                delay={i * 80}
                direction="up"
                duration={600}
                blur
                blurAmount={8}
              >
                <button
                  onClick={() => setSelected(plan.value)}
                  aria-pressed={isSelected}
                  className="group relative w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 rounded-3xl"
                  style={{
                    transform: isSelected
                      ? "translateY(-12px)"
                      : "translateY(0px)",
                    transition:
                      "transform 420ms cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div
                      className="absolute -top-3.5 left-0 right-0 flex justify-center"
                      style={{
                        opacity: isSelected ? 1 : 0.6,
                        transition: "opacity 300ms ease",
                      }}
                    >
                      <span className="rounded-full bg-brand-pink px-3 py-1 text-[10px] font-bold font-display uppercase tracking-wider text-white shadow-md shadow-brand-pink/30">
                        Mais escolhido
                      </span>
                    </div>
                  )}

                  <div
                    className="flex flex-col gap-3 rounded-3xl border p-5 lg:p-6"
                    style={{
                      backgroundColor: isSelected ? "#1D2B4F" : "#FFFFFF",
                      borderColor: isSelected
                        ? "transparent"
                        : "rgba(29,43,79,0.09)",
                      boxShadow: isSelected
                        ? "0 20px 48px -8px rgba(232,23,138,0.28), 0 8px 16px -4px rgba(29,43,79,0.18)"
                        : "0 2px 8px rgba(29,43,79,0.06)",
                      transition:
                        "background-color 350ms ease, border-color 350ms ease, box-shadow 420ms cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  >
                    {/* Emoji + label */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-2xl"
                        style={{
                          transition: "transform 350ms ease",
                          transform: isSelected ? "scale(1.15)" : "scale(1)",
                        }}
                        aria-hidden="true"
                      >
                        {plan.emoji}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-bold font-display uppercase tracking-wider"
                        style={{
                          backgroundColor: isSelected
                            ? "rgba(232,23,138,0.18)"
                            : "rgba(29,43,79,0.06)",
                          color: isSelected ? "#E8178A" : "rgba(29,43,79,0.5)",
                          transition:
                            "background-color 350ms ease, color 350ms ease",
                        }}
                      >
                        {plan.label}
                      </span>
                    </div>

                    {/* Price */}
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-xs font-display font-semibold"
                          style={{
                            color: isSelected
                              ? "rgba(255,255,255,0.5)"
                              : "rgba(29,43,79,0.45)",
                            transition: "color 350ms ease",
                          }}
                        >
                          R$
                        </span>
                        <span
                          className="font-display font-extrabold leading-none"
                          style={{
                            fontSize: isSelected ? "2.5rem" : "2rem",
                            color: isSelected ? "#FFFFFF" : "#1D2B4F",
                            transition:
                              "color 350ms ease, font-size 350ms ease",
                          }}
                        >
                          {plan.price}
                        </span>
                      </div>
                      <p
                        className="mt-0.5 text-xs font-display font-medium"
                        style={{
                          color: isSelected
                            ? "rgba(255,255,255,0.4)"
                            : "rgba(29,43,79,0.4)",
                          transition: "color 350ms ease",
                        }}
                      >
                        por mês · {plan.daily} por dia
                      </p>
                    </div>

                    {/* Impact text */}
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: isSelected
                          ? "rgba(255,255,255,0.6)"
                          : "rgba(29,43,79,0.55)",
                        transition: "color 350ms ease",
                      }}
                    >
                      {plan.impact}
                    </p>

                    {/* CTA */}
                    <div
                      className="mt-1 rounded-xl py-2.5 text-center text-sm font-bold font-display"
                      style={{
                        backgroundColor: isSelected
                          ? "#E8178A"
                          : "rgba(232,23,138,0.08)",
                        color: isSelected ? "#FFFFFF" : "#E8178A",
                        boxShadow: isSelected
                          ? "0 4px 14px rgba(232,23,138,0.35)"
                          : "none",
                        transition:
                          "background-color 350ms ease, color 350ms ease, box-shadow 350ms ease",
                      }}
                    >
                      {isSelected ? "Assinar agora" : "Selecionar"}
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Donate CTA for selected plan */}
        <Reveal direction="up" delay={400} duration={600} blur blurAmount={8}>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <a
              href={MP_MONTHLY_LINKS[selected]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-pink px-10 py-4 text-base font-bold font-display text-white shadow-lg shadow-brand-pink/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-pink/90 hover:shadow-xl hover:shadow-brand-pink/35 active:translate-y-0"
            >
              Assinar R$ {selected}/mês
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="ml-1"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <p className="text-xs text-brand-navy/40">
              🔒 Pagamento seguro · Cancele quando quiser
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
