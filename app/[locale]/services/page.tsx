import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Calendar, Clock, Footprints, Hand, Sparkles } from "lucide-react";

import { BookingDialog } from "@/components/booking-dialog";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import {
  formatDuration,
  SERVICE_CATEGORIES,
  type Locale,
  type ServiceCategoryKey,
} from "@/lib/services/data";
import { BasePageProps } from "@/types/page-props";

const CATEGORY_ICONS: Record<ServiceCategoryKey, typeof Hand> = {
  manicureHand: Hand,
  pedicureFoot: Footprints,
  waxing: Sparkles,
};

export const generateMetadata = async ({
  params,
}: BasePageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
};

const ServicesPage = async ({ params }: BasePageProps) => {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale: Locale = rawLocale === "en" ? "en" : "el";

  const t = await getTranslations("ServicesPage");

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Page header + category jump nav */}
        <section className="bg-cream py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                {t("subtitle")}
              </p>
            </div>

            <nav
              aria-label={t("jumpTo")}
              className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3"
            >
              {SERVICE_CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.key];
                return (
                  <a
                    key={cat.key}
                    href={`#${cat.key}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                  >
                    <Icon className="size-4 text-primary" />
                    <span>{cat.title[locale]}</span>
                    <span className="text-xs text-muted-foreground">
                      ({cat.items.length})
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto flex max-w-4xl flex-col gap-16">
              {SERVICE_CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.key];
                return (
                  <section
                    key={cat.key}
                    id={cat.key}
                    className="scroll-mt-24"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                          {cat.title[locale]}
                        </h2>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {t("treatmentsCount", { count: cat.items.length })}
                        </p>
                      </div>
                    </div>

                    <ul className="mt-6 overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm">
                      {cat.items.map((service, idx) => (
                        <li
                          key={service.name[locale]}
                          className={idx > 0 ? "border-t border-border/40" : ""}
                        >
                          <div className="flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-cream/40 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5">
                            <div className="min-w-0 flex-1">
                              <p className="text-base font-medium text-foreground">
                                {service.name[locale]}
                              </p>
                              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="size-3.5" />
                                {formatDuration(service.durationMinutes, locale)}
                              </p>
                            </div>
                            <BookingDialog serviceName={service.name[locale]}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="self-start rounded-full border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground sm:self-center"
                              >
                                {t("book")}
                              </Button>
                            </BookingDialog>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-cream py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {t("ctaTitle")}
              </h2>
              <p className="mt-3 text-muted-foreground">{t("ctaSubtitle")}</p>
              <BookingDialog>
                <Button
                  size="lg"
                  className="mt-6 rounded-full border-0 bg-primary px-8 text-primary-foreground hover:bg-primary-hover"
                >
                  <Calendar className="size-4" />
                  {t("ctaButton")}
                </Button>
              </BookingDialog>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ServicesPage;
