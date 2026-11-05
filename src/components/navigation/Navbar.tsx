"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navigation = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Solid header once the page has moved, transparent over the top of a photo.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stop the page scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen
            ? "bg-[var(--background)]/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-[1360px] items-center justify-between px-5 py-5 md:px-10"
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            RR Empire
          </Link>

          <div className="hidden items-center gap-9 text-[17px] font-medium md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 font-semibold text-[#151210] transition-colors hover:bg-[var(--accent-dark)]"
            >
              Start a project
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--foreground)] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col justify-center bg-[var(--background)] px-6 md:hidden"
        >
          <div className="flex flex-col gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-5xl font-light tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-12 w-fit rounded-full bg-[var(--accent)] px-7 py-4 text-lg font-semibold text-[#151210]"
          >
            Start a project
          </Link>
        </div>
      )}
    </>
  );
}
