# Plan: Create docs/README-prompt.md

## Context

The user wants a reusable prompt document (`docs/README-prompt.md`) they can run via Claude Code on any of their portfolio projects to generate a polished `README.md`. The README must supply all the structured data needed to render a portfolio project card (matching the image provided), as well as be a complete, well-formed project readme. The format draws on the existing `docs/README-template.md` but extends it significantly with devicon badges, HTML screenshot galleries, custom shields, and portfolio-specific metadata.

## What to create

**Single file:** `docs/README-prompt.md`  
Contents: a self-contained Claude Code prompt (not code — a prose instruction document with embedded formatting rules) that Claude will execute when dropped into any project repo.

## Prompt structure (what the generated prompt will instruct Claude to do)

### Phase 1 — Research (no writing yet)

Claude reads all available sources:

1. Existing `README.md`
2. `package.json` / `composer.json` / `requirements.txt` / `build.gradle` / `pyproject.toml` (whichever exists)
3. All files under `screenshots/` (list filenames + sizes)
4. Source tree top-level structure (tech stack inference)
5. `.github/`, `LICENSE`, `CONTRIBUTING.md` if present
6. `git log --oneline -20` to infer date and activity

### Phase 2 — Interactive Q&A (must pause before writing)

Claude asks the user these questions in a single grouped message:

1. **Project name** — human-readable, not the repo slug
2. **One-sentence description**
3. **Kicker line** — short tagline preceded by `//` in the portfolio (e.g., `// medical records · doctors without borders`)
4. **Logo** — list image files found; ask which to use; fallback: which emoji?
5. **Release year** — infer from git/package.json; ask only if unclear
6. **Key features** — 3 bullet points shown on the portfolio card
7. **About text** — extended description beyond the 260-char intro (optional — Claude can draft from README and ask for approval)

### Phase 3 — Write README.md

#### Document structure (in order):

```
<!-- BACK TO TOP ANCHOR -->
<!-- LOGO, TITLE, DESCRIPTION, KICKER, VIEW LIVE LINK -->
<!-- SHIELDS -->
<!-- TABLE OF CONTENTS -->
<!-- ABOUT THE PROJECT -->
<!-- SCREENSHOTS GALLERY -->
<!-- BUILT WITH -->
<!-- GETTING STARTED -->        ← only if original README had it
<!-- LEARN MORE -->             ← titled dynamically per main framework
<!-- ROADMAP -->
<!-- CONTRIBUTORS -->
<!-- CONTACT -->
<!-- MARKDOWN LINKS & IMAGES -->
```

#### Section-by-section rules embedded in the prompt:

**Logo block** — `<div align="center">` with logo img (80×80) or emoji in `<h1>`, then `<h1>` project name, `<p>` description, `<p>// kicker</p>`, then `<a href="https://leonardo-vasconcellos.vercel.app/portfolio/{repo}"><strong>View it live »</strong></a>`

**Shields** (shields.io, style=for-the-badge) in this order:

1. Creator Website — `https://img.shields.io/badge/Creator_Website-leonardo--vasconcellos.vercel.app-2eba7a?style=for-the-badge` → links to `https://leonardo-vasconcellos.vercel.app/`
2. Contributors → `https://img.shields.io/github/contributors/{user}/{repo}.svg?style=for-the-badge`
3. Forks → forks shield
4. Issues → issues shield
5. LinkedIn — `#0A66C2` color → `https://www.linkedin.com/in/llvasconcellos`
6. Release Year — `https://img.shields.io/badge/Released-{YEAR}-gray?style=for-the-badge`

- NO stars shield. NO license shield.

**Built With** — for each major language and framework:

```html
<img
  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{id}/{id}-original.svg"
  width="20"
  height="20"
/>
**Framework** vX.Y.Z
```

List main languages first (TypeScript, JavaScript, Python, Java, etc.) then frameworks/libraries. Pull exact versions from package.json or config files.

**About The Project** — one screenshot reference image at top, then `<!-- 260 chars max intro -->` block (Claude enforces the limit), then extended description.

**Screenshots Gallery** — HTML `<table>` or flex `<div>` layout using inline HTML. Each screenshot links to the raw file in the repo. Account for mixed aspect ratios by using `object-fit: cover` in inline styles or fixed height cells. The screenshot used in "About" appears last in the gallery. Format:

```html
<div align="center" style="display:flex;flex-wrap:wrap;gap:8px;">
  <a href="screenshots/foo.png"
    ><img src="screenshots/foo.png" height="200" style="object-fit:cover;"
  /></a>
  ...
</div>
```

**Roadmap** — single line: "This project repository is for archive purpose only."

**Contributors** — `https://contrib.rocks/image?repo={user}/{repo}` wrapped in an `<a>` to the contributors page.

**Contact** — `[Leonardo Vasconcellos](https://leonardo-vasconcellos.vercel.app/)`

**Markdown links block at bottom** — all shield refs, image refs, urls.

## File to create

`c:\Users\leona\Projects\react\semprecomvoce-next\docs\README-prompt.md`

## Verification

After writing the file:

1. Read it back to confirm all sections are present and the prompt is self-contained
2. No implementation code needed — this is a documentation/prompt file only
3. The prompt should be runnable as-is in any project repo with `claude` CLI
