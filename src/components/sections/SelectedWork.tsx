import Image from "next/image";
import { projects } from "@/data/portfolio";

export default function SelectedWork() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section className="bg-[var(--background)] py-32 md:py-48">
      <div className="container">
        {/* Section heading */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              01 — Selected Work
            </p>

            <h2 className="max-w-3xl font-[var(--font-space-grotesk)] text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">
              Work that speaks
              <br />
              <span className="text-[var(--foreground-muted)]">
                for itself.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-[var(--foreground-muted)]">
            A selection of creative work across visual identity, film,
            photography, digital experiences and more.
          </p>
        </div>

        {/* Projects */}
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article
              key={project.slug}
              className={`group ${
                index === 2 ? "md:col-span-2" : ""
              }`}
            >
              {/* Project visual */}
              <a
                href={`/portfolio/${project.slug}`}
                className={`relative block overflow-hidden bg-[var(--surface)] ${
                  index === 2 ? "aspect-[16/7]" : "aspect-[4/3]"
                }`}
              >
                {/* Image / fallback */}
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-[var(--font-space-grotesk)] text-8xl font-medium tracking-[-0.06em] text-white/[0.04]">
                      0{index + 1}
                    </span>
                  </div>
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:bg-black/10" />

                {/* Accent hover layer */}
                <div className="absolute inset-0 bg-[var(--accent)] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.08]" />

                {/* Project number */}
                <div className="absolute left-5 top-5">
                  <span className="text-xs uppercase tracking-[0.15em] text-white/60">
                    0{index + 1}
                  </span>
                </div>

                {/* Category */}
                <div className="absolute bottom-5 left-5">
                  <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* View project */}
                <div className="absolute bottom-5 right-5 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="rounded-full bg-white px-4 py-2 text-sm text-black">
                    View project →
                  </span>
                </div>
              </a>

              {/* Project information */}
              <div className="flex items-start justify-between border-b border-[var(--border)] py-5">
                <div>
                  <h3 className="font-[var(--font-space-grotesk)] text-xl">
                    {project.title}
                  </h3>

                  <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                    {project.category}
                  </p>
                </div>

                <span className="text-xs text-[var(--foreground-subtle)]">
                  {project.year}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 flex justify-end">
          <a
            href="/portfolio"
            className="group flex items-center gap-4 text-sm uppercase tracking-[0.12em]"
          >
            View all work

            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}