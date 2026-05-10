"use client";

import { useState } from "react";

export function PixCopyButton({ chavePix }: { chavePix: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(chavePix);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent fail — text is selectable as fallback
    }
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full bg-brand-blue-light border border-brand-blue rounded-xl overflow-hidden">
        <div className="px-2 py-1 text-xs font-mono text-brand-navy/50 text-center break-all select-all leading-relaxed overflow-y-auto h-11">
          {chavePix}
        </div>
      </div>
      <button
        onClick={handleCopy}
        aria-label="Copiar código Pix"
        className={`w-full font-bold font-display text-sm py-3.5 px-6 rounded-full transition-all duration-200 ${
          copied
            ? "bg-brand-blue/10 text-brand-blue cursor-default"
            : "bg-brand-blue text-white hover:bg-brand-blue/90 hover:shadow-lg hover:shadow-brand-blue/25 hover:-translate-y-0.5 active:translate-y-0"
        }`}
      >
        {copied ? "✓ Código copiado!" : "Copiar código Pix"}
      </button>
    </div>
  );
}
