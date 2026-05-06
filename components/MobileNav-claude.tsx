"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { LogoDrawing } from "@/components/logo/LogoDrawing";
import { LogoText } from "@/components/logo/LogoText";
import ActionButton from "./ActionButton";
import { useWindowDimensions } from "@/lib/hooks/useWindowDimensions";

interface NavLink {
  label: string;
  href: string;
}

const DRAWER_WIDTH = 280;

export function MobileNav({ navLinks }: { navLinks: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const viewport = document.getElementById("viewport");
    if (isOpen) {
      const scrollY = viewport?.scrollTop ?? 0;
      setScrollOffset(scrollY);
      if (viewport) viewport.scrollTop = 0;
      document.body.classList.add("mobile-nav-open");
    } else {
      document.body.classList.remove("mobile-nav-open");
      if (viewport) viewport.scrollTop = scrollOffset;
    }
    return () => {
      document.body.classList.remove("mobile-nav-open");
    };
  }, [isOpen, scrollOffset]);

  return (
    <>
      <HamburgerButton isOpen={isOpen} onClick={toggle} />
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
      className="shrink-0 flex flex-col justify-center items-start w-10 h-10 gap-1.25
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
