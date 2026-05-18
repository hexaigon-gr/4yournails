"use client";

import { useTranslations } from "next-intl";
import { BadgeCheck, Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FALLBACK_KEYS = ["review1", "review2", "review3", "review4", "review5", "review6"] as const;

export type CarouselReview = {
  authorName: string;
  rating: number;
  text: string;
  time: string;
  source: "google" | "treatwell";
};

type ReviewsCarouselProps = {
  reviews?: CarouselReview[];
};

const GoogleIcon = ({ className }: { className?: string }) => (
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

const ReviewCard = ({ review }: { review: CarouselReview }) => {
  const t = useTranslations("HomePage.reviews");
  const isGoogle = review.source === "google";
  const stars = Math.round(review.rating);

  return (
    <div className="group relative h-full rounded-xl border border-border/60 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <Quote className="absolute right-4 top-4 size-8 text-primary/10 transition-colors duration-300 group-hover:text-primary/20" />

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="truncate pr-8 text-base font-semibold text-foreground">
            {review.authorName}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={
                  i < stars
                    ? "size-4 fill-yellow-400 text-yellow-400"
                    : "size-4 text-muted-foreground/30"
                }
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground/60">{review.time}</span>
        </div>
      </div>

      <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="mt-4 flex items-center gap-1.5 border-t border-border/40 pt-4">
        {isGoogle ? (
          <GoogleIcon className="size-3.5" />
        ) : (
          <BadgeCheck className="size-3.5 text-primary" />
        )}
        <span className="text-xs font-medium text-muted-foreground/50">
          {isGoogle ? t("onGoogle") : t("onTreatwell")}
        </span>
      </div>
    </div>
  );
};

const FallbackReviewCard = ({ reviewKey }: { reviewKey: (typeof FALLBACK_KEYS)[number] }) => {
  const t = useTranslations("HomePage.reviews");
  const review: CarouselReview = {
    authorName: t(`${reviewKey}.name`),
    rating: 5,
    text: t(`${reviewKey}.text`),
    time: t(`${reviewKey}.time`),
    source: t(`${reviewKey}.source`) === "treatwell" ? "treatwell" : "google",
  };
  return <ReviewCard review={review} />;
};

export const ReviewsCarousel = ({ reviews }: ReviewsCarouselProps) => {
  const hasLive = !!reviews && reviews.length > 0;
  const items = hasLive
    ? reviews.map((review, idx) => ({ key: `live-${idx}`, review }))
    : FALLBACK_KEYS.map((key) => ({ key, review: null }));

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full px-0 sm:px-14"
    >
      <CarouselContent className="-ml-4">
        {items.map((item) => (
          <CarouselItem
            key={item.key}
            className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
          >
            {item.review ? (
              <ReviewCard review={item.review} />
            ) : (
              <FallbackReviewCard reviewKey={item.key as (typeof FALLBACK_KEYS)[number]} />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
        <CarouselPrevious className="static size-10 translate-y-0 border-border/60 bg-white hover:border-primary/40 hover:bg-primary/10 hover:text-primary" />
        <CarouselNext className="static size-10 translate-y-0 border-border/60 bg-white hover:border-primary/40 hover:bg-primary/10 hover:text-primary" />
      </div>
      <CarouselPrevious className="left-0 hidden size-10 border-border/60 bg-white hover:border-primary/40 hover:bg-primary/10 hover:text-primary sm:inline-flex md:-left-2" />
      <CarouselNext className="right-0 hidden size-10 border-border/60 bg-white hover:border-primary/40 hover:bg-primary/10 hover:text-primary sm:inline-flex md:-right-2" />
    </Carousel>
  );
};
