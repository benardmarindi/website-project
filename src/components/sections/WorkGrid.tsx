"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/portfolio";
import ProjectCarousel from "@/components/ui/ProjectCarousel";

// Only categories that have at least one project, in the order they first appear.
const categories = [
  "All",
  ...Array.from(new Set(projects.map((project) => project.category))),
];

export default function WorkGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const firstIsWide = filtered.length % 2 === 1;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by type"
        className="mb-14 flex flex-wrap gap-3"
      >
        {categories.map((category) => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={active}
              className={`rounded-full border px-5 py-2.5 text-base font-medium transition-colors ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[#151210]"
                  : "border-[var(--border-strong)] text-[var(--foreground-muted)] hover:border-[var(--foreground-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-20">
          {filtered.map((project, index) => {
            const wide = firstIsWide && index === 0;

            return (
              <div
                key={project.slug}
                className={wide ? "md:col-span-2" : ""}
              >
                <ProjectCarousel
                  images={project.images}
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
      ) : (
        <p className="text-xl text-[var(--foreground-muted)]">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
