import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project and we'll get back to you.",
};

const fieldClass =
  "w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3.5 text-lg text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:border-[var(--accent)] focus:outline-none";

const labelClass = "mb-2 block text-base text-[var(--foreground-muted)]";

export default function ContactPage() {
  return (
    <div className="container pb-28 pt-36 md:pb-36 md:pt-44">
      <header className="mb-16 md:mb-20">
        <h1 className="max-w-[12em] text-5xl leading-[1.04] md:text-7xl">
          Tell us about your project.
        </h1>

        <p className="mt-8 max-w-xl text-xl leading-relaxed text-[var(--foreground-muted)]">
          For projects, collaborations and creative enquiries. Fill in the
          form, or write to us at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-[var(--accent)] underline underline-offset-4"
          >
            {site.email}
          </a>
          .
        </p>
      </header>

      {/* The form opens the visitor's email app for now. A proper "send" that
          delivers straight to your inbox is the next piece of work. */}
      <form
        action={`mailto:${site.email}`}
        method="post"
        encType="text/plain"
        className="max-w-2xl space-y-8"
      >
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="project" className={labelClass}>
            What do you need?
          </label>
          <select
            id="project"
            name="project"
            defaultValue=""
            required
            className={fieldClass}
          >
            <option value="" disabled>
              Choose a service
            </option>
            <option value="Design">Design</option>
            <option value="Film">Film</option>
            <option value="Photography">Photography</option>
            <option value="Animation">Animation</option>
            <option value="Web or system development">
              Web or system development
            </option>
            <option value="Social media">Social media</option>
            <option value="Something else">Something else</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            About the project
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className={`${fieldClass} resize-y`}
          />
        </div>

        <button
          type="submit"
          className="rounded-full bg-[var(--accent)] px-8 py-4 text-lg font-semibold text-[#151210] transition-colors hover:bg-[var(--accent-dark)]"
        >
          Send enquiry
        </button>
      </form>

      <p className="mt-16 text-lg text-[var(--foreground-muted)]">
        Based in Kenya.{" "}
        <Link
          href="/portfolio"
          className="text-[var(--accent)] underline underline-offset-4"
        >
          See our work
        </Link>
      </p>
    </div>
  );
}
