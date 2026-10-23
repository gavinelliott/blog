import { defineConfig, passthroughImageService } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://gavinelliott.co.uk',
	output: 'static',
	integrations: [sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/work/') && !['/work', '/blog', '/blog/'].includes(new URL(page).pathname) })],
	server: { host: '127.0.0.1' },
	devToolbar: { enabled: false },
	image: {
		// Keep native image decoders unused until patched Sharp releases are available.
		service: passthroughImageService(),
		domains: [],
		remotePatterns: []
	},
	compressHTML: true, // Compress HTML output
	markdown: { processor: unified(), syntaxHighlight: 'prism' },
	build: {
		inlineStylesheets: 'auto', // Automatically inline smaller stylesheets
		assets: 'assets', // Custom directory for generated assets
	},
	vite: {
		build: {
			// External scripts let the response CSP reject all inline JavaScript.
			assetsInlineLimit: 0,
			// Minify JS assets for production
			minify: 'terser',
			// Configure terser for better compression
			terserOptions: {
				compress: {
					drop_console: true, // Remove console logs
					drop_debugger: true // Remove debugger statements
				}
			},
			// Split CSS files for better caching
			cssCodeSplit: true,
			// Chunk size warnings at 500kb instead of 50kb
			chunkSizeWarningLimit: 500
		},
		// Enable faster HMR for development
		server: {
			hmr: {
				overlay: true
			}
		},
		// Optimize CSS with postcss
		css: {
			devSourcemap: true
		},
		// Configure asset optimization
		assetsInclude: ['**/*.woff2', '**/*.webp'],
		// Enable brotli compression if available
		ssr: {
			noExternal: ['astro-seo']
		}
	}
});
