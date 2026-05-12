# Plan: YoutubeCarrousel + Nossos Apoiadores

## Context
Add a new "Nossos Apoiadores" section to the homepage showcasing celebrity supporters of the Instituto do Câncer Sempre Com Você via a Featured Hero Carousel of YouTube videos. The carousel plays the first video automatically (muted) when scrolled into view, lets users unmute, and auto-advances when a video ends.

---

## Files to create / modify

| Action | Path |
|--------|------|
| Create | `components/YoutubeCarrousel.tsx` |
| Create | `components/NossosApoiadores.tsx` |
| Modify | `app/page.tsx` — add `<NossosApoiadores />` between `<Parceiros />` and `<Testimonials />` |

---

## 1. `components/YoutubeCarrousel.tsx`

**`"use client"`** — uses `useEffect`, `useState`, `useRef`, browser APIs.

### Type declarations (top of file)
```ts
declare global {
  interface Window {
    YT: { Player: new (el: HTMLElement, opts: YTPlayerOpts) => YTPlayer; PlayerState: { ENDED: number } };
    onYouTubeIframeAPIReady: () => void;
  }
}
interface YTPlayer { loadVideoById(id: string): void; playVideo(): void; mute(): void; unMute(): void; destroy(): void; }
interface YTPlayerOpts { videoId: string; playerVars?: Record<string, number|string>; events?: { onReady?: (e: { target: YTPlayer }) => void; onStateChange?: (e: { data: number }) => void } }
export interface VideoItem { id: string; title: string; }
```

### State & Refs
```ts
const [activeIndex, setActiveIndex] = useState(0);
const [isMuted, setIsMuted] = useState(true);
const [isApiReady, setIsApiReady] = useState(false);
const playerDivRef = useRef<HTMLDivElement>(null);
const playerRef = useRef<YTPlayer | null>(null);
const sectionRef = useRef<HTMLDivElement>(null);
const thumbnailStripRef = useRef<HTMLDivElement>(null);
const hasAutoPlayed = useRef(false); // guard: only trigger once on scroll
```

### Effect 1 — load YT IFrame API (runs once, idempotent)
```ts
useEffect(() => {
  if (window.YT?.Player) { setIsApiReady(true); return; }
  const prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => { prev?.(); setIsApiReady(true); };
  if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  }
}, []);
```

### Effect 2 — create player once when API ready (deps: `[isApiReady]`)
- `new window.YT.Player(playerDivRef.current, { videoId: videos[0].id, playerVars: { autoplay: 0, mute: 1, controls: 1, rel: 0, modestbranding: 1 }, events: { onReady: e => { playerRef.current = e.target; e.target.mute(); }, onStateChange: e => { if (e.data === 0) setActiveIndex(p => (p + 1) % videos.length); } } })`
- Cleanup: `player.destroy(); playerRef.current = null;`

### Effect 3 — switch video on `activeIndex` change (deps: `[activeIndex]`)
- Call `playerRef.current.loadVideoById(videos[activeIndex].id)`
- Re-apply current mute state via `isMuted ? player.mute() : player.unMute()`
- Scroll active thumbnail into view: `thumbnailStripRef.current?.children[activeIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })`
- `// eslint-disable-next-line react-hooks/exhaustive-deps` to suppress `isMuted` missing dep (intentional: mute toggle owns mute state, this effect owns video switching)

### Effect 4 — auto-play on scroll (deps: `[]`)
- `IntersectionObserver` on `sectionRef`, threshold `0.4`
- On intersection: if `!hasAutoPlayed.current && playerRef.current` → `player.mute(); player.playVideo(); hasAutoPlayed.current = true; setIsMuted(true);`

### Mute toggle handler
```ts
const handleMuteToggle = useCallback(() => {
  const p = playerRef.current; if (!p) return;
  isMuted ? (p.unMute(), setIsMuted(false)) : (p.mute(), setIsMuted(true));
}, [isMuted]);
```

### JSX structure
```
<div ref={sectionRef}>
  <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
    <div style={{ paddingBottom: "56.25%" }} className="relative w-full">
      <div ref={playerDivRef} className="absolute inset-0 w-full h-full" />
    </div>
    <button onClick={handleMuteToggle} className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2.5 transition-[transform,background-color] duration-200 hover:scale-110 active:scale-100 focus-visible:ring-2 focus-visible:ring-brand-pink z-10">
      {isMuted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
    </button>
  </div>

  <div ref={thumbnailStripRef} className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
    {videos.map((video, index) => (
      <button key={video.id + index} onClick={() => setActiveIndex(index)}
        className={cn("shrink-0 rounded-2xl overflow-hidden border-2 transition-[transform,border-color,box-shadow] duration-200 snap-start focus-visible:ring-2 focus-visible:ring-brand-pink",
          index === activeIndex ? "border-brand-pink scale-105 shadow-[0_4px_20px_rgba(232,23,138,0.3)]" : "border-transparent hover:border-brand-pink/40"
        )}
        style={{ width: 160, height: 90 }}>
        <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} width={160} height={90} className="w-full h-full object-cover" loading="lazy" />
      </button>
    ))}
  </div>

  <p className="text-white/60 text-sm font-sans text-center" aria-live="polite">
    {videos[activeIndex]?.title}
  </p>
</div>
```

