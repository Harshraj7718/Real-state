import ScatterText from "@/components/ScatterText";
import SectionHeading from "@/components/SectionHeading";

const CITIES = ["Mumbai", "Bengaluru", "Dubai", "Singapore", "London", "New York"];
const PINS: [number, number][] = [
  [20, 35],
  [38, 58],
  [62, 42],
  [78, 30],
  [50, 20],
  [30, 72],
];

export default function LocationSection() {
  return (
    <section
      id="location"
      className="relative overflow-hidden bg-black px-6 py-24 text-white sm:px-10 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading eyebrow="Global footprint" title="Location" dark />
          <ScatterText
            as="p"
            text="From gateway cities to emerging growth corridors, HASH identifies land before the market does — securing value at the ground floor of tomorrow's skylines."
            splitType="words"
            stagger={0.015}
            className="mt-8 max-w-md font-body text-sm text-white/60 sm:text-base"
          />
          <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4">
            {CITIES.map((city, i) => (
              <li key={city}>
                <ScatterText
                  as="span"
                  text={city}
                  splitType="chars"
                  stagger={0.02}
                  delay={i * 0.04}
                  className="font-accent text-xl text-white/80 italic"
                />
              </li>
            ))}
          </ul>
        </div>
        <LocationMap />
      </div>
    </section>
  );
}

function LocationMap() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <svg viewBox="0 0 100 100" className="h-full w-full opacity-70">
        <defs>
          <pattern id="dotgrid" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="white" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#dotgrid)" />
        {PINS.map(([x, y], i) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="1.4" fill="white" />
            <circle cx={x} cy={y} r="4" fill="none" stroke="white" strokeWidth="0.3">
              <animate
                attributeName="r"
                values="2;7;2"
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
              <animate
                attributeName="opacity"
                values="0.8;0;0.8"
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
