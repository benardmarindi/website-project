// The home page's "Selected work" section, laid out by you.
//
// Tiles appear in this order, top to bottom. For each one choose:
//   "wide"    a full-width tile
//   "square"  a square tile; two squares sit side by side on a row
//
// Keep squares in pairs (a single square leaves an empty space beside it).
// `slug` must match a project's slug in portfolio.ts exactly. A project that
// is not listed here does not appear on the home page (it is still on the
// Work page).
export type TileSize = "wide" | "square";

export const homeTiles: { slug: string; size: TileSize }[] = [
  {slug: "bird-render", size: "wide"},
  { slug: "nzau-animated-poster", size: "square" },
  { slug: "moto-4-campaign", size: "square" },
  { slug: "pet-portraits", size: "wide" },
  
  { slug: "subaru-fr", size: "wide" },
  { slug: "race-day-photography", size: "wide" },
];