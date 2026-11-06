import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/portfolio";
import ProjectCarousel from "@/components/ui/ProjectCarousel";
import ContactCta from "@/components/sections/ContactCta";

export default function Home() {
  const featured = projects.filter((project) => project.featured);
  // With an odd number of projects the first one gets a full-width row.
  const firstIsWide = featured.length % 2 === 1;

  return (
    <>
      {/* Welcome */}
      <section className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden text-white">
        <Image
          src="/portfolio/trail-bridge.jpg"
          alt="A rough wooden bridge over a muddy trail"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(21,18,16,0.6) 0%, rgba(21,18,16,0.05) 35%, rgba(21,18,16,0.95) 100%)",
          }}
        />

        <div className="container relative pb-14 pt-40 md:pb-20">
          <h1 className="max-w-[12em] text-5xl leading-[1.02] md:text-7xl lg:text-[5.5rem]">
            Welcome. Come and see what we&apos;ve been making.
          </h1>

          <Link
            href="/portfolio"
            className="mt-9 inline-block rounded-full bg-[var(--accent)] px-7 py-4 text-lg font-semibold text-[#151210] transition-colors hover:bg-[var(--accent-dark)]"
          >
            Browse the work
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className="container flex flex-wrap items-start gap-x-12 gap-y-8 py-24 md:py-32">
        <p className="min-w-0 max-w-[22em] flex-1 basis-[420px] text-3xl leading-[1.25] font-normal tracking-tight md:text-[34px]">
          RR Empire is a creative studio in Kenya. We take on design, film,
          photography, animation and web projects, from a single poster to a
          whole website.
        </p>

        <Link
          href="/services"
          className="border-b-[1.5px] border-[var(--accent)] pb-0.5 text-lg font-semibold text-[var(--accent)]"
        >
          What we do
        </Link>
      </section>

      {/* Work */}
      <section className="container pb-28 md:pb-36">
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-20">
          {featured.map((project, index) => {
            const wide = firstIsWide && index === 0;

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

        <Link
          href="/portfolio"
          className="mt-16 inline-block border-b-[1.5px] border-[var(--accent)] pb-0.5 text-lg font-semibold text-[var(--accent)]"
        >
          See all work
        </Link>
      </section>

      <ContactCta />
    </>
  );
}
