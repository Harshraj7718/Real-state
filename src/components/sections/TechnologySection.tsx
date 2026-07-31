"use client";

import dynamic from "next/dynamic";
import ScatterText from "@/components/ScatterText";
import SectionHeading from "@/components/SectionHeading";

const TechScene = dynamic(() => import("@/components/TechScene"), { ssr: false });

const FEATURES = [
  { title: "Smart Buildings", detail: "IoT-enabled climate, security & energy systems in every tower." },
  { title: "Digital Twin", detail: "Real-time 3D models track construction against plan, live." },
  { title: "Blockchain Escrow", detail: "Transparent, milestone-based payment tracking for investors." },
];

export default function TechnologySection() {
  return (
    <section
      id="technology"
      className="relative overflow-hidden bg-white px-6 py-24 text-black sm:px-10 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading eyebrow="Built on data" title="Technology" />
          <ScatterText
            as="p"
            text="Every HASH site runs on a proprietary technology stack — from digital twins to blockchain-backed investor dashboards."
            splitType="words"
            stagger={0.015}
            className="mt-8 max-w-md font-body text-sm text-black/60 sm:text-base"
          />
          <div className="mt-10 space-y-8 border-t border-black/10 pt-8">
            {FEATURES.map((f, i) => (
              <div key={f.title}>
                <ScatterText
                  as="h3"
                  text={f.title}
                  splitType="chars"
                  delay={i * 0.06}
                  className="font-display text-xl"
                />
                <ScatterText
                  as="p"
                  text={f.detail}
                  splitType="words"
                  delay={i * 0.06 + 0.15}
                  className="mt-2 font-body text-sm text-black/60"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-square w-full">
          <TechScene />
        </div>
      </div>
    </section>
  );
}
