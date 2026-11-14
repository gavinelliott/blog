# Full transition to the newspaper design

Status: implementation complete, release testing in progress.
Reviewed with Gav: 14 November 2026. All page directions approved. Performance measurement and Gav’s editorial/link review will happen on production after the switch.

## Scope and decisions

Replace the current visual site in one release while retaining public URLs and content. Continue on `design/personal-blog-exploration`. Build and validate the production implementation locally, then deploy the complete release. Gav explicitly authorised production deployment and testing on 14 November 2026.

Use existing content as the source of truth. Do not rewrite posts, their frontmatter or historical talk text as part of the redesign. Gav will review content and destinations on production. Automated route and asset checks remain a pre-release gate to prevent obvious broken journeys.

### Content ownership

| Area | Source and behaviour |
| --- | --- |
| Blog posts | Existing `src/content/blog` Markdown, titles, descriptions, publication and updated dates, hero and social images. Preserve heading anchors and embedded content. |
| Homepage article selection | Curated featured post IDs with actual frontmatter titles and descriptions. Remove prototype headline/summary substitutions. Latest writing comes from collection dates. |
| Writing archive, search and sitemap | Derive from the same blog collection. No copied post content. Search remains explicitly titles and summaries. |
| Writing categories | Existing `src/data/topics.ts` membership and editorial introductions. Preserve routes. |
| Books | Existing `src/data/books.json`, including covers, recommendations, categories and affiliate URLs. Preserve disclosure and sponsored link attributes. |
| Talks | Existing talk Markdown and approved speaking history. Keep the current-context note above historical impostor syndrome material. |
| Older work and shipped projects | Existing collections, draft rules and public URLs. Render in a new shared editorial detail template without rewriting the case studies. |
| Home introduction, About, Deel, apps, Roundtails | Approved custom copy and artwork. Consolidate app names, descriptions, links and imagery into shared data so home/work/about cannot drift. Keep the bespoke Roundtails story. |
| Privacy | Approved layout adapting the existing policy. Reconcile wording with the final live analytics/cache setup, remove the local-preview note and retain an honest update date. |
| 404 | Approved custom ThunderCats design, served by the actual 404 route with HTTP 404 status. |

## Public route mapping

Keep current public paths instead of introducing unnecessary redirects.

| Preview | Production destination |
| --- | --- |
| `/design/home/` | `/` |
| `/design/writing/` | `/writing/` |
| `/design/writing/{topic}/` | `/writing/{topic}/` |
| `/design/post/{id}/` | `/blog/{id}/` |
| `/design/work/` | `/work/` |
| `/design/work/roundtails/` | `/work/roundtails/` |
| `/design/books/` | `/recommended-reads/` |
| `/design/speaking/` | `/speaking/` |
| `/design/talks/imposter-syndrome/` | `/talks/imposter-syndrome/` |
| `/design/about/` | `/about/` |
| `/design/privacy/` | `/privacy-policy/` |
| `/design/sitemap/` | `/sitemap/` |
| `/design/404/` | `src/pages/404.astro`, used for missing URLs |
| Existing work details | Keep `/work/{id}/` and apply the new detail template |
| Existing shipped index and details | Keep `/shipped/` and `/shipped/{id}/`, apply the new design |
| RSS and XML sitemaps | Retain `/rss.xml`, `/sitemap-index.xml` and generated child sitemap paths |

Preserve existing permanent redirects, especially dated historical post URLs, `/blog/` to `/writing/` and the alternative spelling of the impostor talk. Do not redirect every missing URL to home. Check Roundtails does not collide with an existing collection ID. Preview URLs are development-only and must not enter public search, canonicals, feeds or sitemap output.

## Implementation order

### 1. Record a recoverable baseline

- Record the current production deployment ID, Git revision and existing published route manifest.
- Review the branch diff. Add source, optimised artwork, relevant font licences and tests explicitly. Do not accidentally include local `.astro` settings or large generation originals in the release.
- Keep the current production deployment available for rollback. Do not delete original artwork or existing content.

### 2. Promote the shared design

