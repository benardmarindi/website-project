import Link from "next/link";
import type { Project } from "@/data/portfolio";
import type { TileSize } from "@/data/home";
import ProjectCarousel from "@/components/ui/ProjectCarousel";

// A tile is a project, or an empty "coming soon" place for a discipline that
// has no projects yet.
export type MosaicTile =
  | { project: Project; size: TileSize }
  | { empty: string; size: TileSize };

// Lays out project carousels as wide or square tiles, in the order given.
export default function WorkMosaic({ tiles }: { tiles: MosaicTile[] }) {
  return (
    <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-20">
      {tiles.map((tile, index) => {
        const wide = tile.size === "wide";

        if ("empty" in tile) {
          return (
            <div key={`empty-${tile.empty}`} className={wide ? "md:col-span-2" : ""}>
              <div
                className={`flex items-center justify-center rounded-lg border border-dashed border-[var(--border-strong)] bg-[var(--surface)] ${
                  wide ? "aspect-[4/3] md:aspect-[2/1]" : "aspect-square"
                }`}
              >
                <span className="text-base text-[var(--foreground-subtle)]">
                  Coming soon
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-medium tracking-tight text-[var(--foreground-muted)] md:text-[28px]">
                  {tile.empty}
                </p>
              </div>
            </div>
          );
        }

        const { project } = tile;

        return (
          <div key={project.slug} className={wide ? "md:col-span-2" : ""}>
            <ProjectCarousel
              media={project.media}
              transition={project.transition}
              label={project.title}
              href={`/portfolio/${project.slug}`}
              calm
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