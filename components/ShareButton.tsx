"use client";

import { Children, useEffect, useRef, useState } from "react";
import { SITE_URL } from "@/lib/constants";

const SHARE_TEXT =
  "Conheça o Instituto Sempre Com Você, uma ONG que transforma vidas de pessoas com câncer e suas famílias.";

const SHARE_DATA = {
  title: "Instituto Sempre Com Você",
  text: SHARE_TEXT,
  url: SITE_URL,
};

export function ShareButton({
  className,
  children,
}: { className?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(SHARE_DATA);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setModalOpen(true);
        }
      }
    } else {
      setModalOpen(true);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(SITE_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  useEffect(() => {
    if (!modalOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setModalOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${SITE_URL}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`;

  return (
    <>
      <button onClick={handleShare} className={className}>
        {children}
      </button>

      {modalOpen && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === backdropRef.current) setModalOpen(false);
          }}
        >
          <div className="bg-[#2f3b5c] border border-white/10 rounded-3xl p-8 max-w-sm w-full mx-4 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-lg text-white">
                Compartilhar
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white/40 hover:text-white/80 transition-[color] duration-150 text-2xl leading-none -mr-1"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3.5 px-5 rounded-2xl bg-white/8 hover:bg-white/14 text-white transition-[background-color] duration-150 font-semibold font-display text-sm"
              >
                <span className="text-xl leading-none">💬</span>
                WhatsApp
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3.5 px-5 rounded-2xl bg-white/8 hover:bg-white/14 text-white transition-[background-color] duration-150 font-semibold font-display text-sm"
              >
                <span className="text-xl leading-none">📘</span>
                Facebook
              </a>
              <button
                onClick={handleCopy}
                className="flex items-center gap-3 py-3.5 px-5 rounded-2xl bg-white/8 hover:bg-white/14 text-white transition-[background-color,color] duration-150 font-semibold font-display text-sm text-left"
              >
                <span className="text-xl leading-none">
                  {copied ? "✅" : "🔗"}
                </span>
                {copied ? "Link copiado!" : "Copiar link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
