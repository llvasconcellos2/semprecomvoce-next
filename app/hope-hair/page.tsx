import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { RevealGroup } from "@/components/RevealGroup";
import ActionButton from "@/components/ActionButton";
import { GmailIcon } from "@/components/icons/GmailIcon";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { GoogleMapsIcon } from "@/components/icons/GoogleMapsIcon";
import { SITE_URL } from "@/lib/constants";

const TITLE = "Hope Hair — Salão de beleza solidário em Joinville";
const DESCRIPTION =
  "Hope Hair by Andrea Nunes: um salão de beleza que existe para apoiar o Instituto do Câncer Sempre Com Você. Cada atendimento ajuda a manter o cuidado com pacientes e famílias. Agende seu horário.";
const LOGO = "/hope-hair/logo-hope-hair.jpg";
const WHATSAPP_URL =
  "https://wa.me/5547999717565?text=Ol%C3%A1!%20Quero%20agendar%20um%20hor%C3%A1rio%20no%20Hope%20Hair.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/hope-hair",
    images: [{ url: LOGO, width: 3179, height: 3179, alt: "Logo Hope Hair" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [LOGO],
  },
  alternates: { canonical: "/hope-hair" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Hope Hair",
  description: DESCRIPTION,
  url: `${SITE_URL}/hope-hair`,
  image: `${SITE_URL}${LOGO}`,
  logo: `${SITE_URL}${LOGO}`,
  telephone: "+55 47 99971-7565",
  email: "contato@institutosemprecomvoce.com.br",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Karl Kumlehn, 185",
    addressLocality: "Joinville",
    addressRegion: "SC",
    addressCountry: "BR",
  },
  parentOrganization: {
    "@type": "NGO",
    name: "Instituto do Câncer Sempre Com Você",
    url: SITE_URL,
  },
};

const pillars = [
  {
    title: "Beleza com propósito",
    text: "Cada corte, cor e cuidado feito no Hope Hair ajuda a manter de pé o trabalho do Instituto.",
  },
  {
    title: "Assinado por Andrea Nunes",
    text: "Quem fundou o Instituto abriu um salão para que o cuidado com pacientes e famílias continue.",
  },
  {
    title: "Renda que vira cuidado",
    text: "A renda do salão apoia os atendimentos que o Instituto presta a quem enfrenta o câncer.",
  },
];

const secondaryButton =
  "inline-flex items-center justify-center gap-3 rounded-full border border-white/30 px-6 py-4 font-display text-sm font-semibold text-white whitespace-nowrap " +
  "hover:bg-white/10 hover:border-white/60 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white " +
  "transition-[transform,background-color,border-color] duration-200";

