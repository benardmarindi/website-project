import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  const socials = site.socials.filter((social) => social.href);

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-soft)]">
      <div className="container flex flex-col justify-between gap-8 py-10 text-base text-[var(--foreground-muted)] md:flex-row md:items-center">
        <p>
          © {site.year} {site.name}
        </p>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-7 gap-y-3"
        >
          <Link href="/portfolio" className="hover:text-[var(--foreground)]">
            Work
          </Link>
          <Link href="/services" className="hover:text-[var(--foreground)]">
            Services
          </Link>
          <Link href="/about" className="hover:text-[var(--foreground)]">
            About
          </Link>
          <Link href="/contact" className="hover:text-[var(--foreground)]">
            Contact
          </Link>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)]"
            >
              {social.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
