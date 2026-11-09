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
  /** An empty tile that holds a place until the real project is added. It has no page content and is not clickable. */
  comingSoon?: boolean;
}

// How to add a project:
//   1. Put its photos and clips in media-source/<discipline>/<project-name>/
//   2. Run `npm run media` (see the README) and paste the snippet it prints
//      into the `media` list of a new entry below.
//   3. Place it on the home page in src/data/home.ts.
// The empty "coming soon" tiles below hold the places until you do. Delete a
// tile once real projects exist; the Work page hides them as soon as there is
// at least one real project.
export const projects: Project[] = [
  {
    slug: "graphic-design-soon",
    title: "Graphic Design",
    category: "Graphic Design",
    description: "Coming soon.",
    year: 2026,
    featured: false,
    transition: "fade",
    media: [],
    comingSoon: true,
  },
  {
    slug: "film-and-video-soon",
    title: "Film & Video",
    category: "Film & Video",
    description: "Coming soon.",
    year: 2026,
    featured: false,
    transition: "fade",
    media: [],
    comingSoon: true,
  },
  {
    slug: "photography-soon",
    title: "Photography",
    category: "Photography",
    description: "Coming soon.",
    year: 2026,
    featured: false,
    transition: "fade",
    media: [],
    comingSoon: true,
  },
  {
    slug: "animation-and-motion-soon",
    title: "Animation & Motion",
    category: "Animation & Motion",
    description: "Coming soon.",
    year: 2026,
    featured: false,
    transition: "fade",
    media: [],
    comingSoon: true,
  },
  {
    slug: "digital-experiences-soon",
    title: "Digital Experiences",
    category: "Digital Experiences",
    description: "Coming soon.",
    year: 2026,
    featured: false,
    transition: "fade",
    media: [],
    comingSoon: true,
  },
  {
    slug: "digital-communication-soon",
    title: "Digital Communication",
    category: "Digital Communication",
    description: "Coming soon.",
    year: 2026,
    featured: false,
    transition: "fade",
    media: [],
    comingSoon: true,
  },
];
