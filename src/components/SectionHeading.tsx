import ScatterText from "@/components/ScatterText";

export default function SectionHeading({
  eyebrow,
  title,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div>
      <ScatterText
        as="p"
        text={eyebrow}
        splitType="chars"
        stagger={0.02}
        className={`font-accent text-lg italic tracking-widest ${
          dark ? "text-white/60" : "text-black/50"
        }`}
      />
      <ScatterText
        as="h2"
        text={title}
        splitType="words"
        stagger={0.06}
        delay={0.15}
        className="mt-2 font-display text-5xl leading-[0.95] sm:text-7xl"
      />
    </div>
  );
}
