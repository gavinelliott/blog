/**
 * Submit URLs to IndexNow (https://www.indexnow.org/).
 * Uses the key file in public/ — must match keyLocation on live host.
 */
const SITE = 'https://gavinelliott.co.uk';
const KEY_FILE = '71660489d03d41b7b1d5035833006221.txt';

const urls = process.argv.slice(2).filter((a) => a.startsWith('http'));
if (urls.length === 0) {
	console.error('Usage: node scripts/indexnow.mjs <url> [<url> ...]');
	process.exit(1);
}

const key = KEY_FILE.replace(/\.txt$/, '');
const host = new URL(SITE).host;
const keyLocation = `${SITE}/${KEY_FILE}`;

const body = {
	host,
	key,
	keyLocation,
	urlList: urls,
};

const res = await fetch('https://api.indexnow.org/indexnow', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json; charset=utf-8' },
	body: JSON.stringify(body),
});

const text = await res.text();
if (!res.ok) {
	console.error(`IndexNow failed: ${res.status}`, text);
	process.exit(1);
}
console.log(`IndexNow OK (${res.status}):`, urls.join(', '));
