# Brand Guidelines — Instituto Sempre Com Você

Extracted from `public/logo-semprecomvc.png`.

## Colors

| Token (Tailwind)   | Hex       | Usage                                                            |
| ------------------ | --------- | ---------------------------------------------------------------- |
| `brand-pink`       | `#E8178A` | Primary CTAs, key accents, highlights                            |
| `brand-pink-light` | `#FEE9F4` | Pink tinted section backgrounds                                  |
| `brand-blue`       | `#29ABE2` | Secondary accents, icons, links                                  |
| `brand-blue-light` | `#E7F6FC` | Blue tinted section backgrounds                                  |
| `brand-navy`       | `#1D2B4F` | Headings, navigation, footer, body text                          |
| `brand-green`      | `#00a815` | Alternate between different colors for blocks of the same layout |
| `brand-organge`    | `#f9781f` | Alternate between different colors for blocks of the same layout |
| `brand-purple`     | `#724ea5` | Alternate between different colors for blocks of the same layout |

White `#FFFFFF` is the default page background.

## Typography

| Role               | Font       | Variable                          |
| ------------------ | ---------- | --------------------------------- |
| Headings / display | Montserrat | `--font-display` / `font-display` |
| Body text          | Geist Sans | `--font-sans` / `font-sans`       |
| Code               | Geist Mono | `--font-mono` / `font-mono`       |

Montserrat weights loaded: 400, 500, 600, 700, 800.

## Tone & Feel

The logo — two hands cradling a house with a heart — communicates **care, warmth, and protection**. Design choices should reinforce this: rounded corners, generous whitespace, and a warm-but-trustworthy balance between pink (compassion) and blue (trust).

## CSS tokens

All tokens are defined in `app/globals.css` under `@theme inline` and are available as Tailwind utilities (e.g., `bg-brand-pink`, `text-brand-navy`, `font-display`).