- Move approved components and styles from exploration into production components/layouts. Keep a single source for shared navigation, footer, search and route generation.
- Replace every preview href, search result URL and related-content URL with its public destination. Account for links inside the existing Markdown separately and preserve valid historical destinations.
- Update public route entry points together, including legacy work/shipped templates and their indexes. Add the real 404 handler.
- Preserve content rendering, frontmatter images, updated dates, code blocks, tables, headings and long-title behaviour. The prototype article currently omits the existing hero-image and updated-date presentation; carry those over deliberately.
- Use actual post metadata in homepage cards, archives, search and related links. Keep only the selected feature order custom.
- Keep approved masthead, artwork, typography, search, article contents tracking and reduced-motion treatment.

### 3. Restore production plumbing

- Reconcile the new layout with the existing BaseHead responsibilities. Carry forward per-page title/description, canonical URL, Open Graph/Twitter images, article dates and BlogPosting structured data. Avoid duplicate metadata and avoid bringing back old typography styles through BaseHead.
- Remove the prototype’s universal noindex and “Local prototype” title suffix on public pages. Keep 404 and intentionally excluded legacy material non-indexable as appropriate. Remove prototype footer text.
- Review the existing sitemap filter: it excludes all `/work/` detail paths and `/work`. Include the new public Work index and Roundtails; preserve intentional exclusions for legacy work only, aligned with page robots metadata. Keep drafts excluded.
- Restore DataFast cookieless tracking once in the production layout, retaining the existing website ID/domain. No duplicate analytics initialisation.
- Preserve Vercel security headers and CSP. Verify search, contents tracking and motion work without allowing general inline executable scripts. Keep JSON data safely serialised and scripts bundled.
- Version the service-worker cache, reconcile precache paths and verify cached visitors receive the new HTML/assets. Preserve offline behaviour unless a deliberate alternative is agreed. Account for long-lived immutable caching on public image/font paths: use new hashed/versioned URLs for changed assets.
- Keep privacy wording consistent with the deployed service worker and DataFast configuration. This is not a claim of a new legal compliance audit.

### 4. Pre-release integration gate

This is a production build/integration check, not the deferred production performance audit or Gav’s editorial review.

- Run Astro checks, search tests and existing security tests. Build with the normal production command, without NEWSPAPER_PREVIEW.
- Compare old/new route manifests. Every previously published content URL must still resolve or have an intentional direct permanent redirect.
- Crawl generated internal destinations, assets and fragment targets. Verify no public href or search result points to `/design/`; ensure RSS and sitemap URLs are public and absolute where required.
- Check noindex/canonical/social metadata, draft exclusions and that no prototype pages are included in the production output.
- Smoke-test home, an article with headings, an older article with rich content, category, archive, work, legacy work/shipped, books, talk, About, utilities and an unknown URL.
- Check shared controls with keyboard, narrow layouts and reduced motion. Fix obvious regressions, including any remaining horizontal overflow, without redesigning approved pages.
- Confirm build output includes the real 404 page. HTTP status and redirect behaviour must also be verified on Vercel.

### 5. Release the complete site

- Release authorised by Gav on 14 November 2026. Publish after integration checks pass.
- Confirm which branch Vercel deploys before pushing. Publish the full change as one identifiable release, not a sequence of partially migrated page releases.
- Record the new deployment URL/ID and revision alongside the rollback baseline.
- Immediately check representative public pages, missing-page HTTP status, existing redirects, metadata, search, RSS, XML sitemap and DataFast loading.
- Test a returning browser session with an existing service worker as well as a clean session. Confirm there is no mix of cached old styles and new content.

### 6. Production review and performance, as requested

Gav: review real post content, custom copy, app details and external destinations on the live site. Record and fix feedback in follow-up releases.

Assistant: measure on the actual production deployment after it is live. Use repeated mobile and desktop lab runs for home, archive, a representative long article, Work, Books, About and the illustrated 404. Include cold and repeat visits, font/image loading, layout shift, interaction responsiveness, transferred bytes and caching. Distinguish throttled lab results from field data; do not claim immediate field INP results from a lab run. Proposed acceptance targets: LCP <= 2.5 seconds, CLS <= 0.1 and field INP <= 200ms where data is available. Record the test device/network profile and measured values, not only a Lighthouse score.

