"use client";

import Image from "next/image";
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
    <>
      {/* Mobile hero — static image with logo + title inside a compact cream arch, big BOOK NOW at the bottom */}
      <section className="relative h-[calc(100dvh-3.5rem)] overflow-hidden md:hidden">
        <Image
          src="/images/HERO-MOBILE.jpg"
          alt={videoAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Cream arch — compact: fits logo + title only */}
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          className="absolute inset-x-0 top-0 z-10 flex flex-col items-center bg-cream px-6 pt-3 pb-6"
          style={{ borderRadius: "0 0 50% 50% / 0 0 12% 12%" }}
        >
          <motion.div variants={itemVariants}>
            <Image
              src="/images/logo-hd.png"
              alt="4 Your Nails"
              width={1200}
              height={899}
              priority
              quality={95}
              sizes="(max-width: 768px) 220px, 260px"
              className="h-40 w-auto select-none"
            />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="mt-0.5 text-center font-serif text-3xl font-bold leading-tight tracking-tight text-foreground"
          >
            {title}
          </motion.h1>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          className="absolute inset-x-6 bottom-8 z-10"
        >
          <motion.div variants={itemVariants}>
            <BookingDialog>
              <Button
                size="lg"
                className="h-14 w-full rounded-full bg-primary text-base font-semibold uppercase tracking-wide text-primary-foreground shadow-[0_10px_30px_-8px_oklch(0.22_0.005_60/0.35)] hover:bg-primary-hover"
              >
                <Calendar className="size-5" />
                {bookNowLabel}
              </Button>
            </BookingDialog>
          </motion.div>
        </motion.div>
      </section>

      {/* Desktop hero — original video version */}
      <section className="relative hidden h-dvh items-center justify-center overflow-hidden md:flex">
        <HeroVideo
          poster={poster}
          sources={[{ src: videoSrc, type: videoType }]}
          alt={videoAlt}
          onEnded={handleEnded}
        />
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
    </>
  );
};
