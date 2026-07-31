"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CountUpStatProps = {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  thousands?: boolean;
  className?: string;
  delay?: number;
};

export default function CountUpStat({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
  thousands = false,
  className = "",
  delay = 0,
}: CountUpStatProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: 1.6,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          const formatted = thousands
            ? Math.round(obj.val).toLocaleString("en-US")
            : obj.val.toFixed(decimals);
          el.textContent = `${prefix}${formatted}${suffix}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [target, decimals, prefix, suffix, thousands, delay]);

  return (
    <p ref={ref} className={className}>
      {prefix}0{suffix}
    </p>
  );
}
