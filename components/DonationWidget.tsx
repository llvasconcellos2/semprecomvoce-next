"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { PixCopyButton } from "./PixCopyButton";

// CONFIGURE: Replace with payment links from your MercadoPago dashboard
const MP_LINKS: Record<string, string> = {
  outro: "https://mpago.la/17gjCoA",
  "25": "https://mpago.la/17gjCoA",
  "50": "https://mpago.la/17gjCoA",
  "100": "https://mpago.la/17gjCoA",
  "200": "https://mpago.la/17gjCoA",
};

const PIX: Record<string, { text: string; qrcode: string }> = {
  outro: {
    text: "00020126470014br.gov.bcb.pix0125leonardo@imovelkit.com.br5204000053039865406200.005802BR5925LEONARDO LIMA DE VASCONCE6008CURITIBA62100506Doe20063041315",
    qrcode: "/pix/Pix.jpeg",
  },
  "25": {
    text: "00020126470014br.gov.bcb.pix0125leonardo@imovelkit.com.br520400005303986540525.005802BR5925LEONARDO LIMA DE VASCONCE6008CURITIBA62090505Doe2563047754",
    qrcode: "/pix/Pix25.jpeg",
  },
  "50": {
    text: "00020126470014br.gov.bcb.pix0125leonardo@imovelkit.com.br520400005303986540550.005802BR5925LEONARDO LIMA DE VASCONCE6008CURITIBA62090505Doe5063047754",
    qrcode: "/pix/Pix50.jpeg",
  },
  "100": {
    text: "00020126470014br.gov.bcb.pix0125leonardo@imovelkit.com.br5204000053039865406100.005802BR5925LEONARDO LIMA DE VASCONCE6008CURITIBA62100506Doe100630443E0",
    qrcode: "/pix/Pix100.jpeg",
  },
  "200": {
    text: "00020126470014br.gov.bcb.pix0125leonardo@imovelkit.com.br5204000053039865406200.005802BR5925LEONARDO LIMA DE VASCONCE6008CURITIBA62100506Doe20063041315",
    qrcode: "/pix/Pix200.jpeg",
  },
};

type Tab = "pix" | "cartao";
const AMOUNTS = ["25", "50", "100", "200"] as const;

