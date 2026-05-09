# Lorven AI Studio — Audit Fix Plan

**Source audit:** `C:\Users\pc\.claude\plans\you-are-given-a-sparkling-hinton.md` (Phases 1–2, 76 findings)
**Status:** 0 / 76 fixed
**Last updated:** 2026-05-06

---

## User preferences (do not touch)

These items were reviewed and deferred per direct user instruction. Skip them when executing batches.

| # | Issue | Decision |
|---|---|---|
| **#56** | TiltCard `viewport={{ once: false }}` — reveal animation re-fires on every scroll past a card | **KEEP AS-IS.** User wants the existing "alive" replay behaviour. |

---

## Recommended execution order (cross-batch, by impact ÷ effort)

If you want the highest-leverage 10 fixes first, do these in order. They're a mix from all three batches.

| Order | # | Title | Severity | Effort | Visible? |
|---|---|---|---|---|---|
| 1 | #6 | Global reduced-motion CSS reset (kills 4 infinite animations for a11y users) | 🔴 | S | Reduced-motion users only |
| 2 | #7 | ClientEffects particle injection — reduced-motion gate | 🔴 | S | Reduced-motion users only |
| 3 | #70 | BackgroundNoise reduced-motion gate + interval 2 → 8 | 🔴 | S | Reduced-motion users only; slight grain change for everyone |
| 4 | #9 + #10 | `100vh` → `100dvh` site-wide; subtract banner height from hero | 🟡 | S | Mobile/iOS only — fixes a real bug |
| 5 | #46 | ProcessSection — `useReducedMotion()` gate | 🟡 | S | Reduced-motion users only |
| 6 | #47 | Compress `video1.mp4` + `video2.mp4` (18 MB → ~3 MB) | 🟡 | S | Faster Cine Sketch hover-play |
| 7 | #60 | HoverRevealButton → real `<button>` element | 🔴 | M | Identical look; keyboard/SR users gain access |
| 8 | #52–55 + #26 | Delete 5 dead components + uninstall their deps | 🟡 | S | Invisible |
| 9 | #1 | Switch to `next/font` for the 5 Google Fonts | 🟡 | M | Faster LCP, identical look |
| 10 | #22 + #68 | Wire the contact form (currently reloads with values in URL) | 🟡 | M | Functional — was broken |

---

## Batch 1 — Root layout, landing page, login, navbar, global CSS

### Critical (do these first)

- [ ] **#6** — Add a global `@media (prefers-reduced-motion: reduce)` block at the top of [styles.css](styles.css) that zeros animation-duration on `*, *::before, *::after`. Stops the four infinite CSS animations (`drift`, `border-rotate`, `slowPan`, `marquee`). **Effort: S. No visual change for normal users.**

- [ ] **#7** — In [app/ClientEffects.tsx:18-28](app/ClientEffects.tsx), wrap the 36-particle injection loop in `if (!matchMedia('(prefers-reduced-motion: reduce)').matches)`. **Effort: S.**

### Should fix

- [ ] **#1** — Replace external Google Fonts `<link>` in [app/layout.tsx:14-19](app/layout.tsx) with `next/font/google` for Bebas Neue, IBM Plex Mono, Inter Tight, Inter, Source Code Pro. Use `next/font/local` for `BebasNeue-Book.otf`. Apply CSS variables to `<html>`. **Effort: M.**

- [ ] **#4** — In [components/ui/mini-navbar.tsx:90](components/ui/mini-navbar.tsx), reduce IO `threshold` from 21 entries to `[0.25, 0.5, 0.75]`. Replace SectionSnap's 50ms Lenis polling ([app/SectionSnap.tsx:88-99](app/SectionSnap.tsx)) and AnimatedScroll's polling ([components/ui/animated-scroll.tsx:230+](components/ui/animated-scroll.tsx)) with a single `lenis-ready` event emitted from [app/SmoothScroll.tsx](app/SmoothScroll.tsx). **Effort: M.**

- [ ] **#5** — In [app/SectionSnap.tsx](app/SectionSnap.tsx), cancel pending snap on `pointerdown`/`touchstart`. For reduced-motion users, fall back to native CSS `scroll-snap-type: y proximity` on `<main>`. **Effort: M.**

- [ ] **#9 + #10** — Replace `100vh` with `100dvh` (with `100vh` fallback line preceding) in [styles.css:182-193](styles.css), [styles.css:332-338](styles.css), [styles.css:283-311](styles.css). Adjust hero `min-height` to `calc(100dvh - 32px)` to account for the banner at [app/page.tsx:25-32](app/page.tsx). **Effort: S.**

