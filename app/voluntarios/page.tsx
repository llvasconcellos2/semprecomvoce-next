import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { RevealGroup } from "@/components/RevealGroup";
import GradientBackground from "@/components/backgrounds/GradientBackground";
import ActionButton from "@/components/ActionButton";

export const metadata: Metadata = {
  title: "Seja Voluntário — Instituto Sempre Com Você",
  description:
    "Doe seu tempo e conhecimento para transformar vidas. Junte-se aos voluntários do Instituto Sempre Com Você e faça parte dessa corrente do bem.",
  openGraph: {
    title: "Seja Voluntário — Instituto Sempre Com Você",
    description:
      "Doe seu tempo e conhecimento para transformar vidas. Junte-se aos voluntários do Instituto Sempre Com Você.",
    url: "/voluntarios",
  },
  alternates: { canonical: "/voluntarios" },
};

type Accent = "blue" | "pink" | "orange" | "purple" | "green";

const areas: {
  icon: string;
  title: string;
  description: string;
  accent: Accent;
}[] = [
  {
    icon: "🤝",
    title: "Assistência Social",
    description:
      "Apoie pacientes no acesso a benefícios, documentação e recursos sociais essenciais para quem está em tratamento.",
    accent: "blue",
  },
  {
    icon: "💛",
    title: "Apoio Familiar",
    description:
      "Esteja ao lado das famílias com escuta ativa, presença e acolhimento. Um olhar cuidadoso muda tudo.",
    accent: "pink",
  },
  {
    icon: "🩺",
    title: "Trabalhadores da Saúde",
    description:
      "Médicos, enfermeiros e psicólogos podem oferecer orientação especializada e suporte técnico ao nosso time.",
    accent: "green",
  },
  {
    icon: "🚗",
    title: "Transporte e Logística",
    description:
      "Ajude pacientes a chegarem às consultas e tratamentos. Um trajeto pode ser a diferença entre se cuidar ou não.",
    accent: "orange",
  },
  {
    icon: "📢",
    title: "Marketing",
    description:
      "Use sua criatividade para ampliar a voz do Instituto: redes sociais, campanhas, design e comunicação com propósito.",
    accent: "purple",
  },
  {
    icon: "💰",
    title: "Captação de Recursos",
    description:
      "Contribua para a sustentabilidade do Instituto através de campanhas, parcerias e iniciativas de arrecadação.",
    accent: "blue",
  },
  {
    icon: "📊",
    title: "Administrativo e Financeiro",
    description:
      "Sua experiência em gestão, finanças ou administração fortalece nossa capacidade de ajudar cada vez mais pessoas.",
    accent: "green",
  },
];

const galleryPhotos = [
  {
    src: "/blog/casa-cheia-ex-pacientes-que-viraram-voluntarios/img-001.jpg",
    alt: "Casa cheia com ex-pacientes voluntários reunidos no Instituto",
    width: 529,
    height: 705,
  },
  {
    src: "/blog/casa-cheia-ex-pacientes-que-viraram-voluntarios/img-002.jpg",
    alt: "Grupo de voluntários que foram pacientes e hoje ajudam outros em tratamento",
    width: 563,
    height: 751,
  },
  {
    src: "/blog/casa-cheia-ex-pacientes-que-viraram-voluntarios/img-003.jpg",
    alt: "Momento de gratidão e celebração com os ex-pacientes voluntários do Instituto",
    width: 1600,
    height: 1200,
  },
  {
    src: "/blog/luto-que-vira-amor-samuel-e-juvelino-transformam-a-dor-em-voluntariado/img-001.jpg",
    alt: "Samuel e Juvelino, que perderam esposas para o câncer e hoje são voluntários do Instituto",
    width: 633,
    height: 844,
  },
  {
    src: "/blog/luto-que-vira-amor-samuel-e-juvelino-transformam-a-dor-em-voluntariado/img-002.jpg",
    alt: "Encontro de Samuel e Juvelino no Instituto Sempre Com Você como voluntários",
    width: 680,
    height: 907,
  },
  {
    src: "/blog/antes-pacientes-agora-voluntarios-alceu-e-eloi-inspiram-o-instituto/img-001.jpg",
    alt: "Alceu e Eloi, antes pacientes e hoje voluntários do Instituto Sempre Com Você",
    width: 900,
    height: 1600,
  },
  {
    src: "/blog/cecilia-de-paciente-a-voluntaria-superamos-juntas/img-001.jpg",
    alt: "Cecília, voluntária e ex-paciente do Instituto, segurando placa de apoio à causa",
    width: 900,
    height: 1600,
  },
];