### Speaker icons (private, bottom of file)
Inline SVG `SpeakerOffIcon` and `SpeakerOnIcon` components — no new icon files needed.

---

## 2. `components/NossosApoiadores.tsx`

**No `"use client"`** — static JSX wrapping `YoutubeCarrousel` (which is already a client component).

### Video data (module-level constant) — 6 videos (duplicate removed)
```ts
const videos: VideoItem[] = [
  { id: "sHIgkn2PXGA", title: "Mensagem de Cid Moreira" },
  { id: "bAHntgjy7pY",  title: "Apoio de David Brazil" },
  { id: "wt7wsHyF74U", title: "Mensagem de Sérgio Malandro" },
  { id: "scpeoXJXbAQ", title: "Mensagem de Sula Miranda" },
  { id: "yGGfj1PhzYU", title: "Apoio de Marcelo Serrado" },
  { id: "UzPmCH-GpZU", title: "Mensagem de Ezequiel Jr" },
];
```

### Section structure (mirrors `Parceiros.tsx` pattern)
```tsx
<section id="apoiadores" className="py-20 lg:py-28 bg-brand-navy relative overflow-hidden grain">
  {/* Decorative blobs */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -top-40 left-0 w-[500px] h-[500px] rounded-full bg-brand-pink/10 blur-[120px]" />
    <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-brand-blue/8 blur-[120px]" />
  </div>

  <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
    <RevealGroup className="text-center mb-12">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-white/8 text-white text-[11px] font-bold font-display px-4 py-2 rounded-full mb-6 tracking-[0.12em] uppercase">
        📺 &nbsp;Nossos Apoiadores
      </div>
      {/* Heading */}
      <h2 className="font-display font-extrabold text-3xl lg:text-[2.5rem] text-white! leading-tight tracking-tight mb-3">
        Celebridades que apoiam <span className="text-brand-pink">nossa causa</span>
      </h2>
      {/* Subtitle */}
      <p className="text-white/50 text-base max-w-2xl mx-auto leading-relaxed">
        Nomes como Cid Moreira, David Brazil, Sérgio Malandro, Sula Miranda, Marcelo Serrado e
        Ezequiel Jr emprestam sua voz para ampliar nossa missão de acolher quem enfrenta o câncer.
      </p>
    </RevealGroup>

    {/* Carousel — low threshold so it fades in before auto-play fires */}
    <Reveal threshold={0.1}>
      <YoutubeCarrousel videos={videos} />
    </Reveal>

    {/* Footer CTA */}
    <Reveal className="mt-10 flex flex-col items-center gap-4 text-center">
      <p className="text-white/50 text-sm font-sans">Assista e se inscreva no nosso canal</p>
      <a href="https://www.youtube.com/@programasemprecomvocecoman5847" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-brand-pink hover:bg-brand-pink/90 text-white font-semibold font-display text-sm px-7 py-3.5 rounded-full
                   transition-[transform,background-color,box-shadow] duration-200
                   hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-pink/30
                   active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy">
        <YoutubeIcon width={24} height={24} />
        Acessar o Canal
      </a>
    </Reveal>
  </div>
</section>
```

---

## 3. `app/page.tsx` — minimal change

```tsx
import { NossosApoiadores } from "@/components/NossosApoiadores";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Mission />
      <Programs />
      <Parceiros />
      <NossosApoiadores />   {/* ← new */}
      <Testimonials />
      <DonateCTA />
    </>
  );
}
```

---

## Key architectural notes

- **One player instance**: Player is created once; video changes use `player.loadVideoById()` — no iframe teardown/recreate on thumbnail click.
- **Plain `<img>` for thumbnails**: `next.config.ts` only allows `placehold.co` as a remote image host; adding `img.youtube.com` would require a config change. Plain `<img>` with explicit dimensions is sufficient.
- **`hasAutoPlayed` ref (not state)**: Guards the auto-play trigger without scheduling a re-render.
- **Mobile caveat**: iOS Safari blocks `playVideo()` from IntersectionObserver (not a user gesture). Users tap play manually — standard YouTube embed behavior.
- **Duplicate video ID** (`bAHntgjy7pY` appears twice): React keys use `id + index` to avoid collision warnings. Clicking either thumbnail loads the same video, which is per spec.

---

## Verification steps

1. `pnpm dev` → `http://localhost:3000`
2. Scroll to "Nossos Apoiadores" — first video auto-plays muted
3. Click speaker button → video unmutes; click again → mutes
4. Click a thumbnail → video switches immediately
5. Let a video finish → carousel auto-advances to next
6. After last video ends → wraps back to first
7. Click "Acessar o Canal" → opens YouTube channel in new tab
8. Verify on mobile: thumbnail strip scrolls horizontally; player fills width
