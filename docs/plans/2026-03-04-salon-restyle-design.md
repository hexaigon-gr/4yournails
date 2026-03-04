# Salon-Inspired Homepage Restyle Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle the 4 Your Nails homepage with a full-width hero overlay, softer salon-inspired colors, and a globe-icon language switcher — inspired by the Nail Garden reference.

**Architecture:** Modify existing components (page.tsx, site-header.tsx, language-switcher.tsx, globals.css) in place. No new files needed except possibly adding CSS custom properties. All changes are styling/layout — no new dependencies.

**Tech Stack:** Next.js 16, Tailwind CSS 4, shadcn/ui, Lucide icons, next-intl

---

### Task 1: Update Language Switcher to Globe Icon with Dropdown

**Files:**
- Modify: `components/examples/language-switcher.tsx`

**Step 1: Simplify the trigger to a ghost globe icon button**

Replace the current `LanguageSwitcher` component trigger. Change the Button from `variant="outline" size="sm"` with flag+text to a minimal ghost icon button showing only the Globe icon:

```tsx
<DropdownMenuTrigger asChild>
  <Button variant="ghost" size="icon" className="size-9">
    <Globe className="size-4" />
    <span className="sr-only">Switch language</span>
  </Button>
</DropdownMenuTrigger>
```

Keep the dropdown content as-is (it already shows flag + language name and handles switching). This gives us the globe icon that opens an EN/EL dropdown.

**Step 2: Verify dev server shows globe icon in header**

Run: `node screenshot.mjs http://localhost:3000/en header-globe`
Expected: Globe icon visible in header, no flag/text, clicking opens dropdown.

**Step 3: Commit**

```bash
git add components/examples/language-switcher.tsx
git commit -m "style: simplify language switcher to globe icon with dropdown"
```

---

### Task 2: Make Header Transparent Over Hero, Solid on Scroll

**Files:**
- Modify: `components/site-header.tsx`

**Step 1: Add scroll detection state and transparent/solid styling**

Add a `useEffect` with scroll listener. When `scrollY === 0`, header is transparent with white text. When scrolled, it gets solid bg-card background. The header is currently `sticky top-0` — keep that.

Replace the header element's className logic:

```tsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 50);
  handleScroll(); // check initial
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

Header className:
```tsx
className={cn(
  "sticky top-0 z-50 w-full transition-all duration-300",
  scrolled
    ? "border-b border-border/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    : "bg-transparent border-b border-transparent"
)}
```

**Step 2: Adjust text/logo colors for transparent state**

When not scrolled (transparent over hero image), text needs to be white for visibility:
- Logo text: add `cn("...", !scrolled && "text-white")`
- Nav links: when not scrolled, use `text-white/80 hover:text-white` instead of `text-muted-foreground`
- Phone number: same white treatment when not scrolled
- Language switcher & Book Now button: pass a prop or use CSS — for simplicity, use `text-white` classes conditionally on the right-side container

Since the header is a client component, we can pass scrolled state to conditionally style children. For the LanguageSwitcher we don't need to change it — ghost buttons will inherit text color.

Add to the nav links:
```tsx
className={cn(
  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
  scrolled
    ? (pathname === item.href ? "text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")
    : (pathname === item.href ? "text-white" : "text-white/80 hover:text-white")
)}
```

Book Now button when not scrolled: keep as primary (it stands out on both backgrounds).

**Step 3: Screenshot and verify**

Run: `node screenshot.mjs http://localhost:3000/en header-transparent`
Expected: Header is transparent over hero, white text, becomes solid on scroll.

**Step 4: Commit**

```bash
git add components/site-header.tsx
git commit -m "style: transparent header over hero, solid on scroll"
```

---

### Task 3: Full-Width Hero Section with Image Overlay

**Files:**
- Modify: `app/[locale]/page.tsx`

**Step 1: Replace the split-layout hero with full-width background image + overlay**

Remove the grid layout. Use the hero image as a full-width background with gradient overlay and centered text:

```tsx
{/* Hero Section */}
<section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
  {/* Background Image */}
  <Image
    src="/images/salon/salon-hero.jpg"
    alt="4 Your Nails salon"
    fill
    className="object-cover"
    priority
  />
  {/* Dark gradient overlay for text readability */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

  {/* Content */}
  <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
    <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
      {t("hero.title")}
    </h1>
    <p className="mx-auto mt-6 max-w-lg text-lg text-white/80">
      {t("hero.subtitle")}
    </p>
    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <Button asChild size="lg" className="bg-[#DBA49A] hover:bg-[#c99389] text-white border-0 rounded-full px-8">
        <a
          href={TREATWELL_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Calendar className="size-4" />
          {t("hero.bookNow")}
        </a>
      </Button>
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
      >
        <Phone className="size-4" />
        {t("hero.callUs")}: {PHONE_DISPLAY}
      </a>
    </div>
  </div>
</section>
```

