import Image from "next/image";

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-navy/6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        <a href="/" className="shrink-0 flex gap-6 items-center">
          <Image
            src="/logo-drawing.svg"
            alt="Instituto Sempre Com Você"
            width={220}
            height={56}
            className="h-12 w-auto"
            priority
          />
          <Image
            src="/logo-text.svg"
            alt="Instituto Sempre Com Você"
            width={230}
            height={32}
            className="h-4.5 sm:h-8 w-auto"
            priority
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Sobre", "Programas", "Depoimentos", "Contato"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium font-display text-brand-navy/55 hover:text-brand-navy transition-colors duration-200 tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#doe"
          className="shrink-0 bg-brand-pink text-white text-sm font-semibold font-display px-6 py-3 rounded-full
                     hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/30 hover:-translate-y-px
                     active:translate-y-0 active:shadow-none transition-all duration-200"
        >
          Doe Agora
        </a>
      </div>
    </nav>
  );
}
