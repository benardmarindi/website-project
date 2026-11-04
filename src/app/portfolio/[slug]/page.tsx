import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--background)] pt-32">
      <div className="container pb-32 md:pb-48">
        {/* Project Header */}
        <header className="max-w-6xl">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              {project.category}
            </span>

            <span className="h-px w-8 bg-[var(--border-strong)]" />

            <span className="text-xs text-[var(--foreground-subtle)]">
              {project.year}
            </span>
          </div>

          <h1 className="max-w-6xl font-[var(--font-space-grotesk)] text-6xl font-medium leading-[0.85] tracking-[-0.07em] md:text-[9rem]">
            {project.title}
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-8 text-[var(--foreground-muted)] md:text-2xl md:leading-10">
            {project.description}
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative mt-20 aspect-[16/9] overflow-hidden bg-[var(--surface)] md:mt-32">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-[var(--font-space-grotesk)] text-[20vw] font-medium tracking-[-0.08em] text-white/[0.035]">
                01
              </span>
            </div>
          )}
        </div>

        {/* Project Information */}
        <div className="mt-16 grid gap-10 border-b border-[var(--border)] pb-16 md:grid-cols-4 md:gap-8">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
              Client
            </p>

            <p className="text-sm text-[var(--foreground-muted)]">
              {project.client || "—"}
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
              Role
            </p>

            <p className="text-sm text-[var(--foreground-muted)]">
              {project.role || "—"}
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
              Category
            </p>

            <p className="text-sm text-[var(--foreground-muted)]">
              {project.category}
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
              Year
            </p>

            <p className="text-sm text-[var(--foreground-muted)]">
              {project.year}
            </p>
          </div>
        </div>

        {/* Brief + Outcome */}
        <section className="mt-24 grid gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              01 — The Brief
            </p>

            <h2 className="max-w-xl font-[var(--font-space-grotesk)] text-4xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
              The idea behind the work.
            </h2>

            <p className="mt-8 max-w-xl text-base leading-8 text-[var(--foreground-muted)]">
              {project.brief || project.description}
            </p>
          </div>

          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              02 — The Outcome
            </p>

            <h2 className="max-w-xl font-[var(--font-space-grotesk)] text-4xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
              Built to make an impact.
            </h2>

            <p className="mt-8 max-w-xl text-base leading-8 text-[var(--foreground-muted)]">
              {project.outcome || project.description}
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="mt-24 md:mt-32">
          <div className="mb-10 flex items-end justify-between border-b border-[var(--border)] pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                03 — Selected Images
              </p>

              <h2 className="mt-3 font-[var(--font-space-grotesk)] text-3xl font-medium tracking-[-0.04em] md:text-4xl">
                Inside the project.
              </h2>
            </div>
          </div>

          {project.gallery && project.gallery.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {project.gallery.map((image, index) => (
                <div
                  key={image}
                  className={`relative overflow-hidden bg-[var(--surface)] ${
                    index === 0 ? "md:col-span-2 aspect-[16/8]" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${project.title} — image ${index + 1}`}
                    fill
                    sizes={
                      index === 0
                        ? "100vw"
                        : "(max-width: 768px) 100vw, 50vw"
                    }
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex aspect-[4/5] items-center justify-center bg-[var(--surface)]">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--foreground-subtle)]">
                  Project Image
                </span>
              </div>

              <div className="flex aspect-[4/5] items-center justify-center bg-[var(--surface)]">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--foreground-subtle)]">
                  Project Image
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="mt-32 border-t border-[var(--border)] pt-16 md:mt-48">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Have a project in mind?
          </p>

          <div className="mt-6 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <h2 className="max-w-4xl font-[var(--font-space-grotesk)] text-5xl font-medium leading-[0.9] tracking-[-0.06em] md:text-8xl">
              Let&apos;s create
              <br />
              something <span className="text-[var(--accent)]">great.</span>
            </h2>

            <Link
              href="/contact"
              className="group flex w-fit shrink-0 items-center gap-4 rounded-full bg-[var(--accent)] px-7 py-4 text-sm font-medium text-black transition-transform duration-300 hover:translate-x-1"
            >
              Start a project
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <div className="mt-20 flex justify-between border-t border-[var(--border)] pt-8">
          <Link
            href="/portfolio"
            className="text-sm uppercase tracking-[0.12em] text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
          >
            ← All work
          </Link>

          <Link
            href="/contact"
            className="text-sm uppercase tracking-[0.12em] text-[var(--accent)]"
          >
            Start a project →
          </Link>
        </div>
      </div>
    </main>
  );
}