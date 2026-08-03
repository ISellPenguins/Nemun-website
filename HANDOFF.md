# NEMUN 2027 Website — Handoff Document

> Generated from a grill-me session on 2026-08-02. Read this first, then pick up from the priorities below.

## Context

- **Project:** NEMUN 2027 conference website, built for NEHS's annual Model United Nations conference.
- **Audience:** High-school students nationwide in Taiwan. Not for budget/internal use — a real public-facing conference site.
- **Phase:** Prototype. Conference details (dates, theme, committees, registration flow, prices) will be decided by the team later. Placeholder content is currently **fine by design**.
- **First gate:** The club president will review the prototype. Their current feedback is "it's good, keep working" — a zero-information signal, so the team must self-direct against a defined north star (below).
- **Repo:** `/Users/albertlin/Desktop/Nemun website/` — vanilla HTML5 + CSS, no framework, no JS, no build system. Single git commit on `main`.

## Reference

- **2026 site (template):** https://www.nemun.org — a Wix "classic" (fixed 980px, non-responsive) build. Design extracted: cream `#FBFAF8` + navy `#283953`/`#232D49` palette; paid serif fonts (Ogg headline, Adobe Caslon headings, Inknut Antiqua logo, Questrial body); dark navy header `rgb(5,11,30)`; section background rhythm (white hero → cream about → navy quote → warm-cream timeline → light-blue theme intro → cream secretariats → navy footer); eyebrow → serif headline → italic tagline hero pattern ("HSINCHU | 6-7, JUNE | NEHS" / "NEMUN 2026" / "Be a voice, not an echo."); 3 committee cards (GA3 / UNDP / UNSC); Google Map in footer; scroll fade-in/float-in animations.

## Decisions Made (from the grilling)

1. **Identity:** Elegant academic — same soul as the 2026 site, but clearly a new era. (The user initially said "modern" but clarified this was a misunderstanding; "modern/sleek/startup" is explicitly **not** the target.)
2. **Preserve from 2026:** The navy blue palette and the logo/header treatment.
3. **Change from 2026:** (a) The nav font doesn't fit the elegant vibe — fix it. (b) The 2026 site lacks animation/microinteractions — the new site needs them.
4. **Motion direction (confirmed):** Subtle and restrained — slow fade-ins as sections scroll into view, gentle hover lifts on cards, smooth anchor scrolling. No bouncy/startup-style animation. Fits the elegant academic identity and the president's taste.
5. **Differentiators vs 2026:** Responsive layout (2026 is fixed 980px / bad on mobile), cohesive design system, tasteful motion.

## North Star

The prototype succeeds when the president says:
1. "The whole thing feels cohesive, like one designed system — not five pages that happen to share a nav bar."
2. "I actually felt the conference when I scrolled it — the mood, the weight."

## Current Code State (known issues)

- **No design system:** 9 CSS files (`menu.css`, `hero.css`, `footer.css`, `content-section.css`, `team.css`, `registration.css`, `secretariets.css`, `page-header.css`, `global-layout.css`). Navy `#1c2942` hardcoded ~20 times; no CSS variables; Google Fonts `@import` duplicated across 5 files; type stack mixes Georgia, Times New Roman, Poppins, Montserrat.
- **Broken links/404s:** `theme-introduction.html` and `team.html` are referenced but don't exist; nav "Meet the team" → `team.html` (missing), nav "Theme introduction" → `theme-introduction.html` (missing). Team photos reference `images/team-placeholder.jpg` but no `images/` folder exists.
- **Dead/orphaned file:** `secretariets.css` (typo filename) is unused; `secretariats.html` links `team.css` instead.
- **Duplication:** nav bar and footer copy-pasted into all 4 pages (`main.html`, `registration.html`, `secretariats.html`, `team-subpage.html`).
- **Wrong title:** `registration.html` `<title>` says "Secretariats".
- **Placeholder content:** lorem ipsum, "bruhbruhbruh", fake email `nemun@example.com`, dead `href="#"` links — acceptable at prototype stage.
- **No mobile nav:** menu never collapses; `@media` rules only in `team.css` / `page-header.css`.
- **Paid-font gap:** 2026 used paid fonts (Ogg, Inknut Antiqua) not on Google Fonts. Use free alternatives (e.g. Cormorant Garamond / Libre Baskerville / Playfair for display, a clean sans for body) to capture the feeling rather than exact match — this was accepted.

## Priority Order (agreed in session)

1. **Design system (cohesion).** One palette file with navy/cream CSS variables; one deliberate font pairing (elegant serif display + clean body sans); shared spacing/type scale. Produces both north-star statements; makes everything after cheaper.
2. **Kill the 404s (the seams).** Build `theme-introduction.html` and `team.html` (or cut dead links). One consistent header/footer across pages.
3. **Motion layer.** Scroll fade-ins, card hover lifts, smooth anchors — built on the design system, restrained.
4. **Typography polish.** Replace the mixed font stack with the deliberate pairing; fix the nav font (the user's 2026 complaint).
5. **Responsive / mobile.** 2026's biggest weakness and the biggest differentiator; defer until after the president's first look.

## Out of Scope (for now)

- Real conference content (dates, theme, committees, pricing) — team decides later.
- Registration backend / form processing.
- Any backend or JS framework.

## Suggested Skills

- `design-taste-frontend` — anti-slop frontend skill; recommended for executing the design-system / identity work so it doesn't look templated.
- `redesign-existing-projects` — to upgrade the existing static pages to a premium, cohesive standard without breaking them.
- `grill-me` — re-run if the team needs to re-sharpen priorities or the president gives new feedback.

## Next Session Goal

Start with Priority 1 (design system), then Priority 2 (fix 404s / unify header-footer). Keep the motion layer and typography aligned with the elegant academic identity and the two north-star statements. Verify by opening the site locally in a browser.
