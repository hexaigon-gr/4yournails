# 4 Your Nails Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a complete 5-page website for 4 Your Nails nail salon in Ilioupoli, Greece.

**Architecture:** Next.js App Router with Server Components, next-intl for EN/EL, Tailwind CSS with custom warm color palette from logo. All CTAs link to Treatwell booking.

**Tech Stack:** Next.js 16.1, next-intl, Tailwind CSS 4, shadcn/ui, Lucide icons, Next.js Image

---

### Task 1: Update Color Palette in globals.css

**Files:**
- Modify: `app/[locale]/globals.css`

**Step 1:** Replace the CSS variables with the Warm Boutique palette derived from the logo colors (orange #E8820C, green #7B9B3B, black #2D2D2D, tan #D4A96A). Convert hex to oklch. Update both light and dark themes.

**Step 2:** Run `pnpm dev` and verify the app loads with new colors.

**Step 3:** Commit: `feat: update color palette to 4 Your Nails brand colors`

---

### Task 2: Update Layout — Font, Metadata, Structure

**Files:**
- Modify: `app/[locale]/layout.tsx`

**Step 1:** Change font from Roboto to Playfair Display (headings) + Inter (body). Update metadata title to "4 Your Nails | Nail Salon in Ilioupoli" and description. Add OG tags.

**Step 2:** Run `pnpm tsc --noEmit` and `pnpm lint`.

**Step 3:** Commit: `feat: update layout with brand fonts and metadata`

---

### Task 3: Write Translation Files

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/el.json`

**Step 1:** Replace all starter content with 4 Your Nails content: Nav items, Hero text, Services, About, Contact, Footer, Reviews section labels, CTAs. Full EN and EL translations.

**Step 2:** Commit: `feat: add 4 Your Nails translations for EN and EL`

---

### Task 4: Create Site Header Component

**Files:**
- Create: `components/site-header.tsx`

**Step 1:** Build sticky header with: logo (from public/images/logo.png), nav links (Home, Services, Gallery, About, Contact), "Book Now" button linking to Treatwell, language switcher, phone number. Server component with client-side mobile menu if needed.

**Step 2:** Screenshot and verify. Commit: `feat: add site header with nav and booking CTA`

---

### Task 5: Create Site Footer Component

**Files:**
- Create: `components/site-footer.tsx`

**Step 1:** Dark background footer with: logo, address, phone, hours table, Instagram link, Treatwell booking link, copyright. Two-column layout.

**Step 2:** Screenshot and verify. Commit: `feat: add site footer`

---

### Task 6: Build Homepage — Hero Section

**Files:**
- Modify: `app/[locale]/page.tsx`

**Step 1:** Replace starter page entirely. Build hero: warm cream background, H1 headline, subtitle, "Book Now" Treatwell button, phone number. Right side: placeholder for salon photo (use a nice gradient/shape until photos are downloaded).

**Step 2:** Screenshot and verify. Commit: `feat: build homepage hero section`

---

### Task 7: Build Homepage — Trust Bar

**Step 1:** Horizontal strip below hero: "4.8★ Treatwell", "298+ Reviews", "Award-Winning", "Since 2018". Subtle tan/muted background.

**Step 2:** Screenshot and verify. Commit: `feat: add trust bar section`

---

### Task 8: Build Homepage — Services Preview

**Step 1:** Grid of 6 service cards: Manicure (€15+), Pedicure (€19+), Gel Extensions (€46), Semi-Permanent (€20), Nail Art, Eyebrows & Waxing (€15+). Each card: Lucide icon, name, starting price. "View All Services" link.

**Step 2:** Screenshot and verify. Commit: `feat: add services preview section`

---

### Task 9: Build Homepage — Reviews Section

**Step 1:** 3 featured reviews from Treatwell data. Each: reviewer name (first name only), star rating (filled stars), review text. Warm cream background.

**Step 2:** Screenshot and verify. Commit: `feat: add reviews section`

---

### Task 10: Build Homepage — CTA Banner

**Step 1:** Full-width orange background, white text: "Ready for your next appointment?" + "Book on Treatwell" button.

**Step 2:** Screenshot and verify. Commit: `feat: add CTA banner section`

---

### Task 11: Build Services Page

**Files:**
- Create: `app/[locale]/services/page.tsx`

**Step 1:** Full services page with categories: Nails (manicure, pedicure, gel, semi-permanent) and Beauty (eyebrows, waxing, lashes). Each service: name, description, duration, price, "Book" button → Treatwell.

**Step 2:** Screenshot and verify. Run lint + tsc. Commit: `feat: add services page`

---

### Task 12: Build Gallery Page

**Files:**
- Create: `app/[locale]/gallery/page.tsx`

**Step 1:** Masonry-style photo grid. For now use placeholder colored divs until real photos are added. Category filter buttons (All, Manicure, Pedicure, Nail Art).

**Step 2:** Screenshot and verify. Commit: `feat: add gallery page`

---

### Task 13: Build About Page

**Files:**
- Create: `app/[locale]/about/page.tsx`

**Step 1:** Story section about the salon, team section with staff names (Ελένη, Ελεονώρα, Ντεναντα, Άντζυ), Golden Company award mention.

**Step 2:** Screenshot and verify. Commit: `feat: add about page`

---

### Task 14: Build Contact Page

**Files:**
- Create: `app/[locale]/contact/page.tsx`

**Step 1:** Address, phone (click-to-call), hours table, embedded Google Maps iframe, prominent "Book Online" Treatwell button, Instagram link.

**Step 2:** Screenshot and verify. Commit: `feat: add contact page`

---

### Task 15: SEO & Polish

**Step 1:** Add per-page metadata (title, description, OG tags) via `generateMetadata()` on each page. Add JSON-LD LocalBusiness schema to layout or homepage.

**Step 2:** Run `pnpm lint` and `pnpm tsc --noEmit`. Fix all errors.

**Step 3:** Final screenshot of all pages. Commit: `feat: add SEO metadata and structured data`

---

### Task 16: Scrape & Add Real Photos

**Step 1:** Fetch Treatwell listing page, extract photo URLs. Download to `public/images/`. Replace placeholder images across all pages.

**Step 2:** Screenshot all pages with real photos. Commit: `feat: add real salon photos from Treatwell`
