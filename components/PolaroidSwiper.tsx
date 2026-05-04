"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface Polaroid {
  image: string;
  description: string;
}

interface PolaroidSwiperProps {
  polaroids: Polaroid[];
  className?: string;
}

export const PolaroidSwiper: React.FC<PolaroidSwiperProps> = ({
  polaroids,
  className = "",
}) => {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const isSwiping = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const isRevealAnimating = useRef(false);
  const revealTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);

  const [cardOrder, setCardOrder] = useState<number[]>(() =>
    Array.from({ length: polaroids.length }, (_, i) => i),
  );

  const clearRevealTimers = useCallback(() => {
    revealTimers.current.forEach(clearTimeout);
    revealTimers.current = [];
  }, []);

  const getDurationFromCSS = useCallback(
    (variableName: string, element?: HTMLElement | null): number => {
      const targetElement = element || document.documentElement;
      const value = getComputedStyle(targetElement)
        ?.getPropertyValue(variableName)
        ?.trim();
      if (!value) return 0;
      if (value.endsWith("ms")) return parseFloat(value);
      if (value.endsWith("s")) return parseFloat(value) * 1000;
      return parseFloat(value) || 0;
    },
    [],
  );

  const getCards = useCallback((): HTMLElement[] => {
    if (!cardStackRef.current) return [];
    return [
      ...cardStackRef.current.querySelectorAll(".image-card"),
    ] as HTMLElement[];
  }, []);

  const getActiveCard = useCallback((): HTMLElement | null => {
    const cards = getCards();
    return cards[0] || null;
  }, [getCards]);

  const updatePositions = useCallback(() => {
    const cards = getCards();
    cards.forEach((card, i) => {
      card.style.setProperty("--i", (i + 1).toString());
      card.style.setProperty("--swipe-x", "0px");
      card.style.setProperty("--swipe-rotate", "0deg");
      card.style.opacity = "1";
    });
  }, [getCards]);

  const applySwipeStyles = useCallback(
    (deltaX: number) => {
      const card = getActiveCard();
      if (!card) return;
      card.style.setProperty("--swipe-x", `${deltaX}px`);
      card.style.setProperty("--swipe-rotate", `${deltaX * 0.2}deg`);
      card.style.opacity = (
        1 -
        Math.min(Math.abs(deltaX) / 100, 1) * 0.75
      ).toString();
    },
    [getActiveCard],
  );

  const handleStart = useCallback(
    (clientX: number) => {
      if (isSwiping.current) return;
      clearRevealTimers();
      setIsRevealed(false);
      isRevealAnimating.current = false;
      isSwiping.current = true;
      startX.current = clientX;
      currentX.current = clientX;
      const card = getActiveCard();
      if (card) card.style.transition = "none";
    },
    [getActiveCard, clearRevealTimers],
  );

  const handleEnd = useCallback(() => {
    if (!isSwiping.current) return;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    const deltaX = currentX.current - startX.current;
    const threshold = 50;
    const duration = getDurationFromCSS(
      "--card-swap-duration",
      cardStackRef.current,
    );
    const card = getActiveCard();

    if (card) {
      card.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

      if (Math.abs(deltaX) > threshold) {
        const direction = Math.sign(deltaX);
        card.style.setProperty("--swipe-x", `${direction * 300}px`);
        card.style.setProperty("--swipe-rotate", `${direction * 20}deg`);

        setTimeout(() => {
          if (getActiveCard() === card) {
            card.style.setProperty("--swipe-rotate", `${-direction * 20}deg`);
          }
        }, duration * 0.5);

        setTimeout(() => {
          setCardOrder((prev) => {
            if (prev.length === 0) return [];
            return [...prev.slice(1), prev[0]];
          });
        }, duration);
      } else {
        applySwipeStyles(0);
      }
    }

    isSwiping.current = false;
    startX.current = 0;
    currentX.current = 0;
  }, [getDurationFromCSS, getActiveCard, applySwipeStyles]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isSwiping.current) return;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(() => {
        currentX.current = clientX;
        const deltaX = currentX.current - startX.current;
        applySwipeStyles(deltaX);

        if (Math.abs(deltaX) > 50) {
          handleEnd();
        }
      });
    },
    [applySwipeStyles, handleEnd],
  );

  useEffect(() => {
    const cardStackElement = cardStackRef.current;
    if (!cardStackElement) return;

    const handlePointerDown = (e: PointerEvent) => {
      handleStart(e.clientX);
    };
    const handlePointerMove = (e: PointerEvent) => {
      handleMove(e.clientX);
    };
    const handlePointerUp = () => {
      handleEnd();
    };

    cardStackElement.addEventListener("pointerdown", handlePointerDown);
    cardStackElement.addEventListener("pointermove", handlePointerMove);
    cardStackElement.addEventListener("pointerup", handlePointerUp);

    return () => {
      cardStackElement.removeEventListener("pointerdown", handlePointerDown);
      cardStackElement.removeEventListener("pointermove", handlePointerMove);
      cardStackElement.removeEventListener("pointerup", handlePointerUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleStart, handleMove, handleEnd]);

  useEffect(() => {
    updatePositions();
  }, [cardOrder, updatePositions]);

  // Scroll-triggered fan reveal animation
  useEffect(() => {
    const element = cardStackRef.current;
    if (!element) return;

    const triggerReveal = () => {
      if (isRevealAnimating.current) return;
      isRevealAnimating.current = true;

      // Fan out after short delay
      const t1 = setTimeout(() => setIsRevealed(true), 350);
      // Fan back in after hold
      const t2 = setTimeout(() => setIsRevealed(false), 2000);
      // Clear animating flag after return transition completes
      const t3 = setTimeout(() => {
        isRevealAnimating.current = false;
      }, 2750);

      revealTimers.current = [t1, t2, t3];
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) triggerReveal();
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      clearRevealTimers();
    };
  }, [clearRevealTimers]);

  return (
    <section
      className={`relative grid place-content-center select-none ${className} max-w-133 min-w-95 md:min-w-125 max-h-130 min-h-125`}
      ref={cardStackRef}
      style={
        {
          touchAction: "none",
          transformStyle: "preserve-3d",
          "--card-perspective": "700px",
          "--card-z-offset": "6px",
          "--card-y-offset": "10px",
          "--card-max-z-index": polaroids.length.toString(),
          "--card-swap-duration": "0.3s",
        } as React.CSSProperties
      }
    >
      {cardOrder.map((originalIndex, displayIndex) => {
        const isFirst = displayIndex === 0;
        const isSecond = displayIndex === 1;
        const isThird = displayIndex === 2;

        const fanRotateDeg = isRevealed
          ? isSecond
            ? -22
            : isThird
              ? 22
              : 0
          : 0;
        const fanTranslatePx = isRevealed
          ? isSecond
            ? -55
            : isThird
              ? 55
              : 0
          : 0;

        return (
          <article
            key={`${polaroids[originalIndex].image}-${originalIndex}`}
            className="image-card absolute cursor-grab active:cursor-grabbing
                     place-self-center border border-slate-400 rounded-xl
                     shadow-md overflow-hidden will-change-transform max-w-125
                     min-w-95 md:min-w-125 max-h-130 min-h-125
                     "
            style={
              {
                "--i": (displayIndex + 1).toString(),
                zIndex: polaroids.length - displayIndex,
                transition:
                  isSecond || isThird
                    ? "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)"
                    : undefined,
                transform: `perspective(var(--card-perspective))
                       translateZ(calc(-1 * var(--card-z-offset) * var(--i)))
                       translateY(calc(var(--card-y-offset) * var(--i)))
                       translateX(calc(var(--swipe-x, 0px) + ${fanTranslatePx}px))
                       rotateZ(${fanRotateDeg}deg)
                       rotateY(var(--swipe-rotate, 0deg))`,
              } as React.CSSProperties
            }
          >
            <Card
              className={isFirst ? "z-10 cursor-pointer" : "z-0"}
              image={polaroids[originalIndex].image}
              alt={polaroids[originalIndex].description}
            >
              <p className="line-clamp-2 text-center font-[cursive] text-lg">
                {polaroids[originalIndex].description}
              </p>
            </Card>
          </article>
        );
      })}
    </section>
  );
};

const Card = ({
  className,
  image,
  alt,
  children,
}: {
  className?: string;
  image?: string;
  alt?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-full cursor-pointer h-full min-h-200 overflow-hidden bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.02)] border border-gray-200/80 p-4",
        className,
      )}
    >
      {image && (
        <div className="relative h-100 rounded-xl shadow-[0_0_6px_rgba(0,0,0,0.5)] overflow-hidden w-[calc(100%-1rem)] mx-2 mt-2">
          <img
            src={image}
            alt={alt || "Polaroid image"}
            className="object-cover mt-0 w-full h-full"
          />
        </div>
      )}
      {children && (
        <div className={`px-4 p-2 flex flex-col gap-y-2`}>{children}</div>
      )}
    </div>
  );
};
