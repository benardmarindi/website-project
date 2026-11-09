import type { ProjectMedia } from "./portfolio";

// Photos and clips behind the welcome text on the home page.
// To add one: put the raw files in media-source/hero/, run `npm run media -- hero`,
// and paste the printed block between the square brackets below.
export const heroMedia: ProjectMedia[] = [
   
     {
        type: "video",
        src: "/portfolio/hero/6.mp4",
        poster: "/portfolio/hero/6-poster.jpg",
        alt: "TODO: describe this clip",
      },
    {
        type: "video",
        src: "/portfolio/hero/8.mp4",
        poster: "/portfolio/hero/8-poster.jpg",
        alt: "TODO: describe this clip",
      },
      
      {
        type: "video",
        src: "/portfolio/hero/5.mp4",
        poster: "/portfolio/hero/5-poster.jpg",
        alt: "TODO: describe this clip",
      },
      {
        type: "video",
        src: "/portfolio/hero/1.mp4",
        poster: "/portfolio/hero/1-poster.jpg",
        alt: "TODO: describe this clip",
      },
       {
        type: "video",
        src: "/portfolio/hero/3.mp4",
        poster: "/portfolio/hero/3-poster.jpg",
        alt: "TODO: describe this clip",
      },
      {
        type: "video",
        src: "/portfolio/hero/2.mp4",
        poster: "/portfolio/hero/2-poster.jpg",
        alt: "TODO: describe this clip",
      },
     
      {
        type: "video",
        src: "/portfolio/hero/4.mp4",
        poster: "/portfolio/hero/4-poster.jpg",
        alt: "TODO: describe this clip",
      },
      {
        type: "image",
        src: "/portfolio/visual-identity.jpg",
        alt: "A quiet dirt lane lined with green hedges",
      },
      {
        type: "video",
        src: "/portfolio/bird-render/7.mp4",
        poster: "/portfolio/bird-render/7-poster.jpg",
        alt: "A 3D render of a bird in flight",
      },
     
      
    ];


// Shown when heroMedia is empty.
export const heroFallback: ProjectMedia = {
  type: "image",
  src: "/portfolio/trail-bridge.jpg",
  alt: "A rough wooden bridge over a muddy trail",
};