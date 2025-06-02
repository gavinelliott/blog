import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://gavinelliott.co.uk',
	integrations: [mdx(), sitemap()],
	image: {
		// Image optimization settings
		service: {
			entrypoint: 'astro/assets/services/sharp'
		},
		domains: [],
		remotePatterns: []
	},
	compressHTML: true, // Compress HTML output
	build: {
		inlineStylesheets: 'auto', // Automatically inline smaller stylesheets
		assets: 'assets', // Custom directory for generated assets
		// Optional: Split larger CSS files
		experimental: {
			optimizeHoistedScript: true
		}
	},
	vite: {
		build: {
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
