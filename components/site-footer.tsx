import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react";
import { SocialIcon } from "@/components/social-icon";

const TREATWELL_URL = "https://www.treatwell.gr/katasthma/4-your-nails/";
const INSTAGRAM_URL = "https://www.instagram.com/4yournails_/";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100063698404274";
const PHONE_NUMBER = "+302109918915";
const PHONE_DISPLAY = "210 991 8915";

const navItems = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "gallery", href: "/gallery" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

const hours = [
  { day: "Monday", hours: "closed" },
  { day: "Tuesday", hours: "09:00 - 20:00" },
  { day: "Wednesday", hours: "09:00 - 20:00" },
  { day: "Thursday", hours: "09:00 - 20:00" },
  { day: "Friday", hours: "09:00 - 20:00" },
  { day: "Saturday", hours: "09:00 - 17:00" },
  { day: "Sunday", hours: "closed" },
] as const;

export const SiteFooter = async () => {
  const tNav = await getTranslations("Nav");
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="4 Your Nails"
                width={40}
                height={40}
                className="h-9 w-auto"
              />
              <span className="font-serif text-lg font-semibold">
                4 Your Nails
              </span>
            </div>
            <p className="text-sm text-background/70">{t("description")}</p>
            <div className="flex gap-3">
              <SocialIcon
                url={INSTAGRAM_URL}
                icon={<Instagram className="size-5" />}
                color="instagram"
              />
              <SocialIcon
                url={FACEBOOK_URL}
                icon={<Facebook className="size-5" />}
                color="facebook"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              {t("quickLinks")}
            </h3>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-sm text-background/70 transition-colors hover:text-background"
                >
                  {tNav(item.key)}
                </Link>
              ))}
              <a
                href={TREATWELL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                {t("bookNow")}
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              {t("contact")}
            </h3>
            <div className="flex flex-col gap-3 text-sm text-background/70">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>
                  Λεωφ. Σοφοκλή Βενιζέλου 93
                  <br />
                  Ηλιούπολη 163 46, Αθήνα
                </span>
              </div>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-2 transition-colors hover:text-background"
              >
                <Phone className="size-4 shrink-0" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              {t("hours")}
            </h3>
            <div className="flex flex-col gap-1 text-sm text-background/70">
              {hours.map((item) => (
                <div key={item.day} className="flex justify-between gap-4">
                  <span>{item.day}</span>
                  <span
                    className={
                      item.hours === "closed" ? "text-background/40" : ""
                    }
                  >
                    {item.hours === "closed" ? t("closed") : item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-background/10 pt-6 text-center text-sm text-background/50">
          <p>
            &copy; {new Date().getFullYear()} 4 Your Nails. {t("rights")}
          </p>
          <p className="mt-2">
            {t("madeBy")}{" "}
            <a
              href="https://www.hexaigon.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 underline underline-offset-4 transition-colors hover:text-background"
            >
              hexaigon.gr
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
