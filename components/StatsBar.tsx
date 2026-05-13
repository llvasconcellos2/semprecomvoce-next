import { stats } from "@/data/data";
import { StatNumber } from "./StatNumber";

export function StatsBar({
  bg = "bg-brand-navy",
  color = "text-white/50",
}: {
  bg?: string;
  color?: string;
}) {
  return (
    <section className={`${bg} py-14`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x lg:divide-white/8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center px-8 gap-2"
            >
              <span className="text-2xl">{stat.icon}</span>
              <StatNumber
                duration={3000}
                value={stat.number}
                className="font-display font-extrabold text-[2.25rem] text-brand-pink leading-none"
              ></StatNumber>
              <span className={`${color} text-sm font-medium`}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
