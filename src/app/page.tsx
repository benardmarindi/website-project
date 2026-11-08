import Link from "next/link";
import { projects } from "@/data/portfolio";
import WorkMosaic from "@/components/sections/WorkMosaic";
import ContactCta from "@/components/sections/ContactCta";
import { heroFallback, heroMedia } from "@/data/hero";
import HeroBackdrop from "@/components/ui/HeroBackdrop";
  import { homeSections } from "@/data/home";

export default function Home() {
    // Follow the sections, order and sizes chosen in src/data/home.ts.
  const sections = homeSections
    .map((section) => ({
      title: section.title,
      category: section.category,
      tiles: section.tiles.flatMap(({ slug, size }) => {
        const project = projects.find((item) => item.slug === slug);
        return project ? [{ project, size }] : [];
      }),
    }))
    .filter((section) => section.tiles.length > 0);

  return (
    <>
      {/* Welcome */}
      <section className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden text-white">
        <HeroBackdrop
          media={heroMedia.length > 0 ? heroMedia : [heroFallback]}
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
          <h1 className="sr-only">RR Empire, a creative studio in Kenya</h1>

          <Link
            href="/portfolio"
            className="inline-block rounded-full bg-[var(--accent)] px-7 py-4 text-lg font-semibold text-[#151210] transition-colors hover:bg-[var(--accent-dark)]"
          >
            Browse the work
          </Link>
        </div>
      </section>

      {/* Work, in titled sections */}
      {sections.map((section, index) => (
        <section
          key={section.title}
          className={`container py-16 md:py-24 ${
            index > 0 ? "border-t border-[var(--border)]" : ""
          }`}
        >
          <div className="mb-10 flex items-baseline justify-between gap-6">
            <h2 className="text-3xl md:text-4xl">{section.title}</h2>
            <Link
              href={
                section.category
                  ? `/portfolio?category=${encodeURIComponent(section.category)}`
                  : "/portfolio"
              }
              className="shrink-0 text-lg text-[var(--foreground-muted)] transition-colors hover:text-[var(--accent)]"
            >
              See all →
            </Link>
          </div>
          <WorkMosaic tiles={section.tiles} />
        </section>
      ))}

      <section className="container pb-24 md:pb-32">
        <Link
          href="/portfolio"
          className="inline-block border-b-[1.5px] border-[var(--accent)] pb-0.5 text-lg font-semibold text-[var(--accent)]"
        >
          See all work
        </Link>
      </section>

      <ContactCta />
    </>
  );
}