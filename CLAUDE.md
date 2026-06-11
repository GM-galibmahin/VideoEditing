# CLAUDE.md — Galib's Video Editor Portfolio

## Project Overview

A single-page portfolio website for **Galib**, a video editor and motion designer specializing in short-form content (YouTube Shorts/Reels) and long-form brand films. The site itself is designed to feel like a video editing suite — dark UI, timecodes, film grain, and a scroll-driven timeline scrubber.

**Current state:** Static site split into `index.html`, `css/style.css`, and `js/main.js` — no build step, no framework, deployable as-is to any static host (Vercel/Netlify/GitHub Pages). All video slots use demo placeholders (gradient thumbnails labeled "DEMO") until real footage is ready.

**Target audience:** Freelance clients — YouTube creators, brands, podcast hosts. Goal of the page: get visitors to watch the showreel, browse work, and contact/book.

---

## Design System (DO NOT change without explicit request)

### Colors
| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#0c0d11` | Page background |
| `--panel` | `#14161d` | Card backgrounds |
| `--panel-2` | `#1b1e27` | Elevated/hover surfaces |
| `--line` | `#262a36` | Borders, dividers |
| `--text` | `#e8eaf0` | Primary text |
| `--muted` | `#8b91a3` | Secondary text |
| `--orange` | `#ff6b2c` | Primary accent (CTAs, highlights, playhead timecode) |
| `--teal` | `#2dd6c1` | Secondary accent (links hover, labels) |

The orange/teal pairing is intentional — it references the classic "orange & teal" cinematic color grade. Keep this identity.

### Typography
| Role | Font | Notes |
|---|---|---|
| Display / headings | **Anton** | All-caps, used for h1/h2, big stat numbers |
| Body | **Space Grotesk** | Paragraphs, card titles, buttons |
| Utility / technical | **IBM Plex Mono** | Timecodes, labels, nav, eyebrows, tags |

Loaded via Google Fonts. Timecodes follow `HH:MM:SS:FF` format (24fps frames).

### Visual identity rules
- Dark editing-suite aesthetic throughout. Never introduce light mode without request.
- Film grain: fixed SVG noise at 5% opacity on the page BACKGROUND only (body::after, z-index:-1) — content renders clean above it.
- Section headers use fake timecodes as eyebrows (`00:01`, `00:02`, ...) — keep sequential if adding/removing sections.
- Border radius: 12–14px on cards/panels, 3–4px on tags/buttons.
- Card thumbnails are real YouTube stills (inline `background` styles, `oar2.jpg` portrait for Shorts / `hqdefault.jpg` for 16:9); the `t1`–`t6` gradient classes remain as loading/fallback backgrounds.

---

## Signature Features (protect these)

1. **Timeline scrubber (bottom bar)** — Fixed 64px bar styled like an editing timeline with colored clips. A white playhead tracks scroll progress; timecode counts up as if the page is a 90-second video at 24fps. This is the site's most memorable element.
2. **3D tilt cards** — `.tilt` elements rotate in 3D following the mouse (`data-max` attribute controls max degrees). Applied to showreel player and all work cards.
3. **Before/After grade slider ("The Grade Room")** — Draggable comparison of real stills: `assets/grade-before.jpg` (flat log look) vs `assets/grade-after.jpg` (orange/teal grade), generated from the same photo. Swap these two files to feature stills from an actual client grade. Uses Pointer Events (works on touch). Clip-path based.
4. **Hero parallax frames** — FOUR floating "frames" with timecodes drift opposite to mouse movement (`data-depth` controls intensity). Hidden on mobile. They live INSIDE `.hero-visual` (the photo-sized anchor box) and are positioned in % of it, so they hug the photo at every resolution — never position them relative to the hero section (full-bleed on wide screens = frames scatter). `ff1`/`ff2` float IN FRONT of the photo (z-index 3); `ff3` and `ffr` sit BEHIND it (z-index 1). `ffr` is a 9:16 "reels" frame peeking from behind the photo's right side. Each frame shows a RANDOM thumbnail pulled from the page's own `data-video` videos (JS at load: Shorts `oar2.jpg` for `ffr`, `hqdefault.jpg` for landscape frames, no repeats, dimmed via gradient) — refresh reshuffles.
5. **Hero photo** — Static cutout at `./assets/me.png` (`.hero-visual` anchor > `.hero-photo` wrapper > img; `.hero-visual` carries the position/height per tier and `aspect-ratio:653/1300` matching me.png), no card/border/label by request, but WITH a SUBTLE film-still grade: img gets `brightness(.94) saturate(.92) contrast(1.04)`; two pseudo-element gradient layers masked to the cutout's alpha (`mask:url(me.png)`) split-tone it — near-black teal via `mix-blend-mode:lighten` (tints shadows WITHOUT lifting them — brighter teal washes the image out, keep it dark) and pale warm orange via `darken` (warms only top highlights); `isolation:isolate` keeps blends inside the wrapper. If me.png is replaced, the mask follows automatically (same file). Sized by height (`min(72vh,640px)`, natural ratio), absolutely positioned center-right (`right:12%`) with a soft drop-shadow. The frames are positioned around it: `ff3` BEHIND the upper-left (z-index 1), `ff1` in front lower-right, `ff2` in front at waist-left — none may cover the face. The image never moves — only the frames parallax. On mobile (<820px) the photo is hidden entirely (display:none), same as the frames — the parallax composition only exists on desktop. `me.png` must be a TIGHT cutout (transparent padding trimmed — a padded canvas makes it render tiny); current source is 653×1300 trimmed from the original export.
5. **Blinking REC dot** in hero eyebrow.

