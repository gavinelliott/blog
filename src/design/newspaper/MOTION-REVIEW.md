# Homepage motion opportunities

Reviewed 14 November 2026. Recommendations only, no motion implementation changes.

The page already has illustration hover transforms, arrow movement and a search entrance. It needs very little additional motion. The two candidates below add feedback without moving the writing.

## Opportunities

| # | Location | Today | Purpose | Frequency | Suggested motion |
| --- | --- | --- | --- | --- | --- |
| 1 | Home.astro:35, Home.astro:79, Home.astro:84; newspaper.css:8,13,14 | Search, Close and Surprise me have no pointer press feedback | Feedback | Occasional; keep subtle even for frequent use | Pointer press: scale 1 to 0.98, release to 1, 120ms cubic-bezier(0.23, 1, 0.32, 1). Do not delay the action or navigation. For reduced motion, keep scale at 1 and use an 80ms opacity transition from 1 to 0.85 and back. Keyboard activation remains immediate. |
| 2 | Home.astro:33; newspaper.css:17 | Native mobile disclosure appears instantly | Spatial consistency and state indication | Occasional | Menu opens from top left: translateY(-4px) and opacity 0 to translateY(0) and opacity 1, 180ms cubic-bezier(0.23, 1, 0.32, 1). Close within 120ms using the same curve. Keep native disclosure semantics and hide closed links from keyboard navigation. Under reduced motion, opacity only over 80ms. Keyboard-triggered opening is immediate. |

Both pass the function gate: they clarify direct interactions, affect no reading content and remain within the timing budget. Neither needs a motion library. There are no new hover suggestions; any future hover treatment must be gated by `(hover: hover) and (pointer: fine)`.

## Rejected candidates

- Search opened with `/`, Home.astro:98: keyboard initiation fails the frequency gate. Keep it instant. The existing shared entrance currently animates this path too and should be separated from pointer opening in a later implementation pass.
- Search result stagger, Home.astro:99: results change on every keystroke. Fails the frequency and function gates. Show results immediately.
- Sliding headlines or scroll reveals, Home.astro:47: fails the function gate. This is text people are trying to read.
- Continuously blinking Seek eyes or an animated Nyah mark, Home.astro:67–68: fails the purpose and frequency gates. Brand recognition benefits from stable shapes.
- A spin before Surprise me navigation, Home.astro:100: fails the function gate. It would delay the action for decoration; press feedback is sufficient.

## Sweep coverage

Checked the pointer controls, native menu, modal, search results, hover styles and archive action. There are no draggable interfaces, destructive actions, success screens or onboarding sequences on this page.

## Verdict

Start with pointer press feedback, then the mobile menu. Keep the newspaper content still. Existing hover effects should not multiply, and keyboard search should be immediate. Timing feel still needs checking after implementation; these recommendations are based on source inspection and the rendered homepage.

Implementation handoff: `improve-animations plan Add subtle pointer press feedback and a spatially connected mobile menu transition to the newspaper homepage. Preserve instant keyboard search, native semantics and reduced-motion alternatives.`
