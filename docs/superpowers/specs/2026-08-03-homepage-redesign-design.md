# DualTech Labs — World-Class Homepage Redesign
## Design Specification

**Date:** 2026-08-03
**Stack:** Next.js 14 · React Three Fiber · Three.js · Framer Motion · Tailwind CSS · TypeScript

---

## Non-Negotiable Requirements

1. Single page homepage + single contact page only
2. All IT services displayed — no previous work, no case studies, no client logos
3. Zero false stats or fabricated numbers anywhere
4. World-class creative design — not template, not AI-generated looking
5. Silky smooth UX — no lag, no stutter, 60fps scroll at all times
6. Colors and fonts that impress — genuinely distinctive visual identity
7. Every section creative and premium — no generic sections
8. Contact page: Email + WhatsApp only (both from .env)
9. Global SEO — ranks worldwide from any region
10. Core brand concept: "Idea to Reality" — runs through every section

---

## Visual Identity

### Color System
```
Background:        #050714  (near-black with subtle blue warmth)
Surface:           #0A0F1E  (dark navy)
Border default:    rgba(255,255,255,0.07)
Border hover:      rgba(124,58,237,0.4) → rgba(6,182,212,0.4)

Gradient primary:  linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)
Purple (idea):     #7C3AED
Cyan (reality):    #06B6D4
Purple glow:       rgba(124,58,237,0.15)
Cyan glow:         rgba(6,182,212,0.12)

Text primary:      #F8FAFC
Text secondary:    #CBD5E1
Text muted:        #64748B
```

### Typography
- **Display/Headlines:** Syne (700 weight) — geometric, distinctive, great at massive scale
- **Body:** Inter (400/500) — trusted, readable, clean
- **Scale:**
  - Hero H1: `clamp(3.5rem, 9vw, 7.5rem)`, tight tracking `-0.03em`
  - Section H2: `clamp(2rem, 4vw, 3.25rem)`
  - Card title: `1.125rem / 1.25rem`
  - Body: `1rem`, line-height `1.7`

### Animation Language
- Entrance: fade-up, `y: 40 → 0`, opacity `0 → 1`, duration `0.7s`, ease `[0.22, 1, 0.36, 1]`
- Stagger children: `0.08s` per item
- Hover transitions: `150–200ms` ease-out
- Scroll reveals: CSS `animation-timeline: view()` first, Framer Motion for sequences
- All easing: cubic-bezier fast-in slow-out — never linear
- `prefers-reduced-motion`: all motion disabled

---

## Page 1: Homepage

### Section 1 — HERO

**Purpose:** Communicate identity and brand concept in 3 seconds. Earn the first scroll.

**3D Canvas (R3F — lazy loaded after LCP):**
- Particle system: ~6000 particles on desktop, ~1800 on mobile
- Particles start scattered (representing raw ideas) and slowly self-organize into a subtle network/circuit pattern
- Purple particles left half, cyan right half, gradient glow where they meet
- Slow rotation + mouse parallax (disabled on touch)
- Performance: `frameloop="demand"`, `dpr={[1, 2]}`, `performance={{ min: 0.5 }}`
- Fallback: CSS radial gradient animation when WebGL unavailable

**Layout:**
```
[NAV — minimal, sticky]

[HERO SECTION — full viewport height]

  [Left — z:10, positioned over canvas]
    KICKER: "Design · Engineering · Worldwide"

    H1:
    Your idea
    deserves to be
    built right.
    ← "built" renders in purple→cyan gradient text

    BODY:
    We take your vision from concept to
    production-ready software — designed,
    engineered, and shipped with complete expertise.

    CTAs:
    [Start a Project →]  [See Our Services]
    (gradient fill)       (ghost)

  [Right — the 3D canvas fills the full section]

[SCROLL INDICATOR — animated chevron]
```

**Nav:** Logo left, "Contact Us" CTA right. No other links. Minimal. Sticky with `backdrop-blur` only on the nav bar (1 element = no GPU jank).

---

### Section 2 — SERVICES BENTO GRID

**Headline:** `Everything your product needs,` `under one roof.`
(second line in gradient)

**Sub:** `From the first line of code to the final deployment — we cover every layer of modern software.`

**Services (12 items in asymmetric bento grid):**

```css
/* Grid layout */
grid-template-columns: repeat(4, 1fr);
grid-template-rows: auto;

/* Hero card — spans 2 cols × 2 rows */
.card-hero    { grid-column: span 2; grid-row: span 2; }
/* Wide card — spans 2 cols */
.card-wide    { grid-column: span 2; }
/* Standard */
.card-std     { grid-column: span 1; }
```

