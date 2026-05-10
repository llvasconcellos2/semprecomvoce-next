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
  const [qrcodeExpanded, setQrcodeExpanded] = useState(false);
  const [qrcodeVisible, setQrcodeVisible] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const openQrcode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: rect.left + rect.width / 2 - window.innerWidth / 2,
      y: rect.top + rect.height / 2 - window.innerHeight / 2,
    });
    setQrcodeExpanded(true);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setQrcodeVisible(true)),
    );
  };

  const closeQrcode = useCallback(() => {
    setQrcodeVisible(false);
    setTimeout(() => setQrcodeExpanded(false), 300);
  }, []);

  useEffect(() => {
    if (!qrcodeExpanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQrcode();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [qrcodeExpanded, closeQrcode]);

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
              Click no QR code para ampliar ou copie o código
            </p>

            {/* PIX QRCODE */}
            <button
              id="qrcode"
              onClick={openQrcode}
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

      {qrcodeExpanded &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="QR Code ampliado"
            onClick={closeQrcode}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{
              backgroundColor: `rgba(10,24,61,${qrcodeVisible ? 0.7 : 0})`,
              backdropFilter: qrcodeVisible ? "blur(6px)" : "blur(0px)",
              transition:
                "background-color 300ms ease, backdrop-filter 300ms ease",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                transformOrigin: `calc(50% + ${origin.x}px) calc(50% + ${origin.y}px)`,
                transform: qrcodeVisible ? "scale(1)" : "scale(0.08)",
                opacity: qrcodeVisible ? 1 : 0,
                transition:
                  "transform 350ms cubic-bezier(0.34,1.56,0.64,1), opacity 250ms ease",
              }}
              className="relative"
            >
              <button
                onClick={closeQrcode}
                aria-label="Fechar"
                className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white shadow-lg shadow-brand-navy/25 flex items-center justify-center text-brand-navy text-sm font-bold hover:bg-brand-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue active:scale-95"
                style={{
                  transition:
                    "background-color 150ms ease, color 150ms ease, transform 100ms ease",
                }}
              >
                ✕
              </button>
              <Image
                src={PIX[amount].qrcode}
                alt="QR Code Pix Instituto Sempre Com Você"
                width={320}
                height={320}
                className="rounded-2xl shadow-2xl shadow-brand-navy/30 border-2 border-white/30 block"
                style={{ width: "min(320px, 80vw)", height: "auto" }}
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
