// Turns your raw photos and clips into web-ready files, and prints the code
// to paste into src/data/portfolio.ts.
//
//   1. Put the raw files for a project in a folder for it inside its
//      discipline's folder:
//        media-source/photography/race-day-photography/1.jpg
//      (the project folder's name becomes its slug)
//   2. Run   npm run media                      (every project)
//        or  npm run media -- race-day-photography   (just one project)
//        or  npm run media -- photography        (every project in a discipline)
//   3. Web-ready files appear in  public/portfolio/<project-slug>/
//
// The discipline folders are created for you the first time you run this.
// Folders placed directly in media-source (like "hero") still work too.
// Needs ffmpeg installed (https://ffmpeg.org). Nothing else.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "media-source");
const outputRoot = path.join(root, "public", "portfolio");

// Folder name -> the discipline's name in src/data/disciplines.ts.
// Keep this list in step with that file.
const DISCIPLINES = [
  ["graphic-design", "Graphic Design"],
  ["film-and-video", "Film & Video"],
  ["photography", "Photography"],
  ["animation-and-motion", "Animation & Motion"],
  ["digital-experiences", "Digital Experiences"],
  ["digital-communication", "Digital Communication"],
];
const disciplineFolders = new Map(DISCIPLINES);

const IMAGE_TYPES = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_TYPES = new Set([".mp4", ".mov", ".m4v", ".webm", ".mkv"]);
const UNSUPPORTED = new Set([".heic", ".heif"]);

const IMAGE_MAX_WIDTH = 2000; // pixels: plenty for a full-width photo
const VIDEO_MAX_WIDTH = 1280; // pixels: 720p-class clips
const VIDEO_QUALITY = "27"; // lower = sharper and bigger (23 to 30 is sensible)
const LONG_CLIP_SECONDS = 20;
const BIG_CLIP_MB = 10;

function run(command, args) {
  return spawnSync(command, args, { encoding: "utf8" });
}

function hasFfmpeg() {
  const result = run("ffmpeg", ["-version"]);
  return !result.error && result.status === 0;
}

function slugify(text) {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "file"
  );
}

function size(bytes) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
}

function seconds(file) {
  const result = run("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "csv=p=0",
    file,
  ]);
  const value = parseFloat(result.stdout);
  return Number.isFinite(value) ? value : 0;
}

function ffmpeg(args) {
  const result = run("ffmpeg", ["-v", "error", "-y", ...args]);
  if (result.status !== 0) {
    throw new Error((result.stderr || "ffmpeg failed").trim());
  }
}

function makeImage(input, output) {
  ffmpeg([
    "-i",
    input,
    "-frames:v",
    "1",
    "-vf",
    `scale='min(${IMAGE_MAX_WIDTH},iw)':-2`,
    "-q:v",
    "5",
    output,
  ]);
}

function makeClip(input, output, poster) {
  // Silent, because clips play muted. "+faststart" lets them start playing
  // before they have finished downloading.
  ffmpeg([
    "-i",
    input,
    "-vf",
    `scale='min(${VIDEO_MAX_WIDTH},iw)':-2`,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    VIDEO_QUALITY,
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    output,
  ]);

  // A still frame shown while the clip loads.
  const frameAt = Math.min(0.5, seconds(output) / 2);
  ffmpeg([
    "-ss",
    String(frameAt),
    "-i",
    output,
    "-frames:v",
    "1",
    "-vf",
    `scale='min(${VIDEO_MAX_WIDTH},iw)':-2`,
    "-q:v",
    "6",
    poster,
  ]);
}