- [ ] **#11** — Convert `<img src="/images/login-hero.jpg">` in [app/login/page.tsx:46](app/login/page.tsx) to `next/image` with explicit `width`, `height`, `priority`. **Effort: S.**

- [ ] **#12** — Wire login form: add `required`/`aria-invalid` on inputs, add `onSubmit` handler with loading + error states ([app/login/page.tsx:74](app/login/page.tsx)). If still placeholder-stage, add a visible "preview only" badge instead. **Effort: M (placeholder) / L (real auth).**

- [ ] **#14** — Promote desktop nav breakpoint from `sm:` (640px) to `md:` (768px) in [components/ui/mini-navbar.tsx:214](components/ui/mini-navbar.tsx). **Verify visually at 640/700/768/820/900/1024 first.** **Effort: S.**

- [ ] **#15** — Mobile-menu a11y in [components/ui/mini-navbar.tsx:273-289](components/ui/mini-navbar.tsx): add `aria-expanded={isOpen}` on hamburger, `body { overflow: hidden }` on open, `Escape` to close, focus trap (or `react-focus-lock`). **Effort: M.**

- [ ] **#21** — Spline robot mobile cover risk in [styles.css:283-311](styles.css). **Verify visually at 360/414/768 first.** If overlapping, add `@media (max-width: 768px) { .hero-3d { display: none; } }`. **Effort: S.**

- [ ] **#22** — Wire contact form at [app/page.tsx:90-95](app/page.tsx): add `name`/`required` on inputs, `id`/`htmlFor` pairing, real `onSubmit` (server action or API route), submit-button loading + success/error states. **Effort: M (placeholder) / L (real backend).**

- [ ] **#24** — Move `framerusercontent.com` team headshots ([app/page.tsx:68-70](app/page.tsx)) into `/public/team/` and use `next/image`. Removes Framer-CDN dependency + privacy leak. **Effort: S + S.**

- [ ] **#25** — Audit `body { overflow-x: hidden }` ([styles.css:61](styles.css)) by removing it temporarily, walking 320/375/414/768/1024 px to find overflow culprits, fixing each (`max-width: 100vw; min-width: 0`), then reinstating overflow-x: hidden as defence-in-depth. **Effort: M. Do this LAST — fragile.**

### Nice-to-have

- [ ] **#2** — Add `<link rel="preload" href="/fonts/BebasNeue-Book.otf" as="font" type="font/otf" crossOrigin="" />` in [app/layout.tsx](app/layout.tsx). Or just let `next/font/local` (#1) handle it. **Effort: S.**

- [ ] **#3** — Add explicit `export const viewport: Viewport = { ... themeColor: '#0a0a0a', viewportFit: 'cover' }` to [app/layout.tsx](app/layout.tsx). **Effort: S.**

- [ ] **#8** — Mobile H1 wrap fix in [styles.css:209-217](styles.css): `@media (max-width: 480px) { .hero h1 { white-space: normal; font-size: clamp(42px, 14vw, 58px); letter-spacing: 0.06em; } }`. **Effort: S.**

- [ ] **#13** — Add `aria-pressed={mode === 'signup'}` and a tighter `aria-label` on login mode-toggle button ([app/login/page.tsx:126-142](app/login/page.tsx)). **Effort: S.**

- [ ] **#16** — Drop dead `inline-block` class in [components/ui/mini-navbar.tsx:18](components/ui/mini-navbar.tsx). **Effort: S.**

- [ ] **#17** — Define z-index scale variables in `:root` (`--z-banner: 40; --z-nav-overlay: 30; --z-nav: 20; --z-modal: 60`) and use them in [app/page.tsx:27](app/page.tsx) and [components/ui/mini-navbar.tsx:143-166](components/ui/mini-navbar.tsx). **Effort: S.**

- [ ] **#18** — Reconcile navbar radius transition: either `duration-300 ease-in-out` (smooth morph) or remove the transition class. Currently `duration-0` is a no-op ([components/ui/mini-navbar.tsx:171](components/ui/mini-navbar.tsx)). **Effort: S. Visible — will need taste call.**

- [ ] **#19** — Wrap navbar `measure` in `requestAnimationFrame` debounce or use `ResizeObserver` ([components/ui/mini-navbar.tsx:99-127](components/ui/mini-navbar.tsx)). **Effort: S.**

