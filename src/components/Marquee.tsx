"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type MarqueeProps = {
  items: string[];
  className?: string;
  speed?: number;
};

export default function Marquee({ items, className = "", speed = 26 }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const content = `${items.join("   •   ")}   •   `;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: speed,
        ease: "none",
      });
    }, track);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max whitespace-nowrap">
        <span className="pr-4 font-display text-2xl tracking-tight sm:text-4xl">{content}</span>
        <span className="pr-4 font-display text-2xl tracking-tight sm:text-4xl" aria-hidden>
          {content}
        </span>
      </div>
    </div>
  );
}
