const services = [
  {
    number: "01",
    title: "Graphic Design",
    description:
      "Visual communication that gives ideas a clear, distinctive and memorable presence.",
    work: [
      "Posters",
      "Brochures",
      "Campaign Visuals",
      "Brand Materials",
    ],
  },
  {
    number: "02",
    title: "Videography",
    description:
      "Moving images built around strong storytelling, atmosphere and purpose.",
    work: [
      "Commercials",
      "Corporate Videos",
      "Events",
      "Social Content",
    ],
  },
  {
    number: "03",
    title: "Photography",
    description:
      "Photography that captures people, products, spaces and moments with intention.",
    work: [
      "Events",
      "Portraits",
      "Product Photography",
      "Commercial Photography",
    ],
  },
  {
    number: "04",
    title: "Animation",
    description:
      "Motion that turns ideas, information and stories into engaging visual experiences.",
    work: [
      "2D Animation",
      "3D Animation",
      "Motion Graphics",
      "Explainer Videos",
    ],
  },
  {
    number: "05",
    title: "Web Development",
    description:
      "Modern websites that combine strong visual design with thoughtful digital experiences.",
    work: [
      "Company Websites",
      "Portfolio Websites",
      "E-commerce",
      "Interactive Experiences",
    ],
  },
  {
    number: "06",
    title: "System Development",
    description:
      "Custom digital systems designed to solve real business problems and simplify operations.",
    work: [
      "Business Systems",
      "Dashboards",
      "Management Platforms",
      "Internal Tools",
    ],
  },
  {
    number: "07",
    title: "Social Media",
    description:
      "Consistent social content and strategy designed to keep brands relevant and connected.",
    work: [
      "Content Planning",
      "Content Creation",
      "Publishing",
      "Campaign Management",
    ],
  },
  {
    number: "08",
    title: "Video Editing",
    description:
      "Sharp, engaging edits that turn raw footage into content people want to watch.",
    work: [
      "Reels",
      "YouTube",
      "Corporate Videos",
      "Promotional Content",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] pt-32">
      <div className="container pb-32 md:pb-48">
        {/* Header */}
        <header className="max-w-6xl pb-24 md:pb-32">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            03 — Services
          </p>

          <h1 className="max-w-6xl font-[var(--font-space-grotesk)] text-6xl font-medium leading-[0.88] tracking-[-0.07em] md:text-[9rem]">
            Ideas into
            <br />
            <span className="text-[var(--foreground-muted)]">
              something real.
            </span>
          </h1>

          <p className="mt-10 max-w-2xl text-base leading-7 text-[var(--foreground-muted)] md:text-xl md:leading-9">
            We bring together design, storytelling and technology to create
            work that looks good, communicates clearly and moves people.
          </p>
        </header>

        {/* Services List */}
        <section className="border-t border-[var(--border)]">
          {services.map((service) => (
            <article
              key={service.number}
              className="group border-b border-[var(--border)] py-10 md:py-14"
            >
              <div className="grid gap-8 md:grid-cols-[80px_1fr_1fr] md:items-start">
                {/* Number */}
                <span className="text-xs uppercase tracking-[0.15em] text-[var(--accent)]">
                  {service.number}
                </span>

                {/* Main Content */}
                <div>
                  <h2 className="font-[var(--font-space-grotesk)] text-4xl font-medium tracking-[-0.05em] transition-colors duration-300 group-hover:text-[var(--accent)] md:text-6xl">
                    {service.title}
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--foreground-muted)] md:text-base">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="md:pl-12">
                  <p className="mb-5 text-xs uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
                    What we do
                  </p>

                  <ul className="space-y-3">
                    {service.work.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm text-[var(--foreground-muted)]"
                      >
                        <span className="h-px w-4 bg-[var(--border-strong)] transition-all duration-300 group-hover:w-7 group-hover:bg-[var(--accent)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-32 border-t border-[var(--border)] pt-16 md:mt-48">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Have something in mind?
          </p>

          <div className="mt-6 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-5xl font-[var(--font-space-grotesk)] text-5xl font-medium leading-[0.9] tracking-[-0.06em] md:text-8xl">
              Let&apos;s make
              <br />
              it <span className="text-[var(--accent)]">happen.</span>
            </h2>

            <a
              href="/contact"
              className="group flex w-fit shrink-0 items-center gap-4 rounded-full bg-[var(--accent)] px-7 py-4 text-sm font-medium text-black transition-transform duration-300 hover:translate-x-1"
            >
              Start a project
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}