// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const slugify = require('slugify');

const ROOT = path.resolve(__dirname, '..');
const EVENTOS_DIR = path.join(ROOT, 'eventos');
const PUBLIC_BLOG_DIR = path.join(ROOT, 'public', 'blog');
const OUTPUT_FILE = path.join(ROOT, 'data', 'posts.json');

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
  const regex = new RegExp(`<!-- ${tag} -->([\\s\\S]*?)<!-- \\/${tag} -->`, 'i');
  const match = content.match(regex);
  return match ? match[1] : '';
}

function parseGallery(gallerySection) {
  return gallerySection
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('- !['))
    .map(line => {
      const match = line.match(/^-\s*!\[([^\]]*)\]\(([^)]+)\)$/);
      return match ? { alt: match[1], srcPath: match[2] } : null;
    })
    .filter(Boolean);
}

function parseTags(tagsSection) {
  return tagsSection
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('- '))
    .map(l => l.slice(2).trim());
}

function processPost(blogPostMdPath) {
  const eventDir = path.dirname(blogPostMdPath);
  const eventFolderName = path.basename(eventDir);

  const date = parseDateFromFolderName(eventFolderName);
  if (!date) {
    console.warn(`  [skip] Could not parse date from: ${eventFolderName}`);
    return null;
  }

  const mdContent = fs.readFileSync(blogPostMdPath, 'utf-8');
  const firstLine = mdContent.split('\n')[0];
  const title = firstLine.replace(/^#+\s*/, '').trim();
  const slug = slugify(title, { lower: true, strict: true });

  const intro = extractSection(mdContent, 'intro').trim();

  const afterIntro = mdContent.split('<!-- /intro -->')[1] ?? '';
  const content = (afterIntro.split('<!-- gallery -->')[0] ?? '').trim();

  const galleryItems = parseGallery(extractSection(mdContent, 'gallery'));
  const tags = parseTags(extractSection(mdContent, 'tags'));

  const publicSlugDir = path.join(PUBLIC_BLOG_DIR, slug);
  if (fs.existsSync(publicSlugDir)) {
    fs.rmSync(publicSlugDir, { recursive: true, force: true });
  }
  fs.mkdirSync(publicSlugDir, { recursive: true });

  const gallery = galleryItems.map((item, idx) => {
    const destName = `img-${String(idx + 1).padStart(3, '0')}.jpg`;
    const srcPath = path.join(eventDir, item.srcPath);
    const destPath = path.join(publicSlugDir, destName);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    } else {
      console.warn(`  [warn] Image not found: ${srcPath}`);
    }

    return { path: `/blog/${slug}/${destName}`, alt: item.alt };
  });

  return {
    id: crypto.randomUUID(),
    date,
    title,
    slug,
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
    .filter(f => fs.statSync(path.join(EVENTOS_DIR, f)).isDirectory())
    .sort();

  for (const yearDir of yearDirs) {
    const yearPath = path.join(EVENTOS_DIR, yearDir);
    const eventDirs = fs
      .readdirSync(yearPath)
      .filter(f => fs.statSync(path.join(yearPath, f)).isDirectory())
      .sort();

    for (const eventDir of eventDirs) {
      const blogPostPath = path.join(yearPath, eventDir, 'blog-post.md');
      if (!fs.existsSync(blogPostPath)) continue;

      const post = processPost(blogPostPath);
      if (post) {
        posts.push(post);
        console.log(`  ✓ ${post.slug}`);
      }
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf-8');
  console.log(`\nWrote ${posts.length} posts → ${OUTPUT_FILE}`);
}

main();
