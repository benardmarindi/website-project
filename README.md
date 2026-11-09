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
    portfolio.ts              Portfolio projects (empty "coming soon" tiles until you add yours)
    portfolio-previous.ts     The earlier sample projects, kept for reference
    site.ts                   Email address and social links
public/
  brand/                      Logos
  hero/                       Original photos and video (large)
  portfolio/                  Web-sized project photos and clips
scripts/
  optimize-media.mjs          Makes photos and clips web-ready (npm run media)
media-source/                 Your raw originals, one folder per discipline (stays on your computer)
```

## Adding photos and videos

1. Install [ffmpeg](https://ffmpeg.org) once (`winget install ffmpeg` on Windows, `brew install ffmpeg` on Mac).
2. Run `npm run media` once. It creates `media-source/` with a folder for each of the six disciplines (`graphic-design`, `film-and-video`, `photography`, `animation-and-motion`, `digital-experiences`, `digital-communication`).
3. Inside the right discipline folder, make a folder for the project and drop the raw photos and clips in, for example `media-source/photography/race-day-photography/`. The project folder's name becomes its slug (its web address), so keep it lowercase with dashes and unique. This folder stays on your computer and is never uploaded to GitHub.
4. Run `npm run media -- race-day-photography` (one project), `npm run media -- photography` (every project in a discipline) or `npm run media` (all). It shrinks every photo and clip for the web, saves them in `public/portfolio/<slug>/`, and prints a `category` line and a `media: [ ... ]` snippet.
5. Add an entry to `src/data/portfolio.ts`, paste the snippet in, and write a real description in each `alt`.

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

## Project pages

Every project has its own page (`/portfolio/<slug>`). A simple project (a poster, say) needs only the basics in `portfolio.ts` and its page shows the carousel and the details.

For a fuller case study, add a `cover` (one strong opening picture or clip) and a list of `sections`. A section appears only if you include it, in the order you write it:

- `overview`, `brief`, `approach`, `outcome`: a heading and your text (`approach` and `outcome` can also carry `media`)
- `gallery`: the actual work, with an optional `title` and `layout: "full"` or `"two-up"`

Related work is chosen automatically from the same discipline. `size: "large"` or `"small"` on a project sets its tile on the Work page.

The six disciplines (the project categories) are in `src/data/disciplines.ts`.
