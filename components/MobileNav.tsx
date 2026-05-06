"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import ActionButton from "./ActionButton";

interface NavLink {
  label: string;
  href: string;
}

const DRAWER_WIDTH = 280;

export function MobileNav({ navLinks }: { navLinks: NavLink[] }) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const viewport = document.getElementById("viewport");
    const navHeader = document.getElementById("nav-header");
    const scrollY = viewport?.scrollTop ?? 0;
    setScrollOffset(scrollY);

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-nav-open");
      if (viewport) viewport.style.overflow = "hidden";
      if (navHeader) navHeader.style.top = `${scrollY}px`;
      setTimeout(() => {
        if (navHeader) navHeader.style.top = `${scrollY}px`;
      }, 500);
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-nav-open");
      setTimeout(() => {
        if (navHeader) navHeader.style.top = "0px";
        if (viewport) viewport.style.overflow = "auto";
      }, 500);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-nav-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onResize = () =>
      window.innerWidth >= 768 &&
      close() &&
      document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [close]);

  const backDrop = mounted
    ? createPortal(
        <Backdrop isOpen={isOpen} scrollOffset={scrollOffset} close={close} />,
        document.getElementById("viewport")!,
      )
    : null;

  const portal = mounted
    ? createPortal(
        <>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              height: "100vh",
              width: `${DRAWER_WIDTH}px`,
              transform: isOpen
                ? "translateX(0)"
                : `translateX(-${DRAWER_WIDTH}px)`,
            }}
            className="flex flex-col overflow-hidden mobile-nav-drawer"
          >
            {/* Drawer header */}
            <div className="relative flex items-center  gap-4 px-5 h-20 border-b border-white/10">
              <button
                onClick={close}
                aria-label="Fechar menu"
                className="w-9 h-9 flex items-center justify-center rounded-lg
                           text-white/40 hover:text-white hover:bg-white/10
                           transition-colors duration-200"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1.5 1.5l13 13M14.5 1.5l-13 13"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <p className="text-white/50">Fechar Menu</p>
            </div>

            {/* Nav links */}
            <nav className="relative flex-1 flex flex-col px-3 py-6 gap-0.5">
              {navLinks.map(({ label, href }, i) => (
                <Link
                  key={label}
                  href={href}
                  onClick={close}
                  style={{
                    transitionProperty: "transform, opacity",
                    transitionDuration: "0.5s, 0.5s",
                    transitionTimingFunction:
                      "cubic-bezier(0.32, 0.08, 0.24, 1), ease",
                    transitionDelay: isOpen ? `${55 + i * 50}ms` : "0ms",
                    transform: isOpen ? "translateX(0)" : "translateX(-128px)",
                    opacity: isOpen ? 1 : 0,
                  }}
                  className="group flex items-center justify-between px-4 py-3.5 rounded-xl
                             text-white/65 font-semibold font-display text-lg
                             hover:text-white hover:bg-white/8 transition-colors duration-200"
                >
                  {label}
                  <svg
                    className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors duration-200"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ))}
            </nav>

            {/* CTA button */}
            <div
              className="relative flex-1 px-6 pt-30 [&_.shimmer-ring]:block [&_.shimmer-ring]:w-full text-center"
              style={{
                transitionProperty: "transform, opacity",
                transitionDuration: "0.4s, 0.4s",
                transitionTimingFunction:
                  "cubic-bezier(0.32, 0.08, 0.24, 1), ease",
                transitionDelay: isOpen
                  ? `${55 + navLinks.length * 40}ms`
                  : "0ms",
                transform: isOpen ? "translateY(0)" : "translateY(34px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <ActionButton href="/#doe" onClick={close}>
                Doe Agora
              </ActionButton>
            </div>
          </div>
        </>,
        document.body,
      )
    : null;

  return (
    <>
      <HamburgerButton isOpen={isOpen} onClick={toggle} />
      {backDrop}
      {portal}
    </>
  );
}

function HamburgerButton({
  isOpen,
  onClick: onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      aria-expanded={isOpen}
      className="md:hidden shrink-0 flex flex-col justify-center items-start w-10 h-10 gap-1.25
                     rounded-lg hover:bg-brand-navy/5 transition-colors duration-800 px-2"
    >
      <span
        className="block h-0.5 bg-brand-navy rounded-full transition-all duration-800 origin-center"
        style={{
          width: "18px",
          transform: isOpen ? "translateY(6.5px) rotate(45deg)" : undefined,
        }}
      />
      <span
        className="block h-0.5 bg-brand-navy rounded-full transition-all duration-800"
        style={{
          width: "14px",
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? "scaleX(0)" : undefined,
        }}
      />
      <span
        className="block h-0.5 bg-brand-navy rounded-full transition-all duration-800 origin-center"
        style={{
          width: "18px",
          transform: isOpen ? "translateY(-6.5px) rotate(-45deg)" : undefined,
        }}
      />
    </button>
  );
}

function Backdrop({
  isOpen,
  scrollOffset,
  close,
}: {
  isOpen: boolean;
  scrollOffset: number;
  close: () => void;
}) {
  return (
    <div
      id="mobile-nav-backdrop"
      onClick={close}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: scrollOffset,
        left: 0,
        right: 0,
        height: "calc(100vh * 0.9)",
        zIndex: 59,
        // background: "rgba(10, 15, 35, 0.55)",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
        transition: "opacity 0.4s cubic-bezier(0.32, 0.08, 0.24, 1)",
      }}
    />
  );
}
