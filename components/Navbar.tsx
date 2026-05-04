import Link from "next/link";
import { LogoDrawing } from "@/components/logo/LogoDrawing";
import { LogoText } from "@/components/logo/LogoText";
import ActionButton from "./ActionButton";

const navLinks = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Programas", href: "/#programas" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/#contato" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-navy/6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        <Link href="/" className="shrink-0 flex gap-6 items-center">
          <LogoDrawing className="h-12 w-auto" />
          <LogoText className="h-4.5 sm:h-8 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium font-display text-brand-navy/55 hover:text-brand-navy transition-colors duration-200 tracking-wide"
            >
              {label}
            </Link>
          ))}
        </div>
        <ActionButton href="/#doe">Doe Agora</ActionButton>
      </div>
    </nav>
  );
}
