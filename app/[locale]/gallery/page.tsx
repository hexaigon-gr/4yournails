import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { BasePageProps } from "@/types/page-props";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Sparkles, Paintbrush, Hand, Scissors, Instagram } from "lucide-react";

export const generateMetadata = async ({
  params,
}: BasePageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GalleryPage" });

  return {
    title: `${t("title")} | 4 Your Nails`,
    description:
      "Browse our nail art gallery — manicures, pedicures, gel extensions & creative nail designs from our award-winning salon in Ilioupoli.",
  };
};

const categories = [
  { key: "all" as const, active: true },
  { key: "manicure" as const, active: false },
  { key: "pedicure" as const, active: false },
  { key: "nailArt" as const, active: false },
  { key: "gelExtensions" as const, active: false },
] as const;

type CategoryKey = (typeof categories)[number]["key"];

interface PlaceholderItem {
  category: Exclude<CategoryKey, "all">;
  gradient: string;
  icon: React.ElementType;
  tall: boolean;
}

const placeholderItems: PlaceholderItem[] = [
  {
    category: "manicure",
    gradient: "from-primary/20 via-primary/10 to-background",
    icon: Hand,
    tall: true,
  },
  {
    category: "nailArt",
    gradient: "from-secondary/30 via-secondary/15 to-background",
    icon: Sparkles,
    tall: false,
  },
  {
    category: "gelExtensions",
    gradient: "from-accent/25 via-accent/10 to-background",
    icon: Paintbrush,
    tall: false,
  },
  {
    category: "pedicure",
    gradient: "from-primary/15 via-secondary/10 to-background",
    icon: Scissors,
    tall: true,
  },
  {
    category: "nailArt",
    gradient: "from-accent/20 via-primary/10 to-background",
    icon: Sparkles,
    tall: false,
  },
  {
    category: "manicure",
    gradient: "from-secondary/20 via-accent/10 to-background",
    icon: Hand,
    tall: false,
  },
  {
    category: "gelExtensions",
    gradient: "from-primary/25 via-accent/15 to-background",
    icon: Paintbrush,
    tall: false,
  },
  {
    category: "nailArt",
    gradient: "from-secondary/25 via-primary/10 to-background",
    icon: Sparkles,
    tall: true,
  },
  {
    category: "pedicure",
    gradient: "from-accent/30 via-secondary/10 to-background",
    icon: Scissors,
    tall: false,
  },
  {
    category: "manicure",
    gradient: "from-primary/20 via-secondary/15 to-background",
    icon: Hand,
    tall: false,
  },
  {
    category: "gelExtensions",
    gradient: "from-secondary/15 via-primary/15 to-background",
    icon: Paintbrush,
    tall: true,
  },
  {
    category: "nailArt",
    gradient: "from-primary/15 via-accent/20 to-background",
    icon: Sparkles,
    tall: false,
  },
];

const categoryLabelMap: Record<Exclude<CategoryKey, "all">, string> = {
  manicure: "Manicure",
  pedicure: "Pedicure",
  nailArt: "Nail Art",
  gelExtensions: "Gel Extensions",
};

const GalleryPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("GalleryPage");

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
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

        {/* Filter Buttons */}
        <section className="border-b border-border/50 bg-muted/40 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map(({ key, active }) => (
                <Button
                  key={key}
                  variant={active ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {t(key)}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {placeholderItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br ${item.gradient} ${
                      item.tall ? "h-72" : "h-52"
                    } relative flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:border-primary/30 hover:shadow-lg`}
                  >
                    {/* Decorative dot pattern overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, currentColor 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Icon */}
                    <div className="relative flex size-14 items-center justify-center rounded-full bg-background/60 shadow-sm backdrop-blur-sm">
                      <Icon className="size-7 text-primary" />
                    </div>

                    {/* Category badge */}
                    <span className="relative rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                      {categoryLabelMap[item.category]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Coming soon note */}
            <div className="mx-auto mt-12 flex max-w-lg flex-col items-center gap-3 rounded-2xl border border-border/50 bg-muted/60 px-6 py-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Instagram className="size-6" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Photos coming soon &mdash; follow us on Instagram{" "}
                <a
                  href="https://www.instagram.com/4yournails_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground underline-offset-2 hover:underline"
                >
                  @4yournails_
                </a>{" "}
                for our latest work
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default GalleryPage;
