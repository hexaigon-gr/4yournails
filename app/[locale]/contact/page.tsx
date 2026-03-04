import { getTranslations, setRequestLocale } from "next-intl/server";
import { BasePageProps } from "@/types/page-props";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Instagram, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

const BUSINESS = {
  address: "Λεωφ. Σοφοκλή Βενιζέλου 93, Ηλιούπολη 163 46, Αθήνα",
  phone: "+302109918915",
  phoneDisplay: "210 991 8915",
  instagramHandle: "@4yournails_",
  instagramUrl: "https://www.instagram.com/4yournails_/",
  treatwellUrl: "https://www.treatwell.gr/katasthma/4-your-nails/",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.5!2d23.7547252!3d37.9315647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU1JzUzLjYiTiAyM8KwNDUnMTcuMCJF!5e0!3m2!1sen!2sgr!4v1",
} as const;

const HOURS = [
  { day: "Mon", dayEl: "Δευ", closed: true },
  { day: "Tue", dayEl: "Τρί", hours: "09:00–20:00", closed: false },
  { day: "Wed", dayEl: "Τετ", hours: "09:00–20:00", closed: false },
  { day: "Thu", dayEl: "Πέμ", hours: "09:00–20:00", closed: false },
  { day: "Fri", dayEl: "Παρ", hours: "09:00–20:00", closed: false },
  { day: "Sat", dayEl: "Σάβ", hours: "09:00–17:00", closed: false },
  { day: "Sun", dayEl: "Κυρ", closed: true },
] as const;

export const generateMetadata = async ({
  params,
}: BasePageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
};

const ContactPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ContactPage");

  const isEl = locale === "el";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-background py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-muted py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Left Column — Info */}
              <div className="flex flex-col gap-6">
                {/* Address */}
                <Card className="border-border bg-card">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="size-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground">
                        {t("address")}
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {BUSINESS.address}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Phone */}
                <Card className="border-border bg-card">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="size-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground">
                        {t("phone")}
                      </h2>
                      <a
                        href={`tel:${BUSINESS.phone}`}
                        className="mt-1 inline-block text-sm font-medium text-primary hover:underline"
                      >
                        {BUSINESS.phoneDisplay}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Hours */}
                <Card className="border-border bg-card">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="size-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-semibold text-foreground">
                        {t("hours")}
                      </h2>
                      <table className="mt-3 w-full text-sm">
                        <tbody>
                          {HOURS.map((row) => (
                            <tr
                              key={row.day}
                              className="border-b border-border/50 last:border-0"
                            >
                              <td className="py-1.5 pr-4 font-medium text-foreground">
                                {isEl ? row.dayEl : row.day}
                              </td>
                              <td className="py-1.5 text-right text-muted-foreground">
                                {row.closed ? (
                                  <span className="text-destructive/70">
                                    {t("closed")}
                                  </span>
                                ) : (
                                  row.hours
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Instagram */}
                <Card className="border-border bg-card">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Instagram className="size-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground">
                        {t("followUs")}
                      </h2>
                      <a
                        href={BUSINESS.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        {BUSINESS.instagramHandle}
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Book on Treatwell CTA */}
                <Button
                  asChild
                  size="lg"
                  className="w-full text-base font-semibold"
                >
                  <a
                    href={BUSINESS.treatwellUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("bookOnTreatwell")}
                    <ExternalLink className="ml-2 size-4" />
                  </a>
                </Button>
              </div>

              {/* Right Column — Map */}
              <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-foreground">{t("findUs")}</h2>
                <div className="overflow-hidden rounded-xl border border-border shadow-sm lg:flex-1 lg:min-h-[480px]">
                  <iframe
                    src={BUSINESS.mapsEmbedUrl}
                    width="100%"
                    height="100%"
                    className="h-80 w-full lg:h-full"
                    style={{ border: 0, minHeight: "480px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="4 Your Nails location on Google Maps"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ContactPage;
