# Blog social cards

The newspaper edition uses cream paper, deep green, bold display type and a custom illustrated portrait. Fonts and artwork are local, with no external requests during rendering.

Cards are 1200 × 630 JPEGs. Headlines use the full post title and shrink automatically if needed. Rendering fails if a headline still overflows.

## Regenerate the set

```bash
npx playwright install chromium
npm run social-image -- --all
```

This generates the default card and a card for every Markdown post with `socialImage` frontmatter. Outputs go to `public/images/social/`. The generated `manifest.json` records titles, dimensions and URLs.

## Create a new post card

```bash
npm run social-image -- --title "The actual post title" --out public/images/social/post-slug-v1.jpg
```

Set the post frontmatter to the resulting public URL:

```yaml
socialImage: '/images/social/post-slug-v1.jpg'
```

Use a new versioned filename when replacing published artwork, because image assets have long-lived caching. Update the frontmatter and default metadata when changing paths. The `--all` naming convention currently uses `newspaper-v1`.

`template.html` owns the composition. `assets/gav-editorial.webp` is the portrait source. `capture.mjs` embeds the assets and captures each card with Playwright. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to use an existing Chromium installation.

Review the default and longest headlines visually after changing the template.
