import { Suspense } from "react";
import type { Metadata } from "next";
import WorkGrid from "@/components/sections/WorkGrid";
import ContactCta from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects across design, film, photography, animation and web.",
};

export default function PortfolioPage() {
  return (
    <>
      <div className="container pb-28 pt-36 md:pb-36 md:pt-44">
        <header className="mb-16 md:mb-20">
          <h1 className="max-w-[12em] text-5xl leading-[1.04] md:text-7xl">
            Things we&apos;ve made.
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-relaxed text-[var(--foreground-muted)]">
            Design, film, photography, animation and web projects. Search or
            filter, then open any project to see it in full.
          </p>
        </header>

        <Suspense fallback={<div className="min-h-[60svh]" />}>
          <WorkGrid />
        </Suspense>
      </div>

      <ContactCta />
    </>
  );
}