export function DonationWidget() {
  const [tab, setTab] = useState<Tab>("pix");
  const [amount, setAmount] = useState("50");
  type Rect = { top: number; left: number; width: number; height: number };
  const [animRect, setAnimRect] = useState<Rect | null>(null);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const openQrcode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const pw = Math.min(480, window.innerWidth * 0.85);
    const ph = Math.min(
      Math.round((pw * 1280) / 711),
      window.innerHeight * 0.82,
    );
    console.log({ ph });
    setAnimRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    setTargetRect({
      top: (window.innerHeight - ph) / 2,
      left: (window.innerWidth - pw) / 2,
      width: pw,
      height: ph,
    });
    setIsExpanded(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setIsExpanded(true)),
    );
  };

  const closeQrcode = useCallback(() => {
    setIsExpanded(false);
    setTimeout(() => {
      setAnimRect(null);
      setTargetRect(null);
    }, 380);
  }, []);

  useEffect(() => {
    if (!animRect) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQrcode();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [animRect, closeQrcode]);

  return (
    <>
      <div className="bg-white rounded-3xl shadow-2xl shadow-brand-navy/15 border border-white/50 p-7 w-full max-w-[390px] mx-auto lg:mx-0 min-h-152">
        <div className="mb-5">
          <p className="text-brand-navy/45 text-xs font-display font-bold uppercase tracking-widest mb-1">
            Faça sua doação
          </p>
          <h3 className="text-brand-navy font-display font-bold text-lg leading-snug">
            Escolha como quer contribuir
          </h3>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-2xl bg-gray-100 p-1 mb-6 gap-1">
          <button
            onClick={() => setTab("pix")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold font-display transition-all duration-200 ${
              tab === "pix"
                ? "bg-brand-blue text-white shadow-sm shadow-brand-blue/30"
                : "text-brand-navy/50 hover:text-brand-navy"
            }`}
          >
            Pix
          </button>
          <button
            onClick={() => setTab("cartao")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold font-display transition-all duration-200 ${
              tab === "cartao"
                ? "bg-brand-pink text-white shadow-sm shadow-brand-pink/30"
                : "text-brand-navy/50 hover:text-brand-navy"
            }`}
          >
            Cartão / Boleto
          </button>
        </div>

        {tab === "pix" && (
          <div className="flex flex-col items-center gap-4 min-h-111">
            <p className="text-brand-navy/65 text-sm font-display font-semibold w-full">
              Escolha um valor para sua doação:
            </p>
            <div className="grid grid-cols-2 gap-2 w-full">
              {AMOUNTS.map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className={`py-3 rounded-xl text-sm font-bold font-display transition-all duration-200 ${
                    amount === v
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/30 scale-[1.03]"
                      : "bg-brand-blue-light text-brand-blue hover:bg-brand-blue/10 active:scale-95"
                  }`}
                >
                  R$&nbsp;{v}
                </button>
              ))}
            </div>
            <p className="text-brand-navy/60 text-sm text-center leading-relaxed">
              <b>Clique</b> no QR code para ampliar ou copie o código
            </p>

            {/* PIX QRCODE */}
            <button
              id="qrcode"
              onClick={openQrcode}
              style={{
                opacity: animRect ? 0 : 1,
                transition: "opacity 80ms ease",
              }}
              className="rounded-2xl border-2 border-brand-blue/20 bg-brand-blue-light p-3 transition-all
              duration-200 hover:bg-brand-blue/90 hover:shadow-lg hover:shadow-brand-blue/25
              hover:-translate-y-0.5 active:translate-y-0 cursor-pointer
              w-27 h-27 overflow-hidden flex relative justify-center"
            >
              <Image
                src={PIX[amount].qrcode}
                alt="QR Code Pix Instituto Sempre Com Você"
                width={711}
                height={1280}
                className="rounded-xl w-40 max-w-40 h-74 -top-18 -left-8 absolute"
              />
            </button>
            <PixCopyButton chavePix={PIX[amount].text} />
            <p className="text-xs text-brand-navy/30 text-center">
              ✓ Seguro&nbsp;&nbsp;·&nbsp;&nbsp;✓
              Instantâneo&nbsp;&nbsp;·&nbsp;&nbsp;✓ Sem taxas extras
            </p>
          </div>
        )}

        {tab === "cartao" && (
          <div className="flex flex-col gap-4 min-h-111">
            <p className="text-brand-navy/65 text-sm font-display font-semibold">
              Escolha um valor para sua doação:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {AMOUNTS.map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className={`py-3 rounded-xl text-sm font-bold font-display transition-all duration-200 ${
                    amount === v
                      ? "bg-brand-pink text-white shadow-md shadow-brand-pink/25 scale-[1.03]"
                      : "bg-brand-pink-light text-brand-pink hover:bg-brand-pink/10 active:scale-95"
                  }`}
                >
                  R$&nbsp;{v}
                </button>
              ))}
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-3">
              <a
                href="https://mpago.la/17gjCoA"
                className="flex flex-col items-center"
              >
                Continuar no MercadoPago →
                <Image
                  className="w-80 h-14 overflow-hidden border-2 border-[#ffc800]/40 rounded-xl hover:bg-[#ffc800] hover:shadow-lg hover:shadow-[#ffc800]/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  width={320}
                  height={56}
                  src="/mercado-pago.png"
                  alt="Botão do Mercado Pago"
                />
              </a>
              <a
                href={MP_LINKS.outro}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-brand-navy/40 text-xs hover:text-brand-pink transition-colors"
              >
                Quero escolher outro valor
              </a>
            </div>
            <div className="flex items-center justify-center gap-1.5 pt-1">
              <span className="text-xs" aria-hidden="true">
                🔒
              </span>
              <span className="text-xs text-brand-navy/35">
                Pagamento seguro via MercadoPago
              </span>
            </div>
          </div>
        )}
      </div>

      {animRect &&
        targetRect &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              onClick={closeQrcode}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 40,
                backgroundColor: `rgba(10,24,61,${isExpanded ? 0.72 : 0})`,
                backdropFilter: isExpanded ? "blur(6px)" : "blur(0px)",
                transition:
                  "background-color 1000ms ease, backdrop-filter 1000ms ease",
              }}
            />

            {/* Hero element — morphs from button rect to popup rect */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="QR Code ampliado"
              className="border-4 border-brand-blue bg-brand-blue-light"
              style={{
                position: "fixed",
                zIndex: 100,
                // overflow: "hidden",
                borderRadius: "1rem",
                top: isExpanded ? targetRect.top : animRect.top,
                left: isExpanded ? targetRect.left : animRect.left,
                width: isExpanded ? targetRect.width : animRect.width,
                height: isExpanded ? targetRect.height : animRect.height,
                boxShadow: isExpanded
                  ? "0 24px 64px rgba(10,24,61,0.35)"
                  : "0 4px 12px rgba(10,24,61,0.15)",
                transition: [
                  "top 1000ms cubic-bezier(0.34,1.56,0.64,1)",
                  "left 1000ms cubic-bezier(0.34,1.56,0.64,1)",
                  "width 1000ms cubic-bezier(0.34,1.56,0.64,1)",
                  "height 1000ms cubic-bezier(0.34,1.56,0.64,1)",
                  "box-shadow 1000ms ease",
                ].join(", "),
              }}
            >
              <Image
                src={PIX[amount].qrcode}
                alt="QR Code Pix Instituto Sempre Com Você"
                fill
                style={{ objectFit: "cover" }}
                sizes="280px"
              />
              <button
                onClick={closeQrcode}
                aria-label="Fechar"
                style={{
                  zIndex: 1000,
                  opacity: isExpanded ? 1 : 0,
                  transform: isExpanded ? "scale(1)" : "scale(0.6)",
                  transition:
                    "background-color 400ms ease, color 400ms ease, transform 400ms ease",
                }}
                className="cursor-pointer absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg shadow-brand-navy/25 flex items-center justify-center text-brand-navy text-sm font-bold hover:bg-brand-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue active:scale-95"
              >
                ✕
              </button>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
