import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalHero,
  LegalSection,
  LegalSubSection,
  LegalInfoBox,
  LegalDataTable,
} from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Política de Privacidade — Instituto do Câncer Sempre Com Você",
  description:
    "Conheça como o Instituto do Câncer Sempre Com Você coleta, usa e protege seus dados pessoais, em conformidade com a LGPD (Lei nº 13.709/2018).",
};

const sections = [
  { id: "controlador", title: "Identificação do Controlador" },
  { id: "encarregado", title: "Encarregado de Proteção de Dados" },
  { id: "dados-coletados", title: "Dados Coletados e Finalidades" },
  { id: "cookies-analytics", title: "Cookies e Ferramentas de Análise" },
  { id: "terceiros", title: "Compartilhamento com Terceiros" },
  { id: "retencao", title: "Retenção de Dados" },
  { id: "direitos", title: "Direitos dos Titulares" },
  { id: "seguranca", title: "Segurança" },
  { id: "alteracoes", title: "Alterações desta Política" },
  { id: "lei-aplicavel", title: "Lei Aplicável e Foro" },
];

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="bg-white min-h-screen">
      <LegalHero
        label="Legal"
        title="Política de Privacidade"
        updatedAt="13 de maio de 2026"
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Intro */}
        <p className="text-brand-navy/70 text-base leading-relaxed mb-12 border-l-4 border-brand-pink pl-5">
          O{" "}
          <strong className="text-brand-navy">
            Instituto do Câncer Sempre Com Você
          </strong>{" "}
          respeita sua privacidade e está comprometido com a proteção dos seus
          dados pessoais, em conformidade com a{" "}
          <strong className="text-brand-navy">
            Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)
          </strong>
          . Este documento explica quais dados coletamos, por quê, como os
          usamos e quais são seus direitos.
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
          <LegalSection id="controlador" number="01" title="Identificação do Controlador">
            <p>O controlador dos dados pessoais tratados neste site é:</p>
            <LegalInfoBox>
              <p>
                <strong>Instituto do Câncer Sempre Com Você</strong>
              </p>
              <p>CNPJ: 35.710.626/0001-76</p>
              <p>Endereço: Rua Karl Kumlehn, 185 – Joinville, SC – Brasil</p>
              <p>
                E-mail:{" "}
                <a
                  href="mailto:contato@institutosemprecomvoce.com.br"
                  className="text-brand-pink hover:underline"
                >
                  contato@institutosemprecomvoce.com.br
                </a>
              </p>
              <p>Telefone: (47) 3207-2897</p>
            </LegalInfoBox>
          </LegalSection>

          <LegalSection id="encarregado" number="02" title="Encarregado de Proteção de Dados (DPO)">
            <p>
              Nos termos do art. 41 da LGPD, o Encarregado pelo Tratamento de
              Dados Pessoais do Instituto pode ser contatado pelo canal abaixo.
              Dúvidas, solicitações ou reclamações relacionadas à proteção de
              dados serão respondidas em até <strong>15 dias úteis</strong>.
            </p>
            <LegalInfoBox>
              <p>
                <strong>Encarregado de Proteção de Dados</strong>
              </p>
              <p>
                E-mail:{" "}
                <a
                  href="mailto:contato@institutosemprecomvoce.com.br"
                  className="text-brand-pink hover:underline font-semibold"
                >
                  contato@institutosemprecomvoce.com.br
                </a>
              </p>
            </LegalInfoBox>
          </LegalSection>

          <LegalSection id="dados-coletados" number="03" title="Dados Coletados e Finalidades">
            <p>
              Este site coleta apenas os dados estritamente necessários para as
              finalidades descritas abaixo. Não possuímos banco de dados próprio
              — o site é inteiramente estático e servido por uma CDN.
            </p>

            <LegalSubSection title="3.1 Formulário de Voluntariado">
              <LegalDataTable
                rows={[
                  ["Dados coletados", "Nome completo, e-mail, telefone, área de atuação"],
                  ["Finalidade", "Analisar o interesse e entrar em contato com potenciais voluntários"],
                  ["Responsável pelo processamento", "Google LLC (Google Forms)"],
                  ["Base legal (LGPD)", "Consentimento — Art. 7º, inciso I"],
                  ["Voluntariedade", "O preenchimento é totalmente voluntário"],
                ]}
              />
              <p className="text-sm text-brand-navy/60 mt-3">
                Os dados são armazenados nos servidores do Google e regidos pela{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-pink hover:underline"
                >
                  Política de Privacidade do Google
                </a>
                . O Instituto acessa apenas as respostas para fins de triagem de
                voluntários.
              </p>
            </LegalSubSection>

            <LegalSubSection title="3.2 Cookie Funcional de Notificação">
              <LegalDataTable
                rows={[
                  ["Nome do cookie", "donation_popup_dismissed"],
                  ["Dados coletados", "Valor binário (1) — sem identificação pessoal"],
                  ["Finalidade", "Registrar que o usuário dispensou o popup de doação; não exibi-lo novamente por 7 dias"],
                  ["Validade", "7 dias"],
                  ["Base legal (LGPD)", "Legítimo interesse — Art. 7º, inciso IX"],
                ]}
              />
            </LegalSubSection>

            <LegalSubSection title="3.3 Google Analytics (GA4)">
              <LegalDataTable
                rows={[
                  ["Dados coletados", "Identificadores de cookies, endereço IP anonimizado, páginas visitadas, duração da visita, tipo de dispositivo/navegador"],
                  ["Finalidade", "Estatísticas de uso do site para melhoria de conteúdo e experiência do usuário — sem identificação individual"],
                  ["Responsável pelo processamento", "Google LLC (Google Analytics 4)"],
                  ["Base legal (LGPD)", "Consentimento — Art. 7º, inciso I"],
                  ["Ativação", "O script do Google Analytics só é carregado após consentimento explícito do usuário no banner de cookies"],
                ]}
              />
            </LegalSubSection>

            <LegalSubSection title="3.4 Processamento de Doações via MercadoPago">
              <LegalDataTable
                rows={[
                  ["Dados coletados", "Dados de pagamento (nome, CPF, dados do cartão) coletados e processados diretamente pelo MercadoPago"],
                  ["Finalidade", "Processar doações com cartão de crédito e boleto bancário"],
                  ["Responsável pelo processamento", "MercadoPago (Mercado Libre S.R.L.)"],
                  ["Dados no Instituto", "Este site não armazena nem tem acesso a dados de cartão ou CPF — apenas recebe o status da transação"],
                  ["Base legal (LGPD)", "Execução de contrato ou procedimentos preliminares — Art. 7º, inciso V"],
                ]}
              />
              <p className="text-sm text-brand-navy/60 mt-3">
                Consulte a{" "}
                <a
                  href="https://www.mercadopago.com.br/privacidade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-pink hover:underline"
                >
                  Política de Privacidade do MercadoPago
                </a>
                .
              </p>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="cookies-analytics" number="04" title="Cookies e Ferramentas de Análise">
            <p>
              Este site utiliza o{" "}
              <strong className="text-brand-navy">
                Google Analytics 4 (GA4)
              </strong>
              , serviço de análise de dados fornecido pela Google LLC, para
              compreender como os visitantes interagem com o site e melhorar
              continuamente a experiência e o conteúdo oferecido.
            </p>

            <LegalSubSection title="O que o Google Analytics coleta">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Identificadores de cookies (não vinculados a informações
                  pessoais identificáveis)
                </li>
                <li>
                  Endereço IP anonimizado (o GA4 anonimiza o IP antes de
                  qualquer armazenamento por padrão)
                </li>
                <li>
                  Páginas visitadas, tempo de permanência, cliques e fluxo de
                  navegação
                </li>
                <li>
                  Tipo de dispositivo, sistema operacional e navegador
                </li>
                <li>
                  País/região de acesso (sem precisão de geolocalização)
                </li>
              </ul>
            </LegalSubSection>

            <LegalSubSection title="Como bloqueamos o GA até o consentimento">
              <p>
                O script do Google Analytics{" "}
                <strong className="text-brand-navy">não é carregado</strong> ao
                acessar o site pela primeira vez. Ele só passa a funcionar após
                o usuário clicar em{" "}
                <strong className="text-brand-navy">&ldquo;Aceitar&rdquo;</strong>{" "}
                no banner de cookies exibido na primeira visita. Caso o usuário
                recuse ou feche o banner sem aceitar, nenhum dado analítico será
                coletado.
              </p>
            </LegalSubSection>

            <LegalSubSection title="Como recusar ou revogar o consentimento">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong className="text-brand-navy">
                    Banner de cookies:
                  </strong>{" "}
                  clique em &ldquo;Recusar&rdquo; no banner exibido na primeira
                  visita, ou limpe os cookies do navegador para que o banner
                  reapareça.
                </li>
                <li>
                  <strong className="text-brand-navy">
                    Extensão do navegador:
                  </strong>{" "}
                  instale a{" "}
                  <a
                    href="https://support.google.com/analytics/answer/7318509?hl=pt-BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-pink hover:underline"
                  >
                    Extensão de desativação do Google Analytics
                  </a>{" "}
                  disponível para os principais navegadores.
                </li>
                <li>
                  <strong className="text-brand-navy">
                    Configurações do navegador:
                  </strong>{" "}
                  bloqueie cookies de terceiros nas preferências de privacidade
                  do seu navegador.
                </li>
              </ul>
            </LegalSubSection>

            <LegalSubSection title="Configurações de privacidade no GA4">
              <p>
                Mantemos a anonimização de IP ativada e a sinalização de dados
                para publicidade personalizada desativada, garantindo que os
                dados sejam utilizados exclusivamente para fins estatísticos
                internos, sem identificação de indivíduos.
              </p>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="terceiros" number="05" title="Compartilhamento com Terceiros">
            <p>
              Não vendemos, alugamos nem compartilhamos seus dados com
              terceiros para fins comerciais. Os dados podem ser acessados pelos
              seguintes parceiros, exclusivamente para as finalidades descritas:
            </p>
            <LegalDataTable
              rows={[
                [
                  "Google LLC",
                  "Google Analytics (estatísticas de uso) e Google Forms (voluntários). Sede: EUA. Adequação: Cláusulas Contratuais Padrão (SCCs).",
                ],
                [
                  "MercadoPago",
                  "Processamento de pagamentos de doações. Sede: Argentina/Brasil. Regido por sua própria política de privacidade.",
                ],
                [
                  "WhatsApp / Meta",
                  "Compartilhamento voluntário de mensagem de agradecimento por doação, iniciado pelo próprio usuário.",
                ],
                [
                  "Cloudflare, Inc.",
                  "Infraestrutura CDN que serve o site estaticamente. Não armazena dados pessoais além de logs de acesso temporários padrão.",
                ],
              ]}
            />
          </LegalSection>

          <LegalSection id="retencao" number="06" title="Retenção de Dados">
            <LegalDataTable
              rows={[
                [
                  "Cookie donation_popup_dismissed",
                  "7 dias (expiração automática)",
                ],
                [
                  "Preferência de consentimento (analytics_consent)",
                  "365 dias (expiração automática)",
                ],
                [
                  "Dados do Google Analytics",
                  "14 meses — configuração padrão do GA4, gerenciado pelo Google",
                ],
                [
                  "Respostas do formulário de voluntariado",
                  "Enquanto necessário para o processo de seleção — gerenciado pelo Instituto no Google Forms",
                ],
              ]}
            />
          </LegalSection>

          <LegalSection id="direitos" number="07" title="Direitos dos Titulares">
            <p>
              Nos termos do art. 18 da LGPD, você tem os seguintes direitos em
              relação aos seus dados pessoais:
            </p>
            <ul className="space-y-3 mt-4">
              {[
                [
                  "Confirmação e Acesso",
                  "Confirmar se tratamos seus dados e acessar uma cópia deles.",
                ],
                [
                  "Correção",
                  "Corrigir dados incompletos, inexatos ou desatualizados.",
                ],
                [
                  "Anonimização / Bloqueio / Eliminação",
                  "Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.",
                ],
                [
                  "Portabilidade",
                  "Receber seus dados em formato estruturado e interoperável.",
                ],
                [
                  "Informação sobre compartilhamento",
                  "Saber com quais entidades seus dados foram compartilhados.",
                ],
                [
                  "Revogação do consentimento",
                  "Retirar o consentimento a qualquer momento, sem prejudicar o tratamento anteriormente realizado.",
                ],
                [
                  "Oposição",
                  "Opor-se ao tratamento realizado com fundamento em outras bases legais que não o consentimento.",
                ],
              ].map(([right, desc]) => (
                <li key={right} className="flex gap-3">
                  <span
                    className="w-2 h-2 rounded-full bg-brand-pink mt-2 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="text-brand-navy">{right}:</strong>{" "}
                    <span className="text-brand-navy/70">{desc}</span>
                  </span>
                </li>
              ))}
            </ul>
            <LegalInfoBox className="mt-6">
              <p>Para exercer qualquer um desses direitos, entre em contato:</p>
              <p className="mt-2">
                <a
                  href="mailto:contato@institutosemprecomvoce.com.br"
                  className="text-brand-pink hover:underline font-semibold"
                >
                  contato@institutosemprecomvoce.com.br
                </a>
              </p>
              <p className="text-brand-navy/60 text-xs mt-1">
                Responderemos em até 15 dias úteis.
              </p>
            </LegalInfoBox>
          </LegalSection>

          <LegalSection id="seguranca" number="08" title="Segurança">
            <p>
              Este site é inteiramente estático — não possui backend, banco de
              dados próprio nem formulários que enviem dados diretamente ao
              Instituto. O site é servido por uma CDN (Cloudflare), o que
              minimiza a superfície de ataque e garante que não haja
              armazenamento de dados pessoais em nossos servidores.
            </p>
            <p>
              As operações de processamento de dados (analytics, formulário de
              voluntariado, pagamentos) são delegadas a plataformas de terceiros
              que adotam padrões internacionais de segurança, como criptografia
              TLS e certificações de conformidade reconhecidas.
            </p>
          </LegalSection>

          <LegalSection id="alteracoes" number="09" title="Alterações desta Política">
            <p>
              Esta Política de Privacidade pode ser atualizada periodicamente
              para refletir mudanças nas práticas do Instituto, novas
              funcionalidades do site ou alterações legais. A data da{" "}
              <em>Última atualização</em> no topo desta página sempre indicará a
              versão vigente.
            </p>
            <p>
              Recomendamos que você revise esta página periodicamente. O uso
              continuado do site após a publicação de alterações implica a
              aceitação da nova versão.
            </p>
          </LegalSection>

          <LegalSection id="lei-aplicavel" number="10" title="Lei Aplicável e Foro">
            <p>
              Esta Política de Privacidade é regida pela{" "}
              <strong className="text-brand-navy">
                Lei nº 13.709/2018 (LGPD)
              </strong>{" "}
              e demais normas aplicáveis do ordenamento jurídico brasileiro.
            </p>
            <p>
              Para dirimir controvérsias decorrentes desta Política, fica
              eleito o foro da comarca de{" "}
              <strong className="text-brand-navy">
                Joinville, Estado de Santa Catarina
              </strong>
              , com exclusão de qualquer outro, por mais privilegiado que seja.
            </p>
            <p>
              Para reclamações relacionadas à proteção de dados, você também
              pode contatar a{" "}
              <strong className="text-brand-navy">
                Autoridade Nacional de Proteção de Dados (ANPD)
              </strong>{" "}
              em{" "}
              <a
                href="https://www.gov.br/anpd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-pink hover:underline"
              >
                www.gov.br/anpd
              </a>
              .
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
