"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "@/lib/i18n/navigation";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/examples/language-switcher";
import { Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/general/utils";

const TREATWELL_URL = "https://www.treatwell.gr/katasthma/4-your-nails/";
const PHONE_NUMBER = "+302109918915";
const PHONE_DISPLAY = "210 991 8915";

const navItems = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "gallery", href: "/gallery" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export const SiteHeader = () => {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  // Transparent only on homepage when not scrolled and mobile menu is closed
  const isTransparent = isHome && !scrolled && !mobileOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isTransparent
        ? "bg-transparent"
        : "border-b border-border/50 bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-transparent.png"
            alt="4 Your Nails"
            width={48}
            height={48}
            className="h-10 w-auto"
          />
          <span className={cn("hidden font-serif text-lg font-semibold sm:inline", isTransparent ? "text-white" : "text-foreground")}>
            4 Your Nails
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isTransparent && pathname === item.href && "text-white",
                isTransparent && pathname !== item.href && "text-white/80 hover:text-white",
                !isTransparent && pathname === item.href && "text-primary",
                !isTransparent && pathname !== item.href && "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className={cn("flex items-center gap-2", isTransparent && "text-white")}>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className={cn(
              "hidden items-center gap-1.5 text-sm transition-colors lg:flex",
              isTransparent ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Phone className="size-3.5" />
            {PHONE_DISPLAY}
          </a>
          <LanguageSwitcher />
          <Button asChild size="sm" className={cn(
            "hidden sm:inline-flex rounded-full px-5",
            isTransparent && "border-white/60 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
          )}>
            <a href={TREATWELL_URL} target="_blank" rel="noopener noreferrer">
              {t("bookNow")}
            </a>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t border-border/50 bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground"
              >
                <Phone className="size-3.5" />
                {PHONE_DISPLAY}
              </a>
              <Button asChild size="sm">
                <a
                  href={TREATWELL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("bookNow")}
                </a>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
