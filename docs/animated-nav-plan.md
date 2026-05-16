# Plan: AnimatedNav.tsx

## Context

Implement a new `AnimatedNav` header component inspired by the reference at cdn.21st.dev/sshahaider/header-3. The reference uses Radix UI NavigationMenu, but the project doesn't have that package installed. We'll build the same visual behavior from scratch with pure React + CSS transitions.

Two core animated behaviors to replicate:
1. **Sliding pill indicator** — an absolutely-positioned background div that glides horizontally under whichever nav item is hovered, tracking its `offsetLeft`/`offsetWidth` via CSS `transform: translateX` + `width` transition.
2. **Dropdown viewport** — a single floating panel below the nav that animates `height` and `width` as you move between items with dropdowns. When switching from one dropdown to another, the content slides in from the correct direction (left/right) based on the index order of the nav items.

The new component is a drop-in replacement for `Navbar` in `app/layout.tsx` — the user will swap that import manually to test.

---

## Critical files

| File | Action |
|------|--------|
| `components/AnimatedNav.tsx` | **Create** — main component |
| `components/AnimatedNav.css` | **Create** — 6 CSS keyframes for slide/zoom animations (imported by the component) |
| `app/layout.tsx` | **Edit** — swap `Navbar` import → `AnimatedNav` to test |

### Reused components
- `components/logo/LogoDrawing.tsx`
- `components/logo/LogoText.tsx`
- `components/ActionButton.tsx`
- `components/MobileNav.tsx` (reused as-is for mobile drawer)

---

## Nav data (adapted for NGO)

```ts
Início       → href="/"             (no dropdown)
Sobre        → href="/#sobre"       (no dropdown)
Programas    → dropdown (4 items)
Depoimentos  → href="/#depoimentos" (no dropdown)
Ajudar       → dropdown (4 items)
Blog         → href="/blog"         (no dropdown)
Contato      → href="/#contato"     (no dropdown)
```

**Programas dropdown items** (icon + title + description + href):
- Apoio Psicológico — suporte emocional para pacientes e famílias — `/#programas`
- Assistência Social — auxílio em necessidades do dia a dia — `/#programas`
- Transporte Solidário — deslocamento para tratamentos médicos — `/#programas`
- Atividades Terapêuticas — bem-estar e qualidade de vida — `/#programas`

**Ajudar dropdown items**:
- Doe Agora — faça uma doação e transforme vidas — `/apoie`
- Seja Voluntário — contribua com seu tempo e talento — `/#ajudar`
- Empresas Parceiras — junte sua empresa à nossa causa — `/#ajudar`
- Indique um Paciente — ajude quem precisa de cuidado — `/#ajudar`

Icons: use inline SVG paths (lucide-style) directly in the component — no icon library install needed.

---

## Animation implementation

### CSS keyframes (in `components/AnimatedNav.css` — imported by the component)

```css
@keyframes nav-slide-from-right { from { opacity: 0; transform: translateX(36px); } to { opacity: 1; transform: translateX(0); } }
@keyframes nav-slide-from-left  { from { opacity: 0; transform: translateX(-36px); } to { opacity: 1; transform: translateX(0); } }
@keyframes nav-slide-to-right   { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(36px); } }
@keyframes nav-slide-to-left    { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(-36px); } }
@keyframes nav-zoom-in  { from { opacity: 0; transform: scale(0.96) translateY(-6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes nav-zoom-out { from { opacity: 1; transform: scale(1) translateY(0); } to { opacity: 0; transform: scale(0.96) translateY(-6px); } }
```

### Indicator pill state

```ts
const [indicator, setIndicator] = useState({ tx: 0, width: 0, visible: false });
```

CSS on the pill div:
```css
position: absolute; top: 0; left: 0; height: 100%;
background: rgba(29,43,79,0.07); border-radius: 9999px;
transition: transform 220ms ease, width 220ms ease, opacity 150ms ease;
transform: translateX(tx); width: width; opacity: visible ? 1 : 0;
pointer-events: none;
```

On `mouseenter` of each nav item: measure `el.offsetLeft` / `el.offsetWidth` relative to the list container and set `indicator`.

On `mouseleave` of the entire nav list (the `<div>` wrapping all items): set `indicator.visible = false`.

### Dropdown viewport state

```ts
const [activeId, setActiveId] = useState<string | null>(null);
const [prevId, setPrevId] = useState<string | null>(null);
const [vpStyle, setVpStyle] = useState({ left: 0, width: 0, height: 0 });
```

- **Positioning**: measure the active trigger's `offsetLeft + offsetWidth/2` for the center. The viewport panel is centered below that point. Clamp to nav container bounds.
- **Width/Height**: measured via a `ref` on the content div after render, then applied with CSS `transition: width 220ms ease, height 220ms ease`.
- **Open/close animation**: `data-state="open|closed"` + CSS `animation: nav-zoom-in 200ms ease / nav-zoom-out 150ms ease`.
- **Direction**: compare `navItems.findIndex(id === activeId)` vs `prevId` index. Moving right → `data-motion="from-end"` → `animation: nav-slide-from-right`. Moving left → `data-motion="from-start"` → `animation: nav-slide-from-left`.

