"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    YT: {
      Player: new (el: HTMLElement, opts: YTPlayerOpts) => YTPlayer;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  loadVideoById(videoId: string): void;
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  destroy(): void;
  getPlayerState(): number;
}

interface YTPlayerOpts {
  videoId: string;
  playerVars?: Record<string, number | string>;
  events?: {
    onReady?: (e: { target: YTPlayer }) => void;
    onStateChange?: (e: { data: number }) => void;
  };
}

export interface VideoItem {
  id: string;
  title: string;
}

interface YoutubeCarrouselProps {
  videos: VideoItem[];
}

export function YoutubeCarrousel({ videos }: YoutubeCarrouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isApiReady, setIsApiReady] = useState(false);

  const playerDivRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const hasAutoPlayed = useRef(false);

  // Load YouTube IFrame API once (idempotent)
  useEffect(() => {
    if (window.YT?.Player) {
      setIsApiReady(true);
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      setIsApiReady(true);
    };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
  }, []);

  // Create player once when API is ready
  useEffect(() => {
    if (!isApiReady || !playerDivRef.current) return;

    const player = new window.YT.Player(playerDivRef.current, {
      videoId: videos[0]?.id ?? "",
      playerVars: {
        autoplay: 0,
        mute: 1,
        controls: 1,
        rel: 0,
        modestbranding: 1,
        enablejsapi: 1,
        playsinline: 1,
      },
      events: {
        onReady: (e) => {
          playerRef.current = e.target;
          e.target.mute();
        },
        onStateChange: (e) => {
          // 0 = ENDED
          if (e.data === 0) {
            setActiveIndex((prev) => (prev + 1) % videos.length);
          }
        },
      },
    });

    return () => {
      player.destroy();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApiReady]);

  // Switch video when activeIndex changes
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    player.loadVideoById(videos[activeIndex].id);
    if (isMuted) {
      player.mute();
    } else {
      player.unMute();
    }
    thumbnailStripRef.current?.children[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // Auto-play (muted) when section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !hasAutoPlayed.current &&
          playerRef.current
        ) {
          hasAutoPlayed.current = true;
          playerRef.current.mute();
          playerRef.current.playVideo();
          setIsMuted(true);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleMuteToggle = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  }, [isMuted]);

  return (
    <div ref={sectionRef} className="w-full flex flex-col gap-5">
      {/* Featured player */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <div ref={playerDivRef} className="absolute inset-0 w-full h-full" />
        </div>

        {/* Mute toggle */}
        <button
          onClick={handleMuteToggle}
          aria-label={isMuted ? "Ativar som" : "Silenciar"}
          className="absolute bottom-4 right-4 bg-black/55 backdrop-blur-sm hover:bg-black/75 text-white rounded-full p-2.5 z-10 transition-[transform,background-color] duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
        >
          {isMuted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        ref={thumbnailStripRef}
        className="flex gap-3 overflow-x-auto pb-1 pt-1 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {videos.map((video, index) => (
          <button
            key={video.id + index}
            onClick={() => setActiveIndex(index)}
            aria-label={`Assistir: ${video.title}`}
            aria-pressed={index === activeIndex}
            className={cn(
              "shrink-0 flex flex-col gap-2 group snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy rounded-2xl",
            )}
            style={{ width: 160 }}
          >
            <div
              className={cn(
                "relative rounded-2xl overflow-hidden border-2 transition-[transform,border-color,box-shadow] duration-200",
                index === activeIndex
                  ? "border-brand-pink scale-[1.04] shadow-[0_4px_24px_rgba(232,23,138,0.4)]"
                  : "border-transparent group-hover:border-brand-pink/40 group-hover:scale-[1.02]",
              )}
              style={{ width: 160, height: 90 }}
            >
              {/* Playing indicator */}
              {index === activeIndex && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/25">
                  <div className="w-8 h-8 rounded-full bg-brand-pink/90 flex items-center justify-center shadow-lg">
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                      fill="white"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                width={160}
                height={90}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p
              className={cn(
                "text-xs font-display font-semibold leading-tight text-left px-0.5 line-clamp-2 transition-colors duration-200",
                index === activeIndex
                  ? "text-brand-pink"
                  : "text-white/60 group-hover:text-white/90",
              )}
            >
              {video.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function SpeakerOffIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
    </svg>
  );
}

function SpeakerOnIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}
