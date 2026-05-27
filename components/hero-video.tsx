"use client";

import { useEffect, useRef } from "react";

type HeroVideoProps = {
  poster: string;
  sources: { src: string; type: string }[];
  alt: string;
  onEnded?: () => void;
};

export const HeroVideo = ({ poster, sources, alt, onEnded }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      preload="none"
      poster={poster}
      aria-label={alt}
      onEnded={onEnded}
      className="absolute inset-0 h-full w-full object-cover object-left brightness-90 sm:object-[35%_center]"
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
};
