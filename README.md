# Gavin Elliott’s blog

Static Astro site for https://gavinelliott.co.uk, with blog posts, work case studies, and shipped products.

## Development

Use **Node.js 24 LTS** (`nvm use` reads `.nvmrc`).

```sh
npm ci
npm run dev
```

Content lives in `src/content/`. Collection schemas and loaders are in `src/content.config.ts`. Article URLs use the Markdown filenames.

```sh
npm run check          # Astro and TypeScript diagnostics
npm run build          # Generate the static site in dist/
npm run preview        # Preview the build
npm run test:security  # Build, then run Chromium security regression tests
npm audit              # Check current upstream advisories
```

Install the browser once with `npx playwright install chromium`. To use an existing compatible Chromium installation, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable.

The security tests check all generated pages, reject injected JavaScript and eval in a real browser, exercise mobile navigation, and verify service-worker cache exclusions. External services are mocked in the repeatable tests; live embed checks should accompany CSP changes without submitting forms.

## Security configuration

- `vercel.json` defines the enforced CSP and other response headers. `BaseHead.astro` reuses that policy as a meta tag for previews and other static hosts. Frame protection also requires the response header.
- Scripts are emitted as external files so the CSP can reject inline JavaScript and eval. Inline CSS is permitted for the existing Kit embed. Keep third-party origins restricted to the services actually used.
- The development server binds to loopback and the developer toolbar is disabled.
- Image processing uses Astro’s passthrough service. Native image decoders are not used by the configured service. Remote image processing is disabled.
- The service worker bypasses private, authenticated, non-GET, and query-string requests. It caches successful public responses with a bounded cache, and its script must revalidate on updates.
- Environment-file variants and local Vercel configuration are ignored by Git. Commit only placeholder values in sample files.

### Unresolved upstream advisories

As checked on **22 October 2026**, the available registry releases still produce **12 affected package entries** (1 critical, 10 high, 1 moderate). Several are inherited findings rather than independent vulnerabilities. The patched Astro 7.2.8 and Sharp 0.35.5 releases cited by the advisories return 404 from the registry, as do the checked patched releases for Vite, devalue, SVGO, source-map-js, fast-uri, and smol-toml. They have not been hidden with audit exclusions or forced incompatible overrides.

The critical image-processing path is mitigated by passthrough rendering; the deployed site is static, with no server islands, authentication middleware, or user-supplied image processing. YAML/TOML inputs come from trusted repository content. Recheck the advisories before enabling server rendering, native image transforms, untrusted content sources, or network access to the development server. Update dependencies and rerun the checks when patched releases become available.

## Social images

Use the versioned pipeline documented in [scripts/social-image/README.md](scripts/social-image/README.md). Set the resulting public path in the post’s `socialImage` frontmatter.
