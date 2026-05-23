"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "@/lib/i18n/navigation";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const isHero = isHome && !scrolled && !mobileOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4"
    >
      <div
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-3 py-2 transition-all duration-300 md:rounded-full md:border md:px-4",
          isHero
            ? "md:border-white/15 md:bg-white/5 md:backdrop-blur-md md:supports-backdrop-filter:bg-white/6"
            : "md:border-border/40 md:bg-background/55 md:backdrop-blur-xl md:shadow-[0_8px_28px_-12px_oklch(0.22_0.005_60/0.18)] md:supports-backdrop-filter:bg-background/40"
        )}
      >
        {/* Logo — hidden on mobile when on the hero (the hero image already shows it) */}
        <Link
          href="/"
          className={cn(
            "shrink-0 items-center pl-1",
            isHero ? "hidden md:flex" : "flex"
          )}
        >
          <Image
            src="/images/logo-transparent.png"
            alt="4 Your Nails"
            width={96}
            height={96}
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        {/* Desktop Nav — centered */}
        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  isHero && isActive && "bg-white/15 text-white",
                  isHero && !isActive && "text-white/75 hover:bg-white/10 hover:text-white",
                  !isHero && isActive && "bg-primary/12 text-primary",
                  !isHero && !isActive && "text-muted-foreground hover:bg-foreground/4 hover:text-foreground"
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className={cn(
              "hidden items-center gap-1.5 px-2 text-sm transition-colors lg:flex",
              isHero ? "text-white/75 hover:text-white" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Phone className="size-3.5" />
            {PHONE_DISPLAY}
          </a>
          <LanguageSwitcher
            variant={isHero ? "hero" : "default"}
            className="hidden md:inline-flex"
          />
          <BookingDialog>
            <Button
              size="sm"
              className={cn(
                "hidden rounded-full px-4 shadow-sm sm:inline-flex",
                isHero &&
                  "border border-white/30 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
              )}
            >
              {t("bookNow")}
            </Button>
          </BookingDialog>

          {/* Mobile Menu Toggle — always dark; the mobile hero has a light/cream top area */}
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full text-foreground hover:bg-foreground/5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav — separate glass card below the pill */}
      {mobileOpen && (
        <nav className="absolute inset-x-3 top-full z-50 mt-2 rounded-2xl border border-border/40 bg-background/95 p-3 shadow-[0_12px_36px_-12px_oklch(0.22_0.005_60/0.35)] backdrop-blur-xl md:hidden">
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
  );
};