Key changes:
- `min-h-[85vh]` for dramatic full-screen feel
- Image with `fill` + `object-cover` as background
- Dark gradient overlay for text contrast
- Centered text with white color
- Soft rose/pink CTA button (`#DBA49A`) with `rounded-full`
- Remove the old grid-cols-2 and the separate Image column

**Step 2: Screenshot and verify**

Run: `node screenshot.mjs http://localhost:3000/en hero-fullwidth`
Expected: Full-width hero with salon image as background, centered white text, pink Book button.

**Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "style: full-width hero with image overlay and centered content"
```

---

### Task 4: Restyle Trust Bar with Cream Background

**Files:**
- Modify: `app/[locale]/page.tsx`

**Step 1: Change trust bar styling**

Replace the trust bar section classes:

```tsx
<section className="bg-[#F5F0EB] py-8">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
      <div className="flex items-center gap-2.5">
        <Star className="size-5 text-primary" />
        <span className="text-sm font-medium text-foreground/80">{t("trust.rating")}</span>
      </div>
      {/* ... same pattern for other 3 items, with text-foreground/80 */}
    </div>
  </div>
</section>
```

Remove `border-y border-border/50` and `bg-muted`. Use warm cream `bg-[#F5F0EB]` instead.

**Step 2: Screenshot and verify**

Run: `node screenshot.mjs http://localhost:3000/en trust-bar`

**Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "style: cream background trust bar"
```

---

### Task 5: Restyle Services Section with Sage Background

**Files:**
- Modify: `app/[locale]/page.tsx`

**Step 1: Add sage-tinted background and softer card styling**

Change the services section:

```tsx
<section className="bg-[#F4F6EF] py-16 lg:py-20">
```

Update the section title to be larger serif:
```tsx
<h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
```

Update service cards to have cream background with softer hover:
```tsx
<Card
  key={service.key}
  className="group border-0 bg-white/80 shadow-sm transition-all hover:shadow-md"
>
```

Update the "View All Services" button to use the rose color:
```tsx
<Button asChild className="bg-[#DBA49A] hover:bg-[#c99389] text-white border-0 rounded-full px-8">
```

**Step 2: Screenshot and verify**

Run: `node screenshot.mjs http://localhost:3000/en services-section`

**Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "style: sage background and softer cards for services section"
```

---

### Task 6: Restyle Reviews Section

**Files:**
- Modify: `app/[locale]/page.tsx`

**Step 1: Update reviews section styling**

Change background to warm cream instead of muted:
```tsx
<section className="bg-[#F5F0EB] py-16 lg:py-20">
```

Update heading to be larger:
```tsx
<h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
```

Update review cards:
```tsx
<Card key={key} className="border-0 bg-white shadow-sm">
```

Add a decorative quote before the review text — use a large serif quote mark:
```tsx
<p className="font-serif text-2xl text-primary/30 leading-none">&ldquo;</p>
```

Keep the "Read More on Treatwell" button, but style it with the rose color:
```tsx
<Button asChild className="bg-[#DBA49A] hover:bg-[#c99389] text-white border-0 rounded-full px-8">
```

**Step 2: Screenshot and verify**

Run: `node screenshot.mjs http://localhost:3000/en reviews-section`

**Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "style: warm cream reviews section with decorative quotes"
```

---

### Task 7: Restyle CTA Banner with Sage Green

**Files:**
- Modify: `app/[locale]/page.tsx`

**Step 1: Change CTA from primary orange to sage green**

```tsx
<section className="bg-[#7B9B3B] py-12 lg:py-16">
  <div className="container mx-auto px-4 text-center">
    <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
      {t("cta.title")}
    </h2>
    <p className="mx-auto mt-3 max-w-lg text-white/80">
      {t("cta.subtitle")}
    </p>
    <div className="mt-6">
      <Button
        asChild
        size="lg"
        className="bg-white text-[#7B9B3B] font-semibold hover:bg-white/90 rounded-full px-8 border-0"
      >
        <a
          href={TREATWELL_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Calendar className="size-4" />
          {t("cta.bookNow")}
        </a>
      </Button>
    </div>
  </div>
</section>
```

**Step 2: Screenshot and verify**

Run: `node screenshot.mjs http://localhost:3000/en cta-banner`

**Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "style: sage green CTA banner with white button"
```

---

### Task 8: Final Full-Page Verification

**Step 1: Take full-page screenshot**

Run: `node screenshot.mjs http://localhost:3000/en final-restyle`

**Step 2: Check Greek locale too**

Run: `node screenshot.mjs http://localhost:3000/el final-restyle-el`

**Step 3: Run lint and type check**

```bash
pnpm lint
pnpm tsc --noEmit
```

Fix any errors found.

**Step 4: Final commit if any fixes**

```bash
git add -A
git commit -m "style: fix lint/type issues from restyle"
```
