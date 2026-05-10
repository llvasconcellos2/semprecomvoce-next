import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { StatNumber } from "@/components/StatNumber";
import {
  GlowCardWrapper,
  GlowCard,
  GlowCardContent,
} from "@/components/GlowCard";
import { DonationWidget } from "@/components/DonationWidget";
import Image from "next/image";
import { RevealGroup } from "@/components/RevealGroup";

export const metadata: Metadata = {
  title: "Apoie o Instituto Sempre Com Você",
  description:
    "Faça sua doação e ajude pessoas com câncer e suas famílias. Pix, cartão e boleto — rápido, seguro e transparente.",
  alternates: { canonical: "/apoie" },
  openGraph: {
    title: "Instituto Sempre Com Você",
    description:
      "Faça sua doação e ajude pacientes de câncer e suas famílias.",
    url: "/apoie",
    images: [
      {
        url: "/blog/acao-entre-amigos-a-solidariedade-que-aquece-o-coracao/img-001.jpg",
        alt: "Instituto Sempre Com Você — faça sua doação",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instituto Sempre Com Você",
    description: "Faça sua doação e ajude pacientes de câncer e suas famílias.",
  },
};

// CONFIGURE: Replace with real data from the institute
const stats = [
  { icon: "❤️", value: "1.500+", label: "Pacientes atendidos" },
  { icon: "🏠", value: "400+", label: "Famílias apoiadas" },
  { icon: "📅", value: "14+", label: "Anos de atuação" },
  { icon: "🤝", value: "50+", label: "Voluntários ativos" },
];

const impactCards = [
  {
    icon: "💙",
    title: "Apoio Psicológico",
    desc: "Sessões gratuitas de psicologia e grupos de apoio para pacientes e familiares durante todo o tratamento oncológico.",
  },
  {
    icon: "🚗",
    title: "Transporte & Logística",
    desc: "Ajudamos com o deslocamento para consultas, exames e sessões de quimioterapia e radioterapia.",
  },
  {
    icon: "🎁",
    title: "Materiais de Cuidado",
    desc: "Kits com itens essenciais que facilitam o dia a dia durante o tratamento, entregues com carinho.",
  },
];

// CONFIGURE: Replace with real testimonials from patients and families
const testimonials = [
  {
    quote:
      "Quando meu marido foi diagnosticado, achei que ia desabar. O instituto foi o chão que minha família precisava — cuidaram de nós com tanto amor e dedicação.",
    name: "Fernanda R.",
    role: "Familiar de paciente",
    featured: true,
  },
  {
    quote:
      "Não precisei me preocupar com transporte durante 8 meses de quimioterapia. Isso fez toda a diferença na minha recuperação e no meu ânimo.",
    name: "Carlos M.",
    role: "Paciente",
    featured: false,
  },
  {
    quote:
      "O grupo de apoio psicológico me ensinou que não estava sozinha nessa batalha. Hoje sou voluntária para devolver tudo que recebi.",
    name: "Ana Paula S.",
    role: "Paciente e voluntária",
    featured: false,
  },
];

export default function ApoiePage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative grain overflow-hidden border-b-4 border-brand-pink"
        style={{
          backgroundImage: "url(/cancer/quimioterapia.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionX: "center",
          backgroundPositionY: "70%",
        }}
      >
        <Image
          className="absolute right-0 bottom-0 w-180"
          src="/cancer/paciente.png"
          alt="Mulher com lenço na cabeça"
          width={772}
          height={768}
          loading="eager"
        />

        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-40 -top-40 h-150 w-150 rounded-full bg-brand-pink/12 blur-[130px]" />
          <div className="absolute -bottom-40 -right-20 h-125 w-125 rounded-full bg-brand-blue/10 blur-[130px]" />
        </div>

        <div
          // className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          className="relative mx-auto p-6 pt-26 lg:p-30 lg:pt-53"
        >
          <div className="grid items-center md:grid-cols-2 gap-12 xl:grid-cols-3 lg:gap-6">
            {/* Left: Donation Widget */}
            <Reveal
              direction="right"
              delay={200}
              duration={800}
              blur
              blurAmount={12}
            >
              <DonationWidget />
            </Reveal>

            {/* Right: Text */}
            <RevealGroup
              direction="left"
              duration={800}
              distance={100}
              blur
              blurAmount={12}
              className="flex flex-col gap-6 text-shadow-(--text-shadow-hero)"
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-pink/25 px-4 py-2 text-xs font-bold font-display uppercase tracking-widest text-brand-pink">
                <span className="inline-block h-2 w-2 animate-pulse-dot rounded-full bg-brand-pink" />
                Faça a diferença hoje
              </span>

              <h1 className="font-display font-extrabold leading-[1.05] text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem]">
                Uma doação. <span className="text-brand-pink">Uma vida</span>{" "}
                transformada.
              </h1>

              <p className="max-w-lg text-lg leading-relaxed text-white xl:text-xl">
                O Instituto Sempre Com Você apoia pacientes com câncer e suas
                famílias com suporte emocional, transporte e cuidado. Tudo
                gratuito — graças a pessoas como você.
              </p>

              <ul className="flex flex-col gap-3">
                {[
                  "Apoio psicológico gratuito para pacientes e familiares",
                  "Transporte para consultas, exames e tratamentos",
                  "100% dos recursos destinados diretamente aos pacientes",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-white"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/20 text-xs text-brand-navy text-shadow-none">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/30 pt-3">
                <p className="text-xs text-white/90">
                  Mais de{" "}
                  <span className="font-bold text-brand-pink">1.500 vidas</span>{" "}
                  transformadas desde 2010
                </p>
              </div>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ─── Stats ─────────────────────────────────────────────────── */}
      <section className="bg-brand-pink-light py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-brand-pink/20">
            {stats.map(({ icon, value, label }, i) => (
              <Reveal key={label} delay={i * 100} direction="up" duration={700}>
                <div className="flex flex-col items-center gap-2 px-6 text-center">
                  <span className="text-3xl" aria-hidden="true">
                    {icon}
                  </span>
                  <span className="font-display font-extrabold leading-none text-[2.25rem] text-brand-pink">
                    <StatNumber value={value} duration={1800} />
                  </span>
                  <span className="text-sm font-display font-medium text-brand-navy/60">
                    {label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Impact Cards ──────────────────────────────────────────── */}
      <section className="relative bg-brand-navy grain overflow-hidden py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-20 top-0 h-125 w-125 rounded-full bg-brand-blue/8 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal direction="up" duration={700} blur blurAmount={10}>
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold font-display uppercase tracking-widest text-brand-pink">
                Transparência total
              </p>
              <h2 className="font-display font-extrabold leading-tight text-[2rem] text-white lg:text-[2.75rem]">
                Para onde vai{" "}
                <span className="text-brand-blue">sua doação</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/50">
                Cada real arrecadado é aplicado diretamente em nossos programas
                de apoio — sem intermediários.
              </p>
            </div>
          </Reveal>

          <GlowCardWrapper className="grid gap-5 md:grid-cols-3">
            {impactCards.map(({ icon, title, desc }) => (
              <GlowCard key={title}>
                <GlowCardContent className="flex h-full min-h-55 flex-col gap-4 p-7">
                  <span className="text-4xl" aria-hidden="true">
                    {icon}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white">
                    {title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-white/55">
                    {desc}
                  </p>
                </GlowCardContent>
              </GlowCard>
            ))}
          </GlowCardWrapper>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────────────── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal direction="up" duration={700} blur blurAmount={10}>
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold font-display uppercase tracking-widest text-brand-pink">
                Histórias reais
              </p>
              <h2 className="font-display font-extrabold leading-tight text-[2rem] text-brand-navy lg:text-[2.75rem]">
                Vidas que{" "}
                <span className="text-brand-pink">você pode transformar</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map(({ quote, name, role, featured }, i) => (
              <Reveal
                key={name}
                delay={i * 150}
                direction="up"
                duration={700}
                blur
                blurAmount={8}
              >
                <div
                  className={`flex h-full flex-col gap-5 rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 ${
                    featured
                      ? "bg-brand-navy text-white"
                      : "bg-brand-pink-light text-brand-navy"
                  }`}
                >
                  {/* Quote icon */}
                  <svg
                    viewBox="0 0 40 32"
                    width="36"
                    height="28"
                    fill="none"
                    aria-hidden="true"
                    className={
                      featured ? "text-brand-pink/45" : "text-brand-pink/25"
                    }
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 18.286V32h16V18.286C16 8.184 9.6 1.143 0 0v5.714c5.6 1.143 8 4.572 8 12.572H0zm24 0V32h16V18.286C40 8.184 33.6 1.143 24 0v5.714c5.6 1.143 8 4.572 8 12.572H24z"
                      fill="currentColor"
                    />
                  </svg>

                  <p
                    className={`flex-1 text-base leading-[1.8] ${
                      featured ? "text-white/80" : "text-brand-navy/65"
                    }`}
                  >
                    {quote}
                  </p>

                  <div
                    className={`flex items-center gap-3 border-t pt-4 ${
                      featured ? "border-white/10" : "border-brand-pink/15"
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-pink/20 text-base font-bold font-display text-brand-pink">
                      {name[0]}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-display font-semibold ${
                          featured ? "text-white" : "text-brand-navy"
                        }`}
                      >
                        {name}
                      </p>
                      <p
                        className={`text-xs ${
                          featured ? "text-white/50" : "text-brand-navy/50"
                        }`}
                      >
                        {role}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-pink grain py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 h-100 w-100 rounded-full bg-white/10 blur-[100px]" />
          <div className="absolute -bottom-20 -left-10 h-75 w-75 rounded-full bg-brand-navy/15 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-2xl px-6 text-center lg:px-8">
          <Reveal direction="up" duration={700} blur blurAmount={10}>
            <p className="mb-4 text-xs font-bold font-display uppercase tracking-widest text-white/60">
              Sua vez
            </p>
            <h2 className="mb-5 font-display font-extrabold leading-[1.1] text-[2rem] text-white lg:text-[3rem]">
              Seja parte desta história de amor.
            </h2>
            <p className="mx-auto mb-10 max-w-md text-lg text-white/70">
              Cada doação, grande ou pequena, faz uma diferença real na vida de
              alguém com câncer.
            </p>
            <a
              href="#hero"
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-base font-bold font-display text-brand-pink transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-xl hover:shadow-brand-navy/20 active:translate-y-0"
            >
              Fazer minha doação agora
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
