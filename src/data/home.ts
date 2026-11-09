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
export type TileSize = "wide" | "square";

export interface HomeSection {
  title: string;
  /** Optional: the Work page category this section's "See all" link opens. */
  category?: string;
  tiles: { slug: string; size: TileSize }[];
}

export const homeSections: HomeSection[] = [
  {
    title: "Photography",
    category: "Photography",
    tiles: [
      { slug: "race-day-photography", size: "wide" },
      { slug: "pet-portraits", size: "wide" },
    ],
  },
  {
    title: "3D and motion",
    category: "Animation & Motion",
    tiles: [
      { slug: "bird-render", size: "wide" },
      { slug: "subaru-fr", size: "square" },
      { slug: "desk-light", size: "square" },
    ],
  },
  {
    title: "Design and animation",
    tiles: [
      { slug: "moto-4-campaign", size: "square" },
      { slug: "nzau-animated-poster", size: "square" },
    ],
  },
];
