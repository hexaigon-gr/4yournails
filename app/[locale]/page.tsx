import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { BasePageProps } from "@/types/page-props";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/lib/i18n/navigation";
import GoogleReviews from "@/components/GoogleReviews";
import { GalleryGrid } from "@/components/gallery-grid";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { AnimatedMap } from "@/components/animated-map";
import { ContactForm } from "@/components/contact-form";
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
  Instagram,
  ExternalLink,
} from "lucide-react";

const GOOGLE_PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? "";

const TREATWELL_URL = "https://www.treatwell.gr/katasthma/4-your-nails/";
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://4yournails.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: "4 Your Nails",
    image: `${siteUrl}/images/logo-transparent.png`,
    url: siteUrl,
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
      reviewCount: "298",
      bestRating: "5",
    },
    priceRange: "€€",
    sameAs: ["https://www.instagram.com/4yournails_/"],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="-mt-16 relative flex min-h-screen items-center justify-center overflow-hidden">
          <Image
            src="/images/salon/salon-hero-new.jpg"
            alt="Beautiful manicured nails — 4 Your Nails"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg text-white/80">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="rounded-full border-0 bg-[#DBA49A] px-8 text-white hover:bg-[#c99389]">
                <a
                  href={TREATWELL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="size-4" />
                  {t("hero.bookNow")}
                </a>
              </Button>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Phone className="size-4" />
                {t("hero.callUs")}: {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

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
        <section className="bg-[#FAF7F4] py-16 lg:py-20">
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
                      <div className="flex size-14 items-center justify-center rounded-full bg-[#DBA49A]/15 text-[#DBA49A] transition-colors group-hover:bg-[#DBA49A]/25">
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
              <Button asChild className="rounded-full border-0 bg-[#DBA49A] px-8 text-white hover:bg-[#c99389]">
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
              <Button asChild className="rounded-full border-0 bg-[#DBA49A] px-8 text-white hover:bg-[#c99389]">
                <Link href="/gallery">
                  {t("gallery.seeMore")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-[#FAF7F4] py-16 lg:py-20">
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
              <ReviewsCarousel />
            </div>
            <div className="mt-8 flex justify-center">
              <GoogleReviews placeId={GOOGLE_PLACE_ID} />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-20 bg-[#FAF7F4] py-16 lg:py-20">
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
                {/* Address */}
                <div className="rounded-xl border border-border/50 bg-white p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBA49A]/10">
                      <MapPin className="size-5 text-[#DBA49A]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#DBA49A]">
                        {t("contact.address")}
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        Λεωφ. Σοφοκλή Βενιζέλου 93, Ηλιούπολη 163 46
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="rounded-xl border border-border/50 bg-white p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBA49A]/10">
                      <Phone className="size-5 text-[#DBA49A]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#DBA49A]">
                        {t("contact.phone")}
                      </p>
                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        className="mt-1 inline-block text-sm font-medium text-foreground transition-colors hover:text-[#DBA49A]"
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="rounded-xl border border-border/50 bg-white p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBA49A]/10">
                      <Clock className="size-5 text-[#DBA49A]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#DBA49A]">
                        {t("contact.hours")}
                      </p>
                      <div className="mt-2 space-y-1.5">
                        {[
                          { day: "monday", hours: null },
                          { day: "tuesday", hours: "09:00 – 20:00" },
                          { day: "wednesday", hours: "09:00 – 20:00" },
                          { day: "thursday", hours: "09:00 – 20:00" },
                          { day: "friday", hours: "09:00 – 20:00" },
                          { day: "saturday", hours: "09:00 – 17:00" },
                          { day: "sunday", hours: null },
                        ].map((item) => (
                          <div key={item.day} className="flex justify-between text-sm">
                            <span className="font-medium text-foreground">{t(`hours.${item.day}`)}</span>
                            <span className={item.hours ? "text-muted-foreground" : "text-[#DBA49A]"}>
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

                {/* Instagram */}
                <div className="rounded-xl border border-border/50 bg-white p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBA49A]/10">
                      <Instagram className="size-5 text-[#DBA49A]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#DBA49A]">
                        {t("contact.followUs")}
                      </p>
                      <a
                        href="https://www.instagram.com/4yournails_/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-[#DBA49A]"
                      >
                        @4yournails_
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Book on Treatwell CTA */}
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl border-0 bg-[#DBA49A] text-base font-semibold text-white hover:bg-[#c99389]"
                >
                  <a
                    href={TREATWELL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="size-4" />
                    {t("cta.bookNow")}
                  </a>
                </Button>
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
