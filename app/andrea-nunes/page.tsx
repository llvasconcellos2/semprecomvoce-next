import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { RevealGroup } from "@/components/RevealGroup";

export const metadata: Metadata = {
  title: "Andrea Nunes — Instituto do Câncer Sempre Com Você",
  description:
    "A história de superação da fundadora Andrea Nunes e como sua jornada pessoal de perdas e recomeços deu origem ao Instituto do Câncer Sempre Com Você.",
  openGraph: {
    title: "Andrea Nunes — Instituto do Câncer Sempre Com Você",
    description:
      "A história de superação da fundadora Andrea Nunes e como sua jornada pessoal de perdas e recomeços deu origem ao Instituto do Câncer Sempre Com Você.",
    url: "/andrea-nunes",
  },
  alternates: { canonical: "/andrea-nunes" },
};

function DateMarker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-2.5 h-2.5 rounded-full bg-brand-pink shrink-0" />
      <span className="font-display font-bold text-[11px] tracking-[0.18em] uppercase text-brand-pink">
        {children}
      </span>
      <div className="flex-1 h-px bg-brand-pink/20" />
    </div>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 lg:my-14 pl-6 border-l-4 border-brand-pink">
      <p className="font-display font-semibold text-[1.35rem] lg:text-[1.6rem] text-brand-navy leading-[1.45] italic">
        {children}
      </p>
    </blockquote>
  );
}

