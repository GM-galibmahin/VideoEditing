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
- Film grain overlay: fixed SVG noise at 5% opacity over the whole page.
- Section headers use fake timecodes as eyebrows (`00:01`, `00:02`, ...) — keep sequential if adding/removing sections.
- Border radius: 12–14px on cards/panels, 3–4px on tags/buttons.
- Demo thumbnails are CSS gradients (`t1`–`t6` classes) until real media replaces them.

---

## Signature Features (protect these)

1. **Timeline scrubber (bottom bar)** — Fixed 64px bar styled like an editing timeline with colored clips. A white playhead tracks scroll progress; timecode counts up as if the page is a 90-second video at 24fps. This is the site's most memorable element.
2. **3D tilt cards** — `.tilt` elements rotate in 3D following the mouse (`data-max` attribute controls max degrees). Applied to showreel player and all work cards.
3. **Before/After grade slider ("The Grade Room")** — Draggable comparison of real stills: `assets/grade-before.jpg` (flat log look) vs `assets/grade-after.jpg` (orange/teal grade), generated from the same photo. Swap these two files to feature stills from an actual client grade. Uses Pointer Events (works on touch). Clip-path based.
4. **Hero parallax frames** — Floating bordered "frames" with timecodes drift opposite to mouse movement (`data-depth` controls intensity). Hidden on mobile.
5. **Blinking REC dot** in hero eyebrow.

---

## Page Structure (in order)

1. **Nav** — fixed, logo `GALIB.EDITS`, links: Showreel / Shorts / Films / Services / Pricing / Contact
2. **Hero** — "I CUT / STORIES / IN MOTION" (line 2 is outlined stroke text, line 3 is orange→teal gradient text), sub-copy, two CTAs
3. **Showreel** (`#showreel`, tc 00:01) — large 16:9 demo player with play button, fake progress bar, DEMO tag
4. **Shorts & Reels** (`#work`, tc 00:02) — FOUR 9:16 vertical cards: Mojo Brand Story, Kinetic Lyrics Reel, Podcast Hook Clips, Street Food Series
5. **YouTube & Brand Films** (`#work-h`, tc 00:03) — THREE 16:9 horizontal cards: Product Launch Promo, Gaming Montage, Cinematic Travel Film
6. **The Grade Room** (`#grade`, tc 00:04) — before/after slider
7. **Services** (`#services`, tc 00:05) — 4 cards: Video Editing, Motion Graphics, Color Grading, Sound Design
8. **How I Work** (`#process`, tc 00:06) — 4-step strip: Brief → Rough Cut → Polish → Delivery
9. **Client Words** (`#testimonials`, tc 00:07) — 3 testimonial cards (currently placeholder coaching text — REPLACE with real client quotes)
10. **Packages** (`#pricing`, tc 00:08) — Short-Form $25/video, Creator Pack $200/10 videos (featured), Long-Form $80+/video. Prices are placeholder estimates — verify against market.
11. **About** (`#about`, tc 00:09) — bio, tools list (Premiere, AE, DaVinci, CapCut, Photoshop), 4 stat blocks
12. **Contact** (`#contact`, tc 00:10 — FINAL CUT) — email + social links (currently placeholder `#` hrefs)
13. **Footer** — "EDITED, NOT GENERATED."
14. **Scrubber bar** — fixed bottom (see signature features)

---

## JavaScript Behaviors

- `updateScrub()` — maps scroll progress to playhead position + timecode (24fps × 90s virtual timeline)
- `.tilt` mousemove handler — perspective rotation, resets on mouseleave
- Hero parallax — global mousemove moves `.float-frame` elements by `data-depth`
- Before/after slider — pointerdown/move/up on `#baWrap`, clamps 2%–98%, updates clip-path + handle position
- IntersectionObserver — `.reveal` elements fade/slide in at 12% visibility, unobserved after firing
- Lightbox player — clicking the showreel or any work card opens a modal that plays the YouTube link from the element's `data-video` attribute (accepts `watch?v=`, `youtu.be`, `shorts/`, `embed/` URLs; embeds via youtube-nocookie with autoplay). Empty `data-video` shows a "DEMO — VIDEO COMING SOON" placeholder. Shorts cards get a 9:16 modal. Closes via ✕ button, backdrop click, or Escape; the iframe is removed on close so playback stops
- **All motion respects `prefers-reduced-motion`** — tilt and parallax are skipped entirely; CSS kills animations/transitions

## Accessibility & Quality Floor

- Visible keyboard focus: 2px teal outline on links/buttons
- `prefers-reduced-motion` honored in both CSS and JS
- Responsive breakpoint at 820px: nav links hidden, single-column about, floating frames hidden, smaller scrubber
- Scrubber is `aria-hidden` (decorative)

---

## TODO / Roadmap

- [ ] Replace ALL demo placeholders with real video embeds (YouTube/Vimeo iframes or `<video>` tags)
- [ ] Replace testimonial placeholder text with real client quotes
- [ ] Set real email (currently `hello@galib.edits`) and social URLs (currently `#`)
- [ ] Verify/adjust package pricing for target market (Fiverr competition research)
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
