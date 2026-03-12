"use client";

import { useTranslations } from "next-intl";
import { User, Mail, Phone, MessageSquare, Tag, Send } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("HomePage.contact");

  return (
    <form
      action="https://formsubmit.co/4yournails@example.com"
      method="POST"
      className="rounded-2xl border border-border/50 bg-white p-6 md:p-8 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {t("formName")}
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50" />
            <input
              type="text"
              name="name"
              required
              placeholder={t("formNamePlaceholder")}
              className="w-full rounded-lg border border-border/60 bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#DBA49A] focus:outline-none focus:ring-1 focus:ring-[#DBA49A]/30"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {t("formEmail")}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50" />
            <input
              type="email"
              name="email"
              required
              placeholder={t("formEmailPlaceholder")}
              className="w-full rounded-lg border border-border/60 bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#DBA49A] focus:outline-none focus:ring-1 focus:ring-[#DBA49A]/30"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {t("formPhone")}
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50" />
            <input
              type="tel"
              name="phone"
              placeholder={t("formPhonePlaceholder")}
              className="w-full rounded-lg border border-border/60 bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#DBA49A] focus:outline-none focus:ring-1 focus:ring-[#DBA49A]/30"
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {t("formSubject")}
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50" />
            <input
              type="text"
              name="subject"
              placeholder={t("formSubjectPlaceholder")}
              className="w-full rounded-lg border border-border/60 bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#DBA49A] focus:outline-none focus:ring-1 focus:ring-[#DBA49A]/30"
            />
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          {t("formMessage")}
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 size-4 text-muted-foreground/50" />
          <textarea
            name="message"
            required
            rows={4}
            placeholder={t("formMessagePlaceholder")}
            className="w-full rounded-lg border border-border/60 bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#DBA49A] focus:outline-none focus:ring-1 focus:ring-[#DBA49A]/30 resize-none"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DBA49A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c99389]"
      >
        <Send className="size-4" />
        {t("formSend")}
      </button>
    </form>
  );
}