export default function AndreaNunesPage() {
  return (
    <>
      {/* ─────────────────────────────────────────
          HERO
      ───────────────────────────────────────── */}
      <section className="relative bg-brand-navy overflow-hidden pt-20 xl:pt-28">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-125 h-125 rounded-full bg-brand-pink/10 blur-[130px]" />
          <div className="absolute -bottom-24 right-0 w-100 h-100 rounded-full bg-brand-blue/8 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Two-column grid */}
          <div className="grid grid-cols-[1fr_180px] lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_480px] lg:gap-16 min-h-50 lg:min-h-140">
            {/* Left: Text */}
            <RevealGroup
              stagger={150}
              blur
              blurAmount={12}
              duration={800}
              className="flex flex-col gap-3 lg:gap-6 pb-0 pt-6 pl-4 lg:pl-8 xl:pl-12 justify-center lg:pb-8 xl:pb-14"
            >
              <div className="hidden lg:inline-flex items-center gap-2 bg-white/8 text-white/70! text-[11px] font-bold font-display px-4 py-2 rounded-full w-fit tracking-[0.14em] uppercase">
                Fundadora &amp; Diretora
              </div>

              <h1 className="font-display font-extrabold text-[1.9rem] sm:text-[2.4rem] lg:text-[4rem] xl:text-[5.25rem] text-white! leading-none tracking-tight">
                Andrea
                <br />
                <span className="text-brand-pink">Nunes</span>
              </h1>

              <p className="hidden lg:block text-white/60! text-lg xl:text-xl leading-[1.8] max-w-md">
                A história de uma mulher que atravessou a dor mais funda e
                encontrou, do outro lado, um propósito maior do que si mesma.
              </p>
            </RevealGroup>

            {/* Right: Andrea's photo */}
            <Reveal
              blur
              blurAmount={12}
              direction="left"
              duration={700}
              distance={40}
              className="self-end flex items-end justify-end"
            >
              <Image
                src="/andrea.png"
                alt="Andrea Nunes, fundadora e diretora do Instituto do Câncer Sempre Com Você"
                width={480}
                height={640}
                className="h-40 lg:h-125 xl:h-140 w-auto object-contain object-bottom mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                priority
              />
            </Reveal>
          </div>

          {/* Mobile-only: description below grid */}
          <div className="lg:hidden pb-10 pt-2 px-4">
            <Reveal blur blurAmount={8} duration={600} delay={200}>
              <p className="text-white/60! text-base leading-[1.75]">
                A história de uma mulher que atravessou a dor mais funda e
                encontrou, do outro lado, um propósito maior do que si mesma.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          OPENING QUOTE + INTRO
      ───────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <Reveal blur blurAmount={10} duration={700}>
            <blockquote className="mb-14">
              <svg
                width="36"
                height="28"
                viewBox="0 0 40 32"
                fill="none"
                aria-hidden="true"
                className="text-brand-pink mb-4"
              >
                <path
                  d="M0 32V19.2C0 14.1333 1.2 9.6 3.6 5.6C6.13333 1.6 10 0 15.2 0L17.6 4C14.4 4.26667 11.8667 5.6 10 8C8.26667 10.2667 7.4 12.8 7.4 15.6H14V32H0ZM22.4 32V19.2C22.4 14.1333 23.6 9.6 26 5.6C28.5333 1.6 32.4 0 37.6 0L40 4C36.8 4.26667 34.2667 5.6 32.4 8C30.6667 10.2667 29.8 12.8 29.8 15.6H36.4V32H22.4Z"
                  fill="currentColor"
                  opacity="0.35"
                />
              </svg>
              <p className="font-display font-bold text-[1.7rem] lg:text-[2.2rem] text-brand-navy leading-[1.35] tracking-tight">
                Foi trabalhando com obituários que cheguei à conclusão: os vivos
                precisavam muito mais de mim.
              </p>
              <footer className="mt-5 text-brand-pink font-display font-semibold text-sm tracking-wide uppercase">
                — Andrea Nunes
              </footer>
            </blockquote>
          </Reveal>

          <Reveal blur blurAmount={8} duration={700} delay={100}>
            <p className="text-brand-navy/70 text-lg leading-[1.85]">
              Andrea Nunes não escolheu o caminho do cuidado por acidente. Ela
              chegou até ele carregando nas costas a experiência de quem já
              perdeu, de quem atravessou o deserto da dor e encontrou, do outro
              lado, um propósito maior do que si mesma.
            </p>
          </Reveal>

          <Reveal blur blurAmount={8} duration={700} delay={200}>
            <p className="text-brand-navy/70 text-lg leading-[1.85] mt-5">
              Antes de fundar o Instituto do Câncer Sempre Com Você, ela
              trabalhava com obituários — redigindo as últimas palavras sobre
              vidas que haviam se encerrado. E foi exatamente ali, entre nomes,
              datas e famílias em luto, que a clareza chegou: havia uma carência
              enorme de apoio psicológico e orientação jurídica para quem ainda
              vivia, para os pacientes e suas famílias que enfrentavam o câncer
              praticamente sozinhos.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SECTION 1 — O INÍCIO
      ───────────────────────────────────────── */}
      <section className="bg-brand-blue-light py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <RevealGroup stagger={120} blur blurAmount={10} duration={700}>
            <DateMarker>28 de agosto de 2010</DateMarker>

            <h2 className="font-display font-extrabold text-[2rem] lg:text-[2.75rem] text-brand-navy leading-[1.1] tracking-tight mb-8">
              O começo de tudo —{" "}
              <span className="text-brand-blue">
                ou o que parecia ser o fim
              </span>
            </h2>

            <p className="text-brand-navy/70 text-lg leading-[1.85]">
              A memória daquele dia permanece nítida para Andrea, com a textura
              de algo que mudou tudo. Era o aniversário de 18 anos de Aline, sua
              filha amada. Ela havia organizado cada detalhe da festa com
              carinho — o bolo, a decoração, os convidados.
            </p>

            <p className="text-brand-navy/70 text-lg leading-[1.85] mt-5">
              Mas ao chegar ao local, se deparou com rostos que nunca havia
              imaginado: piercings, alargadores na orelha, aqueles{" "}
              <em>"pregos na língua"</em> que ela nunca entendera. E Aline, com
              os olhos brilhando de certeza, anunciou que queria ser tatuadora.
            </p>
          </RevealGroup>
        </div>

        <div className="max-w-2xl mx-auto px-6 lg:px-8 mt-10">
          <Reveal blur blurAmount={8} duration={700}>
            <PullQuote>
              "Eu era muito preconceituosa em relação a isso. Para mim, aquilo
              parecia ser o fim."
            </PullQuote>
          </Reveal>

          <Reveal blur blurAmount={8} duration={700}>
            <p className="text-brand-navy/70 text-lg leading-[1.85]">
              Andrea sorri ao contar hoje. Porque ela sabe, com a clareza de
              quem viveu muito, que o episódio com Aline foi apenas um susto. O
              que viria dois dias depois é que mudaria tudo para sempre.
            </p>
          </Reveal>
        </div>

        {/* foto-2.jpeg — portrait photo of Andrea */}
        <div className="max-w-lg mx-auto px-6 lg:px-8 mt-12">
          <Reveal
            blur
            blurAmount={8}
            duration={700}
            direction="up"
            distance={30}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-brand-navy/10">
              <Image
                src="/andrea-nunes/foto-2.jpeg"
                alt="Nelson Speedman, esposo de Andrea Nunes"
                width={872}
                height={1080}
                className="w-full h-auto object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SECTION 2 — MORTE DO ESPOSO
      ───────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <RevealGroup stagger={120} blur blurAmount={10} duration={700}>
            <DateMarker>30 de agosto de 2010</DateMarker>

            <h2 className="font-display font-extrabold text-[2rem] lg:text-[2.75rem] text-brand-navy leading-[1.1] tracking-tight mb-8">
              Adeus, <span className="text-brand-pink">Nelson Speedman</span>
            </h2>

            <p className="text-brand-navy/70 text-lg leading-[1.85]">
              Dois dias depois, o fim que ela havia imaginado na festa da filha
              ganhou um rosto real. Nelson Speedman — seu amado esposo —
              faleceu.
            </p>

            <p className="text-brand-navy/70 text-lg leading-[1.85] mt-5">
              Andrea ficou diante de um vazio que nenhuma palavra consegue
              preencher. Dois dias: do susto de mãe à dor mais funda de uma
              viúva. O mundo que ela conhecia havia chegado ao fim de verdade.
            </p>
          </RevealGroup>

          <Reveal blur blurAmount={8} duration={700} delay={200}>
            <PullQuote>
              "Adeus, criador de curió. Adeus, meu marido — e a Deus, Nelson
              Speedman."
            </PullQuote>
          </Reveal>

          <Reveal blur blurAmount={8} duration={700} delay={300}>
            <p className="text-brand-navy/70 text-lg leading-[1.85]">
              Não era apenas uma expressão: Nelson Speedman era associado da
              ACCJ — a Associação de Criadores de Curíos de Joinville. O pequeno
              pássaro canoro era sua paixão, e Andrea escolheu honrar isso nas
              últimas palavras que lhe dedicou. Uma memória que cabe numa
              carteirinha e que nenhum luto consegue apagar.
            </p>
          </Reveal>
        </div>

        {/* curiooo.jpg — the curió bird */}
        <div className="max-w-2xl mx-auto px-6 lg:px-8 mt-12">
          <Reveal
            blur
            blurAmount={8}
            duration={700}
            direction="up"
            distance={30}
          >
            <div className="rounded-3xl overflow-hidden shadow-xl shadow-brand-navy/8">
              <Image
                src="/andrea-nunes/curiooo.jpg"
                alt="Carteirinha de Nelson Speedman na Associação de Criadores de Curíos de Joinville (ACCJ)"
                width={581}
                height={392}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-center text-brand-navy/40 text-sm mt-3 italic">
              A carteirinha de Nelson na ACCJ — ele era criador de curíos em
              Joinville
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SECTION 3 — DEPRESSÃO
      ───────────────────────────────────────── */}
      <section className="bg-brand-pink-light py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <RevealGroup stagger={120} blur blurAmount={10} duration={700}>
            <DateMarker>2010 – 2013</DateMarker>

            <h2 className="font-display font-extrabold text-[2rem] lg:text-[2.75rem] text-brand-navy leading-[1.1] tracking-tight mb-8">
              Os três anos{" "}
              <span className="text-brand-pink">mais difíceis</span>
            </h2>

            <p className="text-brand-navy/70 text-lg leading-[1.85]">
              Do outono de 2010 até meados de 2013, Andrea viveu o que ela mesma
              descreve sem rodeios: uma depressão profunda.{" "}
              <em>"Não tinha vontade nem mesmo de viver."</em> Uma frase curta,
              pesada, que carrega o peso de uma dor que muita gente conhece mas
              poucos conseguem nomear com essa honestidade.
            </p>

            <p className="text-brand-navy/70 text-lg leading-[1.85] mt-5">
              Quem cuida de pacientes de câncer aprende a reconhecer esse lugar.
              Andrea o conheceu por dentro. Essa experiência — desumanizante e
              solitária — tornaria sua empatia algo diferente do comum: ela não
              simpatiza com a dor dos seus assistidos; ela a reconhece. Já
              esteve lá.
            </p>

            <p className="text-brand-navy/70 text-lg leading-[1.85] mt-5">
              A saída veio de uma decisão pequena: entrar no coral de uma
              congregação. Novos rostos, novas amizades, um ritmo semanal que
              devolvia um pouco de sentido aos dias. Mas a vida tem o hábito de
              nos testar onde menos esperamos. Conflitos internos, a inveja que
              existe em qualquer ambiente, uma perseguição que a desgastou até o
              ponto de partir.
            </p>
          </RevealGroup>
        </div>

        {/* coralandreia.jpeg — Andrea with the choir */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-12">
          <Reveal
            blur
            blurAmount={8}
            duration={700}
            direction="up"
            distance={30}
          >
            <div className="rounded-3xl overflow-hidden shadow-xl shadow-brand-pink/10">
              <Image
                src="/andrea-nunes/coralandreia.jpeg"
                alt="Andrea Nunes no coral da congregação, onde encontrou amigos e buscou se recuperar da depressão"
                width={960}
                height={421}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-center text-brand-navy/40 text-sm mt-3 italic">
              No coral da congregação — amizades que ajudaram a reconstruir
            </p>
          </Reveal>
        </div>

        <div className="max-w-2xl mx-auto px-6 lg:px-8 mt-12">
          <Reveal blur blurAmount={8} duration={700}>
            <p className="text-brand-navy/70 text-lg leading-[1.85]">
              Ela saiu do coral. E foi exatamente nesse momento de recomeço que
              o caminho se abriu.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SECTION 4 — PROGRAMA NA TV
      ───────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <RevealGroup stagger={120} blur blurAmount={10} duration={700}>
            <DateMarker>Janeiro de 2014</DateMarker>

            <h2 className="font-display font-extrabold text-[2rem] lg:text-[2.75rem] text-brand-navy leading-[1.1] tracking-tight mb-8">
              A câmera, o microfone{" "}
              <span className="text-brand-blue">e um chamado</span>
            </h2>

            <p className="text-brand-navy/70 text-lg leading-[1.85]">
              Em janeiro de 2014, Andrea estreou o programa{" "}
              <strong className="font-semibold text-brand-navy">
                "Sempre Com Você"
              </strong>{" "}
              na TV Brasil Esperança de Joinville. Uma câmera, um microfone e
              uma mulher que havia atravessado os piores anos da própria vida e
              chegado do outro lado com algo importante a dizer.
            </p>

            <p className="text-brand-navy/70 text-lg leading-[1.85] mt-5">
              O programa foi o embrião do instituto. Cada história que ela ouvia
              confirmava o que já havia percebido nos obituários: havia
              pacientes com câncer e famílias inteiras que enfrentavam o
              diagnóstico sem apoio emocional, sem orientação jurídica, sem
              alguém que simplesmente os visse. Que perguntasse:{" "}
              <em>como você está de verdade?</em>
            </p>
          </RevealGroup>
        </div>

        {/* andreia-tv.jpeg — Andrea on TV */}
        <div className="max-w-sm mx-auto px-6 lg:px-8 mt-12">
          <Reveal
            blur
            blurAmount={8}
            duration={700}
            direction="up"
            distance={30}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-brand-navy/12">
              <Image
                src="/andrea-nunes/andreia-tv.jpeg"
                alt="Andrea Nunes apresentando o programa Sempre Com Você na TV Brasil Esperança de Joinville"
                width={379}
                height={693}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-center text-brand-navy/40 text-sm mt-3 italic">
              Programa "Sempre Com Você" — TV Brasil Esperança de Joinville
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SECTION 5 — NASCE O INSTITUTO
      ───────────────────────────────────────── */}
      <section className="bg-brand-navy py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/3 w-125 h-125 rounded-full bg-brand-pink/8 blur-[150px]" />
          <div className="absolute -bottom-32 right-0 w-100 h-100 rounded-full bg-brand-blue/8 blur-[130px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8">
          <RevealGroup stagger={150} blur blurAmount={12} duration={800}>
            <div className="text-brand-pink text-[11px] font-bold font-display tracking-[0.18em] uppercase mb-8">
              O propósito que nasceu da dor
            </div>

            <h2 className="font-display font-extrabold text-[2.25rem] lg:text-[3.25rem] text-white! leading-[1.1] tracking-tight mb-8">
              Nasce o Instituto do Câncer{" "}
              <span className="text-brand-pink">Sempre Com Você</span>
            </h2>

            <p className="text-white/65! text-lg leading-[1.85]">
              Da certeza que nasceu entre linhas de obituário e floresceu numa
              tela de TV, surgiu o Instituto do Câncer Sempre Com Você. Andrea
              Nunes transformou a própria dor em estrutura de cuidado. Porque
              ela sabe, como poucos fundadores sabem, que o câncer não destrói
              apenas células — destrói projetos, relacionamentos, contas
              bancárias, a autoestima, o senso de futuro.
            </p>

            <p className="text-white/65! text-lg leading-[1.85] mt-5">
              E é exatamente nesse espaço — entre o diagnóstico e a vida que
              ainda pode ser vivida — que o instituto atua. Com apoio emocional,
              orientação jurídica, assistência social e a presença de quem não
              se afasta quando o assunto é difícil.
            </p>

            <div className="mt-12 pt-10 border-t border-white/10">
              <blockquote>
                <p className="font-display font-bold text-[1.5rem] lg:text-[2rem] text-white! leading-[1.35] italic">
                  "Os vivos precisavam muito mais de mim."
                </p>
                <footer className="mt-4 text-brand-pink font-display font-semibold text-sm tracking-wide uppercase">
                  — Andrea Nunes
                </footer>
              </blockquote>
              <p className="text-white/50! text-base leading-[1.8] mt-6">
                Ela cumpre essa promessa todos os dias desde então.
              </p>
            </div>
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