**Close on**: `mouseleave` of the nav items wrapper and `mouseleave` of the dropdown panel — using a **delayed-close pattern** (see below) to bridge the physical gap between the two.

### Gap problem and delayed-close fix

The dropdown is positioned `absolute top-full` inside the `<header>`, while `onMouseLeave` is on the nav items `<div>`. When the cursor moves from the nav bar downward into the dropdown it briefly passes through empty space, firing `mouseleave` on the nav wrapper before it reaches the dropdown panel — causing the dropdown to close prematurely.

**Fix: `scheduleClose` + `cancelClose`**

```ts
const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

const scheduleClose = useCallback(() => {
  leaveTimerRef.current = setTimeout(() => {
    setIndicator(prev => ({ ...prev, visible: false }));
    setVpOpen(false);
    setActiveId(null);
    setPrevId(null);
  }, 80); // grace period to cross the gap
}, []);

const cancelClose = useCallback(() => {
  if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
}, []);
```

Wire up:
- Nav items wrapper: `onMouseLeave={scheduleClose}` + `onMouseEnter={cancelClose}`
- Each nav item `onMouseEnter`: call `cancelClose()` before `handleItemEnter()`
- Dropdown panel: `onMouseEnter={cancelClose}` + `onMouseLeave={scheduleClose}`

When the cursor leaves the nav and enters the dropdown within 80 ms, `cancelClose` fires and the timer is cleared — menu stays open. If the cursor leaves both areas entirely, the timer runs and closes the dropdown.

---

## Component skeleton

```tsx
'use client';

export function AnimatedNav() {
  // refs: navListRef, itemRefs (Map), vpRef, contentRefs (Map)
  // state: activeId, prevId, indicator, vpStyle

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-md border-b border-brand-navy/6 drop-shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <MobileNav navLinks={flatNavLinks} />
        <Link href="/" className="shrink-0 flex gap-4 items-center">
          <LogoDrawing className="h-12 w-auto" />
          <LogoText className="h-4.5 sm:h-8 w-30" />
        </Link>

        {/* Desktop nav — scheduleClose/cancelClose handle the gap between nav and dropdown */}
        <div className="hidden md:block" onMouseLeave={scheduleClose} onMouseEnter={cancelClose}>
          {/* Nav items list with indicator pill */}
          <div ref={navListRef} className="relative flex items-center gap-1 p-1">
            {/* Indicator pill (behind items) */}
            <div style={indicatorCssVars} className="nav-indicator" />
            {navItems.map(item => (
              <NavItem key={item.id} ... />
            ))}
          </div>
          {/* Dropdown viewport — hidden md:block keeps it off mobile */}
          {showVp && (
            <div className="hidden md:block absolute pointer-events-none"
                 style={{ top: '100%', left: clampedLeft, paddingTop: 4, zIndex: 10 }}>
              <div className="pointer-events-auto relative overflow-hidden rounded-xl ..."
                   onMouseEnter={cancelClose}
                   onMouseLeave={scheduleClose}
                   style={{ animation: vpOpen ? 'nav-zoom-in ...' : 'nav-zoom-out ...' }}>
                {DROPDOWN_ITEMS.map(item => {
                  // active panel: position relative (in flow, determines height)
                  // prev panel:   position absolute (overlays, animates out)
                  const isPrev = item.id === prevId && item.id !== activeId;
                  return (
                    <div key={item.id}
                         style={{ ...(isPrev ? { position: 'absolute', inset: 0 } : {}),
                                  ...(motion ? { animation: MOTION_ANIM[motion] } : {}) }}>
                      <DropdownPanel items={item.dropdown} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <ActionButton href="/apoie" className="whitespace-nowrap">
          Doe Agora
        </ActionButton>
      </div>
    </header>
  );
}
```

---

## Verification

1. Start dev server: `pnpm dev`
2. Edit `app/layout.tsx` to import `AnimatedNav` instead of `Navbar`
3. Open `http://localhost:3000` in browser
4. Screenshot with chrome-devtools MCP
5. Hover over each plain nav link — pill should slide smoothly
6. Hover over `Programas` — dropdown opens with zoom-in animation
7. Move cursor to `Ajudar` — content slides from the right (it's to the right), viewport width transitions
8. Move back to `Programas` — content slides from the left
9. Move cursor off the nav entirely — dropdown closes with zoom-out animation after 80ms grace period
10. Move cursor slowly from nav bar downward through the gap into the dropdown — dropdown must stay open (gap fix)
11. Check mobile at 375px width — mobile drawer works, desktop dropdown invisible
