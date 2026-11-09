// The projects that were on the site before it was reset to empty tiles, kept
// so nothing is lost. To bring one back, copy its entry into `projects` in
// portfolio.ts. Their photos and clips are still in public/portfolio.
import type { Project } from "./portfolio";

export const previousProjects: Project[] = [
  {
    slug: "race-day-photography",
    title: "Race day photography",
    category: "Photography",
    description: "Action and trail photography from race day.",
    year: 2026,
    featured: true,
    transition: "slide",
    media: [
         {
        type: "image",
        src: "/portfolio/visual-identity.jpg",
        alt: "A quiet dirt lane lined with green hedges",
      },
      {
        type: "image",
        src: "/portfolio/rider-mud.jpg",
        alt: "A rider kicking up mud on a dirt track",
      },
      {
        type: "image",
        src: "/portfolio/trail-bridge.jpg",
        alt: "A rough wooden bridge over a muddy trail",
      },
   
    ],
  },
     
  {
    slug: "nzau-animated-poster",
    title: "Animated Poster",
    category: "Animation & Motion",
    description: "A poster brought to life with motion.",
    year: 2026,
    featured: true,
    transition: "fade",
    media: [
      {
        type: "video",
        src: "/portfolio/nzau-animated-poster/nzau-animated-poster-1.mp4",
        poster: "/portfolio/nzau-animated-poster/nzau-animated-poster-1-poster.jpg",
        alt: "The Nzau poster animating in a loop",
      },
    ],
  },
   {
    slug: "bird-render",
    title: "3D Renders",
    category: "Animation & Motion",
    description: "One line about it.",
    year: 2026,
    featured: true,
    transition: "fade",
    media: [
      {
        type: "video",
        src: "/portfolio/bird-render/7.mp4",
        poster: "/portfolio/bird-render/7-poster.jpg",
        alt: "A 3D render of a bird in flight",
      },
        {
        type: "image",
        src: "/portfolio/subaru-fr/13.jpg",
        alt: "TODO: describe this photo",
      },
       {
        type: "image",
        src: "/portfolio/desk-light/15.jpg",
        alt: "TODO: describe this photo",
      },
      
    ],
  },
  {
    slug: "pet-portraits",
    title: "Pet Portraits",
    category: "Photography",
    description: "Natural-light portraits of dogs and cats.",
    year: 2026,
    featured: true,
    transition: "wipe",
    media: [
      {
        type: "image",
        src: "/portfolio/dog-moss.jpg",
        alt: "A brown and white dog resting on mossy ground",
      },
      {
        type: "image",
        src: "/portfolio/cat-up.jpg",
        alt: "A fluffy white cat looking up",
      },
    ],
  },

    
  {
    slug: "desk-light",
    title: "Desk light",
    category: "Animation & Motion",
    description: "One line about it.",
    year: 2026,
    featured: true,
    transition: "fade",
    media: [
  
    ],
  },
  {
    slug: "subaru-fr",
    title: "Subaru FR",
    category: "Animation & Motion",
    description: "One line about it.",
    year: 2026,
    featured: true,
    transition: "slide",
    media: [    
      {
        type: "image",
        src: "/portfolio/subaru-fr/10.jpg",
        alt: "TODO: describe this photo",
      },
      {
        type: "image",
        src: "/portfolio/subaru-fr/11.jpg",
        alt: "TODO: describe this photo",
      },
      {
        type: "image",
        src: "/portfolio/subaru-fr/12.jpg",
        alt: "TODO: describe this photo",
      },
      {
        type: "image",
        src: "/portfolio/subaru-fr/13.jpg",
        alt: "TODO: describe this photo",
      },
      {
        type: "image",
        src: "/portfolio/subaru-fr/14.jpg",
        alt: "TODO: describe this photo",
      },
      // paste block contents
    ],
  },
  {
    slug: "moto-4-campaign",
    title: "Posters",
    category: "Graphic Design",
    description: "Event poster and campaign visuals for a motocross race.",
    year: 2026,
    featured: true,
    transition: "fade",
    media: [
      {
        type: "image",
        src: "/portfolio/posters/kigen-mx5-copy-jpg.jpg",
        alt: "TODO: describe this photo",
      },
       {
        type: "image",
        src: "/portfolio/posters/amir-moto-5-redone-jpg.jpg",
        alt: "TODO: describe this photo",
      },
      
      {
        type: "image",
        src: "/portfolio/posters/moto-5-jpg.jpg",
        alt: "TODO: describe this photo",
      },
      {
        type: "image",
        src: "/portfolio/moto4-poster.jpg",
        alt: "Moto 4 event poster with two riders",
      },
      
    ],
  },
];
