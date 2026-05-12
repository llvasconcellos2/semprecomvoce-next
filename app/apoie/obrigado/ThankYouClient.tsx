"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

type PaymentStatus = string;

interface StatusConfig {
  iconType: "check" | "clock" | "x";
  accentColor: string;
  glowColor: string;
  title: string;
  subtitle: string;
  body: string;
  showConfetti: boolean;
  showShare: boolean;
  showRetry: boolean;
}

const CONFIGS: Record<string, StatusConfig> = {
  approved: {
    iconType: "check",
    accentColor: "#E8178A",
    glowColor: "rgba(232,23,138,0.22)",
    title: "Obrigado pela\nsua doação!",
    subtitle: "Você acaba de transformar vidas.",
    body: "Sua generosidade chegará diretamente às famílias de pacientes com câncer. Cada real doado traz esperança, cuidado e dignidade para quem mais precisa.",
    showConfetti: true,
    showShare: true,
    showRetry: false,
  },
  pending: {
    iconType: "clock",
    accentColor: "#29ABE2",
    glowColor: "rgba(41,171,226,0.22)",
    title: "Doação em\nprocessamento",
    subtitle: "Estamos quase lá!",
    body: "Seu pagamento está sendo processado. Assim que confirmado, sua generosidade estará a caminho de quem mais precisa.",
    showConfetti: false,
    showShare: false,
    showRetry: false,
  },
  in_process: {
    iconType: "clock",
    accentColor: "#29ABE2",
    glowColor: "rgba(41,171,226,0.22)",
    title: "Pagamento em\nverificação",
    subtitle: "Verificando sua transação.",
    body: "Seu pagamento está em análise. Você receberá uma confirmação assim que o processo for concluído.",
    showConfetti: false,
    showShare: false,
    showRetry: false,
  },
  rejected: {
    iconType: "x",
    accentColor: "#f9781f",
    glowColor: "rgba(249,120,31,0.22)",
    title: "Pagamento não\nautorizado",
    subtitle: "Não se preocupe, tente novamente.",
    body: "O pagamento foi recusado. Por favor, tente com outro cartão ou método de pagamento. Sua generosidade é muito importante para nós.",
    showConfetti: false,
    showShare: false,
    showRetry: true,
  },
  cancelled: {
    iconType: "x",
    accentColor: "#f9781f",
    glowColor: "rgba(249,120,31,0.22)",
    title: "Doação cancelada",
    subtitle: "Tudo bem, pode tentar novamente.",
    body: "A doação foi cancelada. Se foi um engano, você pode tentar a qualquer momento. Estaremos aqui quando você estiver pronto.",
    showConfetti: false,
    showShare: false,
    showRetry: true,
  },
  failure: {
    iconType: "x",
    accentColor: "#f9781f",
    glowColor: "rgba(249,120,31,0.22)",
    title: "Algo deu\nerrado",
    subtitle: "Houve um problema com o pagamento.",
    body: "Por favor, tente novamente. Se o problema persistir, entre em contato conosco.",
    showConfetti: false,
    showShare: false,
    showRetry: true,
  },
};

// Confetti pieces computed at module level — deterministic, no hydration mismatch
const CONFETTI_PIECES = Array.from({ length: 32 }, (_, i) => {
  const angle = (i / 32) * 360;
  const rad = (angle * Math.PI) / 180;
  const distance = 70 + (i % 4) * 28;
  return {
    tx: Math.cos(rad) * distance,
    ty: Math.sin(rad) * distance,
    color: ["#E8178A", "#29ABE2", "#00a815", "#f9781f", "#ffffff"][i % 5],
    w: 4 + (i % 3) * 2,
    h: (4 + (i % 3) * 2) * 1.6,
    rot: (i * 43) % 360,
    delay: i * 0.022,
  };
});

