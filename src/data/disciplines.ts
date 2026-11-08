// RR Empire's six disciplines. The names here are the project categories used
// across the site (the `category` of every project, the Work page filters), so
// edit the wording once and it updates everywhere.
export const disciplines = [
  {
    name: "Graphic Design",
    description:
      "Posters, brochures, company profiles, brand identities, marketing materials and campaign designs.",
  },
  {
    name: "Film & Video",
    description:
      "Commercials, promotional videos, event coverage, documentaries and video editing.",
  },
  {
    name: "Photography",
    description:
      "Product, corporate, event, lifestyle and portrait photography.",
  },
  {
    name: "Animation & Motion",
    description:
      "2D animation, 3D animation, motion graphics and visual storytelling.",
  },
  {
    name: "Digital Experiences",
    description: "Websites, web applications, software and system development.",
  },
  {
    name: "Digital Communication",
    description:
      "Social media management, content strategy, campaign execution and digital marketing.",
  },
] as const;

export type ProjectCategory = (typeof disciplines)[number]["name"];