- [ ] **#20** — Reduce hero pointer-events micromanagement in [styles.css:313-330](styles.css). Move Spline interactive layer to a smaller hot zone, restore normal pointer-events on hero text so it's selectable. **Effort: M.**

- [ ] **#23** — Replace `<hr />` decorative dividers in [app/page.tsx:88](app/page.tsx) with semantic `<dl>` (description list) for label→value pairs. **Effort: S.**

---

## Batch 2 — Heavy scroll-driven sections

### Should fix

- [ ] **#26** — Decide PricingSection's fate ([components/ui/pricing-section.tsx](components/ui/pricing-section.tsx)). Currently never imported anywhere. **Either delete it OR wire it into [app/page.tsx](app/page.tsx).** **Effort: S.**

- [ ] **#27** — In [components/ui/zoom-parallax.tsx:43-51](components/ui/zoom-parallax.tsx), gate `<video autoPlay>` on `IntersectionObserver` and add `preload="metadata"`. **Effort: S.**

- [ ] **#34** — In [components/ui/service-steps-accordion.tsx:27-67](components/ui/service-steps-accordion.tsx), add `id` to panel `<div>` and `aria-controls` matching it on the `<button>`. **Effort: S.**

- [ ] **#38** — Migrate raw `<img>` tags in services-scroll fallbacks ([components/ui/services-scroll.tsx:122-152, 191-194](components/ui/services-scroll.tsx)) to `next/image` with `width`/`height`. **Effort: M.**

- [ ] **#42** — AnimatedScroll Lenis-polling consolidation (covered by #4). **Effort: S after #4.**

- [ ] **#43** — Change `style={{ height: \`${total * 100}vh\` }}` → `100dvh` in [components/ui/animated-scroll.tsx:343](components/ui/animated-scroll.tsx). **Effort: S.**

- [ ] **#44** — In [components/ui/animated-scroll.tsx:92](components/ui/animated-scroll.tsx), reduce `py-[10vh]` to `pt-[10vh] pb-[6vh]` (or `min-h-[80vh] flex items-start`). **Verify visually before merging — content position changes.** **Effort: S.**

- [ ] **#46** — Add `useReducedMotion()` gate in [components/ui/process-section.tsx](components/ui/process-section.tsx) — when true, render cards with `motionStyle = { opacity: 1, y: 0, scale: 1 }`. **Effort: S.**

- [ ] **#47** — Re-encode videos: `ffmpeg -i video1.mp4 -c:v libx264 -preset slow -crf 26 -vf scale=-2:720 -an public/video1.opt.mp4`. Replace files in `/public/` and add a poster image. **Effort: S.**

- [ ] **#48** — In [styles.css:2041](styles.css) (existing reduced-motion block), add `.product-stack-scene { position: static !important; }` so the sticky pinning is also disabled in reduced mode. **Effort: S.**

### Nice-to-have

- [ ] **#28** — Refactor ZoomParallax inline ternary className into a typed `POSITIONS` config array. Drop `!important` chain. ([components/ui/zoom-parallax.tsx:40](components/ui/zoom-parallax.tsx)) **Effort: M.**

- [ ] **#29** — Optionally add `style={{ willChange: 'transform' }}` to ZoomParallax motion divs while in viewport. **Effort: S.**

- [ ] **#30** — Document the wrap-around in `scales` array ([components/ui/zoom-parallax.tsx:28](components/ui/zoom-parallax.tsx)) or declare 8 distinct entries. **Effort: S.**

- [ ] **#31** — Use `ResizeObserver` instead of resize listener in [components/ui/pricing-section.tsx:39-58](components/ui/pricing-section.tsx). **Skip if #26 = delete.**

- [ ] **#32** — Initialize PricingSection indicator with `visible: false`. **Skip if #26 = delete.**

- [ ] **#33** — Extract `<GlassPanel>` and `<SlidingIndicator>` primitives into `components/ui/glass.tsx`. Used in navbar, pricing, button-5, liquid-glass. **Effort: M.**

- [ ] **#35** — Add Up/Down/Home/End keyboard navigation to ServiceStepsAccordion. **Effort: S.**

- [ ] **#36** — Replace inline `style={{ fontFamily: '"IBM Plex Mono"' }}` (in [service-steps-accordion.tsx:62](components/ui/service-steps-accordion.tsx) and [process-section.tsx:132](components/ui/process-section.tsx)) with a CSS class `.font-mono-plex`. **Effort: S.**

- [ ] **#37** — `border-white/12` → `/10` or explicit `[rgb(255_255_255/_0.12)]` in [components/ui/service-steps-accordion.tsx:25](components/ui/service-steps-accordion.tsx). **Effort: S.**