**12 Services:**
1. **Custom Software Development** (hero card 2×2) — most critical, most searched
2. **AI & Intelligent Systems** (wide 2×1)
3. **Cloud & DevOps** (wide 2×1)
4. **Mobile Engineering** (standard)
5. **UI/UX Design** (standard)
6. **Web Platforms & Applications** (standard)
7. **Digital Transformation** (standard)
8. **Fintech & Payments** (standard)
9. **API Development & Integrations** (standard)
10. **Cybersecurity & Compliance** (standard)
11. **QA & Testing** (standard)
12. **IT Consulting** (standard)

**Card anatomy:**
- Glass surface: `background: rgba(255,255,255,0.03)`
- Border: `1px solid rgba(255,255,255,0.07)` → on hover: gradient border via pseudo-element
- Custom SVG icon (unique per service, thin-line style)
- Service name: Syne 600
- One-line descriptor: Inter 400, muted
- Hover: background shifts to `rgba(124,58,237,0.06)`, gradient border animates in, subtle glow
- All cards link to `/contact`

**Mobile:** 2-column grid, hero card full-width

---

### Section 3 — HOW IT WORKS

**Headline:** `From your idea to live software.`

**3 steps — horizontal on desktop, vertical on mobile:**

```
   01                    02                    03
IMAGINE              ENGINEER              LAUNCH
────────────────    ────────────────    ────────────────
You bring the       We architect,       Production-ready.
vision. We ask      design, and build   Yours to own,
the right           with precision      scale, and
questions.          and speed.          build upon.
```

**Visual treatment:**
- Step numbers: Syne 900, `clamp(6rem, 12vw, 10rem)`, rendered in gradient at ~5% opacity as a watermark behind the content
- Connecting lines between steps: SVG paths that animate (draw in) on scroll-into-view using Framer Motion `pathLength`
- Each step card: clean, no border, generous whitespace
- Subtle entrance stagger as section scrolls into view

---

### Section 4 — TECHNOLOGY STACK

**Headline:** `Built with the tools that power the world's best software.`

**Layout:** Glass card containing two infinite marquee rows — Row 1 scrolls left, Row 2 scrolls right. Pure CSS animation — no JS, compositor thread, guaranteed 60fps.

**Technologies (20 total across 2 rows):**
- Row 1: React · Next.js · TypeScript · Node.js · Python · AWS · Docker · PostgreSQL · React Native · Flutter
- Row 2: Kubernetes · Azure · GCP · MongoDB · TensorFlow · OpenAI · Stripe · GitHub · Figma · Vercel

Each logo: SVG, white/muted color, 32px height. Fade mask on left and right edges via CSS `mask-image: linear-gradient(...)`.

---

### Section 5 — WHY DUALTECHLABS

**Headline:** `What makes us the right partner for your project.`

**3 differentiator cards — full honest claims, no numbers:**

```
Card 1: "We own the entire build."
One team handles design, engineering, QA, and
deployment. No handoffs. No gaps in ownership.
No "that's not our part" moments.

Card 2: "Your code. Your IP. Always."
Full intellectual property transfer on delivery.
Clean documentation. Sensible architecture your
team can pick up and run with. Zero lock-in.

Card 3: "We stay until it actually works."
No disappearing act after go-live. We ship,
monitor, and stand behind everything we deliver.
Launch day is just the beginning.
```

**Card design:** Larger cards with more breathing room. Gradient left border (1px, purple→cyan). Icon at top (custom SVG). Title in Syne. Body in Inter muted. Subtle hover glow.

---

### Section 6 — CLOSING CTA

**Visual:** Full-bleed section. Background: radial gradient from center — `radial-gradient(ellipse at 50% 60%, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.1) 40%, transparent 70%)`. Creates a light source effect from behind the text.

**Headline:** `Have an idea?` (new line) `Let's build it together.`
"Let's build it" in gradient.

**Sub:** `Tell us what you're imagining. We'll tell you exactly how we'd build it — and we'll be honest if we're not the right fit.`

**CTAs (centered, side by side):**
- `Email Us` — gradient fill button
- `Chat on WhatsApp` — glass button with green tint

Both values from `.env` via `config/contact.ts` (already implemented).

---

### Footer

Minimal. One line:
`© 2025 DualTech Labs. All rights reserved.`

No nav links in footer. No social icons. Clean ending to a clean page.

---

## Page 2: Contact Page

**Philosophy:** One screen. Feels like the beginning of a relationship, not a form to fill.

**Layout — vertically centered in viewport:**

