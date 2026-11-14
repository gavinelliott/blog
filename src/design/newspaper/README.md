# Newspaper homepage exploration

Local route: `/design/home/`.

Run `npm run dev -- --port 4322` from the repository root. Port 4322 avoids the older site's service worker cache on 4321. This page does not register a service worker or load analytics.

The current homepage and shared styles are untouched. The design route returns no paths in normal production builds. To compile an isolated static preview for checking, use `NEWSPAPER_PREVIEW=1 npm run build -- --outDir /tmp/blog-newspaper-preview`.

## Direction

Warm cream, deep green and yellow. Newspaper hierarchy, oversized heavy headings, serif prose and illustrated app advertisements. Desktop columns become a deliberate single-column reading order below 760px.

The page uses real blog titles and descriptions, existing book covers and verified app destinations from the Crafted by Fort repository. Project illustrations are editorial artwork, not replacements for app logos. Work navigation jumps to the homepage's app section for this prototype. Other navigation and articles open the existing site pages.

## Interactions

- Search opens with the labelled button, GE emblem or `/` shortcut.
- Native modal dialog supports Escape, traps focus and restores the opening control's focus.
- Search filters the existing writing collection. Result content is inserted as text.
- The mobile menu uses native disclosure semantics.
- Surprise me navigates to a random real article.
- Decorative motion is disabled under reduced-motion preferences.

## Assets

- `display.ttf`: BBH Hegarty Regular, reused from the user's HookSmith AI project.
- `inter-bold.woff2`: Inter Bold, reused from the user's CV Anywhere project.
- Lora regular and italic: existing self-hosted blog fonts.
- `dog.svg`: generated in Figma and exported as complete editable vector artwork, approximately 2 KB.
- Other editorial motifs: small inline SVGs in `Graphic.astro`.
- Nyah and Seek: generated editorial adaptations of their actual app icons, resized to 420px transparent PNGs and displayed as compact 100px desktop / 88px mobile marks. Their silhouette, fold and eye/viewfinder details preserve recognition.
- Existing book covers remain in `public`.

Figma source: https://www.figma.com/design/C8iRKB6G7Qr38O1Sm8yc6W?node-id=1-2

## Verification limits

Compilation and static checks are separate from browser verification. Keyboard operation, responsive rendering, zoom/reflow and performance measurements must be checked against a running preview. A successful build alone does not certify accessibility or Core Web Vitals.

Branch creation was blocked by read-only `.git` permissions in the agent session. No commit, push or deployment has been made.

## Copy and typography

Use Gav’s existing writing and his own phrasing as the reference for new copy. Keep labels direct and useful. Avoid invented personal habits, editorial slogans and filler such as “one point of view”, “usually with a brew” or “less talking, more making”. The newspaper influence belongs in the design, not a fictional editor persona. Do not rewrite published articles as part of a visual design pass.

Headings wrap at word boundaries. Never use `overflow-wrap:anywhere` or `word-break:break-all` to squeeze headings into a column. Adjust type size or the layout instead, then check narrow screens and intermediate desktop widths.

## Speaking preview

`/design/speaking/` and `/design/talks/imposter-syndrome/` reuse the existing speaking history and talk content. The 2017 entries now have their own year rather than sitting under 2018. Recording links come from the existing MK Geek Night entry and the September 2025 podcast article. No recording or transcript is invented for the archived Impostor Syndrome talk.

## About page

Local route `/design/about/`. Copy draws on the existing public posts `from-burnout-to-building-a-conversation-on-design-ai-and-leading-authentically`, `my-2014` and `i-dont-think-about-impostor-syndrome-in-the-same-way-anymore`. The latter supplies the verbatim quotation. Deel wording is the approved Work page copy. Pax story and illustration reuse the project page. No private family, employment or clinical details added.

Portrait is a generated editorial illustration based on `public/images/gav-bio-photo.jpg` and the existing mascot style, requested by Gav. Served as an optimised WebP. The NVmax computer and Industry ticket are typographic interpretations, not historical screenshots or original memorabilia. Native details controls work without JavaScript. Existing reduced-motion rules cover their plus icon and app hover movement.

About corrections from Gav: NVmax preceded the British Army. His work there was gaming and gaming hardware reviews, not the previously described running of a review network. These corrections supersede the older podcast article. Industry archive at https://industryconf.com lists April 2013, 2014, 2015 and 2016 events. Its opening 2012 date conflicts with those individual event entries, so the About page uses the actual event dates.

## Search preview

Shared Search.astro dialog searches published titles and summaries locally. Opening state has suggested terms and latest writing. Whole-word matching normalises case, accents and apostrophes, requires all query words and ranks title matches first. Results are added in batches of 12 with dates and summaries. No external search service. Escape closes, focus returns to the opener and Tab wraps inside the dialog. Existing reduced-motion rule disables the panel entrance. Search logic regression checks: `node --test tests/newspaper-search.test.mjs`.

## 404 preview

`/design/404/` is a local design route, not the production error handler. Custom generated ThunderCats artwork in optimised WebP, with selectable HTML heading and recovery links. Desktop artwork has a single 650ms opacity/scale reveal, disabled on mobile and for reduced motion. No audio, flashes, loops or extra JavaScript. Search uses the shared dialog. Integrate into the real 404 route and verify HTTP status during migration.

## Privacy and sitemap previews

Privacy adapts the existing 24 October 2026 policy into a shorter reading layout, retaining its substantive analytics and storage disclosures. Local preview notice distinguishes the analytics-free exploration from the live site. This is a design/content adaptation, not a new legal review. Verify provider practices and final live configuration before migration. Sitemap derives all posts from the blog collection, groups by UTC year and uses the book data for shelf links. Footer links connect both previews.
