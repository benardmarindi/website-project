"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/portfolio";

const categories = [
  "All",
  "Graphic Design",
  "Videography",
  "Photography",
  "Animation",
  "Web Development",
  "System Development",
  "Social Media",
  "Video Editing",
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  return (
    <main className="min-h-screen bg-[var(--background)] pt-32">
      <div className="container pb-32 md:pb-48">
        {/* Header */}
        <header className="mb-20 md:mb-28">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            02 — Work
          </p>

          <h1 className="max-w-5xl font-[var(--font-space-grotesk)] text-6xl font-medium leading-[0.9] tracking-[-0.06em] md:text-8xl">
            A collection of
            <br />
            <span className="text-[var(--foreground-muted)]">
              things we've made.
            </span>
          </h1>

          <p className="mt-10 max-w-xl text-base leading-7 text-[var(--foreground-muted)] md:text-lg">
            Explore selected projects across design, film, photography,
            animation, development and digital experiences.
          </p>
        </header>

        {/* Filters */}
        <div className="mb-12 flex gap-6 overflow-x-auto border-b border-[var(--border)] pb-6">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 text-xs uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? "text-[var(--accent)]"
                    : "text-[var(--foreground-subtle)] hover:text-[var(--foreground)]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-12 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className={`group block ${
                  filteredProjects.length > 2 && index === 2
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden bg-[var(--surface)] ${
                    filteredProjects.length > 2 && index === 2
                      ? "aspect-[16/8]"
                      : "aspect-[4/3]"
                  }`}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes={
                        filteredProjects.length > 2 && index === 2
                          ? "100vw"
                          : "(max-width: 768px) 100vw, 50vw"
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-[var(--font-space-grotesk)] text-9xl font-medium tracking-[-0.08em] text-white/[0.04]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/5" />

                  {/* Number */}
                  <span className="absolute left-5 top-5 text-xs uppercase tracking-[0.15em] text-white/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* View */}
                  <div className="absolute bottom-5 right-5 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="rounded-full bg-white px-5 py-2.5 text-sm text-black">
                      View project →
                    </span>
                  </div>
                </div>

                {/* Information */}
                <div className="flex items-start justify-between border-b border-[var(--border)] py-5">
                  <div>
                    <h2 className="font-[var(--font-space-grotesk)] text-2xl font-medium tracking-tight md:text-3xl">
                      {project.title}
                    </h2>

                    <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                      {project.category}
                    </p>
                  </div>

                  <span className="text-xs text-[var(--foreground-subtle)]">
                    {project.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border-y border-[var(--border)] py-24 text-center">
            <p className="text-sm text-[var(--foreground-muted)]">
              No projects in this category yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}