# Careers Page — Change Log

A running record of everything that was changed on the `/careers` route. Scoped strictly to careers — no other pages or shared components were modified unless noted.

## Files touched

- `app/careers/page.tsx` — page layout, sections, state, animations
- `app/careers/jobs.ts` — job data model, filter values, jobs list
- `styles.css` — all `.careers-*` rules (the page is unstyled by Tailwind, lives in plain CSS)

---

## 1. Page-level layout & footer

- Page root is `<main className="careers-page">` inside the careers route.
- A `careers-route` class is added to `<body>` on mount (and removed on unmount) so the body becomes a flex column with `min-height: 100vh`. `main.careers-page` has `flex: 1 0 auto`. Together this gives a **sticky footer**: when content is shorter than the viewport, the `<Footer />` snaps to the bottom; when content is taller, it scrolls naturally.
- Backgrounds (`BackgroundNoise`, `GridVignetteBackground`, `.ambient`) are all `position: fixed`, so the body becoming a flex column doesn't affect them.

## 2. Top-of-page hero/callout

A single full-width section under the (now-removed) navbar containing:

1. **Headline** — `Join Our Team And / Build The Future Together`. "Build The Future Together" is tinted with `--blue` (`#70befa`).
2. **Tagline** — Lorven AI Studio one-liner, centered, `--muted` color, max 64ch.
3. **Rotating role line** — `[Role] wanted. The future, yours to build.` on a single line.

### Rotating role mechanic
- `ROLES` array: Front-end engineers, Back-end engineers, ML engineers, Prompt engineers, Deployment engineers, AI researchers.
- `roleIndex` state cycles every **2.4s** via `setInterval`.
- Word swaps with Framer Motion `AnimatePresence mode="wait"` — blur + slide transition.
- `prefers-reduced-motion` (via `useReducedMotion`) skips the auto-cycle.
- The role text uses a 3-stop blue **gradient** via `background-clip: text` (`#84d8ff → #4fa9e8 → #cfeeff`) so it visually stands apart from the brand-blue accent on "Build The Future Together".

### Section background
- Same treatment as the site footer: `radial-gradient(55% 260px at 50% 0%, rgba(112,190,250,0.26), transparent)` halo from top-center, hairline `#222` top/bottom borders, and a small blurred blue line accent at the very top edge.
- Edge-to-edge full viewport width — lives **outside** `.careers-page` max-width so it spans the whole device width.

## 3. Three-column grid below the callout

`.careers-page` is a CSS Grid:

```
grid-template-columns: clamp(260px, 22vw, 360px) minmax(0, 1fr) clamp(300px, 24vw, 400px);
grid-template-areas: "aside positions values";
column-gap: clamp(32px, 3vw, 64px);
padding: 56px clamp(16px, 2vw, 48px) 80px;
```

- **Aside (left)**: Our Perks reel + Company info card. `position: sticky; top: 96px` so it stays in view while the jobs list scrolls.
- **Positions (center)**: takes the flexible `1fr` so the search/filter/jobs list extends across the bulk of the page.
- **Values (right)**: scales between 300–400px on wide screens.

Below 1024px the grid collapses to a single column ordered: positions → aside → values.

`max-width` was removed from `.careers-page` so the grid uses the **full viewport width** with small `clamp(16px, 2vw, 48px)` side padding (no big empty gutters on ultrawide).

## 4. Aside — Our Perks (left rail)

Vertical "film-reel" scrolling card.

- Glass card, ~460px tall, white inner highlights, soft shadow.
- **Sprockets** on both edges via `repeating-linear-gradient` to evoke a film strip.
- Inner track auto-scrolls **bottom → top** with a `@keyframes careers-perks-scroll` (`translateY(0)` → `translateY(-50%)`, 22s linear, infinite).
- The track contains **two duplicate copies** of the perks list so the loop is seamless. Second copy is `aria-hidden`.
- Top/bottom **fade mask** (`mask-image: linear-gradient(...)`) so perks gently appear/dissolve at the edges.
- `prefers-reduced-motion` pauses the scroll.

5 perks (each with a Lucide icon in a brand-blue tinted square):

| Icon | Title |
| --- | --- |
| `Coins` | Competitive Salary & Equity |
| `HeartPulse` | Comprehensive Health Coverage |
| `GraduationCap` | Learning & Growth Budget |
| `Clock` | Flexible Work Hours |
| `Sparkles` | Annual Studio Retreat |

## 5. Aside — Company info card (below perks)

