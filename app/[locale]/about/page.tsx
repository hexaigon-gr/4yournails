import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { BasePageProps } from "@/types/page-props";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import type { Metadata } from "next";

const teamMembers = [
  { name: "Ελένη", nameEn: "Elena", role: "Nail & Beauty Specialist" },
  { name: "Ελεονώρα", nameEn: "Eleonora", role: "Nail Technician" },
  { name: "Άντζυ", nameEn: "Antzy", role: "Nail Technician" },
] as const;

export const generateMetadata = async ({
  params,
}: BasePageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return {
    title: t("title"),
    description: t("story.text"),
  };
};

const AboutPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("AboutPage");

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-background py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {t("title")}
              </h1>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-muted py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
                  {t("story.title")}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  {t("story.text")}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {t("story.text2")}
                </p>
                <p className="mt-6 font-serif text-lg italic text-foreground">
                  {t("story.tagline")}
                </p>
              </div>
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                <Image
                  src="/images/salon/salon-2.jpg"
                  alt="4 Your Nails storefront"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
                {t("team.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">{t("team.subtitle")}</p>
            </div>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
              {teamMembers.map((member) => (
                <Card
                  key={member.nameEn}
                  className="transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <User className="size-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {member.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default AboutPage;
