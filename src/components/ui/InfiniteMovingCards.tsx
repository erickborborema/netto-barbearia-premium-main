"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef, useCallback } from "react";

const BOOKING_URL = 'https://sites.appbarber.com.br/nettobarbearia-2myy';

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollLeft = useRef(0);
  const autoScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "90s");
      }
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  // Função para pausar a animação
  const pauseAnimation = useCallback(() => {
    setIsPaused(true);
    if (scrollerRef.current) {
      scrollerRef.current.style.animationPlayState = 'paused';
    }
  }, []);

  // Função para retomar a animação após um tempo sem interação
  const resumeAnimation = useCallback(() => {
    if (autoScrollTimeout.current) {
      clearTimeout(autoScrollTimeout.current);
    }
    
    autoScrollTimeout.current = setTimeout(() => {
      setIsPaused(false);
      if (scrollerRef.current && !isDragging) {
        scrollerRef.current.style.animationPlayState = 'running';
      }
    }, 2000); // Retoma após 2 segundos sem interação
  }, [isDragging]);

  // Handlers para touch (mobile)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    pauseAnimation();
    if (scrollerRef.current) {
      const rect = scrollerRef.current.getBoundingClientRect();
      dragStartX.current = e.touches[0].pageX - rect.left;
      scrollLeft.current = scrollerRef.current.scrollLeft;
    }
  }, [pauseAnimation]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !scrollerRef.current) return;
    e.preventDefault();
    const rect = scrollerRef.current.getBoundingClientRect();
    const x = e.touches[0].pageX - rect.left;
    const walk = (x - dragStartX.current) * 1.5;
    scrollerRef.current.scrollLeft = scrollLeft.current - walk;
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    resumeAnimation();
  }, [resumeAnimation]);

  // Handlers para mouse (desktop)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    pauseAnimation();
    if (scrollerRef.current) {
      const rect = scrollerRef.current.getBoundingClientRect();
      dragStartX.current = e.pageX - rect.left;
      scrollLeft.current = scrollerRef.current.scrollLeft;
    }
  }, [pauseAnimation]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollerRef.current) return;
    e.preventDefault();
    const rect = scrollerRef.current.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const walk = (x - dragStartX.current) * 1.5;
    scrollerRef.current.scrollLeft = scrollLeft.current - walk;
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    resumeAnimation();
  }, [resumeAnimation]);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    resumeAnimation();
  }, [resumeAnimation]);

  // Handler para scroll (wheel e touch scroll)
  const handleScroll = useCallback(() => {
    if (!isDragging) {
      pauseAnimation();
      resumeAnimation();
    }
  }, [pauseAnimation, resumeAnimation, isDragging]);

  // Limpar timeout ao desmontar
  useEffect(() => {
    return () => {
      if (autoScrollTimeout.current) {
        clearTimeout(autoScrollTimeout.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-full overflow-x-auto overflow-y-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        "scrollbar-hide",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onScroll={handleScroll}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationPlayState: (isPaused || isDragging) ? 'paused' : 'running'
        }}
      >
        {items.map((item) => (
          <li
            className="w-[300px] max-w-full relative rounded-3xl flex-shrink-0 overflow-hidden group bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-accent/50"
            key={item.id}
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
              
              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              
              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-accent/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-accent-foreground/20">
                <span className="font-heading text-sm font-bold text-accent-foreground tracking-wide">
                  {item.price}
                </span>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-accent/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="p-5 bg-gradient-to-b from-card/80 to-card/50 backdrop-blur-sm flex flex-col min-h-[180px]">
              <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-3 flex-grow">
                {item.description}
              </p>
              
              {/* Hover Indicator - Fixed position */}
              <a 
                href={BOOKING_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-accent/80 mt-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-xs font-heading uppercase tracking-wider">Saiba mais</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            {/* Animated Border Gradient */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />
            
            {/* Glow Effect */}
            <div className="absolute -inset-1 rounded-3xl bg-accent/0 group-hover:bg-accent/10 blur-xl transition-all duration-500 -z-10" />
          </li>
        ))}
      </ul>
    </div>
  );
};
