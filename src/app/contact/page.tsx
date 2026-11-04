export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] pt-32">
      <div className="container pb-32 md:pb-48">
        {/* Intro */}
        <header className="flex min-h-[70vh] flex-col justify-end pb-20 md:pb-28">
          <p className="mb-6 text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
            Contact
          </p>

          <h1 className="max-w-6xl font-[var(--font-space-grotesk)] text-6xl font-medium leading-[0.86] tracking-[-0.07em] md:text-[9rem]">
            Start a
            <br />
            <span className="text-[var(--foreground-muted)]">
              conversation.
            </span>
          </h1>
        </header>

        {/* Contact Grid */}
        <section className="border-t border-[var(--border)] py-16 md:py-24">
          <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
                New business
              </p>
            </div>

            <div>
              <p className="max-w-3xl font-[var(--font-space-grotesk)] text-3xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
                For projects, collaborations and creative enquiries.
              </p>

              <a
                href="mailto:hello@creativestudio.com"
                className="mt-10 inline-block border-b border-[var(--border-strong)] pb-2 font-[var(--font-space-grotesk)] text-xl transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:text-2xl"
              >
                hello@creativestudio.com
              </a>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="border-t border-[var(--border)] py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
                Enquiry
              </p>
            </div>

            <form className="space-y-10">
              <div>
                <label
                  htmlFor="name"
                  className="mb-3 block text-xs uppercase tracking-[0.15em] text-[var(--foreground-subtle)]"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full border-b border-[var(--border)] bg-transparent py-4 text-lg outline-none placeholder:text-[var(--foreground-subtle)] focus:border-[var(--foreground)]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-xs uppercase tracking-[0.15em] text-[var(--foreground-subtle)]"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full border-b border-[var(--border)] bg-transparent py-4 text-lg outline-none placeholder:text-[var(--foreground-subtle)] focus:border-[var(--foreground)]"
                />
              </div>

              <div>
                <label
                  htmlFor="project"
                  className="mb-3 block text-xs uppercase tracking-[0.15em] text-[var(--foreground-subtle)]"
                >
                  Project type
                </label>

                <select
                  id="project"
                  name="project"
                  defaultValue=""
                  className="w-full border-b border-[var(--border)] bg-[var(--background)] py-4 text-lg text-[var(--foreground)] outline-none focus:border-[var(--foreground)]"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="design">Design</option>
                  <option value="film">Film</option>
                  <option value="photography">Photography</option>
                  <option value="animation">Animation</option>
                  <option value="digital">Digital</option>
                  <option value="social">Social</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-3 block text-xs uppercase tracking-[0.15em] text-[var(--foreground-subtle)]"
                >
                  About the project
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us a little about the project."
                  className="w-full resize-none border-b border-[var(--border)] bg-transparent py-4 text-lg outline-none placeholder:text-[var(--foreground-subtle)] focus:border-[var(--foreground)]"
                />
              </div>

              <button
                type="submit"
                className="group flex items-center gap-4 rounded-full bg-[var(--accent)] px-7 py-4 text-sm font-medium text-black transition-transform duration-300 hover:translate-x-1"
              >
                Send enquiry
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>
          </div>
        </section>

        {/* Details */}
        <section className="border-t border-[var(--border)] pt-10">
          <div className="grid gap-10 text-sm md:grid-cols-3">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
                Based
              </p>

              <p>Kenya</p>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
                Email
              </p>

              <a
                href="mailto:hello@creativestudio.com"
                className="text-[var(--foreground-muted)] transition-colors hover:text-[var(--accent)]"
              >
                hello@creativestudio.com
              </a>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
                Work
              </p>

              <a
                href="/portfolio"
                className="text-[var(--foreground-muted)] transition-colors hover:text-[var(--accent)]"
              >
                View selected work →
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}