# RR Empire — Website

Portfolio and services website for RR Empire, a creative studio working across design, film, photography, animation, web and system development, social media and video editing.

Built with [Next.js](https://nextjs.org) (App Router), React and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```

## Project structure

```
src/
  app/
    page.tsx                  Home
    portfolio/page.tsx        All work (filterable)
    portfolio/[slug]/page.tsx Single project page
    services/page.tsx         Services
    about/page.tsx            About
    contact/page.tsx          Contact and enquiry form
    layout.tsx                Root layout, fonts, metadata
    globals.css               Theme variables and base styles
  components/
    navigation/Navbar.tsx     Site header and mobile menu
    sections/SelectedWork.tsx Featured work section
  data/
    portfolio.ts              Portfolio projects
public/
  brand/                      Logos
  hero/                       Hero photos and video
  portfolio/                  Project images
```

## Adding a portfolio project

Add an entry to `src/data/portfolio.ts`. Put its image in `public/portfolio/` and set `image` to its path (for example `"/portfolio/my-project.jpg"`). A project without an `image` shows a numbered placeholder.

## Status

Work in progress. Still to build:

- Contact form submission (the form currently does not send anything)
- Payment integration
- Social media links and connections
- Real portfolio content and images
- SEO, analytics and launch setup
