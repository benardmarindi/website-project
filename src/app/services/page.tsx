import type { Metadata } from "next";
import ContactCta from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Graphic design, videography, photography, animation, web and system development, social media and video editing.",
};

const services = [
  {
    title: "Graphic design",
    description:
      "Visual communication that gives ideas a clear, distinctive and memorable presence.",
    work: ["Posters", "Brochures", "Campaign visuals", "Brand materials"],
  },
  {
    title: "Videography",
    description:
      "Moving images built around strong storytelling, atmosphere and purpose.",
    work: ["Commercials", "Corporate videos", "Events", "Social content"],
  },
  {
    title: "Photography",
    description:
      "Photography that captures people, products, spaces and moments with intention.",
    work: ["Events", "Portraits", "Product photography", "Commercial photography"],
  },
  {
    title: "Animation",
    description:
      "Motion that turns ideas, information and stories into engaging visual experiences.",
    work: ["2D animation", "3D animation", "Motion graphics", "Explainer videos"],
  },
  {
    title: "Web development",
    description:
      "Modern websites that combine strong visual design with thoughtful digital experiences.",
    work: [
      "Company websites",
      "Portfolio websites",
      "E-commerce",
      "Interactive experiences",
    ],
  },
  {
    title: "System development",
    description:
      "Custom digital systems designed to solve real business problems and simplify operations.",
    work: [
      "Business systems",
      "Dashboards",
      "Management platforms",
      "Internal tools",
    ],
  },
  {
    title: "Social media",
    description:
      "Consistent social content and strategy designed to keep brands relevant and connected.",
    work: [
      "Content planning",
      "Content creation",
      "Publishing",
      "Campaign management",
    ],
  },
  {
    title: "Video editing",
    description:
      "Sharp, engaging edits that turn raw footage into content people want to watch.",
    work: ["Reels", "YouTube", "Corporate videos", "Promotional content"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <div className="container pb-28 pt-36 md:pb-36 md:pt-44">
        <header className="mb-16 md:mb-24">
          <h1 className="max-w-[12em] text-5xl leading-[1.04] md:text-7xl">
            Ideas, made real.
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-relaxed text-[var(--foreground-muted)]">
            We bring together design, storytelling and technology to create
            work that looks good, communicates clearly and moves people.
          </p>
        </header>

        <div className="border-t border-[var(--border)]">
          {services.map((service) => (
            <section
              key={service.title}
              className="grid gap-8 border-b border-[var(--border)] py-12 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-14"
            >
              <h2 className="text-4xl tracking-tight md:text-5xl">
                {service.title}
              </h2>

              <div>
                <p className="max-w-xl text-lg leading-relaxed text-[var(--foreground-muted)]">
                  {service.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {service.work.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[var(--border-strong)] px-4 py-1.5 text-base text-[var(--foreground)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>

      <ContactCta heading="Have something in mind?" />
    </>
  );
}
