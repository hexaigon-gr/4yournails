import { getTranslations, setRequestLocale } from "next-intl/server";
import { BasePageProps } from "@/types/page-props";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/lib/i18n/navigation";
import GoogleReviews from "@/components/GoogleReviews";
import { GalleryGrid } from "@/components/gallery-grid";
import { ReviewsCarousel, CarouselReview } from "@/components/reviews-carousel";
import { getGoogleReviews } from "@/server_actions/get-google-reviews";
import { SITE_URL } from "@/lib/general/site";
import { AnimatedMap } from "@/components/animated-map";
import { ContactForm } from "@/components/contact-form";
import { HeroSection } from "@/components/hero-section";
import { BookingDialog } from "@/components/booking-dialog";
import {
  Star,
  Award,
  Users,
  Calendar,
  Hand,
  Footprints,
  Sparkles,
  Paintbrush,
  Scissors,
  Eye,
  Phone,
  ArrowRight,
  Clock,
  MapPin,
  Heart,
  Crown,
  Bus,
  TrainFront,
} from "lucide-react";

const GOOGLE_PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? "";

const PHONE_NUMBER = "+302109918915";
const PHONE_DISPLAY = "210 991 8915";

const services = [
  { key: "manicure", icon: Hand },
  { key: "pedicure", icon: Footprints },
  { key: "gelExtensions", icon: Sparkles },
  { key: "semiPermanent", icon: Paintbrush },
  { key: "nailArt", icon: Scissors },
  { key: "eyebrowsWaxing", icon: Eye },
] as const;

