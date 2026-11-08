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
  portfolio/                  Web-sized project photos and clips
scripts/
  optimize-media.mjs          Makes photos and clips web-ready (npm run media)
media-source/                 Your raw originals (stays on your computer)
```

## Adding photos and videos

1. Install [ffmpeg](https://ffmpeg.org) once (`winget install ffmpeg` on Windows, `brew install ffmpeg` on Mac).
2. Make a folder per project in `media-source/` (the folder name becomes the project's slug) and drop the raw photos and clips in. This folder stays on your computer and is never uploaded to GitHub.
3. Run `npm run media`. It shrinks every photo and clip for the web, saves them in `public/portfolio/<slug>/`, and prints a `media: [ ... ]` snippet.
4. Add an entry to `src/data/portfolio.ts`, paste the snippet in, and write a real description in each `alt`.

Photos become 2000px-wide JPGs. Clips become silent 720p MP4s with a still frame to show while they load. Keep clips short (under about 15 seconds): they play on a loop inside the carousel, and the carousel moves on when a clip ends. Full-length films belong on YouTube or Vimeo. Add `film: { provider: "youtube", id: "...", title: "..." }` to the project and it appears as a player on the project's own page.

Two or more photos or clips make a carousel that swipes and changes by itself.

Choose how the slides change with `transition`:

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
