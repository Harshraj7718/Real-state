"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const LINKS = [
  { href: "#areas", label: "Areas" },
  { href: "#location", label: "Location" },
  { href: "#masterplan", label: "Master Plan" },
  { href: "#offices", label: "Offices" },
  { href: "#technology", label: "Technology" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

function NavLink({
  href,
  label,
  onClick,
  className = "",
}: {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  const underlineRef = useRef<HTMLSpanElement>(null);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative inline-block w-fit ${className}`}
      onMouseEnter={() =>
        gsap.to(underlineRef.current, { scaleX: 1, duration: 0.35, ease: "power2.out" })
      }
      onMouseLeave={() =>
        gsap.to(underlineRef.current, { scaleX: 0, duration: 0.35, ease: "power2.in" })
      }
    >
      {label}
      <span
        ref={underlineRef}
        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current"
      />
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (open) {
      gsap.set(menu, { display: "flex" });
      gsap.fromTo(menu, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
      gsap.fromTo(
        menu.querySelectorAll("a"),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, delay: 0.1, ease: "power3.out" }
      );
    } else {
      gsap.to(menu, {
        autoAlpha: 0,
        duration: 0.25,
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <nav className="flex items-center justify-between px-6 py-6 text-white sm:px-10">
          <Link href="#home" className="text-lg" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <ul className="hidden items-center gap-8 font-body text-xs tracking-[0.2em] uppercase md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} className="opacity-80 hover:opacity-100" />
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      <div
        ref={menuRef}
        className="fixed inset-0 z-40 hidden flex-col justify-center gap-6 bg-black px-8 md:hidden"
        style={{ opacity: 0 }}
      >
        {LINKS.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            onClick={() => setOpen(false)}
            className="font-display text-4xl text-white"
          />
        ))}
      </div>
    </>
  );
}
