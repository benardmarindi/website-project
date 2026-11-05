"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import Image from "next/image";
import type { CarouselTransition, ProjectImage } from "@/data/portfolio";

interface ProjectCarouselProps {
  images: ProjectImage[];
  transition: CarouselTransition;
  /** Names the carousel for screen readers, e.g. the project title. */
  label: string;
  /** Tailwind aspect class for the frame, e.g. "aspect-[2/1]". */
  aspectClass: string;
  /** Image `sizes` attribute so the browser downloads the right width. */
  sizes: string;
  /** Left side of the row under the photos (usually the project title). */
  caption?: ReactNode;
  /** Milliseconds between automatic changes. */
  interval?: number;
  priority?: boolean;
}

const ACTIVE = "#e2b07a";
const SWIPE_DISTANCE = 40;

// Each transition describes where a slide sits depending on whether it is the
// current photo, the one just left, or one of the others waiting its turn.
function slideStyle(
  mode: CarouselTransition,
  slide: number,
  current: number,
  previous: number,
  total: number,
): CSSProperties {
  if (mode === "slide") {
    let distance = slide - current;
    if (distance < 0) distance += total;
    const offset = distance > total / 2 ? distance - total : distance;
    const animate = slide === current || slide === previous;

    return {
      transform: `translateX(${offset * 100}%)`,
      transition: animate
        ? "transform 700ms cubic-bezier(0.65, 0, 0.35, 1)"
        : "none",
    };
  }

  if (mode === "fade") {
    return slide === current
      ? {
          opacity: 1,
          transform: "scale(1)",
          transition: "opacity 900ms ease, transform 6500ms ease-out",
        }
      : {
          opacity: 0,
          transform: "scale(1.07)",
          transition: "opacity 900ms ease, transform 900ms ease",
        };
  }

  // wipe
  if (slide === current) {
    return {
      zIndex: 2,
      clipPath: "inset(0 0 0 0)",
      transition: "clip-path 800ms cubic-bezier(0.65, 0, 0.35, 1)",
    };
  }
  if (slide === previous) {
    return { zIndex: 1, clipPath: "inset(0 0 0 0)", transition: "none" };
  }
  return { zIndex: 0, clipPath: "inset(0 0 0 100%)", transition: "none" };
}

export default function ProjectCarousel({
  images,
  transition,
  label,
  aspectClass,
  sizes,
  caption,
  interval = 5000,
  priority = false,
}: ProjectCarouselProps) {
  const total = images.length;
  const [position, setPosition] = useState({ current: 0, previous: 0 });
  const [paused, setPaused] = useState(false);
  const swipeStart = useRef<number | null>(null);

  const step = useCallback(
    (direction: 1 | -1) => {
      setPosition((state) => ({
        previous: state.current,
        current: (state.current + direction + total) % total,
      }));
    },
    [total],
  );

  // Change photo by itself, unless the person is looking or interacting, or has
  // asked their device for reduced motion.
  useEffect(() => {
    if (total < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => step(1), interval);
    return () => window.clearInterval(timer);
  }, [total, paused, interval, step]);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    swipeStart.current = event.clientX;
    setPaused(true);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (swipeStart.current !== null) {
      const distance = event.clientX - swipeStart.current;
      if (Math.abs(distance) > SWIPE_DISTANCE) {
        step(distance < 0 ? 1 : -1);
      }
    }
    swipeStart.current = null;
    setPaused(false);
  }

  function handlePointerCancel() {
    swipeStart.current = null;
    setPaused(false);
  }

  const showControls = total > 1;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={`relative touch-pan-y select-none overflow-hidden rounded-lg bg-[var(--surface)] ${aspectClass}`}
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            aria-hidden={index !== position.current}
            className="carousel-slide absolute inset-0"
            style={slideStyle(
              transition,
              index,
              position.current,
              position.previous,
              total,
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              priority={priority && index === 0}
              loading={priority && index === 0 ? undefined : "eager"}
              draggable={false}
              className="object-cover"
            />
          </div>
        ))}

        {showControls && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-3.5 top-3.5 z-10 flex gap-1.5"
          >
            {images.map((image, index) => (
              <span
                key={image.src}
                className="h-[3px] flex-1 rounded-full transition-colors duration-500"
                style={{
                  backgroundColor:
                    index === position.current
                      ? ACTIVE
                      : "rgba(255, 255, 255, 0.45)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {(caption || showControls) && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">{caption}</div>

          {showControls && (
            <div className="ml-auto flex items-center gap-2">
              <span className="mr-2 text-base text-[var(--foreground-muted)]">
                {position.current + 1} / {total}
              </span>

              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={`Previous photo in ${label}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label={`Next photo in ${label}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
