# Single article typography review

Scope: local newspaper article template, reviewed with “You cannot AI your way out of the wrong problem”. Published copy is unchanged.

## Hierarchy and intended weights

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| Medium | src/design/newspaper/Post.astro:68,70 | H2–H4 shared one size | 30/26/22px desktop, 27/24/21px mobile | Descending heading scale makes hierarchy visible |
| Medium | src/design/newspaper/Post.astro:68 | Bold prose inherited a regular-only serif declaration with synthesis disabled | Strong text uses the loaded 700 UI face | Preserve emphasis using an actual loaded weight |

## Spacing, wrapping and measure

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| Low | src/design/newspaper/Post.astro:68,70 | Body leading 1.75 with 1.25em paragraph gaps | Leading 1.6, paragraph gaps 1em, capped at 700px and 70ch | Keep short paragraphs connected without crowding prose |
| Low | src/design/newspaper/Post.astro:68 | Unbalanced title, tight multiline leading | Balanced title, 1.4 leading, whole-word wrapping | Avoid isolated last words and cramped multiline headings |
| Low | src/design/newspaper/Post.astro:70 | Mobile metadata 10px | 12px with .04em uppercase tracking | Improve small-label readability |
| Low | src/design/newspaper/Post.astro:68 | Default description wrapping and link metrics | Pretty wrapping on descriptions, font-derived underline metrics | Improve description endings and link legibility |

## Verification

- Browser checked 320px, 800px and 1280px widths without horizontal page overflow on the sample article.
- Observed desktop body at 20px/32px and sticky navigation at 24px from the viewport top.
- Clicked contents links and scrolled normally. Active section updated, with yellow background, underline and aria-current="location".
- Mobile contents remain in normal flow. No animated scrolling was added.
- Heading scale inspected in CSS. Not verified: every heading level rendered with every possible article, browser zoom, all font fallback combinations and combined bold italic text.
- Remaining low-priority font work: convert the existing display TTF to WOFF2 and verify the full serif weight/style inventory before release. This pass does not certify typography across the whole site.

Approve for the inspected article preview. Remaining font and wider-content checks stay on the release backlog.
