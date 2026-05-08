import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apoie o Instituto Sempre Com Você",
  description: "Faça sua doação e ajude pessoas com câncer e suas famílias.",
  alternates: {
    canonical: "https://institutosemprecomvoce.com.br/apoie",
  },
};

export default function ApoiePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="font-display text-4xl font-bold text-brand-navy mb-4">
        Apoie o Instituto
      </h1>
      <p className="text-brand-navy/70 max-w-md">
        Página de doações em construção. Em breve você poderá contribuir diretamente por aqui.
      </p>
    </section>
  );
}
