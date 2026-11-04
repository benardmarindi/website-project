export type ProjectCategory =
  | "Graphic Design"
  | "Videography"
  | "Photography"
  | "Animation"
  | "Web Development"
  | "System Development"
  | "Social Media"
  | "Video Editing";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  year: number;
  featured: boolean;
  image?: string;
  client?: string;
  role?: string;
  brief?: string;
  outcome?: string;
  gallery?: string[];
}

// TODO: add `image` (e.g. "/portfolio/<slug>.jpg") to each project once the file exists in /public.
// Projects without an image show a numbered placeholder.
export const projects: Project[] = [
  {
    slug: "visual-identity",
    title: "Visual Identity",
    category: "Graphic Design",
    description:
      "Visual communication built around a clear identity, strong composition and memorable design.",
    year: 2026,
    featured: true,
    image: "/portfolio/visual-identity.jpg",
    client: "Creative Studio",
    role: "Art Direction & Graphic Design",
    brief:
      "A visual identity project focused on creating a distinctive and consistent visual language.",
    outcome:
      "A flexible visual system designed to work across digital and physical communication.",
  },
  {
    slug: "moving-stories",
    title: "Moving Stories",
    category: "Videography",
    description:
      "Visual storytelling through cinematic production, editing and motion.",
    year: 2026,
    featured: true,
    client: "Creative Studio",
    role: "Production & Video Editing",
    brief:
      "A visual storytelling project built around movement, atmosphere and strong narrative.",
    outcome:
      "A cinematic visual piece designed for digital platforms and social media.",
  },
  {
    slug: "digital-experiences",
    title: "Digital Experiences",
    category: "Web Development",
    description:
      "Modern digital experiences designed to connect people, ideas and technology.",
    year: 2026,
    featured: true,
    client: "Creative Studio",
    role: "Web Design & Development",
    brief:
      "A digital experience combining visual design, interaction and modern web technology.",
    outcome:
      "A responsive digital experience designed around clarity, usability and visual impact.",
  },
];