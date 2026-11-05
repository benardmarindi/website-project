import type { Metadata } from "next";
import Link from "next/link";
import ContactCta from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "RR Empire is a multidisciplinary creative studio in Kenya working across design, image, motion and technology.",
};

const disciplines = [
  "Design",
  "Film",
  "Photography",
  "Animation",
  "Digital",
  "Social",
];

const details = [
  { label: "Based in", value: "Kenya" },
  { label: "Practice", value: "Independent creative studio" },
  { label: "Working across", value: "Design, image, motion and digital" },
  { label: "Selected work", value: "2024 to 2026" },
];

export default function AboutPage() {
  return (
    <>
      <div className="container pb-28 pt-36 md:pb-36 md:pt-44">
        <header className="mb-20 md:mb-28">
          <h1 className="max-w-[12em] text-5xl leading-[1.04] md:text-7xl">
            A studio without borders.
          </h1>

          <p className="mt-8 max-w-2xl text-2xl leading-[1.35] tracking-tight md:text-[32px]">
            A multidisciplinary practice working between design, image, motion
            and technology.
          </p>
        </header>

        <section className="grid gap-10 border-t border-[var(--border)] pt-14 md:grid-cols-[1fr_2fr]">
          <h2 className="text-2xl text-[var(--foreground-muted)]">
            How we work
          </h2>

          <div className="max-w-2xl space-y-6 text-xl leading-relaxed text-[var(--foreground-muted)]">
            <p>
              We move between disciplines depending on what the work
              requires. A visual identity might become a campaign. A
              photograph might become a film. A digital experience might begin
              with a piece of graphic design.
            </p>
            <p>
              We believe the strongest work does not need to explain itself.
              It needs clarity, intention and enough room to speak.
            </p>
          </div>
        </section>

        <dl className="mt-20 grid gap-x-10 gap-y-10 border-t border-[var(--border)] pt-14 sm:grid-cols-2 md:grid-cols-4">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt className="text-base text-[var(--foreground-subtle)]">
                {detail.label}
              </dt>
              <dd className="mt-1 text-xl">{detail.value}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-20 border-t border-[var(--border)] pt-14">
          <h2 className="text-2xl text-[var(--foreground-muted)]">
            What we do
          </h2>

          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-4xl tracking-tight md:text-6xl">
            {disciplines.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>

          <Link
            href="/services"
            className="mt-10 inline-block border-b-[1.5px] border-[var(--accent)] pb-0.5 text-lg font-semibold text-[var(--accent)]"
          >
            See our services
          </Link>
        </section>
      </div>

      <ContactCta />
    </>
  );
}
