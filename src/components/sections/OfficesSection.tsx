"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ScatterText from "@/components/ScatterText";
import SectionHeading from "@/components/SectionHeading";

const OFFICES = [
  { city: "Mumbai", seed: 3 },
  { city: "Dubai", seed: 7 },
  { city: "Singapore", seed: 2 },
  { city: "London", seed: 5 },
];

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function Skyline({ seed }: { seed: number }) {
  const rand = seededRandom(seed);
  const bars = Array.from({ length: 14 }).map((_, i) => {
    const width = 5;
    const x = i * width;
    const height = 25 + rand() * 65;
    return { x, height };
  });
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
      <rect width="100" height="100" fill="black" />
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={bar.x + 0.5}
          y={100 - bar.height}
          width={4}
          height={bar.height}
          fill="white"
          opacity={0.85}
        />
      ))}
      <rect width="100" height="100" fill="url(#officegrad)" />
      <defs>
        <linearGradient id="officegrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.85" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function OfficesSection() {
  return (
    <section id="offices" className="relative bg-black py-24 text-white sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading eyebrow="Where we work" title="Offices" dark />
        <ScatterText
          as="p"
          text="HASH studios sit inside the developments we build — embedded in the cities we're reshaping."
          splitType="words"
          className="mt-8 max-w-md font-body text-sm text-white/60 sm:text-base"
        />
      </div>
      <div className="mt-12 pl-6 sm:mt-16 sm:pl-10">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          loop
          autoplay={{ delay: 3500 }}
          spaceBetween={24}
          slidesPerView={1.15}
          breakpoints={{
            768: { slidesPerView: 2.2 },
            1280: { slidesPerView: 2.6 },
          }}
          className="office-swiper !overflow-visible"
        >
          {OFFICES.map((office) => (
            <SwiperSlide key={office.city}>
              <div className="relative aspect-4/5 overflow-hidden bg-white/5">
                <Skyline seed={office.seed} />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="font-accent text-2xl italic">{office.city}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
