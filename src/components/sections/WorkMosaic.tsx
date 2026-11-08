import Link from "next/link";
import type { Project } from "@/data/portfolio";
import ProjectCarousel from "@/components/ui/ProjectCarousel";

// Works out which projects get a full-width (wide) tile and which get a square.
// Projects are taken in groups of three. Even-numbered groups read
// wide, square, square; odd-numbered groups read square, square, wide, so the
// wide tiles alternate sides of the page. A leftover group of one becomes wide,
// and a leftover group of two becomes two squares, so nothing is left hanging.
function isWide(index: number, total: number): boolean {
  const group = Math.floor(index / 3);
  const position = index % 3;
  const size = Math.min(3, total - group * 3);

  if (size === 1) return true;
  if (size === 2) return false;
  return group % 2 === 0 ? position === 0 : position === 2;
}

export default function WorkMosaic({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-20">
      {projects.map((project, index) => {
        const wide = isWide(index, projects.length);

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
