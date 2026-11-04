import Image from "next/image";
import { projects } from "@/data/portfolio";

const disciplines = ["Design", "Film", "Image", "Motion", "Digital"];

export default function Home() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <main className="bg-[var(--background)]">
      {/* Intro */}
      <section className="container flex min-h-[85vh] flex-col justify-end pb-16 pt-40 md:pb-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h1 className="max-w-5xl font-[var(--font-space-grotesk)] text-6xl font-medium leading-[0.86] tracking-[-0.07em] md:text-[9rem]">
            Creative
            <br />
            <span className="text-[var(--foreground-muted)]">work.</span>
          </h1>

          <div className="max-w-xs pb-2">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
              Design / Film / Image / Motion / Digital
            </p>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="container pb-32 md:pb-48">
        <div className="mb-10 flex items-center justify-between border-t border-[var(--border)] pt-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
            Selected work
          </p>

          <p className="text-xs text-[var(--foreground-subtle)]">
            2024 — 2026
          </p>
        </div>

        <div className="space-y-20 md:space-y-32">
          {featuredProjects.map((project, index) => (
            <a
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group block"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface)]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-[var(--font-space-grotesk)] text-[20vw] font-medium tracking-[-0.08em] text-white/[0.035]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-3 border-b border-[var(--border)] pb-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="font-[var(--font-space-grotesk)] text-2xl font-medium tracking-[-0.04em] md:text-3xl">
                    {project.title}
                  </h2>

                  <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                    {project.category}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-xs text-[var(--foreground-subtle)]">
                    {project.year}
                  </span>

                  <span className="text-sm text-[var(--foreground-subtle)] transition-colors group-hover:text-[var(--accent)]">
                    View →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16">
          <a
            href="/portfolio"
            className="group inline-flex items-center gap-4 text-xs uppercase tracking-[0.16em] text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
          >
            All work
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>
        </div>
      </section>

      {/* Disciplines */}
      <section className="border-t border-[var(--border)]">
        <div className="container py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
              Disciplines
            </p>

            <div className="grid grid-cols-2 border-t border-[var(--border)] md:grid-cols-3">
              {disciplines.map((discipline, index) => (
                <div
                  key={discipline}
                  className="border-b border-[var(--border)] py-5 pr-5"
                >
                  <span className="mr-4 text-xs text-[var(--foreground-subtle)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="font-[var(--font-space-grotesk)] text-xl md:text-2xl">
                    {discipline}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Contact */}
      <section className="container py-32 md:py-48">
        <div className="border-t border-[var(--border)] pt-8">
          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
                Contact
              </p>

              <h2 className="font-[var(--font-space-grotesk)] text-5xl font-medium leading-[0.9] tracking-[-0.06em] md:text-8xl">
                Start a
                <br />
                <span className="text-[var(--foreground-muted)]">
                  conversation.
                </span>
              </h2>
            </div>

            <a
              href="/contact"
              className="text-sm uppercase tracking-[0.14em] text-[var(--foreground-muted)] transition-colors hover:text-[var(--accent)]"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}