import { getTranslations, setRequestLocale } from "next-intl/server";
import { BasePageProps } from "@/types/page-props";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/general/utils";
import {
  Clock,
  Paintbrush,
  Hand,
  Footprints,
  Sparkles,
  Scissors,
  Eye,
  Leaf,
  Stars,
  Calendar,
} from "lucide-react";
import type { Metadata } from "next";

const TREATWELL_URL = "https://www.treatwell.gr/katasthma/4-your-nails/";

type NailServiceKey =
  | "semiPermanentManicure"
  | "handCareManicure"
  | "semiPermanentPedicure"
  | "pedicureMaintenance"
  | "gelExtensions"
  | "nailArt";

type BeautyServiceKey =
  | "eyebrowShaping"
  | "fullLegWaxing"
  | "eyelashExtensions";

interface ServiceData {
  price: number | null;
  duration: number | null;
}

interface NailService {
  key: NailServiceKey;
  icon: React.ElementType;
  data: ServiceData;
}

interface BeautyService {
  key: BeautyServiceKey;
  icon: React.ElementType;
  data: ServiceData;
}

const nailServices: NailService[] = [
  {
    key: "semiPermanentManicure",
    icon: Paintbrush,
    data: { price: 20, duration: 60 },
  },
  {
    key: "handCareManicure",
    icon: Hand,
    data: { price: 15, duration: 45 },
  },
  {
    key: "semiPermanentPedicure",
    icon: Footprints,
    data: { price: 24, duration: 60 },
  },
  {
    key: "pedicureMaintenance",
    icon: Leaf,
    data: { price: 19, duration: 45 },
  },
  {
    key: "gelExtensions",
    icon: Sparkles,
    data: { price: 46, duration: 120 },
  },
  {
    key: "nailArt",
    icon: Scissors,
    data: { price: null, duration: null },
  },
];

const beautyServices: BeautyService[] = [
  {
    key: "eyebrowShaping",
    icon: Eye,
    data: { price: 15, duration: 30 },
  },
  {
    key: "fullLegWaxing",
    icon: Stars,
    data: { price: 26, duration: 30 },
  },
  {
    key: "eyelashExtensions",
    icon: Sparkles,
    data: { price: null, duration: null },
  },
];

export async function generateMetadata({
  params,
}: BasePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const ServicesPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ServicesPage");

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-background py-14 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {t("subtitle")}
              </p>
              <div className="mt-6">
                <Button asChild size="lg">
                  <a
                    href={TREATWELL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="size-4" />
                    {t("book")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Nails Section */}
        <section className="bg-muted py-14 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Paintbrush className="size-5" />
              </div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
                {t("nails.title")}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {nailServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.key}
                    className={cn(
                      "group transition-all hover:border-primary/30 hover:shadow-md",
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {t(`nails.${service.key}.title`)}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {t(`nails.${service.key}.description`)}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-3">
                            {service.data.duration !== null && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                <Clock className="size-3" />
                                {service.data.duration} {t("duration")}
                              </span>
                            )}
                            {service.data.price !== null ? (
                              <span className="text-sm font-semibold text-primary">
                                &euro;{service.data.price}
                              </span>
                            ) : (
                              <span className="text-sm font-medium text-muted-foreground">
                                Custom pricing
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="shrink-0">
                          <Button asChild size="sm" variant="outline">
                            <a
                              href={TREATWELL_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {t("book")}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Beauty Section */}
        <section className="bg-background py-14 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Stars className="size-5" />
              </div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
                {t("beauty.title")}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {beautyServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.key}
                    className={cn(
                      "group transition-all hover:border-primary/30 hover:shadow-md",
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {t(`beauty.${service.key}.title`)}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {t(`beauty.${service.key}.description`)}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-3">
                            {service.data.duration !== null && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                <Clock className="size-3" />
                                {service.data.duration} {t("duration")}
                              </span>
                            )}
                            {service.data.price !== null ? (
                              <span className="text-sm font-semibold text-primary">
                                &euro;{service.data.price}
                              </span>
                            ) : (
                              <span className="text-sm font-medium text-muted-foreground">
                                Custom pricing
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="shrink-0">
                          <Button asChild size="sm" variant="outline">
                            <a
                              href={TREATWELL_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {t("book")}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ServicesPage;
