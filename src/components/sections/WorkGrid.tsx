"use client";

import { useSearchParams } from "next/navigation";
import { projects } from "@/data/portfolio";
import type { TileSize } from "@/data/home";
import WorkMosaic from "@/components/sections/WorkMosaic";

// Only categories that have at least one project, in the order they first
// appear, with how many projects each one holds.
const categories = Array.from(
  new Set(projects.map((project) => project.category)),
).map((name) => ({
  name,
  count: projects.filter((project) => project.category === name).length,
}));

// The filters live in the page address (/portfolio?category=Photography&q=bird)
// so the home page can link straight to a filtered view, and the Back button
// and shared links work.
function setAddress(category: string, query: string) {
  const params = new URLSearchParams();
  if (category !== "All") params.set("category", category);
  if (query.trim()) params.set("q", query);
  const search = params.toString();
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${search ? `?${search}` : ""}`,
  );
}

// Wide and square tiles in a repeating rhythm, whatever the filter leaves:
// wide, square, square, then square, square, wide. A leftover one is wide, and
// a leftover two are squares, so nothing is left hanging.
function sizeFor(index: number, total: number): TileSize {
  const group = Math.floor(index / 3);
  const position = index % 3;
  const size = Math.min(3, total - group * 3);

  if (size === 1) return "wide";
  if (size === 2) return "square";
  const wide = group % 2 === 0 ? position === 0 : position === 2;
  return wide ? "wide" : "square";
}

export default function WorkGrid() {
  const searchParams = useSearchParams();
  // The page address is the single source of truth, so a link from the home
  // page (or the Back button) changes the filters here too.
  const fromAddress = searchParams.get("category") ?? "All";
  const category = categories.some((item) => item.name === fromAddress)
    ? fromAddress
    : "All";
  const query = searchParams.get("q") ?? "";

  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = projects.filter((project) => {
    if (category !== "All" && project.category !== category) return false;
    const text = [
      project.title,
      project.category,
      project.description,
      project.client ?? "",
    ]
      .join(" ")
      .toLowerCase();
    return words.every((word) => text.includes(word));
  });

  const tiles = filtered.map((project, index) => ({
    project,
    size: sizeFor(index, filtered.length),
  }));

  function chooseCategory(next: string) {
    setAddress(next, query);
  }

  function changeQuery(next: string) {
    setAddress(category, next);
  }

  function clearAll() {
    setAddress("All", "");
  }

  const filtering = category !== "All" || query.trim() !== "";

  return (
    <div>
      <div className="mb-8">
        <label htmlFor="work-search" className="sr-only">
          Search projects
        </label>
        <input
          id="work-search"
          type="search"
          value={query}
          onChange={(event) => changeQuery(event.target.value)}
          placeholder="Search projects"
          className="w-full rounded-full border border-[var(--border-strong)] bg-transparent px-6 py-4 text-lg text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:border-[var(--accent)] focus:outline-none md:max-w-md"
        />
      </div>

      <div
        role="group"
        aria-label="Filter projects by type"
        className="mb-6 flex flex-wrap gap-3"
      >
        {[{ name: "All", count: projects.length }, ...categories].map(
          (item) => {
            const active = category === item.name;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => chooseCategory(item.name)}
                aria-pressed={active}
                className={`rounded-full border px-5 py-2.5 text-base font-medium transition-colors ${
                  active
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[#151210]"
                    : "border-[var(--border-strong)] text-[var(--foreground-muted)] hover:border-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {item.name}
                <span className="ml-2 opacity-60">{item.count}</span>
              </button>
            );
          },
        )}
      </div>

      <p
        className="mb-12 min-h-6 text-base text-[var(--foreground-muted)]"
        aria-live="polite"
      >
        {filtering
          ? `${filtered.length} of ${projects.length} projects`
          : `${projects.length} projects`}
        {filtering && (
          <button
            type="button"
            onClick={clearAll}
            className="ml-4 border-b border-[var(--accent)] text-[var(--accent)]"
          >
            Clear filters
          </button>
        )}
      </p>

      {tiles.length > 0 ? (
        <WorkMosaic tiles={tiles} />
      ) : (
        <div className="py-16">
          <p className="text-2xl">Nothing matches that.</p>
          <p className="mt-3 text-lg text-[var(--foreground-muted)]">
            Try a different word, or{" "}
            <button
              type="button"
              onClick={clearAll}
              className="border-b border-[var(--accent)] text-[var(--accent)]"
            >
              show all projects
            </button>
            .
          </p>
        </div>
      )}
    </div>
  );
}
