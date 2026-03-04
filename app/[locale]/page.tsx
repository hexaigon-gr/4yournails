import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { BasePageProps } from "@/types/page-props";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/lib/i18n/navigation";
import GoogleReviews from "@/components/GoogleReviews";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: "4 Your Nails",
    image: "https://4yournails.vercel.app/images/logo.png",
    url: "https://4yournails.vercel.app",
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

        {/* Reviews */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("reviews.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("reviews.subtitle")}
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <GoogleReviews placeId={GOOGLE_PLACE_ID} />
            </div>
          </div>
        </section>

        {/* Visit Us / Hours */}
        <section className="bg-[#FAF7F4] py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("hours.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("hours.subtitle")}
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
              {/* Hours Card */}
              <Card className="border-0 bg-white shadow-sm">
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-[#DBA49A]/15 text-[#DBA49A]">
                      <Clock className="size-5" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">{t("hours.title")}</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { day: "monday", hours: null },
                      { day: "tuesday", hours: "09:00 – 20:00" },
                      { day: "wednesday", hours: "09:00 – 20:00" },
                      { day: "thursday", hours: "09:00 – 20:00" },
                      { day: "friday", hours: "09:00 – 20:00" },
                      { day: "saturday", hours: "09:00 – 17:00" },
                      { day: "sunday", hours: null },
                    ].map((item) => (
                      <div key={item.day} className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">{t(`hours.${item.day}`)}</span>
                        <span className={item.hours ? "text-muted-foreground" : "text-[#DBA49A]"}>
                          {item.hours ?? t("hours.closed")}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Location Card */}
              <Card className="border-0 bg-white shadow-sm">
                <CardContent className="flex flex-col justify-between p-8">
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-[#DBA49A]/15 text-[#DBA49A]">
                        <MapPin className="size-5" />
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-foreground">{t("hours.address")}</h3>
                    </div>
                    <div className="overflow-hidden rounded-xl">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.5!2d23.7547252!3d37.9315647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU1JzUzLjYiTiAyM8KwNDUnMTcuMCJF!5e0!3m2!1sen!2sgr!4v1"
                        width="100%"
                        height="220"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="4 Your Nails location"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <Phone className="size-4" />
                    {PHONE_DISPLAY}
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-white py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              {t("cta.subtitle")}
            </p>
            <div className="mt-6">
              <Button
                asChild
                size="lg"
                className="rounded-full border-0 bg-[#DBA49A] px-8 font-semibold text-white hover:bg-[#c99389]"
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
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Home;
