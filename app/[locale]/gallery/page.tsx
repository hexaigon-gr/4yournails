import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { BasePageProps } from "@/types/page-props";
import { SiteFooter } from "@/components/site-footer";
import { Instagram } from "lucide-react";
import { PinterestGrid } from "@/components/pinterest-grid";
import { getWorkImages } from "@/lib/work-images";

export const generateMetadata = async ({
  params,
}: BasePageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GalleryPage" });

  return {
    title: `${t("title")} | 4 Your Nails`,
    description:
      "Browse our nail art gallery: manicures, pedicures, gel extensions and creative nail designs from our salon in Ilioupoli.",
  };
};

const GalleryPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("GalleryPage");
  const workImages = await getWorkImages();

  return (
    <div className="flex min-h-screen flex-col">
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

        {/* Pinterest masonry of our work */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <PinterestGrid images={workImages} />

            {/* Instagram CTA */}
            <div className="mx-auto mt-12 flex max-w-lg flex-col items-center gap-3 rounded-2xl border border-border/50 bg-muted/60 px-6 py-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Instagram className="size-6" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("followUs")}{" "}
                <a
                  href="https://www.instagram.com/4yournails_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground underline-offset-2 hover:underline"
                >
                  @4yournails_
                </a>
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
