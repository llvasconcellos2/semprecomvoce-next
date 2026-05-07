import Link from "next/link";
import { LogoDrawing } from "@/components/logo/LogoDrawing";
import { LogoText } from "@/components/logo/LogoText";
import ActionButton from "./ActionButton";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { label: "Inicial", href: "/" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Programas", href: "/#programas" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/#contato" },
];

export function Navbar() {
  return (
    <nav
      id="nav-header"
      className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-md border-b border-brand-navy/6 flex-1 drop-shadow-lg"
    >
      <div className="flex max-w-7xl mx-auto px-6 lg:px-8 h-20 items-center justify-between gap-4">
        <MobileNav navLinks={navLinks} />

        <Link href="/" className="shrink-0 flex gap-6 items-center">
          <LogoDrawing className="h-12 w-auto" />
          <LogoText className="h-4.5 sm:h-8 customsize:w-auto w-30" />
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

        <ActionButton href="/#doe" className="whitespace-nowrap">
          Doe Agora
        </ActionButton>
      </div>
    </nav>
  );
}
