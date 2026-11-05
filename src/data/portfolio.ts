export type ProjectCategory =
  | "Graphic Design"
  | "Videography"
  | "Photography"
  | "Animation"
  | "Web Development"
  | "System Development"
  | "Social Media"
  | "Video Editing";

// How a project's photos change from one to the next.
export type CarouselTransition = "slide" | "fade" | "wipe";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  year: number;
  featured: boolean;
  /** Photos shown in the project's carousel, in order. */
  images: ProjectImage[];
  /** Animation used when the carousel changes photo. */
  transition: CarouselTransition;
  client?: string;
  role?: string;
  brief?: string;
  outcome?: string;
}

// TODO: these use sample photos. Put each project's own photos in /public/portfolio
// and list them in `images`. Any number of photos works (2 or more makes a carousel).
export const projects: Project[] = [
  {
    slug: "race-day-photography",
    title: "Race day photography",
    category: "Photography",
    description: "Action and trail photography from race day.",
    year: 2026,
    featured: true,
    transition: "slide",
    images: [
      {
        src: "/portfolio/rider-mud.jpg",
        alt: "A rider kicking up mud on a dirt track",
      },
      {
        src: "/portfolio/trail-bridge.jpg",
        alt: "A rough wooden bridge over a muddy trail",
      },
      {
        src: "/portfolio/visual-identity.jpg",
        alt: "A quiet dirt lane lined with green hedges",
      },
    ],
  },
  {
    slug: "moto-4-campaign",
    title: "Moto 4 campaign",
    category: "Graphic Design",
    description: "Event poster and campaign visuals for a motocross race.",
    year: 2026,
    featured: true,
    transition: "fade",
    images: [
      {
        src: "/portfolio/moto4-poster.jpg",
        alt: "Moto 4 event poster with two riders",
      },
      {
        src: "/portfolio/rider-mud.jpg",
        alt: "A rider kicking up mud on a dirt track",
      },
      {
        src: "/portfolio/trail-bridge.jpg",
        alt: "A rough wooden bridge over a muddy trail",
      },
    ],
  },
  {
    slug: "pet-portraits",
    title: "Pet portraits",
    category: "Photography",
    description: "Natural-light portraits of dogs and cats.",
    year: 2026,
    featured: true,
    transition: "wipe",
    images: [
      {
        src: "/portfolio/dog-moss.jpg",
        alt: "A brown and white dog resting on mossy ground",
      },
      {
        src: "/portfolio/cat-up.jpg",
        alt: "A fluffy white cat looking up",
      },
    ],
  },
];
