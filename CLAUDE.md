# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

`semprecomvoce-next` — The website for the Cancer Care NGO "Instituto Sempre Com Você" - Our mission is to improve the lives of people with cancer and their families.

## Commands

Use `pnpm` (a `pnpm-workspace.yaml` is present):

```bash
pnpm dev        # start dev server (localhost:3000)
pnpm build      # production build
pnpm start      # run production build
pnpm lint       # ESLint
```

## Stack

- **Next.js 16.2.4** with App Router (`app/` directory) — this is a post-15 release with breaking changes; read `node_modules/next/dist/docs/` before writing code
- **React 19.2.4**
- **TypeScript 5** — strict mode enabled
- **Tailwind CSS v4** — uses `@tailwindcss/postcss` (not the old `tailwindcss` PostCSS plugin); no `tailwind.config.*` file; configuration is done in CSS
- **ESLint v9** — flat config in `eslint.config.mjs` (no `.eslintrc`)
- **Fonts:** Geist Sans + Geist Mono via `next/font/google`, exposed as CSS variables `--font-geist-sans` / `--font-geist-mono`

## Path aliases

`@/*` resolves to the project root (e.g., `@/app/...`, `@/lib/...`).

## Key conventions

- All routes live under `app/` using the App Router file conventions (`layout.tsx`, `page.tsx`, `loading.tsx`, etc.)
- `app/layout.tsx` is the root layout — it sets the `<html>` and `<body>` tags and applies global fonts/styles
- `app/globals.css` is the global stylesheet imported once from the root layout
