import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/portfolio";

// One still picture per project: the first photo, or a clip's poster frame.
function coverOf(project: Project): string | null {
  const first = project.media[0];
  if (!first) return null;
  return first.type === "image" ? first.src : first.poster;
}

export default function FeaturedWork({ projects }: { projects: Project[] }) {
  // With an odd number of projects the first one gets a full-width row.
  const firstIsWide = projects.length % 2 === 1;

  return (
    <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 md:gap-y-20">
      {projects.map((project, index) => {
        const wide = firstIsWide && index === 0;
        const cover = coverOf(project);

        return (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className={`group block ${wide ? "md:col-span-2" : ""}`}
          >
            <div
              className={`relative overflow-hidden rounded-lg bg-[var(--surface)] ${
                wide ? "aspect-[4/3] md:aspect-[2/1]" : "aspect-[4/3]"
              }`}
            >
              {cover && (
                <Image
                  src={cover}
                  alt=""
                  fill
                  sizes={
                    wide
                      ? "(min-width: 1400px) 1360px, 100vw"
                      : "(min-width: 768px) 50vw, 100vw"
                  }
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
              )}
            </div>

            <div className="mt-5 flex items-start justify-between gap-6 border-b border-[var(--border)] pb-5">
              <div>
                <h3 className="text-2xl font-medium tracking-tight md:text-[28px]">
                  {project.title}
                </h3>
                <p className="mt-1 text-base text-[var(--foreground-muted)]">
                  {project.category}
                </p>
              </div>
              <span className="pt-1 text-base text-[var(--foreground-subtle)] transition-colors group-hover:text-[var(--accent)]">
                View →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}