export default function VoluntariosPage() {
  return (
    <>
      {/* ─────────────────────────────────────────
          1. HERO
      ───────────────────────────────────────── */}
      <section className="relative bg-brand-blue-light overflow-hidden pt-20">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-blue/10 blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-brand-pink/8 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Two-column grid — both mobile and desktop */}
          <div className="grid grid-cols-2 lg:gap-16 items-end min-h-80 lg:min-h-140">
            {/* Left: Text */}
            <RevealGroup
              blur
              blurAmount={10}
              duration={700}
              stagger={150}
              className="flex flex-col gap-3 lg:gap-6 pb-8 lg:pb-20"
            >
              {/* Badge — desktop only */}
              <div className="hidden lg:inline-flex items-center gap-2 bg-brand-blue/15 text-brand-blue text-[11px] font-bold font-display px-4 py-2 rounded-full w-fit tracking-[0.12em] uppercase">
                ✨ Seja Voluntário
              </div>

              {/* Headline */}
              <h1 className="font-display font-extrabold text-[1.5rem] sm:text-[2rem] lg:text-[3.5rem] xl:text-[4.25rem] text-brand-navy leading-[1.05] tracking-tight">
                Doe seu
                <br />
                tempo.
                <br />
                <span className="text-brand-pink">Transforme</span>
                <br />
                vidas.
              </h1>

              {/* Description — desktop only */}
              <p className="hidden lg:block text-brand-navy/65 text-lg leading-[1.75] max-w-md">
                Voluntariar-se no Instituto é escolher estar ao lado de quem
                mais precisa. Cada hora doada muda histórias e aquece o coração
                de quem enfrenta o câncer.
              </p>

              {/* CTA — desktop only */}
              <div className="hidden lg:block">
                <ActionButton href="#" boxClassName="w-fit">
                  Quero me voluntariar
                </ActionButton>
              </div>
            </RevealGroup>

            {/* Right: Image */}
            <Reveal
              blur
              blurAmount={12}
              direction="left"
              duration={700}
              distance={40}
              className="self-end flex items-end justify-center lg:justify-end"
            >
              <Image
                src="/cancer/voluntario.png"
                alt="Voluntária do Instituto Sempre Com Você cuidando de paciente"
                width={848}
                height={1105}
                className="h-52 sm:h-64 lg:h-[500px] w-auto object-contain object-bottom"
                priority
              />
            </Reveal>
          </div>

          {/* Mobile-only: description + CTA below the grid */}
          <div className="lg:hidden pb-10 pt-2">
            <Reveal blur blurAmount={8} duration={600} delay={200}>
              <p className="text-brand-navy/65 text-base leading-[1.75] mb-6">
                Voluntariar-se no Instituto é escolher estar ao lado de quem
                mais precisa. Cada hora doada muda histórias e aquece o coração
                de quem enfrenta o câncer.
              </p>
              <ActionButton href="#">Quero me voluntariar</ActionButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          2. POR QUE SER VOLUNTÁRIO?
      ───────────────────────────────────────── */}
      <section className="py-28 lg:py-36 bg-white relative z-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <RevealGroup
            className="text-center mb-16"
            stagger={120}
            blur
            blurAmount={10}
            duration={700}
          >
            <div className="text-brand-pink text-[11px] font-bold font-display tracking-[0.18em] uppercase mb-4">
              Por que ser voluntário?
            </div>
            <h2 className="font-display font-extrabold text-[2.25rem] xl:text-[3rem] text-brand-navy leading-[1.08] tracking-tight">
              Um trabalho que
              <br />
              transforma quem ajuda
            </h2>
          </RevealGroup>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start mb-20">
            <Reveal direction="right" duration={700} blur blurAmount={8}>
              <p className="text-brand-navy/70 text-lg leading-[1.8]">
                Ser voluntário no Instituto Sempre Com Você é muito mais do que
                dedicar horas — é mergulhar em uma experiência profundamente
                humana. Cada visita, cada conversa, cada transporte para uma
                consulta carrega o peso de algo que realmente importa.
              </p>
            </Reveal>
            <Reveal
              direction="left"
              duration={700}
              blur
              blurAmount={8}
              delay={150}
            >
              <p className="text-brand-navy/70 text-lg leading-[1.8]">
                Pesquisas mostram que voluntários relatam maior sensação de
                propósito, redução do estresse e crescimento pessoal
                significativo. No Instituto, isso se traduz em histórias de
                cura — não só dos pacientes, mas também de quem cuida.
              </p>
            </Reveal>
          </div>

          {/* 3 highlight stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: "🌟",
                stat: "7 áreas",
                label: "de atuação para você escolher",
              },
              {
                icon: "💜",
                stat: "+100 famílias",
                label: "beneficiadas a cada mês",
              },
              {
                icon: "🕊️",
                stat: "13 anos",
                label: "de cuidado e transformação",
              },
            ].map((item, i) => (
              <Reveal
                key={item.stat}
                delay={i * 120}
                duration={700}
                blur
                blurAmount={8}
              >
                <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-brand-blue-light gap-3">
                  <span className="text-4xl">{item.icon}</span>
                  <div className="font-display font-extrabold text-2xl text-brand-navy">
                    {item.stat}
                  </div>
                  <div className="text-brand-navy/55 text-sm leading-relaxed">
                    {item.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          3. NO QUE AJUDAR?
      ───────────────────────────────────────── */}
      <section className="py-28 lg:py-36 relative z-10 grain overflow-hidden">
        <GradientBackground />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-pink/6 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <RevealGroup
            className="text-center max-w-2xl mx-auto mb-16"
            stagger={120}
            blur
            blurAmount={10}
            duration={700}
          >
            <div className="text-brand-pink text-[11px] font-bold font-display tracking-[0.18em] uppercase mb-4">
              Voluntariado
            </div>
            <h2 className="font-display font-extrabold text-[2.5rem] xl:text-[3rem] text-brand-navy leading-[1.08] tracking-tight">
              No que ajudar?
            </h2>
            <p className="text-brand-navy/60 text-lg mt-5 leading-[1.75]">
              Cada habilidade importa. Encontre a área onde o seu talento pode
              fazer a maior diferença.
            </p>
          </RevealGroup>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {areas.map((area, index) => (
              <Reveal
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 100}
                key={area.title}
                className={`bg-white rounded-3xl p-8 flex flex-col gap-5
                  hover:-translate-y-1.5 transition-all duration-300 hover:shadow-2xl
                  ${area.accent === "blue" ? "hover:shadow-brand-blue/[0.14] hover:border hover:border-brand-blue" : ""}
                  ${area.accent === "pink" ? "hover:shadow-brand-pink/[0.14] hover:border hover:border-brand-pink" : ""}
                  ${area.accent === "orange" ? "hover:shadow-brand-orange/[0.14] hover:border hover:border-brand-orange" : ""}
                  ${area.accent === "purple" ? "hover:shadow-brand-purple/[0.14] hover:border hover:border-brand-purple" : ""}
                  ${area.accent === "green" ? "hover:shadow-brand-green/[0.14] hover:border hover:border-brand-green" : ""}
                `}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0
                    ${area.accent === "blue" ? "bg-brand-blue/20" : ""}
                    ${area.accent === "pink" ? "bg-brand-pink/15" : ""}
                    ${area.accent === "orange" ? "bg-brand-orange/20" : ""}
                    ${area.accent === "purple" ? "bg-brand-purple/20" : ""}
                    ${area.accent === "green" ? "bg-brand-green/20" : ""}
                  `}
                >
                  {area.icon}
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="font-display font-bold text-[1.125rem] text-brand-navy leading-snug">
                    {area.title}
                  </h3>
                  <p className="text-brand-navy/58 text-sm leading-relaxed flex-1">
                    {area.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          4. GRATIDÃO
      ───────────────────────────────────────── */}
      <section className="py-28 lg:py-36 bg-brand-pink-light relative z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-80 rounded-full bg-brand-pink/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <RevealGroup
            className="text-center max-w-2xl mx-auto mb-16"
            stagger={120}
            blur
            blurAmount={10}
            duration={700}
          >
            <div className="text-brand-pink text-[11px] font-bold font-display tracking-[0.18em] uppercase mb-4">
              Obrigado
            </div>
            <h2 className="font-display font-extrabold text-[2.5rem] xl:text-[3rem] text-brand-navy leading-[1.08] tracking-tight">
              Gratidão aos
              <br />
              nossos voluntários
            </h2>
            <p className="text-brand-navy/60 text-lg mt-5 leading-[1.75]">
              Cada voluntário que passou pelo Instituto deixou uma marca
              permanente — nos nossos corações e nos de quem atendemos.
            </p>
          </RevealGroup>

          {/* Quotes */}
          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            {[
              {
                quote:
                  "Quando eu precisei, o Instituto estava lá. Hoje, ser voluntário é a forma mais bonita de devolver o que recebi. Cada vez que ajudo alguém, lembro da jornada que percorri — e sinto que valeu cada passo.",
                author: "Alceu",
                role: "Ex-paciente e voluntário",
              },
              {
                quote:
                  "Perdi minha companheira para o câncer, mas encontrei neste Instituto uma razão para seguir em frente. Ser voluntário me trouxe paz, propósito e uma família. Venho aqui e sempre saio mais leve.",
                author: "Samuel",
                role: "Voluntário e familiar",
              },
            ].map((item, i) => (
              <Reveal
                key={item.author}
                direction={i === 0 ? "right" : "left"}
                duration={700}
                delay={i * 150}
                blur
                blurAmount={8}
                className="bg-white rounded-3xl p-8 lg:p-10 flex flex-col gap-6"
              >
                <svg
                  width="40"
                  height="32"
                  viewBox="0 0 40 32"
                  fill="none"
                  aria-hidden="true"
                  className="text-brand-pink shrink-0"
                >
                  <path
                    d="M0 32V19.2C0 14.1333 1.2 9.6 3.6 5.6C6.13333 1.6 10 0 15.2 0L17.6 4C14.4 4.26667 11.8667 5.6 10 8C8.26667 10.2667 7.4 12.8 7.4 15.6H14V32H0ZM22.4 32V19.2C22.4 14.1333 23.6 9.6 26 5.6C28.5333 1.6 32.4 0 37.6 0L40 4C36.8 4.26667 34.2667 5.6 32.4 8C30.6667 10.2667 29.8 12.8 29.8 15.6H36.4V32H22.4Z"
                    fill="currentColor"
                    opacity="0.25"
                  />
                </svg>
                <p className="text-brand-navy/75 text-lg leading-[1.8] flex-1 italic">
                  {item.quote}
                </p>
                <div className="border-t border-brand-pink/20 pt-6">
                  <div className="font-display font-bold text-brand-navy">
                    {item.author}
                  </div>
                  <div className="text-sm text-brand-pink mt-0.5">
                    {item.role}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Photo gallery — masonry columns */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
            {galleryPhotos.map((photo, i) => (
              <Reveal
                key={photo.src}
                delay={i * 80}
                duration={600}
                blur
                blurAmount={6}
                className="break-inside-avoid mb-4"
              >
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="w-full h-auto object-cover hover:scale-105 transition-[transform] duration-500"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          5. CTA
      ───────────────────────────────────────── */}
      <section className="py-28 lg:py-36 bg-brand-navy relative overflow-hidden grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-pink/12 blur-[130px]" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-blue/10 blur-[130px]" />
        </div>

        <RevealGroup
          className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center"
          stagger={150}
          blur
          blurAmount={10}
          duration={700}
        >
          <div className="inline-flex items-center gap-2 bg-white/8 text-white text-[11px] font-bold font-display px-4 py-2 rounded-full mb-8 tracking-[0.12em] uppercase">
            ✨ Faça parte do nosso time
          </div>

          <h2 className="font-display font-extrabold text-[2.75rem] xl:text-[4rem] text-white! leading-[1.05] tracking-tight mb-5">
            Pronto para
            <br />
            <span className="text-brand-pink">transformar vidas?</span>
          </h2>

          <p className="text-white/55 text-xl leading-[1.75] mb-10 max-w-xl mx-auto">
            Preencha o formulário de cadastro e nossa equipe entrará em contato
            para apresentar as oportunidades de voluntariado.
          </p>

          <div className="flex justify-center">
            <ActionButton
              href="#"
              className="px-12 text-base text-center"
              boxClassName="inline-block"
            >
              Quero me cadastrar como voluntário
            </ActionButton>
          </div>

          <p className="text-white/25 text-xs tracking-wide mt-8">
            Instituto Sempre Com Você · ONG registrada · Voluntários fazem a
            diferença todos os dias.
          </p>
        </RevealGroup>
      </section>
    </>
  );
}
