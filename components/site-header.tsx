"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "@/lib/i18n/navigation";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/general/utils";

const PHONE_NUMBER = "+302109918915";
const PHONE_DISPLAY = "210 991 8915";

const navItems = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "gallery", href: "/gallery" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/#contact" },
] as const;

export const SiteHeader = () => {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile header — solid sticky bar (not transparent, not fixed-floating) */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-cream px-4 py-2.5 md:hidden">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/logo-transparent.png"
            alt="4 Your Nails"
            width={96}
            height={96}
            className="h-9 w-auto"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-full text-foreground hover:bg-foreground/5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>

        {/* Mobile Nav — dropdown panel */}
        {mobileOpen && (
          <nav className="absolute inset-x-3 top-full z-50 mt-2 rounded-2xl border border-border/40 bg-background/95 p-3 shadow-[0_12px_36px_-12px_oklch(0.22_0.005_60/0.35)] backdrop-blur-xl">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary/12 text-primary"
                      : "text-muted-foreground hover:bg-foreground/4 hover:text-foreground"
                  )}
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-border/40 pt-3">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-foreground/4 hover:text-foreground"
                >
                  <Phone className="size-3.5" />
                  {PHONE_DISPLAY}
                </a>
                <div className="flex items-center justify-between rounded-xl px-3 py-1.5">
                  <span className="text-sm font-medium text-muted-foreground">
                    {t("language")}
                  </span>
                  <LanguageSwitcher onSelect={() => setMobileOpen(false)} />
                </div>
                <BookingDialog>
                  <Button size="sm" className="rounded-full" onClick={() => setMobileOpen(false)}>
                    {t("bookNow")}
                  </Button>
                </BookingDialog>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Desktop header — fixed floating cream pill (consistent on every route) */}
      <header className="fixed inset-x-0 top-0 z-50 hidden justify-center px-3 pt-4 md:flex">
        <div className="flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-border/40 bg-background/55 px-4 py-2 shadow-[0_8px_28px_-12px_oklch(0.22_0.005_60/0.18)] backdrop-blur-xl supports-backdrop-filter:bg-background/40">
          <Link href="/" className="flex shrink-0 items-center pl-1">
            <Image
              src="/images/logo-transparent.png"
              alt="4 Your Nails"
              width={96}
              height={96}
              className="h-16 w-auto"
            />
          </Link>

          <nav className="flex flex-1 items-center justify-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/12 text-primary"
                      : "text-muted-foreground hover:bg-foreground/4 hover:text-foreground"
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="hidden items-center gap-1.5 px-2 text-sm text-muted-foreground transition-colors hover:text-foreground lg:flex"
            >
              <Phone className="size-3.5" />
              {PHONE_DISPLAY}
            </a>
            <LanguageSwitcher variant="default" />
            <BookingDialog>
              <Button size="sm" className="rounded-full px-4 shadow-sm">
                {t("bookNow")}
              </Button>
            </BookingDialog>
          </div>
        </div>
      </header>
    </>
  );
};
