import type { ReactNode } from "react";

export function LegalHero({
  label,
  title,
  updatedAt,
}: {
  label: string;
  title: string;
  updatedAt: string;
}) {
  return (
    <section className="bg-brand-navy relative overflow-hidden pt-36 pb-16 px-6">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, #E8178A33 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-4xl mx-auto relative z-10">
        <p className="text-brand-pink font-display font-semibold text-xs uppercase tracking-[0.2em] mb-4">
          {label}
        </p>
        <h1 className="font-display font-bold text-white! text-4xl md:text-5xl leading-tight mb-4">
          {title}
        </h1>
        <p className="text-white/50 text-sm">Última atualização: {updatedAt}</p>
      </div>
    </section>
  );
}

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-display font-bold text-brand-pink text-sm shrink-0">
          {number}
        </span>
        <h2 className="font-display font-bold text-brand-navy text-xl md:text-2xl">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-brand-navy/70 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function LegalSubSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-6">
      <h3 className="font-display font-semibold text-brand-navy text-base mb-3">
        {title}
      </h3>
      <div className="space-y-3 text-brand-navy/70 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function LegalInfoBox({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-brand-pink-light border border-brand-pink/20 rounded-xl p-5 mt-4 text-sm text-brand-navy/80 leading-relaxed ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function LegalDataTable({
  rows,
}: {
  rows: [string, ReactNode][];
}) {
  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-brand-navy/10">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([key, value], i) => (
            <tr
              key={key}
              className={i % 2 === 0 ? "bg-white" : "bg-brand-pink-light/40"}
            >
              <td className="py-3 px-4 font-semibold text-brand-navy/80 w-2/5 align-top">
                {key}
              </td>
              <td className="py-3 px-4 text-brand-navy/65 leading-relaxed">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
