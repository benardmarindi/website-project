
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          aria-label="RR Empire home"
          className="relative z-50 flex shrink-0 items-center"
        >
          <Image
            src="/brand/rr-empire-logo.png"
            alt="RR Empire"
            width={155}
            height={95}
            priority
            className="h-auto w-[88px] md:w-[108px]"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.16em] text-white/65 transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="hidden border-b border-white/30 pb-1 text-[11px] uppercase tracking-[0.16em] text-white/80 transition-colors hover:border-white hover:text-white md:block"
        >
          Enquire
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center text-white md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="text-2xl font-light">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 -z-10 flex min-h-screen flex-col justify-center bg-[#080808] px-8 md:hidden">
          <div className="mb-10 text-xs uppercase tracking-[0.2em] text-white/40">
            RR Empire
          </div>

          <div className="flex flex-col gap-7">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-[var(--font-space-grotesk)] text-4xl tracking-tight text-white transition-colors hover:text-[#b9b6e8]"
              >
                <span className="mr-4 text-xs text-white/35">
                  0{index + 1}
                </span>
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-12 w-fit border-b border-[#b9b6e8]/60 pb-2 text-sm text-[#c9c6ef]"
          >
            Make an enquiry →
          </Link>
        </div>
      )}
    </header>
  );
}
