import Link from "next/link";
import { anoInicio } from "@/data/data";
import { LogoDrawing } from "./logo/LogoDrawing";
import { LogoText } from "./logo/LogoText";
import { FacebookIcon } from "./icons/FacebookIcon";
import { InstagramIcon } from "./icons/InstagramIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { GmailIcon } from "./icons/GmailIcon";
import { PhoneIcon } from "./icons/PhoneIcon";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { GoogleMapsIcon } from "./icons/GoogleMapsIcon";
import { ShareButton } from "./ShareButton";
import { ShareIcon } from "./icons/ShareIcon";

const footerLinks = [
  { label: "Quem Somos", href: "/#sobre" },
  { label: "Nossos Programas", href: "/#programas" },
  { label: "Como Ajudar", href: "/#doe" },
  { label: "Transparência", href: "/#transparencia" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  {
    label: (
      <LinkedInIcon
        width={32}
        height={32}
        className="relative z-10 animate-float-sm"
        aria-hidden="true"
      />
    ),
    title: "LinkedIn",
    link: "#",
  },
  {
    label: (
      <FacebookIcon
        width={32}
        height={32}
        className="relative z-10 animate-float-sm"
        aria-hidden="true"
      />
    ),
    title: "Facebook",
    link: "https://www.facebook.com/InstitutoSempreComVocecomAndreiaNunes",
  },
  {
    label: (
      <InstagramIcon
        width={32}
        height={32}
        className="relative z-10 animate-float-sm"
        aria-hidden="true"
      />
    ),
    title: "Instagram",
    link: "https://www.instagram.com/instituto_semprecomvoce",
  },
  {
    label: (
      <YoutubeIcon
        width={32}
        height={32}
        className="relative z-10 animate-float-sm"
        aria-hidden="true"
      />
    ),
    title: "Youtube",
    link: "https://www.youtube.com/@programasemprecomvocecoman5847",
  },
];

export function Footer() {
  return (
    <footer
      id="contato"
      className="bg-brand-navy border-t border-white/6 py-16"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex gap-4 items-center">
              <LogoDrawing
                width={48}
                height={64}
                className="relative mb-5"
                aria-hidden="true"
              />
              <LogoText
                width={86}
                height={12}
                className="brightness-0 invert mb-5"
                aria-hidden="true"
              />
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-sm">
              Nossa missão é melhorar a vida de pessoas com câncer e suas
              famílias, oferecendo apoio integral com amor, cuidado e dedicação
              desde {anoInicio}.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.title}
                  href={s.link}
                  aria-label={s.title}
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center
                             text-white/50 text-xs font-bold font-display uppercase
                             hover:bg-brand-pink hover:text-white transition-all duration-200"
                >
                  {s.label}
                </a>
              ))}

              <ShareButton
                className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center
                             text-white/50 text-xs font-bold font-display uppercase
                             hover:bg-brand-pink hover:text-white transition-all duration-200 cursor-pointer"
              >
                <ShareIcon />
              </ShareButton>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-white/90 text-sm mb-5 tracking-wide">
              Instituto
            </h4>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/40 text-sm hover:text-white/80 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="font-display font-bold text-brand-pink! text-[11px] uppercase text-sm my-6 tracking-wide">
              Contato
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm text-white/70">
              <li className="flex items-center gap-2.5 bounce">
                <span>
                  <GmailIcon
                    width={20}
                    height={20}
                    className="relative z-10 animate-float-sm"
                    // aria-hidden="true"
                  />
                </span>
                <a
                  href="mailto:contato@institutosemprecomvoce.com.br"
                  className="text-white/70 text-sm hover:text-white/80 transition-colors duration-200"
                >
                  contato@institutosemprecomvoce.com.br
                </a>
              </li>
              <li className="flex items-center gap-2.5 bounce">
                <span>
                  <PhoneIcon
                    width={20}
                    height={20}
                    className="relative z-10 animate-float-sm"
                    // aria-hidden="true"
                  />
                </span>{" "}
                <a
                  className="hover:text-white/80 transition-colors duration-200"
                  href="tel:(47) 3207-2897"
                >
                  (47) 3207-2897
                </a>
              </li>
              <li className="flex items-center gap-2.5 bounce">
                <span>
                  <WhatsAppIcon
                    width={20}
                    height={20}
                    className="relative z-10 animate-float-sm"
                    // aria-hidden="true"
                  />
                </span>{" "}
                <a
                  className="hover:text-white/80 transition-colors duration-200"
                  href="tel:(47) 9971-33353"
                >
                  (47) 9971-33353
                </a>{" "}
                /{" "}
                <a
                  className="hover:text-white/80 transition-colors duration-200"
                  href="tel:(47) 99971-7565"
                >
                  (47) 99971-7565
                </a>
              </li>
              <li className="flex items-center gap-2.5 bounce">
                <span>
                  <GoogleMapsIcon
                    width={20}
                    height={20}
                    className="relative z-10 animate-float-sm"
                    // aria-hidden="true"
                  />
                </span>
                <a
                  className="hover:text-white/80 transition-colors duration-200"
                  href="https://maps.app.goo.gl/SuQtGpZYTFPBLywy8"
                  target="_blank"
                >
                  Rua Karl Kumlehn, 185 - Joinville, SC
                </a>
              </li>
            </ul>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-brand-pink font-semibold font-display text-sm mt-6
                         hover:gap-3 transition-all duration-200"
            >
              Fale Conosco
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
        </div>

        <div className="border-t border-white/[0.07] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs">
            © 2026 Instituto Sempre Com Você. Todos os direitos reservados.
          </p>
          <p>
            <a
              className="text-white/25 text-xs hover:text-brand-pink hover:font-bold transition-colors"
              href="https://llvasconcellos2.github.io/"
              target="_blank"
            >
              Desenvolvido por llvasconcellos
            </a>
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-white/25 text-xs hover:text-white/70 transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-white/25 text-xs hover:text-white/70 transition-colors"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