const Home = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  const googleReviewsData = await getGoogleReviews(GOOGLE_PLACE_ID);

  const liveReviews: CarouselReview[] = (googleReviewsData?.reviews ?? [])
    .filter((r) => r.text && r.text.trim().length > 0)
    .slice(0, 6)
    .map((r) => ({
      authorName: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.relative_time_description,
      source: "google",
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: "4 Your Nails",
    image: `${SITE_URL}/images/logo-transparent.png`,
    url: SITE_URL,
    telephone: "+302109918915",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Λεωφ. Σοφοκλή Βενιζέλου 93",
      addressLocality: "Ηλιούπολη",
      postalCode: "163 46",
      addressCountry: "GR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.9315647,
      longitude: 23.7547252,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "312",
      bestRating: "5",
    },
    priceRange: "€€",
    sameAs: ["https://www.instagram.com/4yournails_/"],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <link
        rel="preload"
        as="image"
        href="/images/hero.jpg"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <main className="flex-1">
        <HeroSection
          poster="/images/hero.jpg"
          videoSrc="/images/videos/hero-video.mp4"
          videoType="video/mp4"
          videoAlt="Beautiful manicured nails by 4 Your Nails"
          title={t("hero.title")}
          subtitle={t("hero.subtitle")}
          bookNowLabel={t("hero.bookNow")}
        />

        {/* Trust Bar */}
        <section className="bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              <div className="flex items-center gap-2.5">
                <Star className="size-5 text-primary" />
                <span className="text-sm font-medium text-foreground/80">{t("trust.rating")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Users className="size-5 text-primary" />
                <span className="text-sm font-medium text-foreground/80">
                  {t("trust.reviews")}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="size-5 text-primary" />
                <span className="text-sm font-medium text-foreground/80">{t("trust.award")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="size-5 text-primary" />
                <span className="text-sm font-medium text-foreground/80">
                  {t("trust.experience")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="bg-cream py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("services.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("services.subtitle")}
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.key}
                    className="group border-0 bg-white shadow-sm transition-all hover:shadow-md"
                  >
                    <CardContent className="flex flex-col items-center p-8 text-center">
                      <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
                        <Icon className="size-6" />
                      </div>
                      <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                        {t(`services.${service.key}.title`)}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {t(`services.${service.key}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <Button asChild className="rounded-full border-0 bg-primary px-8 text-primary-foreground hover:bg-primary-hover">
                <Link href="/services">
                  {t("services.viewAll")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("gallery.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("gallery.subtitle")}
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              <GalleryGrid
                images={[
                  { src: "/images/gallery/gallery-1.jpg", alt: "Chrome iridescent manicure" },
                  { src: "/images/gallery/gallery-6.jpg", alt: "French tip nail extensions" },
                  { src: "/images/gallery/gallery-4.jpg", alt: "Purple gel manicure" },
                  { src: "/images/gallery/gallery-7.jpg", alt: "Colorful rainbow nail art" },
                  { src: "/images/gallery/gallery-8.jpg", alt: "French almond gel extensions" },
                  { src: "/images/gallery/gallery-5.jpg", alt: "Classic red manicure" },
                  { src: "/images/gallery/gallery-9.jpg", alt: "Subtle iridescent french tips" },
                  { src: "/images/gallery/gallery-2.jpg", alt: "4 Your Nails salon storefront" },
                ]}
              />
            </div>
            <div className="mt-8 text-center">
              <Button asChild className="rounded-full border-0 bg-primary px-8 text-primary-foreground hover:bg-primary-hover">
                <Link href="/gallery">
                  {t("gallery.seeMore")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-cream py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("reviews.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("reviews.subtitle")}
              </p>
            </div>
            <div className="mt-10">
              <ReviewsCarousel reviews={liveReviews} />
            </div>
            <div className="mt-8 flex justify-center">
              <GoogleReviews placeId={GOOGLE_PLACE_ID} />
            </div>
          </div>
        </section>

        {/* Highlights — Τι μας αρέσει */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {t("highlights.eyebrow")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("highlights.title")}
              </h2>
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { key: "environment", Icon: Heart },
                { key: "specialties", Icon: Crown },
                { key: "team", Icon: Users },
              ].map(({ key, Icon }) => (
                <div
                  key={key}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-cream p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                    {t(`highlights.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`highlights.${key}.text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-20 bg-cream py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("contact.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("contact.subtitle")}
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Left — Info Cards + Map */}
              <div className="flex flex-col gap-4">
                {/* Address + Transit */}
                <div className="rounded-xl border border-border/50 bg-white p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="size-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {t("contact.address")}
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        Λεωφ. Σοφοκλή Βενιζέλου 93, Ηλιούπολη 163 46
                      </p>

                      <div className="mt-4 border-t border-border/50 pt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {t("transit.title")}
                        </p>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <Bus className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span>{t("transit.bus")}</span>
                          </li>
                          <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <TrainFront className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span>{t("transit.metro")}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="rounded-xl border border-border/50 bg-white p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {t("contact.phone")}
                      </p>
                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        className="mt-1 inline-block text-sm font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="rounded-xl border border-border/50 bg-white p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="size-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {t("contact.hours")}
                      </p>
                      <div className="mt-2 space-y-1.5">
                        {[
                          { day: "monday", hours: null },
                          { day: "tuesday", hours: "09:00 - 20:00" },
                          { day: "wednesday", hours: "09:00 - 20:00" },
                          { day: "thursday", hours: "09:00 - 20:00" },
                          { day: "friday", hours: "09:00 - 20:00" },
                          { day: "saturday", hours: "09:00 - 17:00" },
                          { day: "sunday", hours: null },
                        ].map((item) => (
                          <div key={item.day} className="flex justify-between text-sm">
                            <span className="font-medium text-foreground">{t(`hours.${item.day}`)}</span>
                            <span className={item.hours ? "text-muted-foreground" : "text-primary"}>
                              {item.hours ?? t("contact.closed")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Map */}
                <div className="overflow-hidden rounded-xl border border-border/50">
                  <AnimatedMap />
                </div>
              </div>

              {/* Right — Contact Form + Social */}
              <div className="flex flex-col gap-4">
                <ContactForm />

                {/* Booking CTA */}
                <BookingDialog>
                  <Button
                    size="lg"
                    className="w-full rounded-xl border-0 bg-primary text-base font-semibold text-primary-foreground hover:bg-primary-hover"
                  >
                    <Calendar className="size-4" />
                    {t("cta.bookNow")}
                  </Button>
                </BookingDialog>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Home;
