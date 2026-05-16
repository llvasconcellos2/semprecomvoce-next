"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { LogoDrawing } from "@/components/logo/LogoDrawing";
import { LogoText } from "@/components/logo/LogoText";
import ActionButton from "./ActionButton";
import { MobileNav } from "./MobileNav";
import "./AnimatedNav.css";

// ─── Icons ───────────────────────────────────────────────────────────────────

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2z" />
      <path d="M5 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function UserPlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface DropdownItem {
  label: string;
  description: string;
  href: string;
  Icon: React.FC<{ className?: string }>;
}

interface NavItemDef {
  id: string;
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

// ─── Nav data ────────────────────────────────────────────────────────────────

const navItems: NavItemDef[] = [
  { id: "inicio", label: "Início", href: "/" },
  { id: "sobre", label: "Sobre", href: "/#sobre" },
  {
    id: "programas",
    label: "Programas",
    dropdown: [
      {
        label: "Apoio Psicológico",
        description: "Suporte emocional para pacientes e famílias",
        href: "/#programas",
        Icon: HeartIcon,
      },
      {
        label: "Assistência Social",
        description: "Auxílio em necessidades do dia a dia",
        href: "/#programas",
        Icon: UsersIcon,
      },
      {
        label: "Transporte Solidário",
        description: "Deslocamento para tratamentos médicos",
        href: "/#programas",
        Icon: CarIcon,
      },
      {
        label: "Atividades Terapêuticas",
        description: "Bem-estar e qualidade de vida",
        href: "/#programas",
        Icon: SparklesIcon,
      },
    ],
  },
  {
    id: "ajudar",
    label: "Ajudar",
    dropdown: [
      {
        label: "Doe Agora",
        description: "Faça uma doação e transforme vidas",
        href: "/apoie",
        Icon: HeartIcon,
      },
      {
        label: "Seja Voluntário",
        description: "Contribua com seu tempo e talento",
        href: "/#ajudar",
        Icon: UsersIcon,
      },
      {
        label: "Empresas Parceiras",
        description: "Junte sua empresa à nossa causa",
        href: "/#ajudar",
        Icon: BuildingIcon,
      },
      {
        label: "Indique um Paciente",
        description: "Ajude quem precisa de cuidado",
        href: "/#ajudar",
        Icon: UserPlusIcon,
      },
    ],
  },
  { id: "depoimentos", label: "Depoimentos", href: "/#depoimentos" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "contato", label: "Contato", href: "/#contato" },
];

const DROPDOWN_ITEMS = navItems.filter((i) => i.dropdown);
const flatNavLinks = navItems.map(({ label, href }) => ({
  label,
  href: href ?? "#",
}));

const SLIDE_MS = 210;
const CLOSE_MS = 160;

const MOTION_ANIM: Record<string, string> = {
  "from-end": `nav-slide-from-right ${SLIDE_MS}ms cubic-bezier(0.32,0.08,0.24,1) forwards`,
  "from-start": `nav-slide-from-left  ${SLIDE_MS}ms cubic-bezier(0.32,0.08,0.24,1) forwards`,
  "to-end": `nav-slide-to-right   ${SLIDE_MS}ms cubic-bezier(0.32,0.08,0.24,1) forwards`,
  "to-start": `nav-slide-to-left    ${SLIDE_MS}ms cubic-bezier(0.32,0.08,0.24,1) forwards`,
};

// ─── Component ───────────────────────────────────────────────────────────────

export function AnimatedNav() {
  const headerRef = useRef<HTMLElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef(new Map<string, HTMLElement>());
  const contentRefs = useRef(new Map<string, HTMLDivElement>());
  const slideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [prevId, setPrevId] = useState<string | null>(null);
  const [vpOpen, setVpOpen] = useState(false);
  const [showVp, setShowVp] = useState(false);
  const [vpLeft, setVpLeft] = useState(0);
  const [indicator, setIndicator] = useState({
    tx: 0,
    width: 0,
    visible: false,
  });

  // Keep viewport in DOM during close animation
  useEffect(() => {
    if (vpOpen) {
      setShowVp(true);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    } else {
      closeTimerRef.current = setTimeout(() => setShowVp(false), CLOSE_MS + 20);
    }
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [vpOpen]);

  const updateIndicator = useCallback((el: HTMLElement) => {
    const list = navListRef.current;
    if (!list) return;
    const listRect = list.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({
      tx: elRect.left - listRect.left,
      width: elRect.width,
      visible: true,
    });
  }, []);

  const updateVpLeft = useCallback((id: string) => {
    const trigger = itemRefs.current.get(id);
    const header = headerRef.current;
    if (!trigger || !header) return;
    const hr = header.getBoundingClientRect();
    const tr = trigger.getBoundingClientRect();
    setVpLeft(tr.left - hr.left + tr.width / 2);
  }, []);

  // Delayed close — gives the cursor time to cross the gap into the dropdown
  const scheduleClose = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setIndicator((prev) => ({ ...prev, visible: false }));
      setVpOpen(false);
      setActiveId(null);
      setPrevId(null);
    }, 80);
  }, []);

  const cancelClose = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
  }, []);

  const handleItemEnter = useCallback(
    (id: string) => {
      cancelClose();
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);

      const el = itemRefs.current.get(id);
      if (el) updateIndicator(el);

      const item = navItems.find((i) => i.id === id);

      if (item?.dropdown) {
        const isSwitch = vpOpen && activeId !== id;
        setPrevId(isSwitch ? activeId : null);
        setActiveId(id);
        setVpOpen(true);
        updateVpLeft(id);
        if (isSwitch) {
          slideTimerRef.current = setTimeout(
            () => setPrevId(null),
            SLIDE_MS + 40,
          );
        }
      } else {
        if (vpOpen) {
          setVpOpen(false);
          setActiveId(null);
          setPrevId(null);
        }
      }
    },
    [activeId, vpOpen, cancelClose, updateIndicator, updateVpLeft],
  );

  // Direction for slide animations when switching between dropdowns
  const getMotion = (id: string): string | undefined => {
    if (!prevId || !activeId || prevId === activeId) return undefined;
    const ai = navItems.findIndex((i) => i.id === activeId);
    const pi = navItems.findIndex((i) => i.id === prevId);
    if (id === activeId) return ai > pi ? "from-end" : "from-start";
    if (id === prevId) return ai > pi ? "to-start" : "to-end";
    return undefined;
  };

  // Clamp panel so it doesn't overflow the viewport
  const panelWidth = 480;
  const clampedLeft =
    typeof window !== "undefined"
      ? Math.max(
          8,
          Math.min(vpLeft - panelWidth / 2, window.innerWidth - panelWidth - 8),
        )
      : vpLeft - panelWidth / 2;

  const itemClass =
    "relative flex items-center gap-1 px-3 py-2 text-sm font-medium font-display " +
    "text-brand-navy/55 hover:text-brand-navy transition-colors duration-150 tracking-wide cursor-pointer select-none";

  return (
    <header
      ref={headerRef}
      className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-md border-b border-brand-navy/6 drop-shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <MobileNav navLinks={flatNavLinks} />

        <Link href="/" className="shrink-0 flex gap-6 items-center">
          <LogoDrawing className="h-12 w-auto" />
          <LogoText className="h-4.5 sm:h-8 customsize:w-auto w-30" />
        </Link>

        {/* ── Desktop nav ───────────────────────────────────────────────── */}
        <nav
          className="hidden md:block"
          aria-label="Menu principal"
          onMouseLeave={scheduleClose}
          onMouseEnter={cancelClose}
        >
          <ul
            ref={navListRef}
            className="relative flex items-center list-none m-0 p-0"
          >
            {/* Sliding indicator pill */}
            <div
              aria-hidden
              className="absolute top-1 bottom-1 left-0 rounded-full bg-brand-navy/7 pointer-events-none"
              style={{
                transform: `translateX(${indicator.tx}px)`,
                width: indicator.width,
                opacity: indicator.visible ? 1 : 0,
                transition:
                  "transform 230ms cubic-bezier(0.32,0.08,0.24,1), width 230ms cubic-bezier(0.32,0.08,0.24,1), opacity 160ms ease",
              }}
            />

            {navItems.map((item) => (
              <li key={item.id}>
                {item.dropdown ? (
                  <button
                    ref={(el) => {
                      if (el) itemRefs.current.set(item.id, el);
                    }}
                    className={itemClass}
                    onMouseEnter={() => {
                      cancelClose();
                      handleItemEnter(item.id);
                    }}
                    aria-expanded={activeId === item.id}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${activeId === item.id ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    ref={(el) => {
                      if (el)
                        itemRefs.current.set(
                          item.id,
                          el as unknown as HTMLElement,
                        );
                    }}
                    className={itemClass}
                    onMouseEnter={() => {
                      cancelClose();
                      handleItemEnter(item.id);
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <ActionButton href="/apoie" className="whitespace-nowrap">
          Doe Agora
        </ActionButton>
      </div>

      {/* ── Dropdown viewport ─────────────────────────────────────────────── */}
      {showVp && (
        <div
          className="hidden md:block absolute pointer-events-none"
          style={{
            top: "100%",
            left: clampedLeft,
            paddingTop: 4,
            zIndex: 10,
            transition: "left 220ms cubic-bezier(0.32,0.08,0.24,1)",
          }}
        >
          <div
            className="pointer-events-auto relative overflow-hidden rounded-xl border border-brand-navy/8 bg-white shadow-xl shadow-brand-navy/10"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            style={{
              width: panelWidth,
              transformOrigin: "top center",
              animation: vpOpen
                ? "nav-zoom-in 200ms cubic-bezier(0.32,0.08,0.24,1) forwards"
                : `nav-zoom-out ${CLOSE_MS}ms ease forwards`,
            }}
          >
            {DROPDOWN_ITEMS.map((item) => {
              const isActive = item.id === activeId;
              const isPrev = item.id === prevId;
              if (!isActive && !isPrev) return null;

              const motion = getMotion(item.id);

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) contentRefs.current.set(item.id, el);
                  }}
                  className="p-3"
                  style={{
                    ...(isPrev && !isActive
                      ? { position: "absolute", inset: 0 }
                      : {}),
                    ...(motion ? { animation: MOTION_ANIM[motion] } : {}),
                  }}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {item.dropdown!.map((drop) => (
                      <Link
                        key={drop.label}
                        href={drop.href}
                        className="flex items-start gap-3 rounded-lg p-3 hover:bg-brand-navy/5 transition-colors group"
                      >
                        <div className="shrink-0 w-9 h-9 rounded-lg bg-brand-pink/10 flex items-center justify-center text-brand-pink">
                          <drop.Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold font-display text-brand-navy leading-tight">
                            {drop.label}
                          </p>
                          <p className="text-xs text-brand-navy/50 leading-relaxed mt-0.5">
                            {drop.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
