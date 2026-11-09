// The home page's sections, laid out by you.
//
// Each section has a title and a list of tiles. Sections and tiles appear in
// the order written here, top to bottom. For each tile choose:
//   "wide"    a full-width tile
//   "square"  a square tile; two squares sit side by side on a row
//
// Keep squares in pairs (a single square leaves an empty space beside it).
// `slug` must match a project's slug in portfolio.ts exactly. A project that
// is not listed here does not appear on the home page (it is still on the
// Work page). A section with no matching projects is hidden.
//
// `category` is optional: the Work page filter that the section's "See all"
// link opens. Use a discipline name from disciplines.ts.
export type TileSize = "wide" | "square";

export interface HomeSection {
  title: string;
  category?: string;
  tiles: { slug: string; size: TileSize }[];
}

// For now the tiles are the empty "coming soon" places. Replace each slug with
// a real project's slug as you add projects.
export const homeSections: HomeSection[] = [
  {
    title: "Design and film",
    tiles: [
      { slug: "graphic-design-soon", size: "square" },
      { slug: "film-and-video-soon", size: "square" },
    ],
  },
  {
    title: "Photography and motion",
    tiles: [
      { slug: "photography-soon", size: "square" },
      { slug: "animation-and-motion-soon", size: "square" },
    ],
  },
  {
    title: "Digital",
    tiles: [
      { slug: "digital-experiences-soon", size: "square" },
      { slug: "digital-communication-soon", size: "square" },
    ],
  },
];
