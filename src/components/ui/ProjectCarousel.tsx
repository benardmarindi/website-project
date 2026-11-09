"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { CarouselTransition, ProjectMedia } from "@/data/portfolio";

interface ProjectCarouselProps {
  media: ProjectMedia[];
  transition: CarouselTransition;
  /** Names the carousel for screen readers, e.g. the project title. */
  label: string;
  /** Tailwind aspect class for the frame, e.g. "aspect-[2/1]". */
  aspectClass: string;
  /** Image `sizes` attribute so the browser downloads the right width. */
  sizes: string;
  /** Left side of the row under the slides (usually the project title). */
  caption?: ReactNode;
  /** Milliseconds each photo stays on screen. Clips stay until they finish. */
  interval?: number;
  priority?: boolean;
  /** Where a click or tap on the picture goes, e.g. the project's own page. */
  href?: string;
  /**
   * Calmer mode for pages with many carousels. On a device with a mouse, the
   * carousel only moves while the pointer is over it. On a touchscreen it only
   * moves while mostly on screen.
   */
  calm?: boolean;
}

const ACTIVE = "#e2b07a";
const SWIPE_DISTANCE = 40;
// Safety net: if a clip never reports that it has finished (for example the
// browser blocked autoplay), move on after this long.
const VIDEO_FALLBACK = 15000;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// True on devices with a mouse or trackpad (as opposed to a touchscreen).
const canHover = () => window.matchMedia("(hover: hover)").matches;

// Each transition describes where a slide sits depending on whether it is the
// current one, the one just left, or one of the others waiting its turn.
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
  media,
  transition,
  label,
  aspectClass,
  sizes,
  caption,
  interval = 5000,
  priority = false,
  href,
  calm = false,
}: ProjectCarouselProps) {
  const router = useRouter();
  const total = media.length;
  const [position, setPosition] = useState({ current: 0, previous: 0 });
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const swipeStart = useRef<number | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const step = useCallback(
    (direction: 1 | -1) => {
      setPosition((state) => ({
        previous: state.current,
        current: (state.current + direction + total) % total,
      }));
    },
    [total],
  );

  // Know whether the carousel is on screen, so nothing plays or moves on
  // while it is scrolled out of view.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: calm ? 0.6 : 0.25 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [calm]);

  // Move on by itself: after a set time for photos, and a few seconds after a
  // clip ends for clips. Stops while the person is hovering or touching, when
  // the carousel is off screen, or if their device asks for reduced motion.
  useEffect(() => {
    if (total < 2 || !visible || prefersReducedMotion()) return;
    // Calm mode on a mouse device: move only while the pointer is over it.
    // Otherwise: move unless someone is hovering or touching.
    const hoverOnly = calm && canHover();
    if (hoverOnly ? !paused : paused) return;

    const isClip = media[position.current].type === "video";
    const timer = window.setTimeout(
      () => step(1),
      isClip ? VIDEO_FALLBACK : interval,
    );
    return () => window.clearTimeout(timer);
  }, [total, paused, visible, position, media, interval, step, calm]);

  // Play the clip that is showing, pause and rewind the others.
  useEffect(() => {
    const reduce = prefersReducedMotion();
    const hoverOnly = calm && canHover();
    const allowed = visible && !reduce && (!hoverOnly || paused);

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === position.current && allowed) {
        video.play().catch(() => {
          // Autoplay was blocked: the still poster stays up instead.
        });
      } else {
        video.pause();
        if (index !== position.current) video.currentTime = 0;
      }
    });
  }, [position, visible, paused, calm]);

  function handleClipEnded(index: number) {
    if (index !== position.current || total < 2) return;

    const clip = videoRefs.current[index];
    const holding = paused && !(calm && canHover());
    if (holding && clip) {
      // Someone is looking at it: replay instead of moving on.
      clip.currentTime = 0;
      clip.play().catch(() => {});
      return;
    }
    step(1);
  }

  function handleClipError(index: number) {
    if (index === position.current && total > 1) step(1);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    swipeStart.current = event.clientX;
    setPaused(true);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (swipeStart.current !== null) {
      const distance = event.clientX - swipeStart.current;
      if (Math.abs(distance) > SWIPE_DISTANCE) {
        step(distance < 0 ? 1 : -1);
      } else if (href && event.button === 0) {
        // A tap or click, not a swipe: open the project.
        router.push(href);
      }
    }
    swipeStart.current = null;
    // A mouse is still over the carousel after the button is released.
    setPaused(event.pointerType === "mouse");
  }

  function handlePointerCancel(event: PointerEvent<HTMLDivElement>) {
    swipeStart.current = null;
    setPaused(event.pointerType === "mouse");
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
        ref={frameRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={`relative touch-pan-y select-none overflow-hidden rounded-lg bg-[var(--surface)] ${aspectClass} ${href ? "cursor-pointer" : ""}`}
      >
        {media.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
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
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={sizes}
                priority={priority && index === 0}
                loading={priority && index === 0 ? undefined : "eager"}
                draggable={false}
                className="object-cover"
              />
            ) : (
              <video
                ref={(element) => {
                  videoRefs.current[index] = element;
                }}
                src={item.src}
                poster={item.poster}
                aria-label={item.alt}
                muted
                playsInline
                loop={total === 1}
                preload={index === 0 ? "auto" : "metadata"}
                draggable={false}
                onEnded={() => handleClipEnded(index)}
                onError={() => handleClipError(index)}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}

        {showControls && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-3.5 top-3.5 z-10 flex gap-1.5"
          >
            {media.map((item, index) => (
              <span
                key={`${item.src}-${index}`}
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
                aria-label={`Previous slide in ${label}`}
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
                aria-label={`Next slide in ${label}`}
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
