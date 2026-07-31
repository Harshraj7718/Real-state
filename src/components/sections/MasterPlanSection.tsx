"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScatterText from "@/components/ScatterText";
import SectionHeading from "@/components/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  { name: "Phase I", detail: "Residential towers & landscaped podium" },
  { name: "Phase II", detail: "Retail promenade & civic plaza" },
  { name: "Phase III", detail: "Corporate offices & innovation campus" },
];

export default function MasterPlanSection() {
  return (
    <section id="masterplan" className="relative bg-white px-6 py-24 text-black sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <BlueprintGraphic />
        <div>
          <SectionHeading eyebrow="Designed to scale" title="Master Plan" />
          <ScatterText
            as="p"
            text="Every HASH development begins with a master plan engineered for density, mobility and green space in equal measure — a blueprint that grows in phases without ever losing coherence."
            splitType="words"
            stagger={0.015}
            className="mt-8 max-w-md font-body text-sm text-black/60 sm:text-base"
          />
          <div className="mt-10 space-y-6 border-t border-black/10 pt-8">
            {PHASES.map((phase, i) => (
              <div key={phase.name} className="flex items-baseline gap-6">
                <ScatterText
                  as="span"
                  text={phase.name}
                  splitType="chars"
                  delay={i * 0.06}
                  className="w-20 shrink-0 font-display text-xl"
                />
                <ScatterText
                  as="span"
                  text={phase.detail}
                  splitType="words"
                  delay={i * 0.06 + 0.15}
                  className="font-body text-sm text-black/60"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlueprintGraphic() {
  const svgRef = useRef<SVGSVGElement>(null);
  const shapeRefs = useRef<(SVGGeometryElement | null)[]>([]);

  useEffect(() => {
    const shapes = shapeRefs.current.filter((s): s is SVGGeometryElement => Boolean(s));
    if (shapes.length === 0) return;

    const ctx = gsap.context(() => {
      shapes.forEach((shape) => {
        const length = shape.getTotalLength();
        gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.to(shapes, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative aspect-square w-full border border-black/15">
      <svg ref={svgRef} viewBox="0 0 100 100" className="h-full w-full">
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 12.5}
            y1="0"
            x2={i * 12.5}
            y2="100"
            stroke="black"
            strokeOpacity="0.06"
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 12.5}
            x2="100"
            y2={i * 12.5}
            stroke="black"
            strokeOpacity="0.06"
          />
        ))}
        <rect
          ref={(el) => {
            shapeRefs.current[0] = el;
          }}
          x="15"
          y="15"
          width="20"
          height="35"
          fill="none"
          stroke="black"
          strokeWidth="0.6"
        />
        <rect
          ref={(el) => {
            shapeRefs.current[1] = el;
          }}
          x="42"
          y="10"
          width="16"
          height="45"
          fill="none"
          stroke="black"
          strokeWidth="0.6"
        />
        <rect
          ref={(el) => {
            shapeRefs.current[2] = el;
          }}
          x="65"
          y="20"
          width="22"
          height="30"
          fill="none"
          stroke="black"
          strokeWidth="0.6"
        />
        <circle
          ref={(el) => {
            shapeRefs.current[3] = el;
          }}
          cx="50"
          cy="75"
          r="14"
          fill="none"
          stroke="black"
          strokeWidth="0.6"
        />
        <path d="M5 65 H95" stroke="black" strokeWidth="0.4" strokeDasharray="2 2" />
      </svg>
    </div>
  );
}
