import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { filmEmbedUrl, projects } from "@/data/portfolio";
import ProjectCarousel from "@/components/ui/ProjectCarousel";
import ContactCta from "@/components/sections/ContactCta";

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

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return {
    title: project?.title ?? "Project",
    description: project?.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];

  if (!project) {
    notFound();
  }

  const next = projects[(index + 1) % projects.length];

  const details = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Type", value: project.category },
    { label: "Year", value: String(project.year) },
  ].filter((detail) => detail.value);

  return (
    <>
      <div className="container pb-24 pt-36 md:pb-32 md:pt-44">
        <Link
          href="/portfolio"
          className="text-base text-[var(--foreground-muted)] transition-colors hover:text-[var(--accent)]"
        >
          ← All work
        </Link>

        <header className="mt-8 max-w-4xl">
          <h1 className="text-5xl leading-[1.04] md:text-7xl">
            {project.title}
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[var(--foreground-muted)] md:text-2xl">
            {project.description}
          </p>
        </header>

        <div className="mt-14 md:mt-20">
          <ProjectCarousel
            media={project.media}
            transition={project.transition}
            label={project.title}
            aspectClass="aspect-[4/3] md:aspect-[16/9]"
            sizes="(min-width: 1400px) 1360px, 100vw"
            priority
          />
        </div>

        {project.film && (
          <section className="mt-20">
            <h2 className="mb-8 text-3xl md:text-4xl">Watch the film</h2>
            <div className="aspect-video overflow-hidden rounded-lg bg-[var(--surface)]">
              <iframe
                src={filmEmbedUrl(project.film)}
                title={project.film.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </section>
        )}

        <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-b border-[var(--border)] pb-14 md:grid-cols-4">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt className="text-base text-[var(--foreground-subtle)]">
                {detail.label}
              </dt>
              <dd className="mt-1 text-lg">{detail.value}</dd>
            </div>
          ))}
        </dl>

        {(project.brief || project.outcome) && (
          <section className="mt-20 grid gap-14 md:grid-cols-2 md:gap-24">
            {project.brief && (
              <div>
                <h2 className="text-3xl md:text-4xl">The idea</h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--foreground-muted)]">
                  {project.brief}
                </p>
              </div>
            )}

            {project.outcome && (
              <div>
                <h2 className="text-3xl md:text-4xl">The result</h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--foreground-muted)]">
                  {project.outcome}
                </p>
              </div>
            )}
          </section>
        )}

        {next && next.slug !== project.slug && (
          <Link
            href={`/portfolio/${next.slug}`}
            className="group mt-24 block border-t border-[var(--border)] pt-10"
          >
            <span className="text-base text-[var(--foreground-subtle)]">
              Next project
            </span>
            <span className="mt-2 block text-4xl tracking-tight transition-colors group-hover:text-[var(--accent)] md:text-6xl">
              {next.title}
            </span>
          </Link>
        )}
      </div>

      <ContactCta />
    </>
  );
}
