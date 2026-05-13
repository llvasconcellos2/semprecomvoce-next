import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalHero,
  LegalSection,
  LegalInfoBox,
} from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Termos de Uso — Instituto do Câncer Sempre Com Você",
  description:
    "Conheça os termos e condições de uso do site do Instituto do Câncer Sempre Com Você.",
};

const sections = [
  { id: "aceitacao", title: "Aceitação dos Termos" },
  { id: "sobre", title: "Sobre o Instituto" },
  { id: "uso", title: "Uso do Site" },
  { id: "propriedade-intelectual", title: "Propriedade Intelectual" },
  { id: "links-externos", title: "Links Externos" },
  { id: "isencao", title: "Isenção de Responsabilidade" },
  { id: "doacoes", title: "Doações" },
  { id: "alteracoes", title: "Alterações dos Termos" },
  { id: "lei-aplicavel", title: "Lei Aplicável e Foro" },
];

export default function TermosDeUsoPage() {
  return (
    <div className="bg-white min-h-screen">
      <LegalHero
        label="Legal"
        title="Termos de Uso"
        updatedAt="13 de maio de 2026"
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Intro */}
        <p className="text-brand-navy/70 text-base leading-relaxed mb-12 border-l-4 border-brand-pink pl-5">
          Ao acessar e utilizar o site do{" "}
          <strong className="text-brand-navy">
            Instituto do Câncer Sempre Com Você
          </strong>
          , você concorda com os presentes Termos de Uso. Leia-os com atenção
          antes de navegar. Se não concordar com qualquer disposição, pedimos
          que se abstenha de utilizar o site.
        </p>

        {/* Table of contents */}
        <nav
          className="bg-brand-pink-light rounded-2xl p-6 mb-14"
          aria-label="Índice desta página"
        >
          <p className="font-display font-semibold text-brand-navy text-sm uppercase tracking-wide mb-4">
            Índice
          </p>
          <ol className="grid sm:grid-cols-2 gap-2">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex items-start gap-2 text-sm text-brand-navy/70 hover:text-brand-pink transition-colors duration-200 group"
                >
                  <span className="font-display font-bold text-brand-pink text-xs mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-14">
          <LegalSection id="aceitacao" number="01" title="Aceitação dos Termos">
            <p>
              O acesso e uso deste site estão condicionados à aceitação e ao
              cumprimento destes Termos de Uso. Ao navegar pelo site, você
              declara ter lido, compreendido e concordado com todas as
              disposições aqui contidas.
            </p>
            <p>
              Estes Termos se aplicam a todos os visitantes, usuários e demais
              pessoas que acessem ou utilizem o site.
            </p>
          </LegalSection>

          <LegalSection id="sobre" number="02" title="Sobre o Instituto">
            <p>
              O{" "}
              <strong className="text-brand-navy">
                Instituto do Câncer Sempre Com Você
              </strong>{" "}
              é uma organização sem fins lucrativos (CNPJ: 35.710.626/0001-76),
              com sede em Joinville, Santa Catarina, dedicada a melhorar a vida
              de pessoas com câncer e suas famílias desde 2010.
            </p>
            <p>
              O Instituto oferece apoio psicológico gratuito, transporte para
              consultas e tratamentos, e kits de cuidado essenciais — sempre com
              amor, cuidado e dedicação.
            </p>
            <LegalInfoBox>
              <p>
                <strong>Instituto do Câncer Sempre Com Você</strong>
              </p>
              <p>CNPJ: 35.710.626/0001-76</p>
              <p>Rua Karl Kumlehn, 185 – Joinville, SC – Brasil</p>
              <p>
                <a
                  href="mailto:contato@institutosemprecomvoce.com.br"
                  className="text-brand-pink hover:underline"
                >
                  contato@institutosemprecomvoce.com.br
                </a>
              </p>
            </LegalInfoBox>
          </LegalSection>

          <LegalSection id="uso" number="03" title="Uso do Site">
            <p>
              Este site tem caráter exclusivamente informativo e institucional.
              Ao utilizá-lo, você se compromete a:
            </p>
            <ul className="space-y-3 mt-4">
              {[
                "Utilizar o site apenas para finalidades lícitas e em conformidade com a legislação brasileira vigente.",
                "Não tentar acessar áreas restritas, sistemas ou dados do Instituto sem autorização.",
                "Não reproduzir, distribuir, modificar ou criar obras derivadas do conteúdo do site sem autorização prévia e escrita do Instituto.",
                "Não utilizar o site de forma que possa prejudicar, sobrecarregar ou comprometer sua disponibilidade e integridade.",
                "Não inserir, transmitir ou disseminar conteúdo ilegal, ofensivo, difamatório ou que viole direitos de terceiros.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="w-2 h-2 rounded-full bg-brand-pink mt-2 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-brand-navy/70">{item}</span>
                </li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection
            id="propriedade-intelectual"
            number="04"
            title="Propriedade Intelectual"
          >
            <p>
              Todo o conteúdo disponibilizado neste site — incluindo textos,
              fotografias, ilustrações, logotipos, identidade visual, vídeos e
              demais materiais — é de propriedade exclusiva do{" "}
              <strong className="text-brand-navy">
                Instituto do Câncer Sempre Com Você
              </strong>{" "}
              ou de terceiros que autorizaram seu uso, e está protegido pela
              legislação de direitos autorais e propriedade intelectual
              aplicável.
            </p>
            <p>
              É vedada a reprodução total ou parcial do conteúdo sem autorização
              prévia e escrita do Instituto. Para fins jornalísticos,
              educacionais ou institucionais, entre em contato pelo e-mail{" "}
              <a
                href="mailto:contato@institutosemprecomvoce.com.br"
                className="text-brand-pink hover:underline"
              >
                contato@institutosemprecomvoce.com.br
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection id="links-externos" number="05" title="Links Externos">
            <p>
              Este site contém links para plataformas e serviços de terceiros,
              como Google Forms (formulário de voluntariado), MercadoPago
              (processamento de doações), redes sociais (Facebook, Instagram,
              YouTube) e WhatsApp.
            </p>
            <p>
              O Instituto não se responsabiliza pelo conteúdo, disponibilidade,
              práticas de privacidade ou políticas dessas plataformas externas.
              O acesso a esses links é de inteira responsabilidade do usuário.
              Recomendamos a leitura dos termos e políticas de privacidade de
              cada plataforma antes de utilizá-las.
            </p>
          </LegalSection>

          <LegalSection id="isencao" number="06" title="Isenção de Responsabilidade">
            <p>
              As informações disponibilizadas neste site têm caráter
              exclusivamente informativo e institucional.{" "}
              <strong className="text-brand-navy">
                O conteúdo publicado não substitui orientação médica,
                psicológica, jurídica ou financeira especializada.
              </strong>{" "}
              Em caso de necessidade, consulte sempre um profissional habilitado.
            </p>
            <p>
              O Instituto não garante a disponibilidade ininterrupta do site e
              não se responsabiliza por eventuais danos decorrentes de
              indisponibilidade temporária, erros técnicos ou interrupções
              causadas por fatores alheios ao seu controle (manutenções,
              ataques cibernéticos, falhas de infraestrutura, etc.).
            </p>
            <p>
              O Instituto não se responsabiliza por informações inseridas por
              terceiros em formulários externos (como o Google Forms), nem pelo
              conteúdo de plataformas de terceiros acessadas por meio de links
              neste site.
            </p>
          </LegalSection>

          <LegalSection id="doacoes" number="07" title="Doações">
            <p>
              As doações realizadas por meio deste site são voluntárias e
              destinadas integralmente ao Instituto do Câncer Sempre Com Você
              para financiamento de suas atividades e programas de apoio a
              pessoas com câncer e suas famílias.
            </p>
            <p>
              As doações não geram qualquer direito a contraprestação financeira
              ou retorno para o doador. O doador reconhece o caráter filantrópico
              e irrevogável da doação realizada.
            </p>
            <p>
              O processamento de pagamentos é realizado pelas plataformas
              MercadoPago (cartão de crédito e boleto) e PIX (transferência
              instantânea). O Instituto não armazena dados financeiros dos
              doadores. Em caso de dúvidas sobre uma doação, entre em contato
              pelo e-mail{" "}
              <a
                href="mailto:contato@institutosemprecomvoce.com.br"
                className="text-brand-pink hover:underline"
              >
                contato@institutosemprecomvoce.com.br
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection id="alteracoes" number="08" title="Alterações dos Termos">
            <p>
              O Instituto reserva-se o direito de modificar estes Termos de Uso
              a qualquer momento, sem aviso prévio. As alterações entrarão em
              vigor imediatamente após sua publicação nesta página.
            </p>
            <p>
              O uso continuado do site após a publicação de alterações
              constituirá aceitação tácita dos novos termos. Recomendamos que
              você verifique esta página periodicamente.
            </p>
          </LegalSection>

          <LegalSection id="lei-aplicavel" number="09" title="Lei Aplicável e Foro">
            <p>
              Estes Termos de Uso são regidos pelas leis da República Federativa
              do Brasil, em especial pelo{" "}
              <strong className="text-brand-navy">
                Código de Defesa do Consumidor (Lei nº 8.078/1990)
              </strong>
              , pelo{" "}
              <strong className="text-brand-navy">
                Marco Civil da Internet (Lei nº 12.965/2014)
              </strong>{" "}
              e pela{" "}
              <strong className="text-brand-navy">
                Lei Geral de Proteção de Dados (Lei nº 13.709/2018)
              </strong>
              .
            </p>
            <p>
              Para dirimir quaisquer controvérsias decorrentes destes Termos,
              fica eleito o foro da comarca de{" "}
              <strong className="text-brand-navy">
                Joinville, Estado de Santa Catarina
              </strong>
              , com exclusão de qualquer outro, por mais privilegiado que seja.
            </p>
          </LegalSection>
        </div>

        <div className="mt-16 pt-8 border-t border-brand-navy/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-navy/40 text-sm">
            Dúvidas?{" "}
            <a
              href="mailto:contato@institutosemprecomvoce.com.br"
              className="text-brand-pink hover:underline"
            >
              contato@institutosemprecomvoce.com.br
            </a>
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand-navy/50 text-sm hover:text-brand-navy transition-colors duration-200"
          >
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
