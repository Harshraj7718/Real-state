"use client";

import { useRef } from "react";
import { gsap } from "gsap";

type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number;
};

export default function MagneticButton({
  strength = 0.35,
  className = "",
  children,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  function ensureQuickTo() {
    if (!ref.current) return;
    if (!xTo.current) {
      xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.4, ease: "power3" });
    }
    if (!yTo.current) {
      yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.4, ease: "power3" });
    }
  }

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    ensureQuickTo();
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    xTo.current?.(relX * strength);
    yTo.current?.(relY * strength);
  }

  function handleMouseLeave() {
    xTo.current?.(0);
    yTo.current?.(0);
  }

  return (
    <button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </button>
  );
}