- [ ] **#40** — Add `loading="lazy"` consistently across services-scroll fallback images. **Effort: S.**

- [ ] **#41** — Move `SERVICES` and `PARALLAX_IMAGES` constants from [services-scroll.tsx](components/ui/services-scroll.tsx) into a server module `services-data.ts`. **Effort: M.**

- [ ] **#45** — Memoize ProcessSection `RANGES` → springs mapping at section level. **Effort: M. Marginal perf gain.**

- [ ] **#49** — In ProductsScrollSection's HoverVideoTile, gate `play()` on `loadedmetadata` event ([components/products/ProductsScrollSection.tsx:176-179](components/products/ProductsScrollSection.tsx)). **Effort: S.**

- [ ] **#50** — `h-50` → `h-52` (or `h-[12.5rem]`) in [components/ui/footer-section.tsx:90](components/ui/footer-section.tsx). **Effort: S. Logo grows 8px taller — verify visually.**

- [ ] **#51** — Reduce ProcessSection card `<h3>` visual weight or treat as labels ([components/ui/process-section.tsx:127-129](components/ui/process-section.tsx)). **Effort: S. Visible — get user OK.**

---

## Batch 3 — Cards, buttons, decorative components

### Critical

- [x] ~~**#56** — TiltCard `once: true`~~ → **SKIPPED. User preference: keep `once: false` (replay on scroll-back).**

- [ ] **#60** — In [components/ui/button-5.tsx:13](components/ui/button-5.tsx), change wrapper `<div>` to `<button type="button" aria-label={label}>`. Update three call sites in [app/page.tsx:48,56,80](app/page.tsx) — wrap with `<a>` carefully (no nested interactive). **Effort: M.**

- [ ] **#70** — In [components/ui/background-noise.tsx](components/ui/background-noise.tsx): (a) reduced-motion gate at top of the effect, (b) bump `patternRefreshInterval` default 2 → 8, (c) IntersectionObserver gate, (d) reduce canvas to 256×256. **Effort: S.**

### Should fix

- [ ] **#52** — Delete [components/ui/button.tsx](components/ui/button.tsx). **Effort: S.**

- [ ] **#53** — Delete [components/ui/liquid-glass.tsx](components/ui/liquid-glass.tsx). **Effort: S.**

- [ ] **#54** — Delete [components/ui/bauhaus-card.tsx](components/ui/bauhaus-card.tsx). **Effort: S.**

- [ ] **#55** — Delete [components/ui/chronicle-button.tsx](components/ui/chronicle-button.tsx) (only used by dead BauhausCard). **Effort: S.**

- [ ] **After #52–55** — Run `npm uninstall @radix-ui/react-slot class-variance-authority`. **Effort: S.**

- [ ] **#57** — Add `useReducedMotion()` gate in [components/ui/tilt-card.tsx](components/ui/tilt-card.tsx); short-circuit `handleMouseMove` and skip the rotation animation when reduced. **Effort: S.**

- [ ] **#58** — Change stagger from `delay: index * 0.25` to `delay: Math.min(index * 0.08, 0.3)` in [components/ui/tilt-card.tsx:42](components/ui/tilt-card.tsx). **Effort: S. Snappier reveal — verify with user.**

- [ ] **#63** — Wrap `@paper-design/shaders` import with `next/dynamic`: `const ShaderMount = dynamic(() => import('@paper-design/shaders').then(m => m.ShaderMount), { ssr: false })` in [components/ui/liquid-metal-button.tsx:3](components/ui/liquid-metal-button.tsx). **Effort: M.**

- [ ] **#66** — Move the visible label `<span>` *inside* the `<button>` element in LiquidMetalButton ([components/ui/liquid-metal-button.tsx:226→319](components/ui/liquid-metal-button.tsx)). Decoration layers stay outside with `aria-hidden="true"`. **Effort: M.**

- [ ] **#67** — Add reduced-motion gate to LiquidMetalButton's shader init ([components/ui/liquid-metal-button.tsx:81-107](components/ui/liquid-metal-button.tsx)) — render a static gradient when reduced. **Effort: M.**

- [ ] **#68** — Add `type?: 'button' | 'submit'` prop to LiquidMetalButton. Pass `type="submit"` from the contact form ([app/page.tsx:95](app/page.tsx)). Pairs with #22. **Effort: S.**

