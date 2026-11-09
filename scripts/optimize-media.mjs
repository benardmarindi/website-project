// Turns your raw photos and clips into web-ready files, and prints the code
// to paste into src/data/portfolio.ts.
//
//   1. Put the raw files for a project in  media-source/<project-slug>/
//   2. Run   npm run media          (every project folder)
//        or  npm run media -- my-project   (just one)
//   3. Web-ready files appear in  public/portfolio/<project-slug>/
//
// Needs ffmpeg installed (https://ffmpeg.org). Nothing else.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "media-source");
const outputRoot = path.join(root, "public", "portfolio");

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

function processProject(slug) {
  const inputDir = path.join(sourceRoot, slug);
  const outputDir = path.join(outputRoot, slug);
  const publicBase = `/portfolio/${slug}`;

  const files = readdirSync(inputDir)
    .filter((name) => statSync(path.join(inputDir, name)).isFile())
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  mkdirSync(outputDir, { recursive: true });

  const entries = [];
  const used = new Set();
  console.log(`\n${slug}`);

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
  console.log(`    media: [\n${entries.join("\n")}\n    ],`);
}

function main() {
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

  if (!existsSync(sourceRoot)) {
    mkdirSync(sourceRoot, { recursive: true });
    console.log(
      [
        "Created the media-source folder.",
        "",
        "Make one folder inside it per project and drop your raw photos and clips in.",
        "The folder name becomes the project's slug, for example:",
        "",
        "  media-source/",
        "    nzau-animated-poster/",
        "      clip.mov",
        "      poster.png",
        "",
        "Then run this again.",
      ].join("\n"),
    );
    return;
  }

  const requested = process.argv.slice(2);
  const projects =
    requested.length > 0
      ? requested
      : readdirSync(sourceRoot).filter((name) =>
          statSync(path.join(sourceRoot, name)).isDirectory(),
        );

  if (projects.length === 0) {
    console.log("media-source is empty. Add a folder per project first.");
    return;
  }

  for (const slug of projects) {
    if (!existsSync(path.join(sourceRoot, slug))) {
      console.log(`\n${slug}\n  No folder at media-source/${slug}`);
      continue;
    }
    processProject(slug);
  }

  console.log("\nDone.");
}

main();