```
[Kicker: "Get in touch"]

[H1: "Let's talk about what you want to build."]

[Sub: "Two ways to reach us. We respond within 24 hours."]

[Two cards side by side]

┌────────────────────────────┐  ┌────────────────────────────┐
│                            │  │                            │
│  ✉  Email                 │  │  💬  WhatsApp              │
│                            │  │                            │
│  Send us a message with    │  │  Start a conversation and  │
│  your idea, project scope, │  │  get a response fast.      │
│  or just a question.       │  │  We're here.               │
│                            │  │                            │
│  [Send an Email →]         │  │  [Open WhatsApp →]         │
│                            │  │                            │
│  from NEXT_PUBLIC_CONTACT_ │  │  from NEXT_PUBLIC_WHATSAPP │
│  EMAIL env var             │  │  _PHONE env var            │
└────────────────────────────┘  └────────────────────────────┘
```

**Card design:**
- Email card: glass surface, gradient border purple→cyan
- WhatsApp card: glass surface, green tint border `rgba(16,185,129,0.4)`
- Both: large icon at top, descriptive copy, one CTA button
- Hover: card lifts slightly (`translateY(-4px)`), glow intensifies

**Background:** Same particle canvas as hero (already loaded) — lighter density, passive animation only.

---

## SEO Architecture

### Homepage Metadata
```tsx
title: "Custom Software Development & IT Services | DualTech Labs"
description: "DualTech Labs delivers custom software development, AI integration, cloud solutions, and digital transformation services worldwide. Your idea, built right."
keywords: ["IT services company", "custom software development", "AI development", "cloud services", "digital transformation", "software development company worldwide"]
canonical: "https://www.dualtechlabs.com"
```

### Structured Data (JSON-LD)
```json
{
  "@type": ["Organization", "ProfessionalService"],
  "name": "DualTech Labs",
  "areaServed": "Worldwide",
  "serviceType": [
    "Custom Software Development",
    "AI & Intelligent Systems",
    "Cloud & DevOps",
    "Mobile Engineering",
    "UI/UX Design",
    "Digital Transformation",
    "Fintech & Payments",
    "Web Platforms",
    "API Development",
    "Cybersecurity",
    "QA & Testing",
    "IT Consulting"
  ]
}
```

### FAQPage Schema (highest ROI in 2026)
Questions targeting global search intent for IT services.

### H-tag Architecture
- H1: "Custom Software Development & IT Services Company — DualTech Labs"
- H2 per section (keyword-rich, question format where possible)
- H3 per service card (service name = keyword)

---

## Performance Contracts

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |
| PageSpeed mobile | 85+ |
| PageSpeed desktop | 92+ |
| Scroll FPS | 60fps constant |

### Implementation rules
- Lenis smooth scroll (install `lenis`) — wraps entire app
- 3D canvas: `dynamic()` with `ssr: false` — loads after LCP
- No `backdrop-filter` on more than 1 element simultaneously
- All animations: `transform` + `opacity` only — never layout properties
- Mobile: 3D canvas replaced with CSS gradient animation
- `prefers-reduced-motion`: all motion halted, content still visible
- Font: preload via `<link rel="preload">` in layout

---

## Components to Build / Replace

### Remove entirely
- `portfolio-slider.tsx` — no portfolio
- `portfolio-grid.tsx` — no portfolio
- `portfolio-modern.tsx` — no portfolio
- `performance-monitor.tsx` — dev-only, remove from production

### Keep and evolve
- `hero-canvas.tsx` — redesign particle system with new colors
- `hero.tsx` — full redesign with new copy and layout
- `navbar.tsx` — simplify to logo + CTA only
- `seo-json-ld.tsx` — update with new schema
- `smooth-scroll.tsx` — replace with Lenis
- `whatsapp-float.tsx` — keep, update colors
- `config/contact.ts` — no changes needed (already .env driven)
- `config/site.ts` — no changes needed

### Build new
- `sections/Services.tsx` — bento grid of 12 services
- `sections/HowItWorks.tsx` — 3-step process
- `sections/TechStack.tsx` — dual marquee
- `sections/WhyUs.tsx` — 3 differentiator cards
- `sections/ClosingCTA.tsx` — final CTA section
- `ui/GradientText.tsx` — reusable gradient text component
- `ui/GlassCard.tsx` — reusable glass surface card
- `ui/Marquee.tsx` — CSS infinite marquee
- `ui/GradientBorder.tsx` — pseudo-element gradient border

---

## Files NOT to touch
- `config/contact.ts` — perfect as-is
- `app/robots.ts` — keep
- `app/sitemap.ts` — update URLs only
- `app/opengraph-image.tsx` — update copy only
- `tailwind.config.js` — extend with new colors
