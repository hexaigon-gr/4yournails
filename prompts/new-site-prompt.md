# New Site Prompt

Paste this into a Claude Code session to build a brand-new website from scratch in this Next.js stack.

---

## Usage

Replace the placeholders below, then paste everything after the line into Claude Code.

- `4 your nails` — The business name
- `https://share.google/yusYmtfoFCgxnbiTB` — Google Maps link to the business (for photos & reviews)
- `<LOGO_PATH>` — Path to the logo file (e.g., `public/images/logo.png`)
- `<SITE_DESCRIPTION>` — One-sentence description of the business (e.g., "Nail salon in Athens, Greece")
- `<PAGES>` _(optional)_ — Comma-separated list of pages you want (e.g., "Home, Services, Gallery, Contact"). If omitted, I'll suggest pages based on the business type.

---

## Prompt

I want you to build a brand-new website for **4 your nails** (<SITE_DESCRIPTION>) in this Next.js project.

The logo is at: `<LOGO_PATH>`

Follow CLAUDE.md and tasks/lessons.md for all conventions, code style, and component usage.

### Phase 1: Research & Brand Discovery

Before writing any code, gather everything we need to understand the brand:

1. **Analyze the logo** — Read the logo file. Extract the dominant colors (primary, secondary, accent). Note the style (modern, classic, playful, minimal, etc.). This will drive the entire color palette.
2. **Scrape Google Maps photos** — Use WebFetch on `https://share.google/yusYmtfoFCgxnbiTB` to find the business listing. Extract all available Google Photos URLs from the listing. Download each photo using curl and save to `public/images/google/`. Use descriptive filenames based on what the photo shows (e.g., `interior-seating.jpg`, `staff-working.jpg`, `storefront.jpg`, not `photo1.jpg`).
3. **Scrape Google reviews** — From the same Google Maps page, extract customer reviews. Capture: reviewer name, star rating, review text, and date. Save the top 10-15 most useful reviews (longest, most descriptive, highest rated) to `tasks/reviews.md`.
4. **Search for additional context** — Use WebSearch to find any social media profiles, directory listings, or mentions of the business. Note any additional brand voice, taglines, or positioning found.
5. **Document findings** — Write a brand brief to `tasks/brand-brief.md` covering:
   - Logo colors (exact hex values extracted)
   - Brand personality (derived from logo style, photos, review language)
   - Customer sentiment themes (what people praise most in reviews)
   - Photo inventory (list of all downloaded images with descriptions)
   - Competitive positioning notes

Do NOT proceed to design until the research is complete and I've reviewed the brand brief.

### Phase 2: Brand Design System

Build the design system before any pages:

1. **Color palette** — Based on the logo analysis, define:
   - Primary color (from logo)
   - Secondary color (from logo or complementary)
   - Accent color (for CTAs and highlights)
   - Neutral scale (grays that harmonize with the primary)
   - Semantic colors (success, warning, error, info)
   - Map all colors to CSS variables in `app/globals.css` using the existing light/dark mode structure
2. **Typography** — Choose a Google Font pairing that matches the brand personality. One for headings, one for body (or a single versatile family). Configure in the Next.js layout.
3. **Component tokens** — Update shadcn/ui CSS variables so all components automatically use the new palette. Ensure both light and dark themes work.
4. **Present the system** — Show me the color palette, font choices, and sample component previews. Get my approval before building pages.

### Phase 3: Content & Site Architecture

Plan the site structure:

1. **Define pages** — Based on the business type and gathered content, propose a sitemap. For each page, outline:
   - Purpose and goal (what should the visitor do?)
   - Sections in order
   - Content source (reviews, photos, custom copy)
   - Key SEO keywords
2. **Write copy** — Draft all text content. Use the brand voice derived from reviews and business context. Include:
   - Headlines and subheadings
   - Body text for each section
   - CTAs (clear, action-oriented)
   - Meta titles and descriptions for each page
   - Both `en` and `el` translations in the messages files
3. **Plan image usage** — Assign downloaded Google photos to specific sections. Identify any gaps where placeholder images or icons are needed.
4. **Present the plan** — Show me the full content plan page by page. Get my approval.

### Phase 4: Build

Implement page by page, section by section:

1. **One page at a time** — Start with the homepage, then inner pages.
2. **One section at a time** — Build each section (hero, services, testimonials, gallery, contact, footer, etc.) individually.
3. **Screenshot after each section** — Follow the Auto-Verification Rule in CLAUDE.md. After completing each section, take a screenshot, read the PNG, and verify it looks correct before moving on.
4. **Use the project stack** — shadcn/ui components, Tailwind CSS with semantic colors, Lucide icons, Next.js Image for all images, next-intl for all text content.
5. **All images from public/images/** — Reference locally saved images only. Never hotlink to external sources.
6. **Responsive** — Every section must look good on desktop (1280px+). Mobile is a bonus but not required unless I ask.
7. **Reviews as social proof** — Use the scraped Google reviews in a testimonials section. Display reviewer name, star rating, and review text. Style them to feel authentic, not templated.

### Phase 5: SEO & Polish

After all pages are built:

1. **Meta tags** — Ensure every page has unique title, description, and OG tags.
2. **Structured data** — Add JSON-LD for LocalBusiness schema (name, address, phone, hours, reviews).
3. **Image optimization** — All images use Next.js Image with proper width/height/alt attributes. No layout shift.
4. **Accessibility** — Proper heading hierarchy, landmark elements, color contrast, focus states.
5. **Performance check** — No unnecessary `"use client"` directives. Prefer Server Components everywhere possible.
6. **Final lint** — Run `pnpm lint` and `pnpm tsc --noEmit`. Fix all errors.

### Quality Bar

- Would a professional designer approve this? If not, iterate.
- Does it feel like a real, hand-crafted site — NOT an AI-generated template?
- Does the color palette feel cohesive and intentional, clearly derived from the brand?
- Are the Google reviews integrated naturally, adding trust without feeling forced?
- Is the HTML semantic? Proper heading levels, landmark elements, alt text on every image.
- Does it load fast? No unnecessary client components, no layout shift.
- Run `pnpm lint` and `pnpm tsc --noEmit` after completing each page. Fix all errors.
