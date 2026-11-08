import Link from "next/link";
import { projects } from "@/data/portfolio";
import WorkMosaic from "@/components/sections/WorkMosaic";
import ContactCta from "@/components/sections/ContactCta";
import { heroFallback, heroMedia } from "@/data/hero";
import HeroBackdrop from "@/components/ui/HeroBackdrop";
  import { homeTiles } from "@/data/home";

export default function Home() {
    const tiles = homeTiles.flatMap(({ slug, size }) => {
    const project = projects.find((item) => item.slug === slug);
    return project ? [{ project, size }] : [];
  });

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

      {/* Work */}
      <section className="container py-20 md:py-28">
        <div className="mb-10 flex items-baseline justify-between gap-6 md:mb-14">
          <h2 className="text-3xl md:text-4xl">Selected work</h2>
          <Link
            href="/portfolio"
            className="text-lg text-[var(--foreground-muted)] transition-colors hover:text-[var(--accent)]"
          >
            All work →
          </Link>
        </div>

               <WorkMosaic tiles={tiles} />

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