import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { Manrope } from "next/font/google";
import { routing } from "@/lib/i18n/routing";
import { Providers } from "@/components/providers";
import { BaseLayoutProps } from "@/types/page-props";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://4yournails.gr"),
  title: {
    default: "4 Your Nails | Nail Salon in Ilioupoli, Athens",
    template: "%s | 4 Your Nails",
  },
  description:
    "Award-winning nail salon in Ilioupoli, Athens. Expert manicures, pedicures, gel extensions & nail art. Book your appointment on Treatwell.",
  keywords: [
    "nail salon",
    "manicure",
    "pedicure",
    "gel extensions",
    "nail art",
    "Ilioupoli",
    "Athens",
    "4 Your Nails",
    "μανικιούρ",
    "πεντικιούρ",
    "Ηλιούπολη",
  ],
  authors: [{ name: "4 Your Nails" }],
  openGraph: {
    type: "website",
    siteName: "4 Your Nails",
    locale: "el_GR",
    alternateLocale: "en_US",
    title: "4 Your Nails | Award-Winning Nail Salon in Ilioupoli",
    description:
      "Expert manicures, pedicures, gel extensions & nail art. Trusted by hundreds of happy clients. Book on Treatwell.",
    url: "https://4yournails.gr",
  },
  twitter: {
    card: "summary_large_image",
    title: "4 Your Nails | Nail Salon in Ilioupoli, Athens",
    description:
      "Award-winning nail salon. Expert manicures, pedicures, gel extensions & nail art. Book your appointment today.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://4yournails.gr",
    languages: {
      "el": "https://4yournails.gr/el",
      "en": "https://4yournails.gr/en",
    },
  },
};

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const LocaleLayout = async ({ children, params }: BaseLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${manrope.variable} font-sans antialiased`}
      >
        <Providers messages={messages} locale={locale}>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default LocaleLayout;
