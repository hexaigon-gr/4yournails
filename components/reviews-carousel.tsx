"use client";

import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const REVIEW_KEYS = ["review1", "review2", "review3", "review4", "review5", "review6"] as const;

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function TreatwellIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="11" fill="#7B68EE" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
        T
      </text>
    </svg>
  );
}

export function ReviewsCarousel() {
  const t = useTranslations("HomePage");

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full px-0 sm:px-14"
    >
      <CarouselContent className="-ml-4">
        {REVIEW_KEYS.map((key) => {
          const source = t(`reviews.${key}.source`);
          const isGoogle = source === "google";
          return (
            <CarouselItem
              key={key}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div className="group relative h-full rounded-xl border border-border/60 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#DBA49A]/5 hover:border-[#DBA49A]/30">
                {/* Decorative quote */}
                <Quote className="absolute top-4 right-4 size-8 text-[#DBA49A]/10 transition-colors duration-300 group-hover:text-[#DBA49A]/20" />

                {/* Header: name + stars + time */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-base truncate pr-8">
                      {t(`reviews.${key}.name`)}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="size-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground/60">
                      {t(`reviews.${key}.time`)}
                    </span>
                  </div>
                </div>

                {/* Review text */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  &ldquo;{t(`reviews.${key}.text`)}&rdquo;
                </p>

                {/* Footer: source badge */}
                <div className="mt-4 pt-4 border-t border-border/40 flex items-center gap-1.5">
                  {isGoogle ? (
                    <GoogleIcon className="size-3.5" />
                  ) : (
                    <TreatwellIcon className="size-3.5" />
                  )}
                  <span className="text-xs text-muted-foreground/50 font-medium">
                    {isGoogle ? t("reviews.onGoogle") : t("reviews.onTreatwell")}
                  </span>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      {/* Navigation arrows — below on mobile, side-centered on sm+ */}
      <div className="flex items-center justify-center gap-3 mt-6 sm:hidden">
        <CarouselPrevious className="static translate-y-0 size-10 border-border/60 bg-white hover:bg-[#DBA49A]/10 hover:border-[#DBA49A]/40 hover:text-[#DBA49A]" />
        <CarouselNext className="static translate-y-0 size-10 border-border/60 bg-white hover:bg-[#DBA49A]/10 hover:border-[#DBA49A]/40 hover:text-[#DBA49A]" />
      </div>
      <CarouselPrevious className="hidden sm:inline-flex left-0 md:-left-2 size-10 border-border/60 bg-white hover:bg-[#DBA49A]/10 hover:border-[#DBA49A]/40 hover:text-[#DBA49A]" />
      <CarouselNext className="hidden sm:inline-flex right-0 md:-right-2 size-10 border-border/60 bg-white hover:bg-[#DBA49A]/10 hover:border-[#DBA49A]/40 hover:text-[#DBA49A]" />
    </Carousel>
  );
}
