import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { filmEmbedUrl, projects } from "@/data/portfolio";
import type { Project, ProjectMedia, ProjectSection } from "@/data/portfolio";
import ProjectCarousel from "@/components/ui/ProjectCarousel";
import MediaBlock from "@/components/ui/MediaBlock";
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

const sectionTitles = {
  overview: "Overview",
  brief: "The brief",
  approach: "Our approach",
  outcome: "Final outcome",
} as const;

// A still picture for a project: its cover, or its first photo or clip poster.
function stillOf(project: Project): string | null {
  const first = project.cover ?? project.media[0];
  if (!first) return null;
  return first.type === "image" ? first.src : first.poster;
}

function Gallery({
  media,
  layout,
}: {
  media: ProjectMedia[];
  layout?: "full" | "two-up";
}) {
  const twoUp = layout === "two-up";

  return (
    <div className={`grid gap-6 md:gap-8 ${twoUp ? "md:grid-cols-2" : ""}`}>
      {media.map((item, index) => (
        <MediaBlock
          key={`${item.src}-${index}`}
          media={item}
          aspectClass={twoUp ? "aspect-[4/3]" : "aspect-[4/3] md:aspect-[16/9]"}
          sizes={
            twoUp
              ? "(min-width: 768px) 50vw, 100vw"
              : "(min-width: 1400px) 1360px, 100vw"
          }
        />
      ))}
    </div>
  );
}

function Section({ section }: { section: ProjectSection }) {
  if (section.type === "gallery") {
    return (
      <section className="mt-20 md:mt-28">
        <h2 className="mb-8 text-3xl md:text-4xl">
          {section.title ?? "Execution"}
        </h2>
        <Gallery media={section.media} layout={section.layout} />
      </section>
    );
  }

  return (
    <section className="mt-20 md:mt-28">
      <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
        <h2 className="text-3xl md:text-4xl">{sectionTitles[section.type]}</h2>
        <p className="max-w-2xl whitespace-pre-line text-xl leading-relaxed text-[var(--foreground-muted)]">
          {section.text}
        </p>
      </div>

      {"media" in section && section.media && section.media.length > 0 && (
        <div className="mt-10">
          <Gallery
            media={section.media}
            layout={section.media.length > 1 ? "two-up" : "full"}
          />
        </div>
      )}
    </section>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return notFound();
  }

  // Related work: the same discipline first, then anything else, up to three.
  const others = projects.filter((item) => item.slug !== project.slug);
  const sameDiscipline = others.filter(
    (item) => item.category === project.category,
  );
  const related = [
    ...sameDiscipline,
    ...others.filter((item) => item.category !== project.category),
  ].slice(0, 3);

  const details = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Type", value: project.category },
    { label: "Year", value: String(project.year) },
  ].filter((detail) => detail.value);

  const opening = project.cover ?? project.media[0];
  const sections = project.sections;

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

        {/* Cover. Projects with sections open with one strong picture or
            clip; projects without keep the swipeable carousel. */}
        <div className="mt-14 md:mt-20">
          {sections && opening ? (
            <MediaBlock
              media={opening}
              aspectClass="aspect-[4/3] md:aspect-[16/9]"
              sizes="(min-width: 1400px) 1360px, 100vw"
              priority
            />
          ) : (
            <ProjectCarousel
              media={project.media}
              transition={project.transition}
              label={project.title}
              aspectClass="aspect-[4/3] md:aspect-[16/9]"
              sizes="(min-width: 1400px) 1360px, 100vw"
              priority
            />
          )}
        </div>

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

        {sections ? (
          sections.map((section, index) => (
            <Section key={`${section.type}-${index}`} section={section} />
          ))
        ) : (
          (project.brief || project.outcome) && (
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
          )
        )}

        {project.film && (
          <section className="mt-20 md:mt-28">
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

        {related.length > 0 && (
          <section className="mt-24 border-t border-[var(--border)] pt-14 md:mt-32">
            <h2 className="mb-10 text-3xl md:text-4xl">
              {sameDiscipline.length > 0 ? "Related work" : "More work"}
            </h2>

            <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
              {related.map((item) => {
                const still = stillOf(item);

                return (
                  <Link
                    key={item.slug}
                    href={`/portfolio/${item.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--surface)]">
                      {still && (
                        <Image
                          src={still}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <h3 className="mt-4 text-2xl font-medium tracking-tight transition-colors group-hover:text-[var(--accent)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-base text-[var(--foreground-muted)]">
                      {item.category}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <ContactCta />
    </>
  );
}