- [ ] **#69** — Convert SplineRobot import to `next/dynamic` with `ssr: false`. Add reduced-motion early-return. Wire `onError` for fallback ([components/ui/spline-robot.tsx](components/ui/spline-robot.tsx)). **Effort: M.**

- [ ] **#74** — Move runtime `<style>` injection out of [chronicle-button.tsx:122-130](components/ui/chronicle-button.tsx), [bauhaus-card.tsx:131-139](components/ui/bauhaus-card.tsx), [liquid-metal-button.tsx:53-79](components/ui/liquid-metal-button.tsx) into [styles.css](styles.css). **Skip chronicle/bauhaus if #54/#55 = delete.** **Effort: S.**

### Nice-to-have

- [ ] **#59** — TiltCard touch handling: early-return from `handleMouseMove` if `matchMedia('(hover: none)').matches`. Add `onPointerLeave` for redundancy. ([components/ui/tilt-card.tsx](components/ui/tilt-card.tsx)) **Effort: S.**

- [ ] **#61** — `w-25` → `w-24` (or `w-[6.25rem]`) in [components/ui/button-5.tsx:11](components/ui/button-5.tsx). **Effort: S. 4px width change — verify if noticeable.**

- [ ] **#62** — HoverRevealButton glass primitive use (covered by #33). **Effort: S after #33.**

- [ ] **#64** — Drop `[v0]` prefix from `console.error` in [components/ui/liquid-metal-button.tsx:105](components/ui/liquid-metal-button.tsx). **Effort: S.**

- [ ] **#65** — Replace `useRef<any>` with proper type in [components/ui/liquid-metal-button.tsx:25-26](components/ui/liquid-metal-button.tsx). **Effort: S.**

- [ ] **#71** — BackgroundNoise canvas size 100vh → 100dvh ([components/ui/background-noise.tsx:36-39](components/ui/background-noise.tsx)). Or use `width: 100%; height: 100%`. **Effort: S.**

- [ ] **#72** — Trim duplicate whitespace in [components/ui/vignette-grid-background.tsx:23-26](components/ui/vignette-grid-background.tsx). **Effort: S.**

- [ ] **#73** — Footer `h-50` → `h-52` (already covered by #50). **Effort: S.**

- [ ] **#75** — Add `className` and `size` props to AuthIcons ([components/ui/auth-icons.tsx](components/ui/auth-icons.tsx)). **Effort: S.**

- [ ] **#76** — Add `aria-hidden="true"` to EyeIcon and EyeOffIcon SVGs ([components/ui/auth-icons.tsx:53-71](components/ui/auth-icons.tsx)). **Effort: S.**

---

## Items needing visual verification before merging

These items were called out as "verify before approving" in the audit. Don't merge without screenshots / approval:

- [ ] **#14** — Navbar at 640/700/768/820/900/1024 px (does inline nav wrap before fix?)
- [ ] **#21** — Hero Spline robot at 360/414/768 px (does it cover H1/CTA?)
- [ ] **#25** — Removing `body { overflow-x: hidden }` reveals overflow culprits at 320/375/414/768/1024 px
- [ ] **#44** — AnimatedScroll content position in sticky panel after padding reduction
- [ ] **#50** — Footer logo height after `h-50` → `h-52` (8 px taller)
- [ ] **#51** — ProcessSection card heading visual weight after reduction
- [ ] **#58** — TiltCard 4th-card timing after stagger cap (snappier reveal)
- [ ] **#61** — HoverRevealButton small variant after `w-25` → `w-24` (4 px narrower)
- [ ] **#18** — Navbar radius transition (smooth vs instant) — taste call

---

## Severity totals

| Severity | Count | Of which |
|---|---|---|
| 🔴 Critical | 7 | a11y issues, primary CTA, perpetual animations |
| 🟡 Should fix | 28 | iOS bugs, broken forms, unwired components, dead code, perf debt |
| 🟢 Nice-to-have | 41 | cosmetics, code quality, micro-perf |
| **Total** | **76** | |
| **User-skipped** | **1** | #56 |

---

## How to use this file

1. Pick a batch (or pick from the cross-batch top 10).
2. Within a batch, do 🔴 first, then 🟡, then 🟢 if time allows.
3. Tick the checkbox `[x]` and update the **Status** counter at the top when each item is fixed.
4. For items in the visual-verification list, screenshot before/after and confirm with the user before checking.
5. Run `npx tsc --noEmit -p tsconfig.json` after each batch to catch type regressions.
6. Run `npm run dev` and walk the page mentally at 320 / 768 / 1280 px viewport widths.
