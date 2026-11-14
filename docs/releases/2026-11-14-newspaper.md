# Newspaper release, 14 November 2026

Live site: https://gavinelliott.co.uk/

## Release and recovery

- Published from `design/personal-blog-exploration` to the existing production branch, `master`.
- Initial release revision: `e83fcd8a85b7af87e900c05ca9e165d5d53c4cfa`.
- Follow-up revision: `31603e5`, responsive 404 artwork and three historical redirects.
- Follow-up production deployment: `dpl_CTQWDcEpr9mM6PbVhDMqpYkyaC6g`, https://blog-et74torez-gavinelliott.vercel.app.
- Rollback baseline: `d065f298d4e116db1a7cf6649cfd0e4b5299f40d`, deployment `dpl_Amo3u1UruCZ3eodEjgH8gBddCYE1`.
- The original workspace protects Git metadata. Commits and pushes were made from `/tmp/blog-production-release`. The original working files match the release changes, but its Git index and branch pointer remain at the pre-release revision. Use the release checkout for further Git operations, or reconcile the original checkout before making new commits. Local `.astro/settings.json` and generation originals were excluded.

## Delivered

All approved pages use the newspaper design. All 101 existing built routes survive, with 103 pages now built. Public article URLs and original Markdown remain intact. Legacy work and shipped details also use the new design. No preview routes are generated in production and no public links point to them.

Shared app data, real article metadata, hero images and updated dates are wired into production. Search, keyboard navigation, reduced motion and article section tracking remain available. The Surprise me control now selects from published posts.

Canonical URLs, social metadata, RSS, DataFast and the service worker are restored. Structured data describes the author, website, articles, About profile and article breadcrumbs. Public Work and Roundtails pages are included in the sitemap; legacy case studies retain their intentional noindex treatment. Training crawler preferences were not changed.

## Verification

- Astro check: zero errors and zero warnings, 35 hints in retained and prototype code.
- Build: 103 pages, with no prototype routes.
- Release checks: route preservation, production metadata, valid JSON-LD, one analytics script per page, external executable scripts and sitemap inclusion/exclusion passed.
- Search unit checks: five passed.
- Browser security checks: four passed, including CSP enforcement, navigation and service-worker handling of private requests.
- Live HTTP checks: 109 destinations returned expected status codes, including XML sitemap, RSS, robots, service worker and real missing-page 404. Requests bearing the documented OAI-SearchBot user-agent were accepted. This is not proof of indexing or a request from a verified crawler IP.
- Live browser checks: 16 routes at 390px and 1440px, 32 visits total. No page errors, missing primary headings or horizontal overflow. Search result destinations, Escape/focus restoration, mobile menu and article contents highlighting passed.
- Automated accessibility: 11 routes at two widths, 22 scans using axe WCAG 2 A/AA and WCAG 2.1 AA tags. No violations reported. This does not constitute a complete manual accessibility audit.
- Returning visitor: old service worker replaced by the new version and the redesigned page loaded. An old cache can briefly be recreated by an in-flight old worker request; it is not used by the new worker. Repeat visits across seven representative pages used the current worker and cached assets, with no broken images on those pages.
- Historical redirects now return HTTP 308: `/blog/cleanreader` to `/shipped/cleanreader/`, `/posts/2-years-ago` to `/blog/2-years-ago/` and `/posts/change-and-grow` to `/blog/change-and-grow/`.
- IndexNow accepted the sitemap URL submission with HTTP 200. Existing sitemap address is unchanged. Search Console/Bing account indexing and citation reports were not reviewed in this release.

## Production performance

Lighthouse lab measurements from a temporary Vercel sandbox in London, Chromium 145. Two independent cold-load runs per page and device profile. Mobile uses Lighthouse simulated throttling, 150ms RTT, approximately 1.6Mbps and 4x CPU slowdown. Desktop uses its actual desktop configuration, 40ms RTT, 10Mbps and 1x CPU. An initial batch labelled desktop used the mobile configuration and was discarded; the table below uses the corrected desktop runs.

| Page | Mobile LCP, two runs | Desktop LCP, two runs | Performance score, mobile / desktop |
| --- | --- | --- | --- |
| Home | 0.940 / 0.909s | 0.273 / 0.267s | 100 / 100 |
| Writing | 0.910 / 0.907s | 0.276 / 0.248s | 100 / 100 |
| AI coding agent article | 0.924 / 0.924s | 0.278 / 0.265s | 100 / 100 |
| Work | 0.929 / 0.936s | 0.278 / 0.268s | 100 / 100 |
| Books | 0.929 / 0.933s | 0.271 / 0.272s | 100 / 100 |
| About | 0.926 / 0.931s | 0.528 / 0.567s | 99–100 / 100 |
| Illustrated 404, after optimisation | 2.111 / 2.110s | 0.648 / 0.649s | 99 / 100 |

All final LCP measurements are below 2.5 seconds. Highest measured CLS across the reported runs is below 0.001, against the 0.1 target. The original full-size 404 image gave mobile LCP of 2.858 / 3.008s; a 58KB responsive mobile variant reduced it to 2.111 / 2.110s. Desktop retains the original 256KB artwork.

Separate unthrottled repeat-navigation checks showed 48–123ms navigation durations with 9–25 same-origin resources served from browser/service-worker cache. These are lab navigation timings, not field LCP or INP. No claim is made about live-user p75 INP; sufficient field data is still needed.

## Gav’s content review

Six historical assets are absent from the existing repository and need original files or an editorial decision. No replacement content was invented:

| Article | Missing assets |
| --- | --- |
| `/blog/change-and-grow/` | `/images/meetup.jpg` |
| `/blog/experiences-and-journeys/` | `/images/reserve-1.png`, `/images/reserve-2.png`, `/images/reserve-3.png` |
| `/blog/good-product-development-process/` | `/images/product-development-wheel.jpg`, `/resources/product-development-wheel.pdf` |

Review the live custom copy, app destinations, recommendations and original posts as agreed. External destinations have not been exhaustively editorially verified.

## Maintenance follow-up

GitHub reported existing dependency alerts, including a critical Astro image-optimisation advisory. The site remains static and retains its existing passthrough image service, with no native image optimisation endpoint deployed. Dependencies were not upgraded as part of this design release. These alerts need a separate dependency review; passing CSP/browser tests does not mean the dependency tree is vulnerability-free.

No recurring performance or AI citation monitoring has been scheduled. The temporary testing environment is stopped after the checks.
