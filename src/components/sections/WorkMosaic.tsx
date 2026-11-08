import Link from "next/link";
import type { Project } from "@/data/portfolio";
import type { TileSize } from "@/data/home";
import ProjectCarousel from "@/components/ui/ProjectCarousel";

// Lays out project carousels as wide or square tiles, in the order given.
export default function WorkMosaic({
  tiles,
}: {
  tiles: { project: Project; size: TileSize }[];
}) {
  return (
    <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-20">
      {tiles.map(({ project, size }, index) => {
        const wide = size === "wide";

        return (
          <div key={project.slug} className={wide ? "md:col-span-2" : ""}>
            <ProjectCarousel
              media={project.media}
              transition={project.transition}
              label={project.title}
              aspectClass={
                wide ? "aspect-[4/3] md:aspect-[2/1]" : "aspect-square"
              }
              sizes={
                wide
                  ? "(min-width: 1400px) 1360px, 100vw"
                  : "(min-width: 768px) 50vw, 100vw"
              }
              interval={4500 + index * 1000}
              caption={
                <>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="text-2xl font-medium tracking-tight transition-colors hover:text-[var(--accent)] md:text-[28px]"
                  >
                    {project.title}
                  </Link>
                  <p className="text-base text-[var(--foreground-muted)]">
                    {project.category}
                  </p>
                </>
              }
            />
          </div>
        );
      })}
    </div>
  );
}
