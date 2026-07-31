"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import ScatterText from "@/components/ScatterText";
import SectionHeading from "@/components/SectionHeading";

const PHOTO_TEAM = [
  { name: "Aarav Mehta", role: "Founder & CEO", file: "member-1.jpg" },
  { name: "Sara Lindqvist", role: "Chief Architect", file: "member-2.jpg" },
  { name: "Kenji Watanabe", role: "Head of Technology", file: "member-3.jpg" },
];

function PhotoFrame({ name, file }: { name: string; file: string }) {
  const [broken, setBroken] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const src = `/team/${file}`;
  const diskPath = `hash-website/public/team/${file}`;

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setBroken(true);
    }
  }, []);

  return (
    <div className="relative aspect-3/4 w-full overflow-hidden border border-white/15 bg-white/[0.03]">
      {!broken ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={name}
          onError={() => setBroken(true)}
          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-white/20 p-4 text-center">
          <ImageIcon className="h-6 w-6 text-white/30" />
          <span className="font-body text-[10px] tracking-widest text-white/40 uppercase">
            Add photo at
          </span>
          <code className="font-mono text-[10px] break-all text-white/40">{diskPath}</code>
        </div>
      )}
    </div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="relative bg-black px-6 py-24 text-white sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="The people behind hash" title="Our Team" dark />
        <div className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-x-6 gap-y-10 sm:mt-16 sm:max-w-none sm:grid-cols-3 sm:gap-y-14">
          {PHOTO_TEAM.map((member, i) => (
            <div key={member.name} className="group">
              <PhotoFrame name={member.name} file={member.file} />
              <ScatterText
                as="p"
                text={member.name}
                splitType="chars"
                delay={i * 0.03}
                stagger={0.015}
                className="mt-4 font-display text-lg"
              />
              <ScatterText
                as="p"
                text={member.role}
                splitType="words"
                delay={i * 0.03 + 0.15}
                className="mt-1 font-body text-xs tracking-[0.15em] text-white/50 uppercase"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
