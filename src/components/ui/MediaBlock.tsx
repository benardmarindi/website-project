import Image from "next/image";
import type { ProjectMedia } from "@/data/portfolio";

// One photo, or one short clip that loops silently, in a fixed-shape frame.
export default function MediaBlock({
  media,
  aspectClass,
  sizes,
  priority = false,
}: {
  media: ProjectMedia;
  aspectClass: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-[var(--surface)] ${aspectClass}`}
    >
      {media.type === "image" ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <video
          src={media.src}
          poster={media.poster}
          aria-label={media.alt}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