---

## Page Structure (in order)

1. **Nav** — fixed, logo `GALIB.EDITS`, links: Showreel / Shorts / Films / Services / Contact
2. **Hero** — "I CUT / STORIES / IN MOTION" (line 2 is outlined stroke text, line 3 is orange→teal gradient text), sub-copy, two CTAs
3. **Showreel** (`#showreel`, tc 00:01) — large 16:9 demo player with play button, fake progress bar, DEMO tag
4. **Shorts & Reels** (`#work`, tc 00:02) — FOUR 9:16 vertical cards (real @CyclopsGM Shorts): Esports LAN Promo, Squad Wipe Clip, Stream Highlights, Street Food Vlog
5. **YouTube & Brand Films** (`#work-h`, tc 00:03) — THREE 16:9 horizontal cards (real @CyclopsGM videos): Headset Review — G435, Sniper Shots Montage, PUBG.EXE — Funny Moments
6. **The Grade Room** (`#grade`, tc 00:04) — before/after slider
7. **Services** (`#services`, tc 00:05) — 4 cards: Video Editing, Motion Graphics, Color Grading, Sound Design
8. **How I Work** (`#process`, tc 00:06) — 4-step strip: Brief → Rough Cut → Polish → Delivery
9. **Client Words** (`#testimonials`, tc 00:07) — auto-scrolling testimonial marquee (45s loop, pauses on hover/focus, edge fade mask; JS clones the `.testi-set` once for a seamless -50% loop; reduced-motion gets a static wrapped layout). Cards are placeholder coaching text — REPLACE with real client quotes
10. **About** (`#about`, tc 00:08) — bio, tools list (Premiere, AE, DaVinci, CapCut, Photoshop), 4 stat blocks
11. **Contact** (`#contact`, tc 00:09 — FINAL CUT) — email mahingalib65@gmail.com + socials (YouTube / Instagram / X / LinkedIn, open in new tab). No pricing on the site by design — quotes happen in private conversation.
12. **Footer** — "EDITED, NOT GENERATED."
13. **Scrubber bar** — fixed bottom (see signature features)

---

## JavaScript Behaviors

- `updateScrub()` — maps scroll progress to playhead position + timecode (24fps × 90s virtual timeline)
- `.tilt` mousemove handler — perspective rotation, resets on mouseleave
- Hero parallax — global mousemove moves `.float-frame` elements by `data-depth`
- Hero frame thumbnails — IIFE at load assigns each `.hero .float-frame` a random non-repeating thumbnail from the page's `data-video` URLs (`ffr` draws from Shorts, others from 16:9 videos); changes every refresh
- Before/after slider — pointerdown/move/up on `#baWrap`, clamps 2%–98%, updates clip-path + handle position
- IntersectionObserver — `.reveal` elements fade/slide in at 12% visibility, unobserved after firing
- Lightbox player — clicking the showreel or any work card opens a modal that plays the YouTube link from the element's `data-video` attribute (accepts `watch?v=`, `youtu.be`, `shorts/`, `embed/` URLs; embeds via youtube-nocookie with autoplay). Empty `data-video` shows a "DEMO — VIDEO COMING SOON" placeholder. Shorts cards get a 9:16 modal. Closes via ✕ button, backdrop click, or Escape; the iframe is removed on close so playback stops
- **All motion respects `prefers-reduced-motion`** — tilt and parallax are skipped entirely; CSS kills animations/transitions

