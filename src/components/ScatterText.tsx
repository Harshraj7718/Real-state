"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

type SplitType = "chars" | "words" | "lines";
type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

type ScatterTextProps = {
  text: string;
  as?: Tag;
  className?: string;
  splitType?: SplitType;
  /** Animate when scrolled into view (default) or immediately on mount (e.g. hero) */
  scrollTrigger?: boolean;
  start?: string;
  stagger?: number;
  delay?: number;
  scatter?: number;
};

export default function ScatterText({
  text,
  as = "div",
  className = "",
  splitType = "words",
  scrollTrigger = true,
  start = "top 85%",
  stagger = 0.04,
  delay = 0,
  scatter = 70,
}: ScatterTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(el, {
        type: splitType,
      });
      const targets =
        splitType === "chars" ? split.chars : splitType === "lines" ? split.lines : split.words;

      gsap.set(targets, {
        opacity: 0,
        x: () => gsap.utils.random(-scatter, scatter),
        y: () => gsap.utils.random(-scatter, scatter),
        rotation: () => gsap.utils.random(-20, 20),
      });

      gsap.to(targets, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "power3.out",
        stagger: stagger,
        delay,
        scrollTrigger: scrollTrigger
          ? {
              trigger: el,
              start,
              toggleActions: "play none none reverse",
            }
          : undefined,
      });
    }, el);

    return () => ctx.revert();
  }, [text, splitType, scrollTrigger, start, stagger, delay, scatter]);

  switch (as) {
    case "h1":
      return (
        <h1 ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
          {text}
        </h1>
      );
    case "h2":
      return (
        <h2 ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
          {text}
        </h2>
      );
    case "h3":
      return (
        <h3 ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
          {text}
        </h3>
      );
    case "h4":
      return (
        <h4 ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
          {text}
        </h4>
      );
    case "p":
      return (
        <p ref={ref as React.Ref<HTMLParagraphElement>} className={className}>
          {text}
        </p>
      );
    case "span":
      return (
        <span ref={ref as React.Ref<HTMLSpanElement>} className={className}>
          {text}
        </span>
      );
    default:
      return (
        <div ref={ref as React.Ref<HTMLDivElement>} className={className}>
          {text}
        </div>
      );
  }
}