function processProject({ slug, dir: inputDir, discipline }) {
  const outputDir = path.join(outputRoot, slug);
  const publicBase = `/portfolio/${slug}`;

  const files = readdirSync(inputDir)
    .filter((name) => statSync(path.join(inputDir, name)).isFile())
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  mkdirSync(outputDir, { recursive: true });

  const entries = [];
  const used = new Set();
  console.log(`\n${slug}${discipline ? `  (${discipline})` : ""}`);

  for (const name of files) {
    const extension = path.extname(name).toLowerCase();
    const input = path.join(inputDir, name);

    if (UNSUPPORTED.has(extension)) {
      console.log(
        `  skipped  ${name}  (HEIC photos: export them as JPG first)`,
      );
      continue;
    }
    if (!IMAGE_TYPES.has(extension) && !VIDEO_TYPES.has(extension)) {
      continue; // ignore .DS_Store, notes and other non-media files
    }

    // Give every output a unique, tidy name.
    const stem = slugify(path.parse(name).name);
    let base = stem;
    for (let count = 2; used.has(base); count += 1) {
      base = `${stem}-${count}`;
    }
    used.add(base);

    try {
      if (IMAGE_TYPES.has(extension)) {
        const output = path.join(outputDir, `${base}.jpg`);
        makeImage(input, output);
        console.log(
          `  photo    ${name}  ${size(statSync(input).size)} -> ${size(statSync(output).size)}`,
        );
        entries.push(
          `      {\n        type: "image",\n        src: "${publicBase}/${base}.jpg",\n        alt: "TODO: describe this photo",\n      },`,
        );
      } else {
        const output = path.join(outputDir, `${base}.mp4`);
        const poster = path.join(outputDir, `${base}-poster.jpg`);
        const length = seconds(input);
        makeClip(input, output, poster);
        const outputSize = statSync(output).size;
        console.log(
          `  clip     ${name}  ${size(statSync(input).size)} -> ${size(outputSize)}  (${length.toFixed(0)}s)`,
        );
        if (length > LONG_CLIP_SECONDS || outputSize > BIG_CLIP_MB * 1024 * 1024) {
          console.log(
            `           Heads up: that is a long clip. Short loops (under about ${LONG_CLIP_SECONDS} seconds) work best in the carousel.\n` +
              "           Put full-length films on YouTube or Vimeo and use `film` in portfolio.ts instead.",
          );
        }
        entries.push(
          `      {\n        type: "video",\n        src: "${publicBase}/${base}.mp4",\n        poster: "${publicBase}/${base}-poster.jpg",\n        alt: "TODO: describe this clip",\n      },`,
        );
      }
    } catch (error) {
      console.log(`  FAILED   ${name}  ${error.message}`);
    }
  }

  if (entries.length === 0) {
    console.log("  Nothing to process in this folder.");
    return;
  }

  console.log(
    `\nPaste this into the "${slug}" entry in src/data/portfolio.ts, then write a real description in each alt:\n`,
  );
  if (discipline) {
    console.log(`    category: "${discipline}",`);
  }
  console.log(`    media: [\n${entries.join("\n")}\n    ],`);
}

// Creates media-source and one folder per discipline, if they are missing.
function ensureFolders() {
  const created = [];
  mkdirSync(sourceRoot, { recursive: true });
  for (const [folder] of DISCIPLINES) {
    const dir = path.join(sourceRoot, folder);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
      created.push(folder);
    }
  }
  if (created.length > 0) {
    console.log(`Created discipline folders in media-source: ${created.join(", ")}\n`);
  }
}

const isDirectory = (dir) => statSync(dir).isDirectory();

// Every project folder: inside a discipline folder, or (older layout) directly
// inside media-source.
function findProjects() {
  const found = [];
  for (const name of readdirSync(sourceRoot)) {
    const dir = path.join(sourceRoot, name);
    if (!isDirectory(dir)) continue;

    if (disciplineFolders.has(name)) {
      for (const child of readdirSync(dir)) {
        const childDir = path.join(dir, child);
        if (isDirectory(childDir)) {
          found.push({
            slug: child,
            dir: childDir,
            discipline: disciplineFolders.get(name),
            folder: name,
          });
        }
      }
    } else {
      found.push({ slug: name, dir, discipline: null, folder: null });
    }
  }
  return found;
}

function main() {
  ensureFolders();

  if (!hasFfmpeg()) {
    console.log(
      [
        "This tool needs ffmpeg, and it was not found on your computer.",
        "",
        "Install it, then open a new terminal and run this again:",
        "  Windows:  winget install ffmpeg",
        "  Mac:      brew install ffmpeg",
        "  Linux:    sudo apt install ffmpeg",
      ].join("\n"),
    );
    process.exit(1);
  }

  const all = findProjects();

  // Slugs become web addresses, so two projects must not share one.
  const seen = new Set();
  for (const project of all) {
    if (seen.has(project.slug)) {
      console.log(
        `Two project folders are named "${project.slug}". Rename one: the name becomes the project's web address and its folder in public/portfolio.`,
      );
      process.exit(1);
    }
    seen.add(project.slug);
  }

  const requested = process.argv.slice(2);
  let selected = all;

  if (requested.length > 0) {
    selected = [];
    for (const name of requested) {
      const matches = all.filter(
        (project) => project.slug === name || project.folder === name,
      );
      if (matches.length === 0) {
        console.log(`\n${name}\n  No project or discipline folder with that name.`);
      }
      selected.push(...matches);
    }
  }

  if (selected.length === 0) {
    console.log(
      [
        "There are no project folders yet. Make one for each project inside its discipline's folder, and put the raw photos and clips in it. For example:",
        "",
        "  media-source/",
        "    photography/",
        "      race-day-photography/",
        "        1.jpg",
        "        2.mp4",
        "    animation-and-motion/",
        "      nzau-animated-poster/",
        "        clip.mov",
        "",
        "The folder name becomes the project's slug. Then run this again.",
      ].join("\n"),
    );
    return;
  }

  for (const project of selected) {
    processProject(project);
  }

  console.log("\nDone.");
}

main();