## Accessibility & Quality Floor

- Visible keyboard focus: 2px teal outline on links/buttons
- `prefers-reduced-motion` honored in both CSS and JS
- Responsive tiers (all in `style.css` bottom): ≤380px flip/fold (smaller type, single-col stats, hidden sec-notes); ≤820px mobile (hamburger, single-col about, frames+photo hidden, smaller scrubber); 821–1180px tablet (smaller hero photo, `ff2` hidden to avoid headline collision); ≤560px height landscape guard (hero min-height auto); ≥1800px large screens scale via CSS `zoom` on body (`--z`: 1.15 at 1800, 1.4 at 2200, 1.7 at 2700, 2 at 3300) — hero/nav/scrubber scale fully, while `section,footer` get a GENTLER factor via nested counter-zoom `calc(var(--zs)/var(--z))` (`--zs`: 1.15/1.25/1.4/1.55) because full-zoom sections read as comically large; tune `--zs` per step if section size feels off. CRITICAL: the engine scales vw/vh lengths inside a zoomed body AGAIN, so every viewport-unit length in the ≥1800 block is written as `calc(Xvw/var(--z))` — any new vh/vw rule that should apply on big screens must do the same. Sections lose max-width (4vw/--z side padding, fluid fill); caps only for `.reel` (140vh/--z), `.ba-wrap`, `.about-wrap` 1700px text measure. When changing the hero, re-check the headline-vs-photo gap and CTA-above-scrubber at 1024, 1366, 1920×910, 2560 and 3840 (measure h1 span rects vs .hero-photo rect)
- Scrubber is `aria-hidden` (decorative)

---

## TODO / Roadmap

- [x] Replace ALL demo placeholders with real video embeds — all 8 slots now play real videos from Galib's channel (youtube.com/@CyclopsGM), with real YouTube thumbnails as card backgrounds (inline styles override the `t1`–`t6` gradient fallbacks)
- [ ] Replace testimonial placeholder text with real client quotes (scrolling marquee is built — just swap the card contents in the single `.testi-set`; the loop clone is automatic)
- [x] Set real email (mahingalib65@gmail.com) and social URLs (YouTube @CyclopsGM, Instagram @galibmahin, X @galib_mahin, LinkedIn /in/galibmahin)
- [x] Split into `index.html` / `css/style.css` / `js/main.js` when project grows
- [x] Add mobile hamburger menu (nav links currently hidden under 820px)
- [x] Deploy — live at https://galibmahin-edits.pages.dev/ on Cloudflare Pages (unlimited free bandwidth). Direct-upload project: deploys happen via `npx wrangler pages deploy <dir> --project-name galibmahin-edits`, NOT automatically on git push. Repo: GM-galibmahin/VideoEditing (GitHub Pages disabled to avoid a duplicate copy)
- [x] Add Open Graph meta tags + favicon before deploying (og:url/og:image point at the GitHub Pages URL — update if a custom domain is added)
- [x] Optional: real before/after stills from an actual grade in The Grade Room (photo with a real log-flatten + orange/teal grade applied; replace `assets/grade-before.jpg` / `grade-after.jpg` with client-work stills when available — same filenames, no code change)
- [x] Optional: lightbox/modal video player so clips play without leaving the page

## Conventions for Future Edits

- Structure: `index.html` (markup), `css/style.css` (all styles), `js/main.js` (all behavior) — no build step; keep it that way unless asked
- New sections must get the next sequential timecode eyebrow and a `.reveal` class
- New cards use existing `.card` + `.tilt` pattern with `data-max="10"` and a `data-video=""` attribute (paste a YouTube URL to make it playable in the lightbox)
- Vertical video = `card-thumb-v` (9:16), horizontal = default `card-thumb` (16:9)
- Copy style: confident, short, editor vocabulary (cuts, frames, grade, timecode). Sentence case body, mono uppercase labels.
- Never add light backgrounds, rounded "bubbly" styles, or generic SaaS-template looks
