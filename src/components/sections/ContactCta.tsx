import Link from "next/link";
import { site } from "@/data/site";

interface ContactCtaProps {
  heading?: string;
}

export default function ContactCta({
  heading = "Have a project in mind?",
}: ContactCtaProps) {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--background-soft)]">
      <div className="container py-24 md:py-32">
        <h2 className="max-w-[13em] text-5xl leading-[1.05] md:text-7xl">
          {heading}
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Link
            href="/contact"
            className="rounded-full bg-[var(--accent)] px-7 py-4 text-lg font-semibold text-[#151210] transition-colors hover:bg-[var(--accent-dark)]"
          >
            Start a project
          </Link>

          <a
            href={`mailto:${site.email}`}
            className="text-lg text-[var(--foreground-muted)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:underline"
          >
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
