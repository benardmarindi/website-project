import Link from "next/link";

const disciplines = [
  "Design",
  "Film",
  "Photography",
  "Animation",
  "Digital",
  "Social",
];

const details = [
  {
    label: "Based",
    value: "Kenya",
  },
  {
    label: "Practice",
    value: "Independent Creative Studio",
  },
  {
    label: "Working across",
    value: "Design / Image / Motion / Digital",
  },
  {
    label: "Selected work",
    value: "2024 — 2026",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] pt-32">
      <div className="container pb-32 md:pb-48">
        {/* Intro */}
        <header className="flex min-h-[70vh] flex-col justify-end pb-20 md:pb-28">
          <p className="mb-6 text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
            About
          </p>

          <h1 className="max-w-6xl font-[var(--font-space-grotesk)] text-6xl font-medium leading-[0.86] tracking-[-0.07em] md:text-[9rem]">
            A studio
            <br />
            <span className="text-[var(--foreground-muted)]">
              without borders.
            </span>
          </h1>
        </header>

        {/* Statement */}
        <section className="border-y border-[var(--border)] py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
              The studio
            </p>

            <div>
              <p className="max-w-4xl font-[var(--font-space-grotesk)] text-3xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
                A multidisciplinary practice working between design, image,
                motion and technology.
              </p>

              <p className="mt-10 max-w-2xl text-base leading-8 text-[var(--foreground-muted)]">
                We move between disciplines depending on what the work
                requires. A visual identity might become a campaign. A
                photograph might become a film. A digital experience might
                begin with a piece of graphic design.
              </p>
            </div>
          </div>
        </section>

        {/* Studio Details */}
        <section className="mt-24 md:mt-32">
          <div className="grid border-t border-[var(--border)] md:grid-cols-2">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="border-b border-[var(--border)] py-7 md:px-6 md:py-9"
              >
                <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
                  {detail.label}
                </p>

                <p className="font-[var(--font-space-grotesk)] text-xl tracking-[-0.02em] md:text-2xl">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Disciplines */}
        <section className="mt-24 md:mt-40">
          <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
              Disciplines
            </p>

            <div className="border-t border-[var(--border)]">
              {disciplines.map((discipline, index) => (
                <div
                  key={discipline}
                  className="group flex items-center justify-between border-b border-[var(--border)] py-6"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-xs text-[var(--foreground-subtle)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="font-[var(--font-space-grotesk)] text-2xl tracking-[-0.03em] transition-colors duration-300 group-hover:text-[var(--accent)] md:text-3xl">
                      {discipline}
                    </span>
                  </div>

                  <span className="text-[var(--foreground-subtle)] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[var(--accent)]">
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mt-24 md:mt-40">
          <div className="border-t border-[var(--border)] pt-8">
            <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
                Approach
              </p>

              <div>
                <h2 className="max-w-4xl font-[var(--font-space-grotesk)] text-4xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl">
                  Less noise.
                  <br />
                  <span className="text-[var(--foreground-muted)]">
                    Better work.
                  </span>
                </h2>

                <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--foreground-muted)]">
                  We believe the strongest work does not need to explain
                  itself. It needs clarity, intention and enough room to
                  speak.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Work Link */}
        <section className="mt-32 md:mt-48">
          <div className="border-t border-[var(--border)] pt-8">
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-6 text-xs uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
                  The work
                </p>

                <h2 className="font-[var(--font-space-grotesk)] text-5xl font-medium leading-[0.9] tracking-[-0.06em] md:text-7xl">
                  See it
                  <br />
                  <span className="text-[var(--foreground-muted)]">
                    for yourself.
                  </span>
                </h2>
              </div>

              <Link
                href="/portfolio"
                className="text-sm uppercase tracking-[0.14em] text-[var(--foreground-muted)] transition-colors hover:text-[var(--accent)]"
              >
                View all work →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}