Same glass treatment as the perks reel.

- **Team**: `32 people` (with `Users2` icon)
- **Studio**: `Road No. 5, Jubilee Hills, Hyderabad` (with `MapPin` icon)
- Eyebrow label uses uppercase, tracking-wide, `--muted`.

## 6. Center column — Open positions

Existing search + filter + grouped jobs list, made wider by the new grid layout.

### Filter bar
- **Search** input (filters by role title)
- **Departments** select (existing)
- **Locations** select (existing)
- **Experience** select **(new)** — values `Entry / Mid / Senior / Lead`

State: `const [experience, setExperience] = useState("All experience")`. Wired into the existing `useMemo` filter alongside department/location/search.

### Jobs data (`app/careers/jobs.ts`)
- Added `experience: string` field to the `Job` type.
- Added `experiences = ["Entry", "Mid", "Senior", "Lead"]` exported alongside `departments` and `locations`.
- Two roles now ship:
  1. **Senior AI / ML Engineer** — Engineering, Hyderabad, Full Time, On-Site, **Senior**
  2. **Deployment Engineer** *(new)* — Engineering, Hyderabad, Full Time, On-Site, **Mid** (2+ years experience). Full responsibilities/skills/offers tailored to MLOps/SRE.

### Job card
- Glass cards with rounded corners + accordion expand on click.
- Expanded panel shows About / Key Responsibilities / Required Skills / What We Offer + an **Apply for this role** CTA that links to `/careers/[slug]`.
- The `Apply` CTA is a glass pill with a hover swap (label slides up, blue underlay reveals).

## 7. Right column — Our Values

- Centered eyebrow `OUR VALUES` + heading `What Drives Us For Success` + supporting paragraph.
- Vertical stack of **expandable accordion cards** (single-select, first one open by default).
- Each card has: icon (in tinted square) + title + `+ / ×` toggle. Click to expand a height-animated reveal containing a divider line and the description.
- 5 values:
  1. Customer Centricity (`Users`)
  2. Deliver Excellence (`Award`)
  3. Iterate, Iterate, Iterate (`Repeat`)
  4. Act Like an Owner (`Crown`)
  5. Be Empathetic (`Heart`)

## 8. Navbar removed; logo + login kept

The shared `<Navbar />` is **no longer rendered** on the careers page (only). The shared component itself is unchanged — every other route still uses it normally.

Two tiny replacements were added so users can still get out of the page:

- **Lorven logo** — fixed at `top: 20px; left: 24px`, links to `/`. Uses the same `/logo-new.png` asset and 140×44 sizing as the navbar. Subtle hover (slight lift + opacity).
- **LOG-IN** — fixed at `top: 32px; right: 24px`, links to `/login`. Replicates the navbar's hover behavior: a two-line track that slides up on hover so the brighter copy slides in. Uppercase, `0.12em` tracking, 13px.

Class names are scoped: `.careers-home-link` and `.careers-login-link`.

## 9. Misc UX/animation details

- All entrance animations use `framer-motion` with `whileInView` + a small blur+slide; all of them respect `useReducedMotion`.
- `setExpandedValue(VALUES[0].id)` initializes the first value card open by default.
- `setExpandedId` controls the open job card; only one open at a time.
- `useEffect` on mount sets `--strip-offset: 0px` on `:root` (and restores the previous value on unmount) so any page-level offsets that depend on it don't apply here.

---

## Quick reference — key class names

| Selector | Purpose |
| --- | --- |
| `body.careers-route` | Sticky footer wrapper |
| `.careers-page` | Main 3-column grid container |
| `.careers-callout` | Full-width hero (headline + tagline + rotating role) |
| `.careers-callout__role` | Rotating role with blue gradient text |
| `.careers-aside` | Sticky left rail (perks + company) |
| `.careers-perks` / `.careers-perks__reel` | Film-reel perks card |
| `.careers-perks__sprockets` | Faux film perforations |
| `.careers-company` | Company info card |
| `.careers-positions` | Center column: header + toolbar + jobs list |
| `.careers-toolbar` / `.careers-search` / `.careers-select` | Filter UI |
| `.careers-job-card` | Expandable job card |
| `.careers-apply-cta` | Glass `Apply for this role` button |
| `.careers-values` / `.careers-values__card` | Right column: values accordion |
| `.careers-home-link` | Fixed top-left Lorven logo (replaces navbar logo) |
| `.careers-login-link` | Fixed top-right LOG-IN link (replaces navbar login) |
