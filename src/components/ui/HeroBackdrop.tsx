"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProjectMedia } from "@/data/portfolio";

const PHOTO_MS = 6000; // how long a photo stays on screen
const CLIP_FALLBACK_MS = 25000; // moves on if a clip never reports that it ended

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Full-bleed background for the home page's top section. Photos and clips take
// turns, crossfading. Clips are silent, play once through, then the next
// one fades in. A single clip loops.
export default function HeroBackdrop({ media }: { media: ProjectMedia[] }) {
  const [current, setCurrent] = useState(0);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const total = media.length;

  const next = () => setCurrent((index) => (index + 1) % total);

  // Only the visible clip plays.
  useEffect(() => {
    videos.current.forEach((video, index) => {
      if (!video) return;
      if (index === current && !prefersReducedMotion()) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [current]);

  // Move on after a photo's time is up (or if a clip stalls).
  useEffect(() => {
    if (total < 2 || prefersReducedMotion()) return;
    const delay = media[current].type === "video" ? CLIP_FALLBACK_MS : PHOTO_MS;
    const timer = window.setTimeout(next, delay);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, total, media]);

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {media.map((item, index) => (
        <div
          key={item.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: index === current ? 1 : 0 }}
        >
          {item.type === "image" ? (
            <Image
              src={item.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <video
              ref={(element) => {
                videos.current[index] = element;
              }}
              src={item.src}
              poster={item.poster}
              muted
              playsInline
              loop={total === 1}
              preload={index === 0 ? "auto" : "metadata"}
              onEnded={next}
              onError={next}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
