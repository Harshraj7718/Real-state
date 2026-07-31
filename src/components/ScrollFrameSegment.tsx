"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Ruler, Building2, Sun, Trees, ShieldCheck, Wifi, Compass } from "lucide-react";
import { frameSrc } from "@/lib/frames";
import ScatterText from "@/components/ScatterText";
import LoadingHash from "@/components/LoadingHash";

gsap.registerPlugin(ScrollTrigger);

const EAGER_COUNT = 30;
const MIN_LOADING_MS = 1400;

const ICONS = {
  mapPin: MapPin,
  ruler: Ruler,
  building: Building2,
  sun: Sun,
  trees: Trees,
  shield: ShieldCheck,
  wifi: Wifi,
  compass: Compass,
} as const;

export type RealEstateBadge = {
  icon: keyof typeof ICONS;
  label: string;
  position: string;
};

type HeroOverlay = { variant: "hero" };

type CinematicOverlay = {
  variant: "cinematic";
  eyebrow: string;
  title: string;
  badges: RealEstateBadge[];
};

type ScrollFrameSegmentProps = {
  id: string;
  startFrame: number;
  endFrame: number;
  heightVh?: number;
  overlay: HeroOverlay | CinematicOverlay;
};

export default function ScrollFrameSegment({
  id,
  startFrame,
  endFrame,
  heightVh = 180,
  overlay,
}: ScrollFrameSegmentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const hashMarkRef = useRef<HTMLSpanElement>(null);
  const currentFrameRef = useRef(startFrame);
  const [ready, setReady] = useState(false);

  const frameCount = endFrame - startFrame + 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let cancelled = false;
    const images: HTMLImageElement[] = new Array(endFrame + 1);

    function nearestLoaded(index: number) {
      for (let d = 0; d <= frameCount; d++) {
        if (images[index - d]) return images[index - d];
        if (images[index + d]) return images[index + d];
      }
      return undefined;
    }

    function draw(index: number) {
      const img = nearestLoaded(index);
      if (!img || !canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const boxRatio = w / h;
      let dw: number, dh: number, dx: number, dy: number;
      if (imgRatio > boxRatio) {
        dh = h;
        dw = h * imgRatio;
        dx = (w - dw) / 2;
        dy = 0;
      } else {
        dw = w;
        dh = w / imgRatio;
        dx = 0;
        dy = (h - dh) / 2;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function loadFrame(i: number): Promise<void> {
      return new Promise((resolve) => {
        if (images[i]) return resolve();
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          images[i] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameSrc(i);
      });
    }

    (async () => {
      const loadStart = performance.now();
      const eagerEnd = Math.min(startFrame + EAGER_COUNT, endFrame);
      for (let i = startFrame; i <= eagerEnd; i++) {
        if (cancelled) return;
        await loadFrame(i);
      }
      if (cancelled) return;
      const elapsed = performance.now() - loadStart;
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_MS - elapsed));
      }
      if (cancelled) return;
      setReady(true);
      draw(currentFrameRef.current);

      let i = eagerEnd + 1;
      const loadNext = () => {
        if (cancelled || i > endFrame) return;
        const idx = i;
        i++;
        loadFrame(idx).then(() => {
          if ("requestIdleCallback" in window) {
            (window as Window & typeof globalThis).requestIdleCallback(loadNext, {
              timeout: 200,
            });
          } else {
            setTimeout(loadNext, 16);
          }
        });
      };
      loadNext();
    })();

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      pin: pinRef.current,
      pinSpacing: false,
      onUpdate: (self) => {
        const frame = Math.min(
          endFrame,
          Math.max(startFrame, Math.round(startFrame + self.progress * (frameCount - 1)))
        );
        if (frame !== currentFrameRef.current) {
          currentFrameRef.current = frame;
          draw(frame);
        }

        if (overlayRef.current) {
          if (overlay.variant === "hero") {
            const fadeProgress = Math.min(1, self.progress / 0.18);
            gsap.set(overlayRef.current, {
              opacity: 1 - fadeProgress,
              y: -fadeProgress * 60,
            });
            if (hashMarkRef.current) {
              gsap.set(hashMarkRef.current, {
                rotation: self.progress * 40,
                scale: 1 + self.progress * 0.25,
                opacity: 0.16 - fadeProgress * 0.1,
              });
            }
          } else {
            const fadeProgress = Math.min(1, Math.abs(self.progress - 0.45) / 0.35);
            gsap.set(overlayRef.current, { opacity: 1 - fadeProgress });
          }
        }

        if (badgesRef.current) {
          const children = Array.from(badgesRef.current.children) as HTMLElement[];
          children.forEach((child, i) => {
            const segStart = 0.08 + i * 0.16;
            const segEnd = segStart + 0.4;
            const p = Math.max(0, Math.min(1, (self.progress - segStart) / (segEnd - segStart)));
            const fade = p < 0.15 ? p / 0.15 : p > 0.85 ? (1 - p) / 0.15 : 1;
            gsap.set(child, {
              opacity: fade,
              y: (1 - p) * 24,
            });
          });
        }
      },
    });

    const onResize = () => draw(currentFrameRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [startFrame, endFrame, frameCount, overlay.variant]);

  return (
    <section
      ref={wrapperRef}
      id={id}
      className="relative w-full bg-black"
      style={{ height: `${heightVh}vh` }}
    >
      <div ref={pinRef} className="h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-black/35" />

        {!ready && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
            <LoadingHash className="text-white/60" />
          </div>
        )}

        {overlay.variant === "hero" ? (
          <div
            ref={overlayRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center sm:px-6"
          >
            <span
              ref={hashMarkRef}
              aria-hidden
              className="text-outline font-display pointer-events-none absolute inset-0 flex items-center justify-center text-[80vh] leading-none opacity-15 select-none"
            >
              #
            </span>
            <ScatterText
              as="p"
              text="Welcome to"
              scrollTrigger={false}
              splitType="chars"
              className="relative z-10 mb-2 font-accent text-2xl text-white/70 italic sm:mb-4 sm:text-3xl"
              stagger={0.03}
              delay={0.05}
              scatter={40}
            />
            <ScatterText
              as="h1"
              text="HASH"
              scrollTrigger={false}
              splitType="chars"
              className="relative flex w-full items-baseline justify-between font-display text-[30vw] leading-[0.8] text-white sm:text-[22vw]"
              stagger={0.06}
              delay={0.35}
              scatter={45}
            />
            <ScatterText
              as="p"
              text="Invest. Live. Earn. Scale."
              scrollTrigger={false}
              splitType="words"
              className="relative mt-6 font-accent text-3xl tracking-wide text-white italic sm:text-5xl"
              stagger={0.08}
              delay={1.15}
              scatter={45}
            />
            <ScatterText
              as="p"
              text="A new standard in real estate — master-planned communities, offices and technology-led developments, built for tomorrow."
              scrollTrigger={false}
              splitType="words"
              className="relative mt-8 max-w-xl font-body text-sm text-white/60 sm:text-base"
              stagger={0.015}
              delay={1.6}
              scatter={30}
            />
            <div className="absolute bottom-6 flex flex-col items-center gap-3 text-white/50 sm:bottom-10">
              <span className="font-body text-xs tracking-[0.35em]">SCROLL</span>
              <span className="h-10 w-px animate-pulse bg-white/40" />
            </div>
          </div>
        ) : (
          <>
            <div
              ref={overlayRef}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
            >
              <ScatterText
                as="p"
                text={overlay.eyebrow}
                scrollTrigger={false}
                splitType="chars"
                className="font-accent text-lg text-white/70 italic"
                stagger={0.02}
              />
              <ScatterText
                as="h2"
                text={overlay.title}
                scrollTrigger={false}
                splitType="words"
                className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-white sm:text-6xl"
                stagger={0.06}
                delay={0.15}
              />
            </div>
            <div ref={badgesRef} className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
              {overlay.badges.map((badge) => {
                const Icon = ICONS[badge.icon];
                return (
                  <div
                    key={badge.label}
                    className={`absolute flex items-center gap-2 border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-sm ${badge.position}`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                    <span className="font-body text-xs tracking-widest text-white uppercase">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