function ConfettiBurst() {
  return (
    <>
      <style>{`
        @keyframes cfb {
          0%   { transform: translate(0,0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate(var(--cx),var(--cy)) rotate(var(--cr)) scale(0); opacity: 0; }
        }
      `}</style>
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden
      >
        {CONFETTI_PIECES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-sm"
            style={
              {
                width: p.w,
                height: p.h,
                backgroundColor: p.color,
                "--cx": `${p.tx}px`,
                "--cy": `${p.ty}px`,
                "--cr": `${p.rot}deg`,
                animation: `cfb 1s cubic-bezier(0.22,1,0.36,1) ${p.delay}s both`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
}

// Deterministic — safe to compute at module level (no hydration mismatch)
const HEARTS = Array.from({ length: 10 }, (_, i) => ({
  left: `${5 + i * 9.2}%`,
  delay: `${(i * 0.7) % 5}s`,
  dur: `${5 + ((i * 0.9) % 5)}s`,
  size: 8 + ((i * 3) % 14),
  opacity: 0.04 + ((i * 0.01) % 0.08),
}));

function FloatingHearts() {
  return (
    <>
      <style>{`
        @keyframes rise {
          0%   { transform: translateY(0); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 0.6; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        {HEARTS.map((h, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: h.left,
              bottom: -20,
              width: h.size,
              height: h.size,
              animationDelay: h.delay,
              animationDuration: h.dur,
              opacity: h.opacity,
              color: "#E8178A",
              animation: `rise ${h.dur} linear ${h.delay} infinite`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ width: "100%", height: "100%" }}
            >
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}

export default function ThankYouClient({ status }: { status: PaymentStatus }) {
  const [confettiReady, setConfettiReady] = useState(false);
  const cfg = CONFIGS[status] ?? CONFIGS.approved;

  useEffect(() => {
    if (cfg.showConfetti) {
      const t = setTimeout(() => setConfettiReady(true), 350);
      return () => clearTimeout(t);
    }
  }, [cfg.showConfetti]);

  const shareText = encodeURIComponent(
    "Acabei de fazer uma doação para o Instituto do Câncer Sempre Com Você! Uma ONG incrível que apoia famílias de pacientes com câncer. Junte-se a mim! 💜",
  );
  const shareUrl = encodeURIComponent(`${SITE_URL}/apoie`);

  return (
    <div className="relative min-h-[calc(100vh-280px)] flex flex-col items-center justify-center px-6 py-20 pt-40!">
      {/* Ambient glow that matches status color */}
      <div
        className="pointer-events-none fixed inset-0 transition-colors duration-700"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 30%, ${cfg.glowColor}, transparent)`,
        }}
      />

      <FloatingHearts />

      {/* Status icon circle */}
      <div
        className="relative mb-10"
        style={{
          animation: "fade-in-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.05s both",
        }}
      >
        {confettiReady && <ConfettiBurst />}

        {/* Outer shimmer ring */}
        <div
          className="absolute inset-0 rounded-full shimmer-ring pointer-events-none"
          style={{ transform: "scale(1.06)" }}
        />

        <div
          className="relative w-28 h-28 rounded-full flex items-center justify-center"
          style={{
            border: `1.5px solid ${cfg.accentColor}`,
            boxShadow: `0 0 0 6px ${cfg.glowColor}, 0 0 40px ${cfg.glowColor}`,
            color: cfg.accentColor,
          }}
        >
          {cfg.iconType === "check" && (
            <svg
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {cfg.iconType === "clock" && (
            <svg
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx={12} cy={12} r={10} />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          )}
          {cfg.iconType === "x" && (
            <svg
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          )}
        </div>
      </div>

      {/* Heading + body */}
      <div
        className="text-center max-w-lg"
        style={{
          animation: "fade-in-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.18s both",
        }}
      >
        <h1
          className="font-display font-bold text-white! leading-tight mb-3 whitespace-pre-line"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {cfg.title}
        </h1>
        <p
          className="text-lg font-display font-semibold mb-4"
          style={{ color: cfg.accentColor }}
        >
          {cfg.subtitle}
        </p>
        <p className="text-white/60 text-base leading-[1.75] mb-10">
          {cfg.body}
        </p>
      </div>

      {/* Impact pill — only for approved */}
      {cfg.showShare && (
        <div
          className="mb-10 px-5 py-2.5 rounded-full flex items-center gap-2.5 border border-white/10 bg-white/5 backdrop-blur-sm"
          style={{
            animation: "fade-in-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.3s both",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              width: 15,
              height: 15,
              color: cfg.accentColor,
              flexShrink: 0,
            }}
          >
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
          <span className="text-white/70 text-sm">
            Impactando diretamente famílias em tratamento de câncer
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div
        className="flex flex-col sm:flex-row gap-3 items-center"
        style={{
          animation: "fade-in-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.4s both",
        }}
      >
        {cfg.showShare && (
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white text-sm hover:scale-105 active:scale-95 transition-transform duration-150"
            style={{
              backgroundColor: "#25D366",
              boxShadow: "0 4px 24px rgba(37,211,102,0.3)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Compartilhar no WhatsApp
          </a>
        )}

        {cfg.showRetry && (
          <Link
            href="/apoie"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-white text-sm hover:scale-105 active:scale-95 transition-transform duration-150"
            style={{
              backgroundColor: cfg.accentColor,
              boxShadow: `0 4px 24px ${cfg.glowColor}`,
            }}
          >
            Tentar novamente
          </Link>
        )}

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-white/60 text-sm border border-white/15 backdrop-blur-sm hover:border-white/35 hover:text-white hover:scale-105 active:scale-95 transition-[transform,border-color,color] duration-150"
        >
          Voltar ao início
        </Link>
      </div>

      {/* Subtle footer note */}
      <p
        className="mt-14 text-white/25 text-xs text-center"
        style={{
          animation: "fade-in-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.6s both",
        }}
      >
        Instituto do Câncer Sempre Com Você · todos os direitos reservados
      </p>
    </div>
  );
}
