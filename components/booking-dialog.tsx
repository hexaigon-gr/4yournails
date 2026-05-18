"use client";

import { ArrowRight, CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PHONE_NUMBER = "+302109918915";
const PHONE_DISPLAY = "210 991 8915";
const WHATSAPP_NUMBER = "302109918915";
const TREATWELL_URL = "https://www.treatwell.gr/katasthma/4-your-nails/";

type BookingDialogProps = {
  serviceName?: string;
  children: ReactNode;
};

export const BookingDialog = ({ serviceName, children }: BookingDialogProps) => {
  const t = useTranslations("ServicesPage.dialog");

  const whatsappMessage = serviceName
    ? t("whatsappMessage", { service: serviceName })
    : t("whatsappMessageGeneric");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="font-serif text-2xl font-bold text-foreground">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-muted-foreground">
            {serviceName ? (
              <>
                <span className="font-medium text-foreground">{t("service")}:</span>{" "}
                {serviceName}
              </>
            ) : (
              t("subtitleGeneric")
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("preferred")}
          </p>

          <div className="mt-4 flex flex-col gap-3">
            {/* Call */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Phone className="size-5" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-semibold text-foreground">
                  {t("call")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {PHONE_DISPLAY}
                </p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#25D366]/50 hover:bg-[#25D366]/5 hover:shadow-md"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366] transition-colors group-hover:bg-[#25D366] group-hover:text-white">
                <MessageCircle className="size-5" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-semibold text-foreground">
                  {t("whatsapp")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("whatsappSubtitle")}
                </p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-[#25D366]" />
            </a>
          </div>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border/60" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("or")}
            </span>
            <div className="h-px flex-1 bg-border/60" />
          </div>

          {/* Online booking — featured */}
          <a
            href={TREATWELL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-linear-to-br from-primary via-primary to-primary/85 p-4 text-primary-foreground shadow-lg shadow-primary/30 ring-1 ring-primary/30 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-white/15 blur-2xl transition-opacity group-hover:opacity-80"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/15 opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100"
            />
            <div className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30 backdrop-blur-sm transition-transform group-hover:scale-105">
              <CalendarCheck className="size-5" />
            </div>
            <div className="relative min-w-0 flex-1 text-left">
              <p className="text-sm font-semibold leading-tight">
                {t("treatwell")}
              </p>
              <p className="mt-0.5 text-xs text-primary-foreground/85">
                {t("treatwellSubtitle")}
              </p>
            </div>
            <ArrowRight className="relative size-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
