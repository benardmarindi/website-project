import type { ProjectMedia } from "./portfolio";

// The photos and clips behind the welcome text at the top of the home page.
// They play one after another, then start over. Leave the list empty to show
// the default photo.
//
// To add one: put the raw files in media-source/hero/, run `npm run media -- hero`,
// and paste the printed block between the square brackets below.
// Wide (landscape) clips work best here, and short ones (5 to 15 seconds) are ideal.
export const heroMedia: ProjectMedia[] = [];

// Shown when heroMedia is empty.
export const heroFallback: ProjectMedia = {
  type: "image",
  src: "/portfolio/trail-bridge.jpg",
  alt: "A rough wooden bridge over a muddy trail",
};
