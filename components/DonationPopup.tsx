"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { DonationWidget } from "./DonationWidget";

const COOKIE_NAME = "donation_popup_dismissed";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

function isDismissed(): boolean {
  return document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE_NAME}=`));
}

function dismiss(): void {
  document.cookie = `${COOKIE_NAME}=1; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

interface DonationPopupProps {
  delay?: number; // ms, default 60_000
}

export function DonationPopup({ delay = 60_000 }: DonationPopupProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isDismissed()) return;

    const t = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)));
    }, delay);

    return () => clearTimeout(t);
  }, [delay]);

  const close = useCallback(() => {
    setAnimating(false);
    dismiss();
    setTimeout(() => setVisible(false), 400);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, close]);

  if (!mounted || !visible) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          backgroundColor: `rgba(10,24,61,${animating ? 0.72 : 0})`,
          backdropFilter: animating ? "blur(6px)" : "blur(0px)",
          transition: "background-color 400ms ease, backdrop-filter 400ms ease",
        }}
      />

      {/* Popup card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Faça uma doação"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 91,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            opacity: animating ? 1 : 0,
            transform: animating ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
            transition: [
              "opacity 400ms cubic-bezier(0.34,1.56,0.64,1)",
              "transform 400ms cubic-bezier(0.34,1.56,0.64,1)",
            ].join(", "),
            position: "relative",
            maxHeight: "90dvh",
            overflowY: "auto",
            borderRadius: "1.5rem",
          }}
        >
          {/* Decorative top gradient bar */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "6px",
              borderRadius: "1.5rem 1.5rem 0 0",
              background: "linear-gradient(90deg, #e8178a 0%, #29abe2 50%, #e8178a 100%)",
              backgroundSize: "200% 100%",
              animation: "gradientSlide 3s linear infinite",
            }}
          />

          {/* Header band */}
          <div
            style={{
              background: "linear-gradient(135deg, #1d2b4f 0%, #0f1a33 100%)",
              borderRadius: "1.5rem 1.5rem 0 0",
              padding: "1.5rem 1.75rem 1.25rem",
              paddingTop: "calc(1.5rem + 6px)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div>
              <p
                style={{
                  color: "#e8178a",
                  fontSize: "0.65rem",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "0.35rem",
                }}
              >
                Instituto Sempre Com Você
              </p>
              <h2
                style={{
                  color: "#ffffff",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  lineHeight: 1.25,
                  margin: 0,
                }}
              >
                Sua doação muda vidas
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  marginTop: "0.35rem",
                  lineHeight: 1.5,
                }}
              >
                Apoie pessoas com câncer e suas famílias
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={close}
              aria-label="Fechar popup de doação"
              style={{
                flexShrink: 0,
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: 700,
                transition: "background 200ms ease, color 200ms ease",
                marginTop: "0.1rem",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#e8178a";
                (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
              }}
            >
              ✕
            </button>
          </div>

          {/* Widget container */}
          <div
            style={{
              background: "#f8fafc",
              borderRadius: "0 0 1.5rem 1.5rem",
              padding: "1.25rem",
              boxShadow: "0 32px 80px rgba(10,24,61,0.35), 0 8px 24px rgba(10,24,61,0.15)",
            }}
          >
            <DonationWidget />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradientSlide {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </>,
    document.body,
  );
}
