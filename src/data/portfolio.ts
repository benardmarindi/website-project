import type { ProjectCategory } from "./disciplines";
export type { ProjectCategory };

// How a project's photos and clips change from one to the next.
export type CarouselTransition = "slide" | "fade" | "wipe";

// One slide in a project's carousel: a photo, or a short silent clip that
// plays on its own. `poster` is the still shown while the clip loads.
export type ProjectMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

// A full-length film hosted on YouTube or Vimeo, shown on the project's page.
// `id` is the part of the video's address that identifies it:
//   youtube.com/watch?v=dQw4w9WgXcQ  ->  "dQw4w9WgXcQ"
//   vimeo.com/76979871               ->  "76979871"
export interface ProjectFilm {
  provider: "youtube" | "vimeo";
  id: string;
  title: string;
}

export function filmEmbedUrl(film: ProjectFilm): string {
  return film.provider === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${film.id}`
    : `https://player.vimeo.com/video/${film.id}`;
}

// One part of a project's own page. Include only the sections a project
// needs, in the order you want them to appear.
export type ProjectSection =
  | { type: "overview"; text: string }
  | { type: "brief"; text: string }
  | { type: "approach"; text: string; media?: ProjectMedia[] }
  | {
      type: "gallery";
      title?: string; // for example "Process" or "Final pieces"
      layout?: "full" | "two-up"; // one picture per row, or two side by side
      media: ProjectMedia[];
    }
  | { type: "outcome"; text: string; media?: ProjectMedia[] };

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  year: number;
  featured: boolean;
  /** Photos and short clips shown in the project's carousel, in order. */
  media: ProjectMedia[];
  /** Animation used when the carousel changes slide. */
  transition: CarouselTransition;
  /** Optional full-length film, shown on the project's own page. */
  film?: ProjectFilm;
  client?: string;
  role?: string;
  brief?: string;
  outcome?: string;
  /** Size of the project's tile on the Work page: "large" is full width, "small" is half. Leave out to let the page choose. */
  size?: "large" | "small";
  /** The strong opening picture or clip on the project's page. Used with `sections`; falls back to the first item in `media`. */
  cover?: ProjectMedia;
  /** The project's page, section by section. Leave out to show the carousel and the details only. */
  sections?: ProjectSection[];
}

// To add a project, run `npm run media` on its photos and clips (see README),
// then paste the snippet it prints into the `media` list of a new entry below.
export const projects: Project[] = [
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
