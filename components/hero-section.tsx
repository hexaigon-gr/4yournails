"use client";

import { Calendar } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { BookingDialog } from "@/components/booking-dialog";
import { HeroVideo } from "@/components/hero-video";
import { Button } from "@/components/ui/button";

export const HERO_INTRO_EVENT = "hero-intro-done";

const FALLBACK_TIMEOUT_MS = 10000;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type HeroSectionProps = {
  poster: string;
  videoSrc: string;
  videoType: string;
  videoAlt: string;
  title: string;
  subtitle: string;
  bookNowLabel: string;
};

export const HeroSection = ({
  poster,
  videoSrc,
  videoType,
  videoAlt,
  title,
  subtitle,
  bookNowLabel,
}: HeroSectionProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [videoEnded, setVideoEnded] = useState(false);

  const showText = videoEnded || prefersReducedMotion === true;

  useEffect(() => {
    if (prefersReducedMotion) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(HERO_INTRO_EVENT));
      }
      return;
    }
    const timer = setTimeout(() => setVideoEnded(true), FALLBACK_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  const handleEnded = useCallback(() => setVideoEnded(true), []);

  const handleIntroComplete = useCallback(() => {
    if (prefersReducedMotion) return;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(HERO_INTRO_EVENT));
    }
  }, [prefersReducedMotion]);

  return (
    <section className="relative flex h-dvh items-center justify-center overflow-hidden">
      <HeroVideo
        poster={poster}
        sources={[{ src: videoSrc, type: videoType }]}
        alt={videoAlt}
        onEnded={handleEnded}
      />
      {/* Dark scrim at top so header text stays readable over bright video */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-linear-to-b from-black/55 to-transparent" />
      <motion.div
        variants={containerVariants}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={showText ? "visible" : "hidden"}
        onAnimationComplete={(state) => {
          if (state === "visible") handleIntroComplete();
        }}
        className="relative z-10 mx-auto max-w-3xl px-4 text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="font-serif text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-lg text-lg text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
        >
          {subtitle}
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-center"
        >
          <BookingDialog>
            <Button
              size="lg"
              className="rounded-full border-0 bg-primary px-8 text-primary-foreground hover:bg-primary-hover"
            >
              <Calendar className="size-4" />
              {bookNowLabel}
            </Button>
          </BookingDialog>
        </motion.div>
      </motion.div>
    </section>
  );
};
