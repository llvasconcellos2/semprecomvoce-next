"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";

const CONSENT_COOKIE = "analytics_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;
// Replace with your actual GA4 Measurement ID before going live
const GA_ID = "G-XXXXXXXXXX";

function getConsent(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  return match ? (match.split("=")[1] ?? null) : null;
}

function saveConsent(value: "granted" | "denied"): void {
  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${CONSENT_MAX_AGE}; path=/; SameSite=Lax`;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    const saved = getConsent();
    setConsent(saved);
    if (!saved) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function handleAccept() {
    saveConsent("granted");
    setConsent("granted");
    setVisible(false);
  }

  function handleDeny() {
    saveConsent("denied");
    setConsent("denied");
    setVisible(false);
  }

  return (
    <>
      {consent === "granted" && <GoogleAnalytics gaId={GA_ID} />}

      {visible && (
        <div
          role="dialog"
          aria-label="Consentimento de cookies"
          aria-live="polite"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          style={{ animation: "fade-in-up 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <div className="max-w-5xl mx-auto bg-brand-navy border border-white/10 rounded-2xl px-5 py-4 md:px-6 md:py-5 shadow-[0_-4px_40px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1 text-sm text-white/70 leading-relaxed">
                <span className="font-display font-semibold text-white">
                  Cookies e privacidade
                </span>{" "}
                — Usamos o Google Analytics para entender como o site é utilizado
                e melhorar nossos programas de apoio. Seus dados são anonimizados
                e nunca usados para publicidade.{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="text-brand-pink hover:underline whitespace-nowrap"
                >
                  Saiba mais
                </Link>
              </div>
              <div className="flex gap-3 shrink-0 self-end sm:self-auto">
                <button
                  onClick={handleDeny}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold font-display text-white/55
                             border border-white/15 hover:border-white/35 hover:text-white/80
                             transition-[border-color,color] duration-200 cursor-pointer"
                >
                  Recusar
                </button>
                <button
                  onClick={handleAccept}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold font-display
                             bg-brand-pink text-white hover:opacity-90
                             active:scale-[0.97] transition-[opacity,transform] duration-150 cursor-pointer"
                >
                  Aceitar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
