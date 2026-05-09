"use client";

import { useState } from "react";
import Image from "next/image";
import { PixCopyButton } from "./PixCopyButton";

// CONFIGURE: Replace with your Pix key (email, CPF, CNPJ, or phone) or full EMV code
const CHAVE_PIX = "contato@institutosemprecomvoce.com.br";

// CONFIGURE: Replace with payment links from your MercadoPago dashboard
const MP_LINKS: Record<string, string> = {
  "25": "#",
  "50": "#",
  "100": "#",
  "200": "#",
  outro: "#",
};

type Tab = "pix" | "cartao";
const AMOUNTS = ["25", "50", "100", "200"] as const;

export function DonationWidget() {
  const [tab, setTab] = useState<Tab>("pix");
  const [amount, setAmount] = useState("50");

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-brand-navy/15 border border-white/50 p-7 w-full max-w-[390px] mx-auto lg:mx-0">
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
        <div className="flex flex-col items-center gap-4">
          <p className="text-brand-navy/60 text-sm text-center leading-relaxed">
            Escaneie o QR code ou copie o código abaixo
          </p>
          {/* CONFIGURE: Replace src with your real Pix QR code image */}
          <div className="rounded-2xl border-2 border-brand-blue/20 bg-brand-blue-light p-3">
            <Image
              src="/PIXCaixa-QRCode.png"
              alt="QR Code Pix Instituto Sempre Com Você"
              width={506}
              height={508}
              className="rounded-xl w-50"
            />
          </div>
          <PixCopyButton chavePix={CHAVE_PIX} />
          <p className="text-xs text-brand-navy/30 text-center">
            ✓ Seguro&nbsp;&nbsp;·&nbsp;&nbsp;✓
            Instantâneo&nbsp;&nbsp;·&nbsp;&nbsp;✓ Sem taxas extras
          </p>
        </div>
      )}

      {tab === "cartao" && (
        <div className="flex flex-col gap-4">
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
          <a
            href={MP_LINKS[amount] ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-brand-pink text-white font-bold font-display text-sm py-4 px-6 rounded-full hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Continuar no MercadoPago →
          </a>
          <a
            href={MP_LINKS.outro}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-brand-navy/40 text-xs hover:text-brand-pink transition-colors"
          >
            Quero escolher outro valor
          </a>
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
