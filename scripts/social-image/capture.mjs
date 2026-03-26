#!/usr/bin/env node
/**
 * Renders scripts/social-image/template.html with headline/CTA copy and captures
 * a 1200×627 PNG at 2× device scale (2400×1254) via Playwright.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');
const TEMPLATE_PATH = path.join(__dirname, 'template.html');
const DEFAULT_AVATAR = path.join(REPO_ROOT, 'public/images/avatar.png');

function escapeHtml(text) {
	return String(text)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function parseArgs(argv) {
	const out = { lines: [], outPath: null, cta: 'Read now', avatar: DEFAULT_AVATAR, waitMs: 3000 };
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--out' && argv[i + 1]) {
			out.outPath = path.resolve(REPO_ROOT, argv[++i]);
		} else if (a === '--line1' && argv[i + 1]) {
			out.lines[0] = argv[++i];
		} else if (a === '--line2' && argv[i + 1]) {
			out.lines[1] = argv[++i];
		} else if (a === '--line3' && argv[i + 1]) {
			out.lines[2] = argv[++i];
		} else if (a === '--line4' && argv[i + 1]) {
			out.lines[3] = argv[++i];
		} else if (a === '--cta' && argv[i + 1]) {
			out.cta = argv[++i];
		} else if (a === '--avatar' && argv[i + 1]) {
			out.avatar = path.resolve(REPO_ROOT, argv[++i]);
		} else if (a === '--wait-ms' && argv[i + 1]) {
			out.waitMs = Number(argv[++i]) || 3000;
		} else if (a === '--help' || a === '-h') {
			out.help = true;
		}
	}
	return out;
}

function printHelp() {
	console.log(`
Usage:
  npm run social-image -- --out public/images/my-post.png \\
    --line1 "First line" --line2 "Second line" --line3 "Third line"

Options:
  --out <path>     Output PNG path (relative to repo root or absolute)
  --line1..3       Headline lines (plain text; HTML-escaped)
  --line4          Optional fourth line (adds compact sizing for long titles)
  --cta <text>     Button label (default: Read now)
  --avatar <path>  Avatar image (default: public/images/avatar.png)
  --wait-ms <n>    Font load wait in ms (default: 3000)
  -h, --help       This message
`);
}

async function main() {
	const opts = parseArgs(process.argv);
	if (opts.help) {
		printHelp();
		process.exit(0);
	}
	if (!opts.outPath) {
		console.error('Error: --out is required.');
		printHelp();
		process.exit(1);
	}
	const lines = [opts.lines[0] ?? '', opts.lines[1] ?? '', opts.lines[2] ?? '', opts.lines[3] ?? ''];
	if (!lines[0] || !lines[1] || !lines[2]) {
		console.error('Error: --line1, --line2, and --line3 are required.');
		printHelp();
		process.exit(1);
	}
	const line4 = lines[3] ?? '';
	const line4Block = line4
		? `<br><span class="headline-line">${escapeHtml(line4)}</span>`
		: '';
	const headlineClass = line4 ? ' headline--four-lines' : '';
	if (!fs.existsSync(opts.avatar)) {
		console.error(`Error: avatar not found: ${opts.avatar}`);
		process.exit(1);
	}
	if (!fs.existsSync(TEMPLATE_PATH)) {
		console.error(`Error: template not found: ${TEMPLATE_PATH}`);
		process.exit(1);
	}

	const avatarUrl = pathToFileURL(path.resolve(opts.avatar)).href;
	let html = fs.readFileSync(TEMPLATE_PATH, 'utf8');
	html = html
		.replaceAll('{{LINE1}}', escapeHtml(lines[0]))
		.replaceAll('{{LINE2}}', escapeHtml(lines[1]))
		.replaceAll('{{LINE3}}', escapeHtml(lines[2]))
		.replaceAll('{{LINE4_BLOCK}}', line4Block)
		.replaceAll('{{HEADLINE_CLASS}}', headlineClass)
		.replaceAll('{{CTA}}', escapeHtml(opts.cta))
		.replaceAll('{{AVATAR_SRC}}', avatarUrl);

	const tmpHtml = path.join(os.tmpdir(), `blog-social-image-${Date.now()}.html`);
	fs.writeFileSync(tmpHtml, html, 'utf8');
	const fileUrl = pathToFileURL(tmpHtml).href;

	const outDir = path.dirname(opts.outPath);
	fs.mkdirSync(outDir, { recursive: true });

	const browser = await chromium.launch();
	try {
		const context = await browser.newContext({
			viewport: { width: 1200, height: 627 },
			deviceScaleFactor: 2,
		});
		const page = await context.newPage();
		await page.goto(fileUrl);
		await new Promise((r) => setTimeout(r, opts.waitMs));
		await page.screenshot({ path: opts.outPath, fullPage: false });
		await context.close();
	} finally {
		await browser.close();
		try {
			fs.unlinkSync(tmpHtml);
		} catch {
			// ignore
		}
	}

	console.log(`Wrote ${opts.outPath}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
