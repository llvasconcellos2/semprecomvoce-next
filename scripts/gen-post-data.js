// @ts-check
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const slugify = require("slugify");

const ROOT = path.resolve(__dirname, "..");

/**
 * Returns { width, height } for a JPEG or PNG file.
 * Pure Node.js — no external dependencies.
 * @param {string} filePath
 */
function getImageDimensions(filePath) {
  const fd = fs.openSync(filePath, "r");
  const buf = Buffer.alloc(512);
  fs.readSync(fd, buf, 0, 512, 0);

  // PNG: signature is 8 bytes, IHDR chunk starts at byte 8
  // IHDR: 4-byte length, 4-byte "IHDR", then 4-byte width, 4-byte height
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    fs.closeSync(fd);
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // JPEG: scan for SOF0 (0xFFC0) or SOF2 (0xFFC2) marker
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    const fullBuf = Buffer.alloc(fs.statSync(filePath).size);
    fs.readSync(fd, fullBuf, 0, fullBuf.length, 0);
    fs.closeSync(fd);
    let i = 2;
    while (i < fullBuf.length - 8) {
      if (fullBuf[i] !== 0xff) break;
      const marker = fullBuf[i + 1];
      const len = fullBuf.readUInt16BE(i + 2);
      if (marker === 0xc0 || marker === 0xc2) {
        return {
          height: fullBuf.readUInt16BE(i + 5),
          width: fullBuf.readUInt16BE(i + 7),
        };
      }
      i += 2 + len;
    }
  }

  fs.closeSync(fd);
  return null;
}
const EVENTOS_DIR = path.join(ROOT, "eventos");
const PUBLIC_BLOG_DIR = path.join(ROOT, "public", "blog");
const OUTPUT_FILE = path.join(ROOT, "data", "posts.json");

function parseDateFromFolderName(folderName) {
  const match = folderName.match(/^(\d{4})\.(\d{2})\.(\d{2})/);
  if (!match) return null;
  return {
    year: parseInt(match[1], 10),
    month: parseInt(match[2], 10),
    day: parseInt(match[3], 10),
  };
}

function extractSection(content, tag) {
  const regex = new RegExp(
    `<!-- ${tag} -->([\\s\\S]*?)<!-- \\/${tag} -->`,
    "i",
  );
  const match = content.match(regex);
  return match ? match[1] : "";
}

function parseGallery(gallerySection) {
  return gallerySection
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- !["))
    .map((line) => {
      const match = line.match(/^-\s*!\[([^\]]*)\]\(([^)]+)\)$/);
      return match ? { alt: match[1], srcPath: match[2] } : null;
    })
    .filter(Boolean);
}

function parseTags(tagsSection) {
  return tagsSection
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- "))
    .map((l) => l.slice(2).trim());
}

function processPost(blogPostMdPath) {
  const eventDir = path.dirname(blogPostMdPath);
  const eventFolderName = path.basename(eventDir);

  const date = parseDateFromFolderName(eventFolderName);
  if (!date) {
    console.warn(`  [skip] Could not parse date from: ${eventFolderName}`);
    return null;
  }

  const mdContent = fs.readFileSync(blogPostMdPath, "utf-8");
  const firstLine = mdContent.split("\n")[0];
  const title = firstLine.replace(/^#+\s*/, "").trim();
  const slug = slugify(title, { lower: true, strict: true });
  const author = "Andrea";

  const intro = extractSection(mdContent, "intro").trim();

  const afterIntro = mdContent.split("<!-- /intro -->")[1] ?? "";
  const content = (afterIntro.split("<!-- gallery -->")[0] ?? "").trim();

  const galleryItems = parseGallery(extractSection(mdContent, "gallery"));
  const tags = parseTags(extractSection(mdContent, "tags"));

  const publicSlugDir = path.join(PUBLIC_BLOG_DIR, slug);
  if (fs.existsSync(publicSlugDir)) {
    fs.rmSync(publicSlugDir, { recursive: true, force: true });
  }
  fs.mkdirSync(publicSlugDir, { recursive: true });

  const gallery = galleryItems.map((item, idx) => {
    const destName = `img-${String(idx + 1).padStart(3, "0")}.jpg`;
    const srcPath = path.join(eventDir, item.srcPath);
    const destPath = path.join(publicSlugDir, destName);

    let dimensions = null;
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      dimensions = getImageDimensions(destPath);
    } else {
      console.warn(`  [warn] Image not found: ${srcPath}`);
    }

    return {
      path: `/blog/${slug}/${destName}`,
      alt: item.alt,
      ...(dimensions ?? {}),
    };
  });

  return {
    id: crypto.randomUUID(),
    date,
    title,
    slug,
    author,
    intro,
    content,
    gallery,
    tags,
  };
}

function main() {
  const posts = [];

  const yearDirs = fs
    .readdirSync(EVENTOS_DIR)
    .filter((f) => fs.statSync(path.join(EVENTOS_DIR, f)).isDirectory())
    .sort();

  for (const yearDir of yearDirs) {
    const yearPath = path.join(EVENTOS_DIR, yearDir);
    const eventDirs = fs
      .readdirSync(yearPath)
      .filter((f) => fs.statSync(path.join(yearPath, f)).isDirectory())
      .sort();

    for (const eventDir of eventDirs) {
      const blogPostPath = path.join(yearPath, eventDir, "blog-post.md");
      if (!fs.existsSync(blogPostPath)) continue;

      const post = processPost(blogPostPath);
      if (post) {
        posts.push(post);
        console.log(`  ✓ ${post.slug}`);
      }
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), "utf-8");
  console.log(`\nWrote ${posts.length} posts → ${OUTPUT_FILE}`);
}

main();
