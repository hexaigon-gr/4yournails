import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { BasePageProps } from "@/types/page-props";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Instagram } from "lucide-react";
import { MasonryGallery } from "@/components/masonry-gallery";

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

export interface GalleryItem {
  src: string;
  alt: string;
  category: "manicure" | "nailArt" | "gelExtensions" | "salon";
  aspect: "tall" | "square" | "wide";
}

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery/gallery-1.jpg",
    alt: "Chrome iridescent manicure",
    category: "manicure",
    aspect: "tall",
  },
  {
    src: "/images/gallery/gallery-3.jpg",
    alt: "Salon interior with staff working",
    category: "salon",
    aspect: "wide",
  },
  {
    src: "/images/gallery/gallery-6.jpg",
    alt: "French tip nail extensions",
    category: "gelExtensions",
    aspect: "tall",
  },
  {
    src: "/images/gallery/gallery-4.jpg",
    alt: "Purple gel manicure",
    category: "manicure",
    aspect: "square",
  },
  {
    src: "/images/gallery/gallery-7.jpg",
    alt: "Colorful rainbow ombre nail art",
    category: "nailArt",
    aspect: "tall",
  },
  {
    src: "/images/gallery/gallery-2.jpg",
    alt: "4 Your Nails salon storefront",
    category: "salon",
    aspect: "tall",
  },
  {
    src: "/images/gallery/gallery-5.jpg",
    alt: "Classic red manicure with 4 Your Nails branding",
    category: "manicure",
    aspect: "tall",
  },
  {
    src: "/images/gallery/gallery-8.jpg",
    alt: "French almond gel extensions",
    category: "gelExtensions",
    aspect: "tall",
  },
  {
    src: "/images/gallery/gallery-10.jpg",
    alt: "4 Your Nails team photo",
    category: "salon",
    aspect: "tall",
  },
  {
    src: "/images/gallery/gallery-9.jpg",
    alt: "Subtle iridescent french tips",
    category: "manicure",
    aspect: "square",
  },
];

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

        {/* Pinterest-style Gallery */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <MasonryGallery
              images={galleryItems.map(({ src, alt, aspect }) => ({
                src,
                alt,
                aspect,
              }))}
            />

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