Fix regressions while preserving the approved visual direction. Prioritise shared font loading, large artwork, book-cover requests and avoidable script work. Use available CrUX/Search Console field data later when sufficient traffic and time have accumulated; no scheduled monitoring has been created.

## AI search and agent readiness

Status: planned, not implemented. Include this work in the production transition. Technical eligibility does not guarantee indexing, recommendations or citations.

### Before release

- Keep complete article text, author, dates, headings and primary navigation in the initial static HTML. Important facts must not exist only inside artwork, client-side search results or animated controls.
- Preserve canonical post URLs and direct redirects. Generate XML sitemap entries from published content with truthful modification dates. Preserve RSS. Include the public Work index and new project pages intentionally.
- Use a stable Person identity for Gavin Elliott, with Gav Elliott as an alternate name, anchored to About. Link article authors to that identity. Add verified public profile links only. Describe Deel, Crafted by Fort and the apps through their actual relationships, without implying that Gav owns Deel.
- Preserve BlogPosting metadata and add appropriate WebSite, ProfilePage and BreadcrumbList structured data where supported by visible content. Consider SoftwareApplication only on substantive individual app pages with verified details. Validate generated JSON-LD. Do not invent reviews, ratings, credentials or dates.
- Keep topic hubs, app descriptions and book recommendations in readable HTML with descriptive links. Link relevant writing to projects and topics where it helps readers. Preserve Gav’s published voice. Do not add boilerplate summaries or FAQs to every article.
- Give headings stable fragment IDs. Retain semantic landmarks, named controls, keyboard navigation and ordinary anchors so agents can use the same site as readers. Search is an enhancement, not the only route to content.
- Check robots.txt, page robots metadata, HTTP headers and hosting rules together. The current repository robots.txt allows all crawlers. Ensure production permits search discovery including OAI-SearchBot; verify actual hosting access rather than assuming the file is sufficient. Treat training preferences separately and do not change them implicitly.
- No required llms.txt, agent API or special AI-only markup. An experimental machine-readable index can be considered later only for a demonstrated use case and generated from existing content to prevent drift.

### Release acceptance and production follow-up

- Extract initial HTML from representative home, article, topic, app and About pages. Confirm readable body text, correct identity, dates, canonical URL and links without running JavaScript.
- Validate schema against rendered content, confirm no prototype noindex directives leak to public pages and no draft/prototype URLs enter the sitemap.
- Test real journeys: find Gav’s writing on AI and product design, find the apps he makes, find a recommended book and find a talk. Confirm results and destinations with ordinary navigation and an agent/browser where available.
- On production, verify crawler access, redirect/status behaviour, RSS and XML sitemap. Submit changed public URLs using the existing IndexNow script after confirming the live key file. Check Search Console and Bing indexing.
- Record available Bing AI Performance citations and cited URLs alongside search traffic and identifiable AI referral visits. Referrals do not measure all citations or zero-click answers. Do not treat a single prompted AI response as a ranking metric.
- Run the already planned production performance checks. Gav retains the live editorial and destination review. No recurring monitoring or automation is configured by this plan.

Primary references checked for this plan:

- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- OpenAI crawler controls: https://developers.openai.com/api/docs/bots
- Bing AI Performance: https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/

## Rollback

Rollback triggers include widespread route failures, missing article content, broken navigation/search or a severe production regression that cannot be corrected promptly. Re-promote the recorded prior Vercel deployment. Verify its public routes and returning-browser cache behaviour. If new service-worker caches survive the rollback, issue a small compatible cache-version update rather than relying on visitors to clear browser storage. Keep corrective work on the design branch and redeploy only after the failing checks pass.

## Completion criteria

The new design is present across all public page families; all previous published URLs remain supported; content comes from existing sources; real 404 and redirects behave correctly; production metadata, analytics, feeds and caching work; Gav’s live content/link feedback is resolved; measured production performance meets the agreed targets or any remaining issue is explicitly recorded. No deployment has been performed as part of this plan.