export default function HopeHairPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─────────────────────────────────────────
          1. HERO — logo como peça central
      ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-28 pb-20 lg:pt-36 lg:pb-28">
        {/* Aquarela: ecoa as manchas azul e rosa do logo */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-32 h-136 w-136 rounded-full bg-brand-blue/25 blur-[130px]" />
          <div className="absolute top-1/3 -right-32 h-136 w-136 rounded-full bg-brand-pink/20 blur-[130px]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-8">
          <RevealGroup
            stagger={140}
            blur
            blurAmount={10}
            duration={800}
            className="order-2 flex flex-col gap-6 lg:order-1"
          >
            <div className="flex w-fit items-center gap-2.5 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-brand-pink shadow-lg shadow-brand-pink/10 ring-1 ring-brand-pink/15">
              <span
                className="animate-pulse-dot h-2 w-2 rounded-full bg-brand-pink"
                aria-hidden="true"
              />
              Salão solidário em Joinville
            </div>

            <h1 className="text-balance font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-brand-navy sm:text-[3.25rem] xl:text-[4.25rem]">
              Hope Hair, beleza que ajuda a cuidar
            </h1>

            <p className="max-w-lg text-lg leading-[1.7] text-brand-navy/70">
              Um salão de beleza criado para sustentar o Instituto do Câncer
              Sempre Com Você. Cada atendimento ajuda a manter o apoio a
              pacientes e famílias que enfrentam o câncer.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <ActionButton href="/">Conheça o Instituto</ActionButton>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full px-5 py-4 font-display text-sm font-semibold text-brand-navy hover:bg-brand-navy/5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink transition-[transform,background-color] duration-200"
              >
                <WhatsAppIcon width={20} height={20} aria-hidden="true" />
                Agende um horário
              </a>
            </div>
          </RevealGroup>

          <Reveal
            blur
            blurAmount={14}
            duration={1000}
            distance={40}
            className="order-1 mx-auto w-full max-w-sm sm:max-w-md lg:order-2 lg:max-w-none"
          >
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-white shadow-[0_30px_80px_-20px_rgba(232,23,138,0.35),0_12px_30px_-12px_rgba(41,171,226,0.35)]">
              {/* scale corta a moldura preta de 1px do arquivo original */}
              <Image
                src={LOGO}
                alt="Logo Hope Hair by Andrea Nunes"
                fill
                priority
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 448px, 90vw"
                className="scale-[1.02] object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          2. POR QUE O HOPE HAIR EXISTE
      ───────────────────────────────────────── */}
      <section className="bg-brand-pink-light py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:px-8">
          <Reveal blur blurAmount={8} duration={700}>
            <h2 className="font-display text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-brand-navy lg:text-[2.75rem]">
              Um salão que cuida de quem cuida
            </h2>
            <p className="mt-5 max-w-md text-lg leading-[1.7] text-brand-navy/65">
              O Hope Hair faz parte do Instituto do Câncer Sempre Com Você e
              existe para que o Instituto continue atendendo.
            </p>
            <div className="relative mt-8 aspect-video overflow-hidden rounded-3xl shadow-[0_24px_60px_-20px_rgba(232,23,138,0.3),0_10px_24px_-12px_rgba(41,171,226,0.3)]">
              <Image
                src="/hope-hair/fachada.jpg"
                alt="Fachada do salão Hope Hair, na Rua Karl Kumlehn, 185, em Joinville"
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <ul className="flex flex-col divide-y divide-brand-pink/20 border-y border-brand-pink/20">
            {pillars.map((item, i) => (
              <li key={item.title}>
                <Reveal
                  blur
                  blurAmount={6}
                  duration={700}
                  delay={i * 100}
                  className="py-7"
                >
                  <h3 className="font-display text-xl font-bold text-brand-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xl leading-[1.7] text-brand-navy/65">
                    {item.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          3. CONTATO
      ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-navy py-20 lg:py-28 grain">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-150 w-150 rounded-full bg-brand-pink/12 blur-[130px]" />
          <div className="absolute -right-40 -bottom-40 h-150 w-150 rounded-full bg-brand-blue/10 blur-[130px]" />
        </div>

        <RevealGroup
          stagger={140}
          blur
          blurAmount={10}
          duration={700}
          className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8"
        >
          <div>
            <h2 className="font-display text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-white! lg:text-[2.75rem]">
              Quer agendar um horário?
            </h2>
            <p className="mt-5 max-w-md text-lg leading-[1.7] text-white/60">
              Fale com a nossa equipe pelo WhatsApp e escolha o melhor dia para
              você.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ActionButton
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chamar no WhatsApp
              </ActionButton>
              <a href="/apoie" className={secondaryButton}>
                Apoiar o Instituto
              </a>
            </div>
          </div>

          <ul className="flex flex-col gap-5 text-white/75">
            <li className="flex items-center gap-3.5">
              <GoogleMapsIcon width={24} height={24} aria-hidden="true" />
              <a
                href="https://maps.app.goo.gl/SuQtGpZYTFPBLywy8"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors duration-200"
              >
                Rua Karl Kumlehn, 185 — Joinville, SC
              </a>
            </li>
            <li className="flex items-center gap-3.5">
              <WhatsAppIcon width={24} height={24} aria-hidden="true" />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors duration-200"
              >
                (47) 99971-7565
              </a>
            </li>
            <li className="flex items-center gap-3.5">
              <PhoneIcon width={24} height={24} aria-hidden="true" />
              <a
                href="tel:+554732072897"
                className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors duration-200"
              >
                (47) 3207-2897
              </a>
            </li>
            <li className="flex items-center gap-3.5">
              <GmailIcon width={24} height={24} aria-hidden="true" />
              <a
                href="mailto:contato@institutosemprecomvoce.com.br"
                className="break-all hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors duration-200"
              >
                contato@institutosemprecomvoce.com.br
              </a>
            </li>
          </ul>
        </RevealGroup>
      </section>
    </>
  );
}
