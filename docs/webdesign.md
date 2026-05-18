# webdesign.md — Frontend Rules

## Always Do First

- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images

- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server

- **Always serve on localhost** — never screenshot a `file:///` URL.
- **ALWAYS use `https://` — NEVER `http://`.** The dev server requires HTTPS. Using `http://localhost:3000` will fail or return wrong results.
- **ALWAYS check if the server is already running BEFORE calling `pnpm dev`.** Run `curl -sk https://localhost:3000/ -o /dev/null -w "%{http_code}"`. If the response is not empty/connection-refused, the server is up — do NOT start another instance.
- Only if the server is NOT running: start it in the background with `pnpm dev`.
- Never run `pnpm dev` without doing the curl check first.

## Screenshot Workflow

- **Use `chrome-devtools-mcp` MCP** to take screenshots.
- **Always screenshot from localhost:**
- Save screenshots to `./screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `./screenshots/screenshot-N-label.png`
- After screenshotting, read the PNG from `./screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing
- **MANDATORY LAST STEP — no exceptions: call `mcp__chrome-devtools__close_page` for every open page when done.** Skipping this causes "browser is already running" errors on the next session and breaks all subsequent screenshot attempts.

## Output Defaults

- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets

- Always check the `/docs/brand.md` and `/public/logo-semprecomvc.png` files before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails

- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules

- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- **ALWAYS close the browser with `mcp__chrome-devtools__close_page` after every screenshot session — no exceptions**
