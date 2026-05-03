"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface Polaroid {
  image: string;
  title: string;
  description: string;
}

interface PolaroidSwiperProps {
  polaroids: Polaroid[];
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

export const PolaroidSwiper: React.FC<PolaroidSwiperProps> = ({
  polaroids,
  cardWidth = 256, // 16rem = 256px
  cardHeight = 352, // 22rem = 352px
  className = "",
}) => {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const isSwiping = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const [cardOrder, setCardOrder] = useState<number[]>(() =>
    Array.from({ length: polaroids.length }, (_, i) => i),
  );

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
      isSwiping.current = true;
      startX.current = clientX;
      currentX.current = clientX;
      const card = getActiveCard();
      if (card) card.style.transition = "none";
    },
    [getActiveCard],
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

  return (
    <section
      className={`relative grid place-content-center select-none ${className}`}
      ref={cardStackRef}
      style={
        {
          width: cardWidth + 32,
          height: cardHeight + 32,
          touchAction: "none",
          transformStyle: "preserve-3d",
          "--card-perspective": "700px",
          "--card-z-offset": "12px",
          "--card-y-offset": "7px",
          "--card-max-z-index": polaroids.length.toString(),
          "--card-swap-duration": "0.3s",
        } as React.CSSProperties
      }
    >
      {cardOrder.map((originalIndex, displayIndex) => {
        const isFirst = displayIndex === 0;
        return (
          <article
            key={`${polaroids[originalIndex].image}-${originalIndex}`}
            className="image-card absolute cursor-grab active:cursor-grabbing
                     place-self-center border border-slate-400 rounded-xl
                     shadow-md overflow-hidden will-change-transform"
            style={
              {
                "--i": (displayIndex + 1).toString(),
                zIndex: polaroids.length - displayIndex,
                width: cardWidth,
                height: cardHeight,
                transform: `perspective(var(--card-perspective))
                       translateZ(calc(-1 * var(--card-z-offset) * var(--i)))
                       translateY(calc(var(--card-y-offset) * var(--i)))
                       translateX(var(--swipe-x, 0px))
                       rotateY(var(--swipe-rotate, 0deg))`,
              } as React.CSSProperties
            }
          >
            <Card
              className={isFirst ? "z-10 cursor-pointer" : "z-0"}
              image={polaroids[originalIndex].image}
            >
              <h2>{polaroids[originalIndex].title}</h2>
              <p>{polaroids[originalIndex].description}</p>
            </Card>
            <img
              src={polaroids[originalIndex].image}
              alt={polaroids[originalIndex].title}
              className="w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
            />
          </article>
        );
      })}
    </section>
  );
};

const Card = ({
  className,
  image,
  children,
}: {
  className?: string;
  image?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-87.5 cursor-pointer h-100 overflow-hidden bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.02)] border border-gray-200/80",
        className,
      )}
    >
      {image && (
        <div className="relative h-72 rounded-xl shadow-lg overflow-hidden w-[calc(100%-1rem)] mx-2 mt-2">
          <img
            src={image}
            alt="card"
            className="object-cover mt-0 w-full h-full"
          />
        </div>
      )}
      {children && (
        <div className="px-4 p-2 flex flex-col gap-y-2">{children}</div>
      )}
    </div>
  );
};
