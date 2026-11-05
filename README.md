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
    layout/Footer.tsx         Site footer
    sections/WorkGrid.tsx     Filterable grid of projects (Work page)
    sections/ContactCta.tsx   "Have a project in mind?" band
    ui/ProjectCarousel.tsx    Swipeable, self-advancing photo carousel
  data/
    portfolio.ts              Portfolio projects
    site.ts                   Email address and social links
public/
  brand/                      Logos
  hero/                       Original photos and video (large)
  portfolio/                  Web-sized project images
```

## Adding a portfolio project

Add an entry to `src/data/portfolio.ts`. Put the project's photos in `public/portfolio/` (about 2000px wide is plenty) and list them in `images`. Two or more photos make a carousel that swipes and changes by itself.

Choose how the photos change with `transition`:

- `"slide"` pushes the next photo in from the side
- `"fade"` crossfades while slowly zooming
- `"wipe"` reveals the next photo with a wipe

## Your details

`src/data/site.ts` holds your email address and social media links. Fill them in and they update everywhere. Social links with no address are hidden.

## Status

Work in progress. Still to build:

- Contact form that sends straight to your inbox (it currently opens the visitor's email app)
- Payment integration
- Social media links and connections
- Real portfolio content and images
- SEO, analytics and launch setup
