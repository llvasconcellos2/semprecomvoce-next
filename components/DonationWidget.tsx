"use client";

import { useState } from "react";
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

  return (
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
            className="rounded-2xl border-2 border-brand-blue/20 bg-brand-blue-light p-3 transition-all
            duration-200  hover:bg-brand-blue/90 hover:shadow-lg hover:shadow-brand-blue/25
            hover:-translate-y-0.5 active:translate-y-0 cursor-pointer
            w-27 h-27  overflow-hidden flex relative justify-center"
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
              // style={{
              //   background: "url(/mercado-pago.png) no-repeat #ffe600 center",
              // }}
            >
              Continuar no MercadoPago →
              <Image
                className="w-80 h-14  overflow-hidden border-2 border-[#ffc800]/40 rounded-xl hover:bg-[#ffc800] hover:shadow-lg hover:shadow-[#ffc800]/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                width={320}
                height={56}
                src="/mercado-pago.png"
                alt="Botão do Mercado Pago"
              />
            </a>
            {/* <a
              href={MP_LINKS[amount] ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-brand-pink text-white font-bold font-display text-sm py-4 px-6 rounded-full hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Continuar no MercadoPago →
            </a> */}
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
  );
}
