import ScatterText from "@/components/ScatterText";
import SectionHeading from "@/components/SectionHeading";
import CountUpStat from "@/components/CountUpStat";

const STATS = [
  { target: 24, label: "Areas Under Development" },
  { target: 12, label: "Cities Across the Region" },
  { target: 3.4, decimals: 1, suffix: "M", label: "Sq. Ft. Master-Planned" },
  { target: 9200, thousands: true, suffix: "+", label: "Investors Onboard" },
];

export default function AreasSection() {
  return (
    <section id="areas" className="relative bg-white px-6 py-24 text-black sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Where we build" title="Areas" />
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-black/10 pt-12 sm:mt-20 sm:gap-10 sm:pt-14 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div key={stat.label}>
              <CountUpStat
                target={stat.target}
                decimals={stat.decimals}
                suffix={stat.suffix}
                thousands={stat.thousands}
                delay={i * 0.1}
                className="font-display text-4xl sm:text-5xl lg:text-6xl"
              />
              <ScatterText
                as="p"
                text={stat.label}
                splitType="words"
                stagger={0.03}
                delay={i * 0.08 + 0.25}
                className="mt-3 font-body text-xs tracking-[0.15em] text-black/50 uppercase"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
