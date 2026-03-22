# Blog social / feature images

Branded Open Graph / LinkedIn-style cards for **gavinelliott.co.uk** blog posts. Layout and tokens match the site: Atkinson Hyperlegible (self-hosted, headline — same as UI/headings on the blog), Fraunces (Google Fonts) for the CTA, sage accents. The live site uses **Libre Baskerville** (Google Fonts) for article body text; OG cards keep Atkinson for the stacked headline.

## Spec

| Item | Value |
|------|--------|
| Logical size | 1200 × 627 px |
| Export (2×) | 2400 × 1254 px |
| Background | `#F7F6F3` |
| Headline underline | `#B1C8AF` |
| CTA bar | `#5C7C6B` |
| Headline font | `Atkinson Hyperlegible` (`public/fonts/atkinson-*.woff`, copied next to the temp HTML for capture) |
| CTA font | Fraunces (Google Fonts) |
| Avatar | `public/images/avatar.png` (override with `--avatar`); horizontal position: `.avatar-container { right }` in `template.html` (default `88px`, same inset as body `padding-left`) |

## Usage

From the repo root:

```bash
npm run social-image -- --out public/images/your-post-slug.png \
  --line1 "First line" \
  --line2 "Second line" \
  --line3 "Third line"
```

Optional:

- `--cta "Read now"` — button label (default: `Read now`)
- `--avatar public/images/other.png` — path relative to repo root
- `--wait-ms 4000` — longer wait if fonts look wrong on first capture

Requires Playwright Chromium (`npx playwright install chromium` if needed).

## Blog post frontmatter

Set the image path so Open Graph and Twitter cards use it (see `BlogPost.astro` → `BaseHead`):

```yaml
socialImage: '/images/your-post-slug.png'
```

Use a leading slash and path under `public/images/`.

## Files

- `template.html` — composition and CSS (edit here to change global card style)
- `capture.mjs` — CLI, temp HTML, Playwright screenshot

Do not generate one-off `/tmp` HTML for production assets unless debugging; keep changes in `template.html` so they are versioned.
