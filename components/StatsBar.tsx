const stats = [
  { number: "500+", label: "Pacientes Atendidos", icon: "👤" },
  { number: "1.200+", label: "Famílias Apoiadas", icon: "🏠" },
  { number: "15 Anos", label: "De Experiência", icon: "⭐" },
  { number: "120+", label: "Voluntários Ativos", icon: "🤝" },
];

export function StatsBar() {
  return (
    <section className="bg-brand-navy py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x lg:divide-white/[0.08]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center px-8 gap-2"
            >
              <span className="text-2xl">{stat.icon}</span>
              <span className="font-display font-extrabold text-[2.25rem] text-brand-pink leading-none">
                {stat.number}
              </span>
              <span className="text-white/50 text-sm font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
