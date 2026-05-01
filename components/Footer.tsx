import Image from "next/image";

export function Footer() {
  return (
    <footer
      id="contato"
      className="bg-brand-navy border-t border-white/[0.06] py-16"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Image
              src="/logo-semprecomvc.png"
              alt="Instituto Sempre Com Você"
              width={200}
              height={50}
              className="h-11 w-auto brightness-0 invert mb-5 opacity-90"
            />
            <p className="text-white/45 text-sm leading-relaxed max-w-sm">
              Nossa missão é melhorar a vida de pessoas com câncer e suas
              famílias, oferecendo apoio integral com amor, cuidado e dedicação
              desde 2009.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { label: "f", title: "Facebook" },
                { label: "in", title: "LinkedIn" },
                { label: "ig", title: "Instagram" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.title}
                  className="w-10 h-10 rounded-full bg-white/[0.08] flex items-center justify-center
                             text-white/50 text-xs font-bold font-display uppercase
                             hover:bg-brand-pink hover:text-white transition-all duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-white/90 text-sm mb-5 tracking-wide">
              Instituto
            </h4>
            <ul className="flex flex-col gap-3.5">
              {[
                "Quem Somos",
                "Nossos Programas",
                "Como Ajudar",
                "Transparência",
                "Blog",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/40 text-sm hover:text-white/80 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="font-display font-semibold text-white/90 text-sm mb-5 tracking-wide">
              Contato
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm text-white/40">
              <li className="flex items-center gap-2.5">
                <span>📧</span> contato@semprecomvoce.org.br
              </li>
              <li className="flex items-center gap-2.5">
                <span>📞</span> (11) 3000-0000
              </li>
              <li className="flex items-center gap-2.5">
                <span>📍</span> São Paulo, SP
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
